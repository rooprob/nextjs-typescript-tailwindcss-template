import { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from '../../../utils/auth/firebaseAdmin';
import { sampleFoodData } from '../../../utils/sample-data'

const getFood = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleFoodData)) {
      throw new Error('Cannot find food data')
    }
    const token = _req.headers.token;
    await verifyIdToken(token);
    res.status(200).json(sampleFoodData);
  } catch (err) {
    res.status(401).json({ statusCode: 401, message: err.message })
  }
}

export default getFood;