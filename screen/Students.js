import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

export default function StudentScreen({ setScreen }) {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [regid, setRegid] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const API_URL = `http://172.16.178.10:3000/api/students`;

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const text = await response.text();
      const data = JSON.parse(text);
      setStudents(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Failed to fetch students. Please try again.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const resetForm = () => {
    setName('');
    setAge('');
    setCourse('');
    setRegid('');
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !age.trim() || !course.trim() || !regid.trim()) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const student = { name, age, course, regid };
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        fetchStudents();
        setModalVisible(false);
        resetForm();
        Alert.alert(editingId ? 'Student Updated!' : 'Student Added!');
      } else {
        Alert.alert('Error', 'Failed to save student.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save student.');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete student.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>+ Add Student</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedStudent(item);
              setDetailModalVisible(true);
            }}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>Course: {item.course}</Text>
            <Text style={styles.price}>Reg ID: {item.regid}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => {
                  setName(item.name);
                  setAge(String(item.age));
                  setCourse(item.course);
                  setRegid(String(item.regid));
                  setEditingId(item.id);
                  setModalVisible(true);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => deleteStudent(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Add/Edit Student Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingId ? 'Edit Student' : 'Add New Student'}
              </Text>

              <TextInput
                placeholder="Name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                placeholder="Age"
                placeholderTextColor="#aaa"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Course"
                placeholderTextColor="#aaa"
                value={course}
                onChangeText={setCourse}
                style={styles.input}
              />
              <TextInput
                placeholder="Reg ID"
                placeholderTextColor="#aaa"
                value={regid}
                onChangeText={setRegid}
                style={styles.input}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleSubmit}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>
                    {editingId ? 'Update' : 'Add'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setModalVisible(false);
                    resetForm();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Student Details Modal */}
      <Modal visible={detailModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.detailModalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Student Details</Text>
              {selectedStudent ? (
                <>
                  <Text style={styles.detailLabel}>Name:</Text>
                  <Text style={styles.detailText}>{selectedStudent.name}</Text>

                  <Text style={styles.detailLabel}>Age:</Text>
                  <Text style={styles.detailText}>{selectedStudent.age}</Text>

                  <Text style={styles.detailLabel}>Course:</Text>
                  <Text style={styles.detailText}>{selectedStudent.course}</Text>

                  <Text style={styles.detailLabel}>Reg ID:</Text>
                  <Text style={styles.detailText}>{selectedStudent.regid}</Text>
                </>
              ) : (
                <Text style={styles.detailText}>No student selected.</Text>
              )}

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { marginTop: 20 }]}
                onPress={() => setDetailModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },

  addButton: {
    backgroundColor: '#ff4081',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#ff4081',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },

  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: 1,
    borderColor: '#333',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ff4081',
    marginBottom: 6,
  },

  description: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff80ab',
    marginBottom: 12,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginLeft: 8,
  },

  editButton: {
    backgroundColor: '#ff4081',
  },

  deleteButton: {
    backgroundColor: '#dc3545',
  },

  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modalContainer: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 15,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#ff4081',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#555',
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  submitButton: {
    backgroundColor: '#ff4081',
  },

  cancelButton: {
    backgroundColor: '#555',
  },

  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  detailModalContainer: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 15,
  },

  detailLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff4081',
    marginTop: 12,
    marginBottom: 6,
  },

  detailText: {
    fontSize: 16,
    color: '#eee',
    lineHeight: 22,
  },
});