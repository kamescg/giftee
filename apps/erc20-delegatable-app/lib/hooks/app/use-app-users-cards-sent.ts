import { useQuery } from 'wagmi'

import { appUserCardSent } from '@/lib/app/app-user-cards-sent'

export const useAppUserCardsSent = (queryKey?: any) => {
  return useQuery(['appUsersDelegationGet', queryKey], () => appUserCardSent(), {
    cacheTime: 0,
  })
}
