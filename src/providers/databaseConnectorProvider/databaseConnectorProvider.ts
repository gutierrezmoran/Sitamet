import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy';

@Injectable()
export class DatabaseConnectorProvider {

  private dataBaseName = "sitamet.db";
  private sqlobj: SQLiteObject;

  constructor(private sqlite: SQLite, private sqlCopy: SqliteDbCopy) {
    this.deleting().then(() => {
      this.sqlite.create({
        name: 'sitamet.db',
        location: 'default',
        createFromLocation: 1
      }).then((db: SQLiteObject) => {
        this.sqlobj = db;
      }
      ).catch(e => console.error(e))
    });
  }

  private openDataBase(name: string): Promise<SQLiteObject> {
    const conector = { name: name, location: 'default', createFromLocation: 1 };
    return this.sqlite.create(conector);
  }

  private deleting(): Promise<void> {
    return new Promise((resolve) => {
      this.sqlCopy.copy("sitamet.db", 0)
        .then(() => {
          resolve();
        }).catch((e) => console.log("deleting cagada" + e));
    })
  }

  executeSentence(target: Array<any>, sqlSentence: string, searchParam: any[]) {
    return new Promise((resolve, reject) => {
      this.openDataBase(this.dataBaseName).then((db: SQLiteObject) =>
        db.executeSql(sqlSentence, searchParam
        ).then((resultSet) => {
          for (let i = 0; i < resultSet.rows.length; i++) {
            let obj: any = resultSet.rows.item(i);
            target.push(obj);
            console.log(JSON.stringify(obj));
          } resolve(target);
        }).catch((e) => {
          console.log(e);
          reject(e);
        })).catch((e) => {
          reject(e);
        })
    })
  }

}
