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
            address: '0xD63adCa091f56694fC97e66d10085cc9192dE1Bc',
            abi: [],
          }
        case 'ERC20FromAllowanceEnforcer':
          return {
            address: '0xc8a31e53e62415aAB38B5B17aa0e6b04d33dB0F1',
            abi: [],
          }
        case 'TimestampBeforeEnforcer':
          return {
            address: '0x4510c9e7e1bcfb0c275E1AcE270E6010DB2EeD92',
            abi: [],
          }
        case 'TimestampAfterEnforcer':
          return {
            address: '0x000830BB68B17987824Cb1124334abE56cBE7E0C',
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
