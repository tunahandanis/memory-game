import Link from "next/link";

const FinishModal = ({ gameFailed, pointGain }) => {
  return (
    <div className="modal-overlay">
      <div className="finish-modal">
        {gameFailed ? <h1>You lost the game.</h1> : <h1>You won the game!</h1>}
        {!gameFailed && (
          <h1>
            You have earned <span>{pointGain}</span> TILE Points!
          </h1>
        )}
        <Link href="/">
          <a>Back to menu</a>
        </Link>
      </div>
    </div>
  );
};

export default FinishModal;
