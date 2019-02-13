import { Injectable } from '@angular/core';
import { DatabaseConnectorProvider } from '../databaseConnectorProvider/databaseConnectorProvider';

@Injectable()
export class MovementsProvider {

  constructor(private databaseConnector: DatabaseConnectorProvider) {
  }

  get allMovements(): Array<any> {
    const sql = "SELECT * FROM Movements";

    let movements: Array<any> = new Array<any>();

    this.databaseConnector.executeSentence(movements, sql, []);

    return movements;
  }

  get expenses(): Array<any> {
    const sql = "SELECT * FROM Expenses";

    let movements: Array<any> = new Array<any>();

    this.databaseConnector.executeSentence(movements, sql, []);

    return movements;
  }

  get deposits(): Array<any> {
    const sql = "SELECT * FROM Deposits";

    let movements: Array<any> = new Array<any>();

    this.databaseConnector.executeSentence(movements, sql, []);

    return movements;
  }

  get balance(): Array<any> {
    const sql = "SELECT * FROM Balance";

    let balance: Array<any> = new Array<any>();

    this.databaseConnector.executeSentence(balance, sql, []);

    return balance;
  }

}
