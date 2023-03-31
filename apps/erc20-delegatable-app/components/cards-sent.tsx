import * as React from 'react'

import classNames from 'clsx'
import { utils } from 'ethers'

import { useAppUserCardsReceived } from '@/lib/hooks/app/use-app-users-cards-received'
import { useAppUserCardsSent } from '@/lib/hooks/app/use-app-users-cards-sent'

interface CardsSentProps {
  className?: string
}

export const CardsSent = ({ className }: CardsSentProps) => {
  const classes = classNames(className, 'CardsSent')
  const { data } = useAppUserCardsSent()
  return (
    <>
      {data?.content?.map((received, index) => {
        return (
          <div key={index} className={classes}>
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg min-h-[245px] flex flex-col p-4">
              <div className="flex-1 flex justify-between">
                <div className="">
                  <h3 className="font-normal text-4xl lg:text-6xl">{utils.formatEther(received.amount)}</h3>
                  <span className="text-xs">USDC Amount</span>
                </div>
                <span className="">
                  <button className="tag tag-light tag-sm tag-pill">Claim</button>
                </span>
              </div>
              <div className="">
                <div className="">
                  <span className="text-xs">
                    <span className="font-bold">to</span> <br />
                    {received.to}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default CardsSent
