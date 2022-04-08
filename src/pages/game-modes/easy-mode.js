import { useState, useEffect, useRef } from "react";

import Card from "../../components/Card";
import FinishModal from "../../components/FinishModal";

import { usePointsContext } from "../../context/context";

const cardImages = [
  { src: "/static/icons/bitcoin.png", matched: false },
  { src: "/static/icons/ethereum.png", matched: false },
  { src: "/static/icons/cardano.png", matched: false },
  { src: "/static/icons/rose.png", matched: false },
  { src: "/static/icons/xrp.png", matched: false },
  { src: "/static/icons/bnb.png", matched: false },
];

const EasyMode = () => {
  /*
  ===========
  STATE HOOKS
  ===========
  */

  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [isCountdownOn, setIsCountdownOn] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [cardLeft, setCardLeft] = useState(true);

  /*
  =========
  REF HOOKS
  =========
  */

  // Will be used to keep state values inside interval functions up to date
  const countdownRef = useRef();
  const countdownTimerRef = useRef();
  const cardsRef = useRef();

  /*
  ============
  EFFECT HOOKS
  ============
  */

  useEffect(() => {
    shuffleCards();
    setIsCountdownOn(true);
  }, []);

  useEffect(() => {
    // Check if choices match
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    // Set up countdown
    if (isCountdownOn) {
      countdownTimerRef.current = setInterval(checkCountdown, 1000);
    }

    return () => clearInterval(countdownTimerRef.current);
  }, [isCountdownOn]);

  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  useEffect(() => {
    cardsRef.current = cards;

    // At every move, check if the game is successfully completed
    const checkCardLeft = cards.map((card) => card.matched).includes(false);

    if (!checkCardLeft && cards.length !== 0) {
      updatePoints((prev) => prev + 20);
      finishGame();
    }
  }, [cards]);

  /*
  =======
  CONTEXT
  =======
  */

  const { points, updatePoints } = usePointsContext();

  /*
  =========
  FUNCTIONS
  =========
  */

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const checkCountdown = () => {
    if (countdownRef.current > 0) {
      setCountdown((prev) => prev - 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsCountdownOn(false);
    setIsGameFinished(true);

    const checkCardLeft = cardsRef.current
      .map((card) => card.matched)
      .includes(false);

    // Check if all cards are matched
    if (!checkCardLeft) {
      setCardLeft(false);
    }
  };

  /*
  ======
  RETURN
  ======
  */

  return (
    <>
      <header>
        <h2>TILE Points: {points}</h2>
        <h3>{countdown} seconds</h3>
      </header>
      {cards && (
        <section className="card-grid--easy">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </section>
      )}
      {isGameFinished && <FinishModal gameFailed={cardLeft} pointGain={20} />}
    </>
  );
};

export default EasyMode;
