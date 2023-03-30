import axios from 'axios'

export async function appUserCardSent(): Promise<
  | {
      content?: Array<any>
      object: 'Cards'
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.get('/api/sent')
    return data
  } catch (error: any) {
    throw error
  }
}
