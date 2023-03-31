import { BigNumber, ethers } from "ethers";

export async function getPermitSignature(
  signer: any,
  token: any,
  spender: any,
  value: any,
  deadline: any,
  name: any,
) {
  // const [nonce, name, version, chainId] = await Promise.all([
  //   token.nonces(signer.address),
  //   token.name(),
  //   '1',
  //   signer.getChainId(),
  // ]);
  const version = '1';
  const nonce = BigNumber.from(0);
  const chainId = await signer.getChainId();


  return ethers.utils.splitSignature(
    await signer._signTypedData(
      {
        name,
        version,
        chainId,
        verifyingContract: token.address,
      },
      {
        Permit: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'deadline',
            type: 'uint256',
          },
        ],
      },
      {
        owner: await signer.getAddress(),
        spender,
        value,
        nonce,
        deadline,
      },
    ),
  );
}