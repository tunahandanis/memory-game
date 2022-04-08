import Head from "next/head";
import Link from "next/link";

import { usePointsContext } from "../context/context";

export default function Home() {
  const { points } = usePointsContext();

  return (
    <>
      <header>
        <h2 className="points">TILE Points: {points}</h2>
      </header>
      <div className="btn-container">
        <Link href="/game-modes/easy-mode">
          <a className="link-btn">Easy</a>
        </Link>
        <Link href="/game-modes/medium-mode">
          <a className="link-btn">Medium</a>
        </Link>
        <Link href="/game-modes/hard-mode">
          <a className="link-btn">Hard</a>
        </Link>
      </div>

      <div className="guide">
        <h2 className="guide__title">How to Play</h2>
        <p className="guide__para">
          Try to match all cards before the time is up.
        </p>
        <p className="guide__para">
          Easy mode gives 20 TILE Points, medium gives 40, and hard gives 80.
        </p>
      </div>
    </>
  );
}
