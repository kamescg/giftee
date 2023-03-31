'use client'

import AutomaticWalletConnectQRCode from '@/components/automatic-wallet-connect-qr-code'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import CardsReceived from '@/components/cards-received'
import CardsSent from '@/components/cards-sent'
import { FormIssueCard } from '@/components/form-issue-card'
import { BranchIsAuthenticated } from '@/components/shared/branch-is-authenticated'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { LinkComponent } from '@/components/shared/link-component'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import USDCBalanceMultiChain from '@/components/usdc-balance-multi-chain'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'

export default function Home() {
  return (
    <>
      <section className="lg:py-12">
        <div className="container mx-auto mb-4 flex max-w-screen-xl items-center justify-between">
          <span className="flex items-center gap-x-2 text-xl font-semibold">
            <img className="h-8 w-8 rounded-full" src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" />
            <span className="">USDC Balance</span>
          </span>
          <USDCBalanceMultiChain className="text-gradient-primary rounded-full bg-white px-8 py-3 text-5xl font-bold shadow-sm dark:bg-slate-700" />
        </div>
        <div className="container mx-auto grid max-w-screen-xl grid-cols-12 gap-4 lg:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="card">
              <BranchIsWalletConnected>
                <>
                  <h3 className="text-lg font-semibold">Wallet Connected</h3>
                  <hr className="my-2" />
                  <p className="text-xs leading-6 text-neutral-600 dark:text-white">Start issuing crypto gift cards to your friends and family.</p>

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
                    <div className="flex-center flex w-full flex-col rounded-xl bg-white px-8 pb-2 pt-8 shadow-sm">
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
                  🧧 Received
                </TabsTrigger>
                <TabsTrigger className="w-1/2 py-4" value="sent">
                  💸 Sent
                </TabsTrigger>
                <TabsTrigger className="w-1/2 py-4" value="issue">
                  🏧 Issue Card
                </TabsTrigger>
              </TabsList>
              <TabsContent value="received" className="bg-white dark:bg-neutral-800">
                <BranchIsWalletConnected>
                  <BranchIsAuthenticated>
                    <div className="grid w-full grid-cols-12 gap-4 lg:gap-8">
                      <CardsReceived className="col-span-12 md:col-span-6" />
                    </div>
                    <div className="flex-center flex w-full p-10">
                      <ButtonSIWELogin className="btn btn-sm btn-emerald" label="Web3 Login" />
                    </div>
                  </BranchIsAuthenticated>
                  <p className="text-center text-sm text-neutral-600 lg:py-6">Connect a Wallet to see your received cards.</p>
                </BranchIsWalletConnected>
              </TabsContent>
              <TabsContent value="issue" className="bg-white dark:bg-neutral-800">
                <FormIssueCard />
              </TabsContent>
              <TabsContent value="sent" className="bg-white dark:bg-neutral-800">
                <BranchIsWalletConnected>
                  <BranchIsAuthenticated>
                    <div className="grid w-full grid-cols-12 gap-4 lg:gap-8">
                      <CardsSent className="col-span-12 md:col-span-6" />
                    </div>
                    <div className="flex-center flex w-full p-10">
                      <ButtonSIWELogin className="btn btn-sm btn-emerald" label="Web3 Login" />
                    </div>
                  </BranchIsAuthenticated>
                  <p className="text-center text-sm text-neutral-600 lg:py-6">Connect a Wallet to see your sent cards.</p>
                </BranchIsWalletConnected>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  )
}
