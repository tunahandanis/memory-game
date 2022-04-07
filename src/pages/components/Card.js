const Card = ({ card }) => {
  return (
    <article>
      <img src={card.src} alt="card front" />
      <div></div>
    </article>
  );
};

export default Card;
