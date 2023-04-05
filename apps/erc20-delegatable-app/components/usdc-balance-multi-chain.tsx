import * as React from 'react'

import { trimFormattedBalance } from '@turbo-eth/core-wagmi'
import classNames from 'clsx'
import { utils } from 'ethers'
import { useAccount } from 'wagmi'

import { useErc20BalanceOf } from '@/lib/blockchain'
import { useLoadContractFromChainId } from '@/lib/hooks/use-load-contract-from-chain-id'

interface USDCBalanceMultiChainProps {
  className?: string
}

export const USDCBalanceMultiChain = ({ className }: USDCBalanceMultiChainProps) => {
  const classes = classNames(className, 'USDCBalanceMultiChain')
  const { address } = useAccount()

  const contractAddress = useLoadContractFromChainId({
    1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    4: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
    137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
  })

  const { data } = useErc20BalanceOf({
    address: contractAddress as `0x${string}`,
    args: [address as `0x${string}`],
  })

  return <span className={classes}>${trimFormattedBalance(utils.formatUnits(data?.toString() || '0', 6).toString(), 2)}</span>
}

export default USDCBalanceMultiChain
