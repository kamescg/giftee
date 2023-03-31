// @ts-nocheck
'use client'

import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

import { BranchColorMode } from '../shared/branch-color-mode'
import { LinkComponent } from '../shared/link-component'

export function NavigationMenuGeneral() {
  return (
    <NavigationMenu className="self-center">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-emerald-500 to-purple-700 p-6 no-underline outline-none focus:shadow-md relative overflow-hidden">
                    <div className="bg-cover z-0 opacity-20 absolute -top-6 h-48 w-48 right-0 bg-[url('https://em-content.zobj.net/thumbs/120/google/350/magic-wand_1fa84.png')]" />
                    <div className="z-10">
                      <div className="mt-4 mb-2 text-lg font-medium text-white z-10">
                        {/* 🪄 */}
                        <br /> A Magical Experience
                      </div>
                      <p className="mb-3 text-sm leading-tight text-white/90">
                        Gifty is a digital gift card platform that allows you to send and receive gift cards from your favorite Web3 wallet without
                        submittig an onchain transaction.
                      </p>
                      <p className="text-sm leading-tight text-white/90 font-bold">A new world of possibilities!</p>
                    </div>
                  </div>
                </NavigationMenuLink>
              </li>
              <LinkComponent href="https://delegatable.org/">
                <div className="card">
                  <h3 className="font-normal text-lg">Developer Documentation</h3>
                  <div className="my-2" />
                  <p className="text-xs">
                    Delegatable is a Solidity framework for extending smart contracts with counterfactual revocable-delegation
                  </p>
                </div>
              </LinkComponent>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, name, imgLight, imgDark, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700',
              className
            )}
            {...props}>
            {/* <img src={image} className="mb-3 h-7 w-7 rounded-full" alt="partner logo" /> */}
            <BranchColorMode>
              <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgDark} width={100} height={100} />
              <Image className="mb-3 h-7 w-7 rounded-full" alt="Etherscan logo" src={imgLight} width={100} height={100} />
            </BranchColorMode>
            <div className="text-sm font-medium leading-none">{name}</div>
            <p className="text-sm leading-snug text-slate-500 line-clamp-2 dark:text-slate-400">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'
