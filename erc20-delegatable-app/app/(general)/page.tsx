'use client'

import QRCode from 'react-qr-code'

import { FormIssueCard } from '@/components/form-issue-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <>
      <section className="lg:py-32">
        <div className="container mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <div className="card">
              <div className="relative -top-32 p-4">
                <QRCode value="winnnnnnning" className="w-full cursor-pointer rounded-xl bg-white p-2 shadow-md hover:shadow-lg" />
                <p className="my-3 text-center text-xs text-neutral-500 dark:text-neutral-200">Scan QR code to connect wallet</p>
                <button className="btn btn-light w-full">Connect Wallet</button>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <Tabs defaultValue="issue" className="w-full">
              <TabsList className="w-full bg-neutral-100 p-2">
                <TabsTrigger className="w-1/2 py-4" value="issue">
                  Issue
                </TabsTrigger>
                <TabsTrigger className="w-1/2 py-4" value="sent">
                  Sent
                </TabsTrigger>
                <TabsTrigger className="w-1/2 py-4" value="received">
                  Received
                </TabsTrigger>
              </TabsList>
              <TabsContent value="issue">
                <FormIssueCard />
              </TabsContent>
              <TabsContent value="sent">
                <p className="text-sm text-slate-500 dark:text-slate-400">Make changes to your sent here. Click save when you&apos;re done.</p>
              </TabsContent>
              <TabsContent value="received">
                <p className="text-sm text-slate-500 dark:text-slate-400">Change your received here. After saving, you&apos;ll be logged out.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  )
}
