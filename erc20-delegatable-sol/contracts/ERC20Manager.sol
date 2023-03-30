//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Delegatable } from "@delegatable/delegatable-sol/contracts/Delegatable.sol";
import { DelegatableCore } from "@delegatable/delegatable-sol/contracts/DelegatableCore.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ERC20Manager
 * @author McOso
 * @notice Manages the erc20 delegation
 */
contract ERC20Manager is Delegatable, Ownable {
  /* ===================================================================================== */
  /* Constructor & Modifiers                                                               */
  /* ===================================================================================== */

  constructor() Delegatable("ERC20Manager", "1") {}

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  // ========================
  // READS
  // ========================

  // ========================
  // WRITES
  // ========================
  function approveTransferProxy(
    address _token,
    address _from,
    uint256 _amount,
    uint256 _deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external {
    require(msg.sender == address(this), "ERC20Manager:invalid-sender");
    IERC20Permit(_token).permit(_from, address(this), _amount, _deadline, v, r, s);
  }

  function transferProxy(
    address _token,
    address _to,
    uint256 _amount
  ) external returns (bool) {
    require(msg.sender == address(this), "ERC20Manager:transferProxy-not-authorized");
    return IERC20(_token).transferFrom(_msgSender(), _to, _amount);
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */
  function _msgSender()
    internal
    view
    virtual
    override(DelegatableCore, Context)
    returns (address sender)
  {
    if (msg.sender == address(this)) {
      bytes memory array = msg.data;
      uint256 index = msg.data.length;
      assembly {
        sender := and(mload(add(array, index)), 0xffffffffffffffffffffffffffffffffffffffff)
      }
    } else {
      sender = msg.sender;
    }
    return sender;
  }
}
