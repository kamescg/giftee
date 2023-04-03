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
        // throw new Error(`Unknown contract ${contract}`)
      }
    case 10:
      switch (contract) {
        case 'ERC20Manager':
          return {
            address: '0x2BF98a2E536903d620f71849739c6bFBa36dD929',
            abi: [],
          }
        case 'ERC20FromAllowanceEnforcer':
          return {
            address: '0xB631Ad3c161F4714EAc4964ffb054f439a51bC53',
            abi: [],
          }
        case 'TimestampBeforeEnforcer':
          return {
            address: '0x0e86D6bf3c7eBAa1f89c851f914be32617530579',
            abi: [],
          }
        case 'TimestampAfterEnforcer':
          return {
            address: '0x752b85304642cf9e8e307e768b486e33f938df9A',
            abi: [],
          }
        case 'USDC':
          return {
            address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
            abi: [],
          }
        default:
        // throw new Error(`Unknown contract ${contract}`)
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
        case 'USDC':
          return {
            address: '0x0000000000000000000000000000000000000000',
            abi: [],
          }
        default:
        // throw new Error(`Unknown contract ${contract}`)
      }
    default:
    // throw new Error(`Unknown network ${chain?.id}`)
  }
}
