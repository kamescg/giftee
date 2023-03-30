//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@delegatable/delegatable-sol/contracts/CaveatEnforcer.sol";
import { BytesLib } from "@delegatable/delegatable-sol/contracts/libraries/BytesLib.sol";

contract ERC20FromAllowanceEnforcer is CaveatEnforcer {
  mapping(address => mapping(bytes32 => uint256)) spentMap;

  /**
   * @notice Allows the delegator to specify a maximum sum of the contract token to transfer on their behalf.
   * @param terms - The numeric maximum allowance that the recipient may transfer on the signer's behalf.
   * @param transaction - The transaction the delegate might try to perform.
   * @param delegationHash - The hash of the delegation being operated on.
   */
  function enforceCaveat(
    bytes calldata terms,
    Transaction calldata transaction,
    bytes32 delegationHash
  ) public override returns (bool) {
    bytes4 targetSig = bytes4(transaction.data[0:4]); // grabs the method signature hex
    bytes4 allowedSig = bytes4(0x4733dc8f); // this is the hardcoded value of the delegatable transferProxy function
    require(targetSig == allowedSig, "ERC20FromAllowanceEnforcer:invalid-method");
    uint256 limit = BytesLib.toUint256(terms, 0);

    // we need to grab the amount of tokens being sent; this will be the 3rd parameter in the transferProxy function
    // the first 4 bytes are the method signature, the next 32 bytes are the address of the token, the next 32 bytes are the address of the recipient
    // therefore we need to start the splice at 68 bytes
    uint256 sending = BytesLib.toUint256(transaction.data, 68);

    spentMap[msg.sender][delegationHash] += sending;
    uint256 spent = spentMap[msg.sender][delegationHash];
    require(spent <= limit, "ERC20FromAllowanceEnforcer:allowance-exceeded");
    return true;
  }
}
