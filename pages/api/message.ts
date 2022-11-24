// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import sql from "mssql";

type Data = {
  message: any
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
  const { method, body } = req;

  switch (method) {
    case 'POST':
      await sql.connect(sqlConfig)
      await sql.query`INSERT INTO Messages (Data) VALUES (${body});`
      res.status(200).json({message: 'OK'})
      break
  }
}
