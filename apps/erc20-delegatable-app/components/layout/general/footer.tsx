import React from 'react'

import classNames from 'clsx'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { siteConfig } from '@/config/site'

import { LinkComponent } from '../../shared/link-component'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const classes = classNames(props.className, 'Footer', 'px-4 py-6 flex flex-col justify-center items-center')

  return (
    <footer className={classes}>
      <h3>{siteConfig.title}</h3>
      <span className=" my-2 text-xs">
        Built by{' '}
        <LinkComponent className="link" href="https://twitter.com/McOso_">
          McOso
        </LinkComponent>{' '}
        and{' '}
        <LinkComponent className="link" href="https://twitter.com/KamesGeraghty">
          KamesGeraghty
        </LinkComponent>
      </span>
      <div className="mt-2 flex items-center">
        <LinkComponent href={`${siteConfig.links.github}`}>
          <FaGithub />
        </LinkComponent>
        <div className="mx-2" />
        <LinkComponent href={`${siteConfig.links.twitter}`}>
          <FaTwitter />
        </LinkComponent>
      </div>
    </footer>
  )
}
