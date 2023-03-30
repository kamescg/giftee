'use client'

import AutomaticWalletConnectQRCode from '@/components/automatic-wallet-connect-qr-code'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import CardsReceived from '@/components/cards-received'
import CardsSent from '@/components/cards-sent'
import { FormIssueCard } from '@/components/form-issue-card'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <>
      <section className="py-0">
        <div className="container mx-auto grid max-w-screen-xl grid-cols-12 gap-4 lg:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="card">
              <BranchIsWalletConnected>
                <>
                  <h3 className="text-lg font-semibold">Wallet Connected</h3>
                  <hr className="my-2" />
                  <p className="text-xs leading-6 text-neutral-600 dark:text-white">Start issuing crypto cards to your friends and family.</p>

                  <h3 className="mt-4 text-lg font-semibold">How It Works</h3>
                  <hr className="my-2" />
                  <p className="text-xs leading-6 text-neutral-600 dark:text-white">
                    Cards are issued using the{' '}
                    <LinkComponent className="link" href="https://github.com/delegatable">
                      Delegatable framework
                    </LinkComponent>
                    . You can send them to anyone, anywhere in the world, for free.
                  </p>
                </>
                <>
                  <div className="relative -mt-32 p-4">
                    <div className="flex-center w-full rounded-xl bg-white flex pt-8 px-8 pb-2 shadow-sm flex-col">
                      <AutomaticWalletConnectQRCode />
                      <p className="my-3 text-center text-xs text-neutral-500 dark:text-neutral-700">Scan QR code to connect wallet</p>
                    </div>
                  </div>
                  <div className="flex-center flex w-full">
                    <WalletConnect />
                  </div>
                  <div className="mt-4 text-xs leading-6 text-neutral-600 dark:text-white">
                    <p className="mb-2">When you connect your wallet, you will be able to issue, send, and receive cards.</p>
                    <p className="">
                      The cards use a special delegation technique to allow you to send and receive cards without having to pay gas fees.
                    </p>
                  </div>
                </>
              </BranchIsWalletConnected>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Tabs defaultValue="received" className="w-full">
              <TabsList className="w-full bg-neutral-100 p-3">
                <TabsTrigger className="w-1/2 py-4" value="received">
                  🤑 Received
                </TabsTrigger>
                <TabsTrigger className="w-1/2 py-4" value="sent">
                  💸 Sent
                </TabsTrigger>
                <TabsTrigger className="w-1/2 py-4" value="issue">
                  🏧 Issue Card
                </TabsTrigger>
              </TabsList>
              <TabsContent value="received" className="bg-white dark:bg-neutral-800">
                <div className="grid grid-cols-12 gap-4 lg:gap-8 w-full">
                  <CardsReceived className="col-span-12 md:col-span-6" />
                </div>
              </TabsContent>
              <TabsContent value="issue" className="bg-white dark:bg-neutral-800">
                <FormIssueCard />
              </TabsContent>
              <TabsContent value="sent" className="bg-white dark:bg-neutral-800">
                <div className="grid grid-cols-12 gap-4 lg:gap-8 w-full">
                  <CardsSent className="col-span-12 md:col-span-6" />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  )
}
