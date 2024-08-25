import SQLite from 'react-native-sqlite-storage';

const database = SQLite.openDatabase(
  { name: 'UserHub.db', location: 'default' },
  () => console.log('Database opened successfully'),
  (error) => console.error('Database error:', error)
);

const createTables = () => {
  database.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        name TEXT NOT NULL,
        joinDate TEXT NOT NULL
      )`,
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.error('Table creation error:', error)
    );
  });
};

const insertUser = (email, name, joinDate) => {
  database.transaction(tx => {
    tx.executeSql(
      `INSERT INTO users (email, name, joinDate) VALUES (?, ?, ?)`,
      [email, name, joinDate],
      (tx, results) => console.log('User inserted:', results),
      (tx, error) => console.error('User insertion error:', error)
    );
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users;`,
        [],
        (tx, results) => {
          const rows = results.rows.raw();
          resolve(rows)
        },
        error => {
          console.error('Error fetching users:', error);
          reject(error);
        }
      );
    });
  });
};

const updateUser = (email, name) => {
  database.transaction(tx => {
    tx.executeSql(
      `UPDATE users SET name = ? WHERE email = ?`,
      [name, email],
      () => console.log('User updated successfully'),
      (tx, error) => console.error('User update error:', error)
    );
  });
};

const getUser = (email) => {
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (tx, results) => {
          const rows = results.rows.raw();
          resolve(rows)
        },
        error => {
          console.error('Error fetching users:', error);
          reject(error);
        }
      );
    });
  });
};

const deleteUser = (email) => {
  database.transaction(tx => {
    tx.executeSql(
      `DELETE FROM users WHERE email = ?`,
      [email],
      () => console.log('User deleted successfully'),
      (tx, error) => console.error('User deletion error:', error)
    );
  });
};

export { createTables, insertUser, getUser, getUsers, updateUser, deleteUser };
