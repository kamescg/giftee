import * as React from 'react'

import classNames from 'clsx'
import { utils } from 'ethers'

import { useAppUserCardsReceived } from '@/lib/hooks/app/use-app-users-cards-received'

interface CardsReceivedProps {
  className?: string
}

export const CardsReceived = ({ className }: CardsReceivedProps) => {
  const classes = classNames(className, 'CardsReceived')
  const { data } = useAppUserCardsReceived()
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
                    <span className="font-bold">from</span> <br />
                    {received.from}
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

export default CardsReceived
