import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from '@/lib/server'
import { prisma } from '@/lib/prisma'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { address } = req?.session?.siwe
      if (!address) {
        return res.status(403).json({ ok: false, message: 'Unauthorized' })
      }

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: req.query.issuerAddress as string,
        },
      })

      return res.json({ content: user, Object: 'User' })
    } catch (ex) {
      console.error(ex)
      return res.json({ ok: false, message: ex})
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
