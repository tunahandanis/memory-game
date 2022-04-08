import Link from "next/link";

const FinishModal = ({ gameFailed }) => {
  return (
    <div className="modal-overlay">
      <div className="finish-modal">
        {gameFailed ? <h1>You lost the game.</h1> : <h1>You won the game!</h1>}
        {!gameFailed && <h1>You have earned 20 TILE Points!</h1>}
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    </div>
  );
};

export default FinishModal;
