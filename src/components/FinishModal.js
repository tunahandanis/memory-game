import Link from "next/link";

const FinishModal = ({ gameFailed, pointGain }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        {gameFailed ? (
          <p className="modal__result">You lost the game</p>
        ) : (
          <>
            <p className="modal__result">You won!</p>
            <p className="modal__reward">
              You have earned <span>{pointGain}</span> TILE Points!
            </p>
            <p className="modal__warning">
              Please make sure to convert your <br /> TILE Points in the main
              menu as they will be lost <br /> if you refresh the page or close
              the browser.
            </p>
          </>
        )}

        <Link href="/">
          <a className="modal__link">Back to menu</a>
        </Link>
      </div>
    </div>
  );
};

export default FinishModal;
