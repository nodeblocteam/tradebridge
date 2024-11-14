import React from 'react';
import { useAccount } from 'wagmi';
import { Account } from './Account';
import { WalletOptions } from './WalletOptions';

const ConnectWallet = () => {
  const { isConnected } = useAccount();

  return isConnected ? <Account /> : <WalletOptions />;
};

export default ConnectWallet;
