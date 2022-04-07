import { useState, useEffect, useRef } from "react";

import Card from "../components/Card";

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
  const [countdown, setCountdown] = useState(30);
  const [isCountdownOn, setIsCountdownOn] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  /*
  =========
  REF HOOKS
  =========
  */

  const countdownRef = useRef();
  const countdownTimerRef = useRef();

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
    if (isCountdownOn) {
      countdownTimerRef.current = setInterval(checkCountdown, 1000);
    }

    return () => clearInterval(countdownTimerRef.current);
  }, [isCountdownOn]);

  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

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
    </>
  );
};

export default EasyMode;
