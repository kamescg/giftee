import { useNetwork } from 'wagmi'

export function useContractAutoLoad(contract: string, chainId?: number): any {
  const { chain } = useNetwork()
  switch (chainId || chain?.id) {
    case 1:
      switch (contract) {
        case 'Contract':
          return {
            address: '',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    case 84531:
      switch (contract) {
        case 'ERC20Manager':
          return {
            address: '0x7efD07Ab7500A3EdB5f56065B41d651D95AcB915',
            abi: [],
          }
        case 'ERC20FromAllowanceEnforcer':
          return {
            address: '0xf12bc25abF8E5aB37a1e322EAfd6997968Eb46C8',
            abi: [],
          }
        case 'TimestampBeforeEnforcer':
          return {
            address: '0x7Dc9BCeB4dAc74db1Cf771c0C774dCb862871991',
            abi: [],
          }
        case 'TimestampAfterEnforcer':
          return {
            address: '0xfc4BE5FB7950522D54B9EcD9F1Ed836A6726F243',
            abi: [],
          }
        default:
          throw new Error(`Unknown contract ${contract}`)
      }
    default:
      throw new Error(`Unknown network ${chain?.id}`)
  }
}
