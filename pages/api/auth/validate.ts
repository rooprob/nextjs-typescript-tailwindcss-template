import { NextApiRequest, NextApiResponse } from 'next'
import { verifyIdToken } from '../../../utils/auth/verifyIdToken';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let token = req.headers.authorization;
    token = token && token.replace('bearer ', '');

    console.log(token);
    verifyIdToken(token).then(() => {
      console.log("Sending ....");
      res.status(200).json({ status: 200 });
    });
  } catch (err) {
    res.status(401).json({ statusCode: 401, message: err.message });
  }
};

export default handler;