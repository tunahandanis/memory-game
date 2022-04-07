import { useState, useEffect } from "react";

import Card from "../components/Card";

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

  /*
  ============
  EFFECT HOOKS
  ============
  */

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
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
  };

  return (
    <>
      <header>
        <h2>TILE Points: </h2>
      </header>
      {cards && (
        <section className="card-grid--easy">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default EasyMode;
