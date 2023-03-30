import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { redis } from '@/lib/services/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  if (req.method === 'GET') {
    try {
      // const { address } = req.session.siwe

      await redis.zadd('scores', { score: 1, member: 'team1' })
      await redis.zadd('scores', { score: 1, member: 'team2' })
    const data = await redis.zrange('scores', 0, 100 )
    console.log(data)
      res.json({ ok: true })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
