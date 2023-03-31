import React from 'react'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { useYupValidationResolver } from '@/lib/useYupValidationResolver'

import { WalletConnect } from './blockchain/wallet-connect'
import { BranchIsAuthenticated } from './shared/branch-is-authenticated'
import { BranchIsWalletConnected } from './shared/branch-is-wallet-connected'

const validationSchema = yup.object({
  to: yup.string().required('Required'),
  amount: yup.string().required('Required'),
})

export function FormClaimCard() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, setValue, ...rest } = useForm({ resolver })

  const onSubmit = async (data: any) => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full gap-10">
        <div className="mb-6 w-full">
          <input
            {...register('to')}
            type="text"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="0x000...000"
            required
          />
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
