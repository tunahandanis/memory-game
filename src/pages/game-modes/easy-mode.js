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
  return (
    <div>
      <header>
        <h2>TILE Points: </h2>
      </header>

      <div>
        {cardImages.map((card) => (
          <Card card={card} />
        ))}
      </div>
    </div>
  );
};

export default EasyMode;
