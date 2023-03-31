// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  tagline: string
  emoji: string
  description: string
  previewImg: string
  localeDefault: string
  links: {
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://turboeth.xyz'

export const siteConfig: SiteConfig = {
  name: 'gifty',
  title: 'gifty 🧧 magical gift cards',
  tagline: 'Magical Gift Cards',
  emoji: '🧧',
  description: 'A magical way to send gift cards to your friends.',
  previewImg: `${SITE_CANONICAL}/preview.png`,
  localeDefault: 'en',
  links: {
    twitter: 'https://twitter.com/mcoso_',
    github: 'https://github.com/mcoso',
  },
}
