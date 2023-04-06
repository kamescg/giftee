import React, { useEffect } from 'react'

import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'

import { WalletConnect } from './blockchain/wallet-connect'
import { BranchIsAuthenticated } from './shared/branch-is-authenticated'
import { BranchIsWalletConnected } from './shared/branch-is-wallet-connected'
import { useContractAutoLoad } from '@/lib/hooks/use-contract-auto-load'
import { useErc20ManagerRevoke } from '@/lib/blockchain'
import { appCardUpdate } from '@/lib/app/app-card-update'
import { useWaitForTransaction } from 'wagmi'

export function ButtonRevokeCard({
  cid,
  delegation,
  signature
}:any) {
  const handleRevoke = async (data: any) => {
    if (!contract) return
    if (!write) return
    write()
  }

  const contract = useContractAutoLoad('ERC20Manager')
  const {write, data, isLoading} = useErc20ManagerRevoke({
    address: contract?.address,
    args: [{
      delegation: delegation,
      signature: signature,
    }],
  })

  useEffect(() => {
    appCardUpdate({
      id: cid,
      revokedHash: data?.hash as `0x${string}`,
    })
  }, [data])


  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    if (isSuccess) {
      appCardUpdate({
        id: cid,
        isRevoked: true,
      })
    }
  }, [isSuccess])

  return (
    <div className="">
      <BranchIsAuthenticated>
        <BranchIsWalletConnected>
        <>
          {
            isLoading ? (
              <div className="text-gray-500">Revoking...</div>
            ) : null
          }
          {
            !isSuccess ? null : (
              <div className="text-green-500">Revoked</div>
            )
          }
          {
            isSuccess ? null : (
              <button type="button" className="btn btn-red w-full" onClick={handleRevoke}>
                Revoke
              </button>
            )
          }
        </>
          <WalletConnect />
        </BranchIsWalletConnected>
        <ButtonSIWELogin className="btn btn-sm btn-emerald" label="Web3 Login" />
      </BranchIsAuthenticated>
    </div>
  )
}
