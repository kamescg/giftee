import React, { useCallback, useState } from 'react'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { appCardIssue } from '@/lib/app/app-card-issue'
import { useYupValidationResolver } from '@/lib/useYupValidationResolver'

import { WalletConnect } from './blockchain/wallet-connect'
import { BranchIsAuthenticated } from './shared/branch-is-authenticated'
import { BranchIsWalletConnected } from './shared/branch-is-wallet-connected'
import { useContractAutoLoad } from '@/lib/hooks/use-contract-auto-load'
import { useSigner, useSignTypedData } from 'wagmi'
import { BigNumber, ethers, utils } from 'ethers'
import { getPermitSignature } from '@/lib/utils/get-permit-signature'
import { createDelegation } from '@/lib/utils/create-delegation'
import { createIntention } from '@/lib/utils/create-intention'
import { useErc20Manager } from '@/lib/blockchain'

const validationSchema = yup.object({
  to: yup.string().required('Required'),
  image: yup.string(),
  content: yup.string(),
  chainId: yup.number(),
  address: yup.string(),
})

export function FormIssueCard() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, setValue, setError, ...rest } = useForm({ resolver })

  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false)
  const [signatures, setSignatures] = useState<any>();

  const contract = useContractAutoLoad("ERC20Manager")
  const managerContract = useErc20Manager({address: contract.address})

  const contractAllowanceEnforcer = useContractAutoLoad("ERC20FromAllowanceEnforcer")
  const contractTimestampBeforeEnforcer = useContractAutoLoad("TimestampBeforeEnforcer")
  const contractTimestampAfterEnforcer = useContractAutoLoad("TimestampAfterEnforcer")
  const signer = useSigner();

  const onSubmit = async (data: any) => {
    console.log('wtfd')
    setIsSubmitting(true)

    console.log('data input', data)

    // check if valid send to address
    if (!ethers.utils.isAddress(data.to)) {
      setError('to', { type: 'manual', message: 'Invalid address' })
      setIsSubmitting(false)
      return false;
    }

    const rawUSDCAmount = BigNumber.from(data.amount * 10 ** 6);

    const inputTerms = ethers.utils.hexZeroPad(rawUSDCAmount.toHexString(), 32);

    const enforcers = [
      {
        enforcer: contractAllowanceEnforcer.address,
        terms: inputTerms,
      },
    ]

    // check if times are inputted
    if (data.startDate){
      // handle start date enforcer
      const time = new Date(data.startDate).getTime() / 1000;
      console.log('start time', time);
      const timestampAfterRawValue = ethers.utils.hexZeroPad(
        ethers.utils.hexValue(time),
        8,
      );

      enforcers.push({
        enforcer: contractTimestampAfterEnforcer.address,
        terms: timestampAfterRawValue,
      })
    }

    if (data.endDate){
      // handle end date enforcer
      const time = new Date(data.endDate).getTime() / 1000;
      console.log('end time', time);
      const timestampBeforeRawValue = ethers.utils.hexZeroPad(
        ethers.utils.hexValue(time),
        8,
      );
      enforcers.push({
        enforcer: contractTimestampBeforeEnforcer.address,
        terms: timestampBeforeRawValue,
      })
    }

    // @TODO - Sign the delegation
    const method = 'eth_signTypedData_v4';

    const me = await signer.data?.getAddress();

    const { v, r, s } = await getPermitSignature(
      signer.data,
      {address: '0x0000000000000000000000000000000000000000'}, // fill with correct USDC token address
      contract.address,
      rawUSDCAmount,
      ethers.constants.MaxUint256,
      "Token"
    );

    console.log(v, r, s);

    const approveTrxPopulated = await managerContract?.populateTransaction.approveTransferProxy(
      '0x0000000000000000000000000000000000000000', // fill with correct USDC token address
      me,
      rawUSDCAmount,
      ethers.constants.MaxUint256,
      v,
      r,
      s
    );

    const transferTrxPopulated = await managerContract?.populateTransaction.transferProxy(
      '0x0000000000000000000000000000000000000000', // fill with correct USDC token address
      data.to,
      rawUSDCAmount
    );
    
    const delegation = createDelegation(data.to, contract.address, enforcers);

    console.log(delegation);
    // @ts-ignore
    const signedDelegation1 = await signer.data?.provider?.send(method, [
      me,
      delegation.string,
    ]);
    const intention = createIntention(
      data.to,
      delegation.delegation,
      signedDelegation1,
      contract.address,
      approveTrxPopulated.data,
      transferTrxPopulated.data
    );
    // @ts-ignore
    const signedDelegation2 = await signer.data?.provider.send(method, [
      me,
      intention.string,
    ]);
    setSignatures({
      delegation: signedDelegation1,
      invocation: signedDelegation2,
    });
    // @TODO - Send the data to the blockchain
    appCardIssue(data)
    setIsSubmitting(false)
  }

  return (
    <>
    {signatures && (
        <div className="text-sm">
          <span className="block break-all">
            Delegation: <br /> {signatures.delegation}
          </span>
          <span className="block break-all">
            Invocation: <br /> {signatures.invocation}
          </span>
        </div>
      )}

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full gap-10">
        <div className="mb-6 w-2/3">
          <label htmlFor="to" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            To
          </label>
          <input
            {...register('to')}
            type="text"
            id="to"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="0xd61FA937b8f648901D354f48f6b14995fE468bF3"
            required
          />
          {rest.formState.errors.to && <p className="text-red-500 text-xs italic">{rest.formState.errors.to.message as string}</p>}
        </div>
        <div className="mb-6 w-1/3">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Amount of USDC
          </label>
          <input
            {...register('amount', { valueAsNumber: true })}
            type="number"
            id="amount"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="100"
            required
          />
        </div>
      </div>
      <div className="flex w-full gap-10">
        <div className="mb-6 w-1/2">
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Start Date
          </label>
          <input
            {...register('startDate')}
            type="datetime-local"
            id="startDate"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder=""
          />
          <p className="mt-2 text-xs text-gray-500">Leave empty and the card will be available immediately.</p>
        </div>
        <div className="mb-6 w-1/2">
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            End Date
          </label>
          <input
            {...register('endDate')}
            type="datetime-local"
            id="endDate"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder=""
          />
          <p className="mt-2 text-xs text-gray-500">Leave empty and the card will be available forever.</p>
        </div>
      </div>

      <div className="">
        <BranchIsAuthenticated>
          <BranchIsWalletConnected>
            {rest.formState.isSubmitted ? (
              <button type="button" className="btn btn-emerald">
                Crypto Card Sent
              </button>
            ) : (
              <button type="submit" className="btn btn-emerald w-full">
                {rest.formState.isSubmitting || isSubmitting ? (
                  <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"></path>
                  </svg>
                ) : (
                  'Send Crypto Card'
                )}
              </button>
            )}
            <WalletConnect />
          </BranchIsWalletConnected>
          <ButtonSIWELogin className="btn btn-sm btn-emerald" label="Web3 Login" />
        </BranchIsAuthenticated>
      </div>
    </form>
    </>

  )
}
