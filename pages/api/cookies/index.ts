import { NextApiRequest, NextApiResponse } from 'next'
import { setUserCookie } from '../../../utils/auth/userCookies'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  setUserCookie({ id: "sample", email: "n@e.c", token: "1234" });

  res.status(200).json({ status: 200 });
};

export default handler