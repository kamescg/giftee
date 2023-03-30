import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  if (req.method === 'POST') {
    try {
      const { address } = req?.session?.siwe
      if (!address) {
        return res.status(403).json({ ok: false, message: 'Unauthorized' })
      }
      console.log(req.body)
      const data = await prisma.card.create({
        data: {
          // ...req.body,
          decimals: '6',
          token: 'usdc',
          from: address,
          to: req.body.to,
          delegations: req.body.delegations,
          amount: req.body.amount,
        },
      })
      res.json({ content: data, object: 'Delegation' })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
