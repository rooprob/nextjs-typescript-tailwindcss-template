import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    'auth=1; Max-Age=86400; SameSite=Strict; HttpOnly; Path=/'
  );
  res.status(200).end();
};

export default handler;