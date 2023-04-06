import { domain, types } from './types'

export function createIntention(
  usr: any,
  delegation: any,
  signedDelegation: any,
  verifyingContract: string,
  transferTx: string,
  chainId: number,
  approveTx?: string
) {
  let batch
  if (approveTx) {
    batch = [
      {
        authority: [],
        transaction: {
          to: verifyingContract,
          gasLimit: '10000000000000000',
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
          gasLimit: '10000000000000000',
          data: transferTx,
        },
      },
    ]
  } else {
    batch = [
      {
        authority: [
          {
            delegation: delegation,
            signature: signedDelegation,
          },
        ],
        transaction: {
          to: verifyingContract,
          gasLimit: '10000000000000000',
          data: transferTx,
        },
      },
    ]
  }
  const intention = {
    replayProtection: {
      nonce: '0x01',
      queue: Math.floor(Math.random() * 100000000),
    },
    batch,
  }

  domain.chainId = chainId

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
