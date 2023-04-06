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
      const data = await prisma.user.update({
        where: {
          id: address,
        },
        data: {
          allowanceTrx: req.body.allowanceTrx,
        },
      })
      return res.json({ content: data, object: 'User' })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false, message: ex })
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
