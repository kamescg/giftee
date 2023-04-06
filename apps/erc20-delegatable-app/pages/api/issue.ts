import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'
import { withSessionRoute } from '@/lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { address } = req?.session?.siwe
      if (!address) {
        return res.status(403).json({ ok: false, message: 'Unauthorized' })
      }
      const data = await prisma.card.create({
        data: {
          decimals: '6',
          token: 'usdc',
          from: address,
          chainId: '137', // TODO: get chainId from req.body
          to: req.body.to,
          delegations: req.body.delegations,
          amount: req.body.amount,
          signature: req.body.signature,
        },
      })
      return res.json({ content: data, object: 'Delegation' })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
