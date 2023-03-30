import * as React from 'react'

import classNames from 'clsx'
import { utils } from 'ethers'

import { sampleReceived } from '@/data/sample-received'

interface ReceivedCardsProps {
  className?: string
}

export const ReceivedCards = ({ className }: ReceivedCardsProps) => {
  const classes = classNames(className, 'ReceivedCards')
  return (
    <>
      {sampleReceived.map((received, index) => {
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
                  {/* <br />
                    <span className="text-xs">
                      to <br />
                      {received.to}
                    </span> */}
                </div>
              </div>
            </div>
          </div>
          // <div key={index} className="card grid-cols-12 grid">
          //   <div className="col-span-12 md:col-span-4">
          //     <div className="lfex-col flex items-center justify-between text-xs">
          //       <span className="">from</span>
          //       <span className="text-[12px]">{received.from}</span>
          //     </div>
          //   </div>
          //   <div className="col-span-12 md:col-span-8 p-4">
          //     <div className="bg-emerald-700 text-white rounded-xl min-h-[280px] flex flex-col p-2">
          //       <div className="">header</div>
          //       <div className="flex-1">hello</div>
          //       <div className="">footer</div>
          //     </div>
          //   </div>
          // </div>
        )
      })}
    </>
  )
}

export default ReceivedCards
