import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  // HAHAHA FUCK YOU, DON'T YOU TRY ME MOTHERFUCKER although you arent far off 👀
  const hardcodedUsername = process.env.NEXT_PUBLIC_USERNAME;
  const hardcodedPassword = process.env.NEXT_PUBLIC_PASSWORD;

  if (username === hardcodedUsername && password === hardcodedPassword) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}