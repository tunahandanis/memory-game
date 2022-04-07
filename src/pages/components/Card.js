const Card = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <article className="card">
      <div className={`${flipped && "flipped"}`}>
        <img src={card.src} className="card__front" alt="card front" />
        <div className="card__back" onClick={handleClick} />
      </div>
    </article>
  );
};

export default Card;
