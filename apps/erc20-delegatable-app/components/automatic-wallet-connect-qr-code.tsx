import * as React from 'react'

import classNames from 'clsx'
import QRCode from 'react-qr-code'
import { useAccount, useConnect } from 'wagmi'
import { cbAtom } from './providers/rainbow-kit'

interface AutomaticWalletConnectQRCodeProps {
  className?: string
}

export const AutomaticWalletConnectQRCode = ({ className }: AutomaticWalletConnectQRCodeProps) => {
  const classes = classNames(className, 'AutomaticWalletConnectQRCode')
  const { connector: activeConnector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const cb = cbAtom

  const [ qrCode, setQRCode ] = React.useState()
  React.useEffect(() => {
    (async() => {

      console.log(connectors, '{ connector: activeConnector, isConnected }')
      // @ts-ignore
      const cb = connect({
        connector: connectors[3],
      })

      console.log(cb, 'cb')
      // @ts-ignore
      // const connector = await cb?.init?.createConnector()
      // console.log(connector, 'connectorconnector')
      // const qr = await connector?.qrCode?.getUri()
      // setQRCode(qr)
    })();
  }, [connectors])
  return (
    <div className={classes}>
      <QRCode
        value={qrCode || ''}
        className="max-h-[208px] w-full cursor-pointer rounded-xl bg-white p-4 shadow-md hover:shadow-lg"
      />
    </div>
  )
}

export default AutomaticWalletConnectQRCode
