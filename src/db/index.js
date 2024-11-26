import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("niemann.db");

export const createSessionsTable = () => {
  const promise = new Promise((resolve, reject) => {
    const query =
      "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL)";
    db.transaction(
      (tx) =>
        tx.executeSql(
          query,
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        ),
      (error) => reject(error)
    );
  });
  return promise;
};

export const insertSession = ({email, localId, token}) => {
  const promise = new Promise((resolved,rejected)=>{
      const query = 'INSERT INTO sessions (email, localId, token) VALUES (?,?,?)'
      db.transaction(tx=>tx.executeSql(query,[email,localId, token],(_,result)=>resolved(result),(_,result)=>rejected(result)))
  })
  return promise
}


export const fetchSession = () => {
  console.log("Ejecutando fetchSession...");
  const promise = new Promise((resolve, reject) => {
    const query = "SELECT * FROM sessions";
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [email,localId, token],
          (_, result) => {
            console.log("Sesiones obtenidas:", result);
            resolve(result.rows._array);
          },
          (_, result) => {
            console.error("Error en fetchSession:", result);
            reject(result);
          }
        );
      },
      (error) => {
        console.error("Error en la transacción de fetchSession:", error);
        reject(error);
      }
    );
  });
  return promise;
};

export const clearSessions = () => {
  console.log("Ejecutando clearSessions...");
  const promise = new Promise((resolve, reject) => {
    const query = "DELETE FROM sessions";
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      (error) => reject(error)
    );
  });
  return promise;
};
