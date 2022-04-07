import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <h2 className="points-text">TILE Points: </h2>
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
