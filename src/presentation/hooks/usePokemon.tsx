import { useQuery } from '@tanstack/react-query'
import { getPokemonById } from '../../actions/pokemons';

export const usePokemon = (pokemonId: number) => {
  const queryPokemon = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60,
  });

  return {
    queryPokemon,
  };
}
