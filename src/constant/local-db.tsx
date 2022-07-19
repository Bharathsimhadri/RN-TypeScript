import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase(
  {name: 'localDB', location: 'default'},
  () => {},
  err => {
    console.log('createConnection err', err);
  },
);

export function createConnection() {
  db = SQLite.openDatabase(
    {name: 'localDB', location: 'default'},
    () => {},
    err => {
      console.log('createConnection err', err);
    },
  );
  return db;
}

export function createTable(createQuery: string, searchQuery: string) {
  console.log('createTable called *******************');
  if (!db) {
    db = createConnection();
  }
  db.transaction(tx => {
    tx.executeSql(searchQuery, [], (stx, res) => {
      if (res.rows.length === 0) {
        tx.executeSql(createQuery, [])
          .then(res => {
            console.log('Table created *******************', res);
          })
          .catch(err => {
            console.log(' err in Table create *******************', err);
          });
      } else if (res.rows.length > 0) {
        console.log(' Table created *******************');
      }
    });
  });
}

export async function insertData(insertQuery: string, params: any) {
  //console.log('insertData called **********', insertQuery, params);
  if (!db) {
    db = createConnection();
  }
  await db.transaction(async txn => {
    await txn.executeSql(
      insertQuery,
      params,
      (tx, results) => {
        //console.log('results ********* ', results);
        if (results.rowsAffected > 0) {
          //console.log('Inserted sucessfully... ********* ', results);
        }
      },
      err => {
        console.log('NOT ADDED IN DB SOMETHING WENT WRONG', err);
      },
    );
  });
}

export const updateData = (updateQuery: string, params: any) => {
  db.transaction(tx => {
    tx.executeSql(updateQuery, params, (tx, results) => {
      console.log('Table Updated');
    });
  });
};

export const deleteData = (deleteQuery: string, params: any) => {
  db.transaction(tx => {
    tx.executeSql(deleteQuery, params, (tx, results) => {
      console.log('deleted table');
    });
  });
};

export const retriveData = async (selectQuery: string) => {
  await db.transaction(txx => {
    txx.executeSql(
      selectQuery,
      [],
      (tx, resultss) => {
        var temp = [];
        //console.log('retriveData Data**************');
        for (let i = 0; i < resultss.rows.length; ++i) {
          temp.push(resultss.rows.item(i));
        }
        //console.log('Data**************', temp?.length);
        return temp;
      },
      err => {
        console.log('error in retriveData********************', err);
      },
    );
  });
};

export async function clearDB() {
  if (!db) {
    db = createConnection();
  }
  await db.transaction(async tx => {
    await tx.executeSql('DROP TABLE IF EXISTS CURRENCY;');
  });
}
