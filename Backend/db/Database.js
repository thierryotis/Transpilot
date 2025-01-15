const mysql = require('mysql2/promise');

const connectDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "CimentJam",
      password: "rIkAqLy1kC",
      database: "CimentJam",
    });

    console.log('Connected to the database!');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
