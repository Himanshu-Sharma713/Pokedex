import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonlist, setPokemonlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [Pokedex_url, setPokedex_url] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextUrl, setNextUrl] = useState("");
  const [pervUrl, setPrevUrl] = useState("");

  async function downloadPokemon() {
    setIsLoading(true);

    const response = await axios.get(Pokedex_url);
    const pokemonResult = response.data.results;
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
    const pokemonResultPromise = pokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(res);

    setPokemonlist(res);

    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemon();
  }, [Pokedex_url]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : pokemonlist.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pervUrl == null}
          onClick={() => setPokedex_url(pervUrl)}
        >
          prev
        </button>
        <button
          disabled={nextUrl == null}
          onClick={() => setPokedex_url(nextUrl)}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
