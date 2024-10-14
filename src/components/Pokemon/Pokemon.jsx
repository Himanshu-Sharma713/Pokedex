import "./Pokemon.css";

function Pokemon({ name, image }) {
  return (
    <div className="pokemon">
      <div className="pokemon-name">{name}</div>
      <div>
        <img className="pokemonImg" src={image} alt="err" />
      </div>
    </div>
  );
}

export default Pokemon;
