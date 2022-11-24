import sql from "mssql";
import conf from "../db-conf";

type Comparison = "=" | "<" | ">" | "<=" | ">=" | "<>" | "!=" | "LIKE" | "NOT LIKE" | "IN" | "NOT IN" | "BETWEEN" | "NOT BETWEEN" | "IS" | "IS NOT";

export default class DB<T> {
  _query = "";
  _model = DB;

  constructor(model: any) {
    this._query = "";
    this._model = model;
  }

  static select(model: any, args: Array<string> | string = "*") {
    return new DB<typeof model>(model).select(args);
  }

  static insert(model: any) {
    return new DB<typeof model>(model).insert(model.name);
  }

  select(args: Array<string> | string = "*") {
    this._query += `SELECT ${String(args)} `;
    return this.from(this._model.name);
  }

  from(args: string) {
    this._query += `FROM ${args} `;
    return this;
  }

  where(a: string, comparison: Comparison, b: string = "") {
    this._query += `WHERE ${a} ${comparison} ${b}`;
    return this;
  }

  insert(table: string) {
    this._query += `INSERT INTO ${table}`;
    return {
      columns: this.columns.bind(this),
    };
  }

  columns(...arr: Array<string>) {
    // @ts-ignore
    this._query += `(${String(arr.reduce((a , b) => `${String(a)}, ${String(b)}`))}) `;
    return {
      values: this.values.bind(this),
    };
  }

  values(...arr: Array<string>) {
    // @ts-ignore
    this._query += `VALUES (${String(arr.reduce((a , b) => `${String(a)}, ${String(b)}`))})`;
    return {
      run: this.run.bind(this),
      where: this.where.bind(this),
    };
  }

  async run() {
    // @ts-ignore
    await sql.connect(conf)

    this._query = this._query.trim();
    this._query += ";";

    return await sql.query(this._query);
  }

  toString() {
    this._query = this._query.trim();
    this._query += ";";
    return this._query.trim();
  }
 }
