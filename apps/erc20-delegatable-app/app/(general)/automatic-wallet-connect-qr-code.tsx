import * as React from 'react'

import classNames from 'clsx'
import QRCode from 'react-qr-code'

interface AutomaticWalletConnectQRCodeProps {
  className?: string
}

export const AutomaticWalletConnectQRCode = ({ className }: AutomaticWalletConnectQRCodeProps) => {
  const classes = classNames(className, 'AutomaticWalletConnectQRCode')
  return (
    <div className={classes}>
      <QRCode
        // TODO: Add value to initialize a wallet connection. Can be done via the WalletConnect API?
        value="winnnnnnningwinnnnnnningwinnnnnnningwinnnnnnningwinnnnnnningwinnnnnnning"
        className="w-full cursor-pointer rounded-xl bg-white p-4 shadow-md hover:shadow-lg max-h-[208px] w-auto"
      />
    </div>
  )
}

export default AutomaticWalletConnectQRCode
