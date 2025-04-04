// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  // The ADMIN_EMAIL and ADMIN_PASSWORD are defined in the .env file.
  // ADMIN_PASSWORD in .env should be the hashed password.
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables!');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD);

  if (email === ADMIN_EMAIL && passwordMatch) {
    // TODO: Return a token or session here
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
}