import * as React from 'react'

import classNames from 'clsx'
import { utils } from 'ethers'

interface CardRenderProps {
  className?: string
  to?: string
  decimals?: number
  amount: number
}

export const CardRender = ({ className, to, decimals, amount }: CardRenderProps) => {
  const classes = classNames(className, 'CardRender')
  return (
    <div className={classes}>
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg min-h-[245px] flex flex-col p-4">
        <div className="flex-1 flex justify-between">
          <div className="">
            <h3 className="font-normal text-4xl lg:text-6xl">{utils.formatUnits(amount, decimals)}</h3>
            <span className="text-xs">USDC Amount</span>
          </div>
        </div>
        <div className="">
          <div className="">
            <span className="text-xs">
              <span className="font-bold">to</span> <br />
              {to}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardRender
