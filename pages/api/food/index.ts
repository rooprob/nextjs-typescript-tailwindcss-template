import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from '../../../utils/auth/firebaseAdmin';
import { sampleFoodData } from '../../../utils/sample-data'

import { AuthInfo } from '../../../types/auth.types'
import TokenService from '../../../services/Token.service'
import { useAuth } from '../../../services/Auth.context'

type Props = {
  _req: NextApiRequest 
  res: NextApiResponse
  user?: AuthInfo,
  logout?: () => Promise<void>,
}


const getFood = (_req: NextApiRequest, res: NextApiResponse) => {
  // const { user, logout, _req, res } = props ;
  try {
    if (!Array.isArray(sampleFoodData)) {
      throw new Error('Cannot find food data')
    }
    // Demo code? - put this elsewhere

    // let cookie = {} ;
    // console.log(cookie);

    let token = _req.headers.token;
    /*
    if (cookie !== undefined && cookie.hasOwnProperty('token')) {
      token = cookie.token;
    } else {
      token = _req.headers.token;
    }*/
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