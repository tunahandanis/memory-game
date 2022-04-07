const Card = ({ card }) => {
  return (
    <article className="card">
      <div>
        <img src={card.src} className="card__front" alt="card front" />
        <div className="card__back"></div>
      </div>
    </article>
  );
};

export default Card;
