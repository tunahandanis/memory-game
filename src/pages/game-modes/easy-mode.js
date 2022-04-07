import { useState, useEffect } from "react";

import Card from "../components/Card";

const cardImages = [
  { src: "/static/icons/bitcoin.png" },
  { src: "/static/icons/ethereum.png" },
  { src: "/static/icons/cardano.png" },
  { src: "/static/icons/rose.png" },
  { src: "/static/icons/xrp.png" },
  { src: "/static/icons/bnb.png" },
];

const EasyMode = () => {
  /*
  ===========
  STATE HOOKS
  ===========
  */

  const [cards, setCards] = useState(null);

  /*
  ============
  EFFECT HOOKS
  ============
  */

  useEffect(() => {
    shuffleCards();
  }, []);

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

  return (
    <>
      <header>
        <h2>TILE Points: </h2>
      </header>
      {cards && (
        <section className="card-grid--easy">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </section>
      )}
    </>
  );
};

export default EasyMode;
