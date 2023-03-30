import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { redis } from '@/lib/services/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  if (req.method === 'POST') {
    try {
      const { address } = req.session.siwe
      const delegations = await redis.zadd(address, {
        key: `delegations:${address}`,
        score: Date.now(),
        value: JSON.stringify(req.body),
      })
      res.json({ delegations })
    } catch (ex) {
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
