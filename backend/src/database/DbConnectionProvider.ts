import { Connection, createConnection } from "typeorm"


export interface IDbConnectionProvider {
  GetConnection(): Promise<Connection>
}
export default class DbConnectionProvider implements IDbConnectionProvider {
  public async GetConnection(): Promise<Connection> {
    return createConnection();
  }
}