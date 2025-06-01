module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'anime_test',
  },
  migrations: {
    directory: './migrations',
  },
};
