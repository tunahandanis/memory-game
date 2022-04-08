import Head from "next/head";
import Link from "next/link";

import { usePointsContext } from "../context/context";

export default function Home() {
  const { points } = usePointsContext();

  return (
    <>
      <header>
        <h2 className="points-text">TILE Points: {points}</h2>
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
    </>
  );
}
