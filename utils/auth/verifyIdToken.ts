import { exception } from 'console'
import * as admin from 'firebase-admin'

export const verifyIdToken = (token: string | string[] | undefined) => {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

  if (token === undefined) {
    throw new Error('Invalid token');
  }
  if (Array.isArray(token)) {
    throw new Error('Too many tokens');
  }

  if (!admin.apps.length) {
    if (firebasePrivateKey === undefined) {
      throw new Error('Invalid key');
    }
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}
