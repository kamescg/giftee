import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

import { withSessionRoute } from '../../lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { address } = req?.session?.siwe
      if (!address) {
        return res.status(403).json({ ok: false, message: 'Unauthorized' })
      }

      const cards = await prisma.card.findMany({
        where: {
          from: address,
        },
      })

      return res.json({ content: cards, Object: 'Cards' })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false })
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
