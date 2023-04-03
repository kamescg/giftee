import { BigNumber } from 'ethers'

import { domain, types } from './types'

export function createIntention(usr: any, delegation: any, signedDelegation: any, verifyingContract: string, approveTx: string, transferTx: string) {
  const intention = {
    replayProtection: {
      nonce: '0x01',
      queue: BigNumber.from(usr).toString(),
    },
    batch: [
      {
        authority: [],
        transaction: {
          to: verifyingContract,
          gasLimit: '2122222111000000000000000000',
          data: approveTx,
        },
      },
      {
        authority: [
          {
            delegation: delegation,
            signature: signedDelegation,
          },
        ],
        transaction: {
          to: verifyingContract,
          gasLimit: '2122222111000000000000000000',
          data: transferTx,
        },
      },
    ],
  }

  const intentionString = JSON.stringify({
    domain: { ...domain, verifyingContract: verifyingContract },
    message: intention,
    primaryType: 'Invocations',
    types: types,
  })

  return {
    intention: intention,
    string: intentionString,
  }
}