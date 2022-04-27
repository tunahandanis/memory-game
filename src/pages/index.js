import Head from "next/head";
import Link from "next/link";

import Anchor from "../components/Anchor";

import { usePointsContext } from "../context/context";

export default function Home() {
  const { points } = usePointsContext();

  return (
    <>
      <header>
        <h2 className="points">TILE Points: {points}</h2>
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
