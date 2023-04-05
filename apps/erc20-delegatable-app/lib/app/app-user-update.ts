import axios from 'axios'

export async function appCardUpdate(user: any): Promise<
  | {
      users?: Array<any>
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.post('/api/user/update', {
      ...user,
    })
    return data
  } catch (error: any) {
    throw error
  }
}
