import { useQuery } from 'wagmi'

import { appUserCardsReceived } from '@/lib/app/app-user-cards-received'

export const useAppUserCardsReceived = (queryKey?: any) => {
  return useQuery(['appUsersDelegationGet', queryKey], () => appUserCardsReceived(), {
    cacheTime: 0,
  })
}
