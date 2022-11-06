import { NextApiRequest, NextApiResponse } from "next";

export default function Users(req: NextApiRequest, res: NextApiResponse) {

  return res.json({ hello: 'there' })
}