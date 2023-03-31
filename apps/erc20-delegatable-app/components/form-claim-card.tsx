import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { useSigner } from 'wagmi'
import * as yup from 'yup'

import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { useErc20Manager, useErc20ManagerInvoke } from '@/lib/blockchain'
import { useContractAutoLoad } from '@/lib/hooks/use-contract-auto-load'
import { useYupValidationResolver } from '@/lib/useYupValidationResolver'
import { createIntention } from '@/lib/utils/create-intention'

import { WalletConnect } from './blockchain/wallet-connect'
import { BranchIsAuthenticated } from './shared/branch-is-authenticated'
import { BranchIsWalletConnected } from './shared/branch-is-wallet-connected'

const validationSchema = yup.object({
  to: yup.string(),
})

interface FormClaimCardProps {
  delegationData: any
}

export function FormClaimCard({ delegationData }: FormClaimCardProps) {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, setValue, setError, ...rest } = useForm({ resolver })

  const [intentionData, setIntentionData] = useState<any>()

  const contract = useContractAutoLoad('ERC20Manager')
  const managerContract = useErc20Manager({ address: contract.address })

  const contractUSDC = useContractAutoLoad('USDC')

  const signer = useSigner()

  const { write } = useErc20ManagerInvoke({
    address: contract.address,
    args: [[intentionData]],
    // @ts-ignore
    enabled: Boolean(intentionData),
  })

  console.log('intentionData', intentionData)

  const onSubmit = async (data: any) => {
    console.log('data input', data)

    // check if valid send to address
    if (data.to && !ethers.utils.isAddress(data.to)) {
      setError('to', { type: 'manual', message: 'Invalid address' })
      return false
    }

    const sendToAddress = data.to ? data.to : await signer.data?.getAddress()

    const method = 'eth_signTypedData_v4'

    const approveTrxPopulated = await managerContract?.populateTransaction.approveTransferProxy(
      contractUSDC.address,
      delegationData.from,
      delegationData.amount,
      ethers.constants.MaxUint256,
      delegationData.signature.v,
      delegationData.signature.r,
      delegationData.signature.s
    )

    const transferTrxPopulated = await managerContract?.populateTransaction.transferProxy(contractUSDC.address, sendToAddress, delegationData.amount)

    const intention = createIntention(
      sendToAddress,
      delegationData.delegations.delegation,
      delegationData.delegations.signedDelegation,
      contract.address,
      approveTrxPopulated?.data as string,
      transferTrxPopulated?.data as string
    )

    console.log(intention, 'intention')

    // @ts-ignore
    const signedIntention = await signer.data?.provider.send(method, [await signer.data?.getAddress(), intention.string])

    console.log('signedIntention', signedIntention)

    setIntentionData({ invocations: { ...intention.intention }, signature: signedIntention })
  }

  useEffect(() => {
    if (intentionData && write) {
      write()
    }
  }, [intentionData])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full gap-10">
        <div className="mb-6 w-full">
          <label htmlFor="to" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Send To
          </label>
          <input
            {...register('to')}
            type="text"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="0x000...000"
          />
          {rest.formState.errors.to && <p className="text-xs italic text-red-500">{rest.formState.errors.to.message as string}</p>}
          <p className="mt-2 text-center text-xs">Leave this field blank if you want to claim your USDC to your wallet.</p>
        </div>
      </div>

      <div className="">
        <BranchIsAuthenticated>
          <BranchIsWalletConnected>
            {rest.formState.isSubmitted ? (
              <button type="button" className="btn btn-emerald">
                Submitting the Transaction
              </button>
            ) : (
              <button type="submit" className="btn btn-emerald w-full">
                {rest.formState.isSubmitting ? (
                  <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"></path>
                  </svg>
                ) : (
                  'Claim'
                )}
              </button>
            )}
            <WalletConnect />
          </BranchIsWalletConnected>
          <ButtonSIWELogin className="btn btn-sm btn-emerald" label="Web3 Login" />
        </BranchIsAuthenticated>
      </div>
    </form>
  )
}
