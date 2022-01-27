import React, { useState, useEffect } from 'react';

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

// import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, clusterApiUrl, Connection } from '@solana/web3.js';

import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');
const WalletTest = () => {
  const { wallet, publicKey } = useWallet();

  const [walletInfo, setWalletInfo] = useState([]);
  useEffect(() => {
    (async () => {
      if (wallet && publicKey) {
        await getTokens(publicKey.toString());
      }
    })();
  }, [publicKey]);
  const getTokens = async (publicKey: any) => {
    const connection = new Connection(clusterApiUrl('devnet'));
    // console.log(publicKey);

    let walletList: any = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(publicKey),
      {
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
      },
    );
    let newWalletInfo: any = walletInfo;
    for (let info of walletList.value) {
      console.log();
      let mint = new PublicKey(info.account.data.parsed.info.mint);

      let pda: any = await Metadata.getPDA(mint);
      let metadata = await Metadata.load(connection, pda);

      //   let dataUri = metadata.data.data.uri;
      //   console.log(dataUri);

      if (info.account.data.parsed.info.tokenAmount.uiAmount >= 1) {
        console.log('METADATA >>>>>>>>>');
        newWalletInfo.push(metadata.data.data);
        setWalletInfo(newWalletInfo);
        console.log(metadata.data.data);
        console.log(info.account.data.parsed.info.mint);
      }
    }
  };
  return (
    <div>
      {!wallet && <WalletMultiButton />}
      {wallet && <WalletDisconnectButton />}
      <div>{JSON.stringify(walletInfo)}</div>
    </div>
  );
};
export default WalletTest;
