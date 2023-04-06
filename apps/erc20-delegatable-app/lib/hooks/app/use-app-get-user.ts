import { useQuery } from 'wagmi'

import { appGetUser } from '@/lib/app/app-get-user'

export const useAppGetUser = (issuerAddress: string, queryKey?: any) => {
  return useQuery(['appGetUser', queryKey], () => appGetUser(issuerAddress), {
    cacheTime: 0,
  })
}
