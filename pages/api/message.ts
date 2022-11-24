// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Messages from "../../models/messages";
import DB from "../../utils/db";

type Data = {
  message: any
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body = "" } = req;

  switch (method) {
    case 'POST':
      await DB.insert(Messages)
        .columns("Data")
        .values(body)
        .run();
      res.status(200).json({message: 'OK'})
      break
  }
}
