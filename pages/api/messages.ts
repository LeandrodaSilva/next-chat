// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import DB from "../../utils/db";
import Messages from "../../models/messages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await DB.select(Messages).run();
  res.status(200).json(result)
}
