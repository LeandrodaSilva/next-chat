// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import sql from "mssql";

type Data = {
  name: any
}

const sqlConfig = {
  user: "leproj.admin",
  password: "79RdDJt779PMMuw",
  database: "leproj_db",
  server: 'leproj-sql.database.windows.net',
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await sql.connect(sqlConfig)
  // await sql.query`DELETE from Messages`
  // await sql.query`ALTER TABLE Messages drop column ID`
  // await sql.query`ALTER TABLE Messages ADD ID INT NOT NULL IDENTITY(1,1) PRIMARY KEY`
//   await sql.query`INSERT INTO Messages (Data)
// VALUES ('teste');`
  const result = await sql.query`select * from Messages`
  res.status(200).json({name: result})
}
