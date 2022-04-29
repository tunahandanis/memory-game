import Head from "next/head";
import Link from "next/link";

import Anchor from "../components/Anchor";

import { useEffect } from "react";

import { usePointsContext } from "../context/context";

import { contractAddress, contractABI } from "../abi/contract";

import { ethers } from "ethers";

import {
  useAccountContext,
  checkIfWalletIsConnected,
  connectWallet,
} from "../context/accountContext";

export default function Home() {
  const { points, updatePoints } = usePointsContext();

  const [accountState, accountDispatch] = useAccountContext();

  useEffect(() => {
    checkIfWalletIsConnected(accountDispatch);
  }, []);

  /*
  =========
  FUNCTIONS
  =========
  */

  // Button text
  let buttonText;

  if (accountState.metamaskNotFound) {
    buttonText = "Please install metamask";
  } else if (accountState.isAppDisabled) {
    buttonText = "Switch Network";
  } else {
    buttonText = "Connect Wallet";
  }

  const claimTile = async () => {
    try {
      const { ethereum } = window;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tokenToClaim = points / 10;

      let transaction = await connectedContract.claimTile(
        ethers.utils.parseUnits(tokenToClaim.toString(), "ether")
      );

      await transaction.wait();
      updatePoints(points - tokenToClaim * 10);

      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  ======
  RETURN
  ======
  */

  return (
    <>
      <Head>
        <title>Crypto Cards | TILE Games</title>
        <meta name="description" content="Crypto Cards game by TILE Games." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h2 className="points">TILE Points: {points}</h2>
        <div className="conversion">
          <div className="conversion__btn-container">
            <button
              className="conversion__wallet-btn"
              onClick={() => connectWallet(accountDispatch)}
            >
              {accountState.account
                ? `${formatAccount(accountState?.account.address)} | $ROSE : ${
                    accountState?.account.balance
                  }`
                : buttonText}
            </button>
            <button className="conversion__btn" onClick={claimTile}>
              Convert TILE <br /> Points
            </button>
          </div>
          <p className="conversion__exchange-info">
            10 TILE Points = 1 TILE Token
          </p>
          <p className="conversion__warning">Frequent conversion is advised</p>
        </div>
      </header>

      <h1 className="title">Crypto Cards</h1>

      <div className="btn-container">
        <Anchor
          destination={"/game-modes/easy-mode"}
          img={"/static/images/easy-splash.jpg"}
          level={"Easy"}
          pairNo={6}
          reward={20}
        />
        <Anchor
          destination={"/game-modes/medium-mode"}
          img={"/static/images/medium-splash.jpg"}
          level={"Medium"}
          pairNo={10}
          reward={40}
        />
        <Anchor
          destination={"/game-modes/hard-mode"}
          img={"/static/images/hard-splash.jpg"}
          level={"Hard"}
          pairNo={15}
          reward={80}
        />
      </div>
    </>
  );
}

export const formatAccount = (str) =>
  str && str.substr(0, 5) + "..." + str.substr(str.length - 5, str.length);
