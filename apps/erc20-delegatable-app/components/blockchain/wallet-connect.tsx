'use client'
import * as React from 'react'
import classNames from 'clsx';

import { ConnectButton } from '@rainbow-me/rainbowkit'

interface WalletConnectProps {
  className?: string
  full?: boolean
}

export const WalletConnect = ({ className, full }: WalletConnectProps) => {
 const classes = classNames(className, 'WalletConnect', {
    'WalletConnect--full': full,
 }); 

  return (
    <span className={classes}>
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'avatar',
        }}
        chainStatus={{
          smallScreen: 'icon',
          largeScreen: 'icon',
        }}
      />
    </span>
  )
}

