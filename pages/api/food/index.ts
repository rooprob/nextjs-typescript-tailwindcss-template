import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from '../../../utils/auth/firebaseAdmin';
import { sampleFoodData } from '../../../utils/sample-data'

import { AuthUser } from '../../../interfaces'
import { getUserFromCookie } from '../../../utils/auth/userCookies'

type Props = {
  _req: NextApiRequest 
  res: NextApiResponse
  user?: AuthUser,
  logout?: () => Promise<void>,
}


const getFood = (_req: NextApiRequest, res: NextApiResponse) => {
  // const { user, logout, _req, res } = props ;
  try {
    if (!Array.isArray(sampleFoodData)) {
      throw new Error('Cannot find food data')
    }
    const cookie = getUserFromCookie();
    console.log(cookie);
    let token;
    if (cookie !== undefined) {
      token = cookie.token;
    } else {
      token = _req.headers.token;
    }
    console.log(token);
    verifyIdToken(token).then(() => {
      console.log("Sending response for food....");
      res.status(200).json(sampleFoodData);
    });
  } catch (err) {
    res.status(401).json({ statusCode: 401, message: err.message })
  }
}

export default getFood;