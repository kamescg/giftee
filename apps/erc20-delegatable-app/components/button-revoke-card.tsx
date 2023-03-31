import React from 'react'

import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'

import { WalletConnect } from './blockchain/wallet-connect'
import { BranchIsAuthenticated } from './shared/branch-is-authenticated'
import { BranchIsWalletConnected } from './shared/branch-is-wallet-connected'

export function ButtonRevokeCard() {
  const handleRevoke = async (data: any) => {}

  return (
    <div className="">
      <BranchIsAuthenticated>
        <BranchIsWalletConnected>
          <button type="button" className="btn btn-red w-full" onClick={handleRevoke}>
            Revoke
          </button>
          <WalletConnect />
        </BranchIsWalletConnected>
        <ButtonSIWELogin className="btn btn-sm btn-emerald" label="Web3 Login" />
      </BranchIsAuthenticated>
    </div>
  )
}
