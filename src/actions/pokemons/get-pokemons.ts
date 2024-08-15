import { pokeApi } from '../../config/api/pokeApi';
import { Pokemon } from '../../domain/entities/pokemon';
import { PokeAPIPaginatedResponse, PokeApiPokemon } from '../../infrastructure/interfaces/poke-api.interface';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const getPokemons = async (page: number,limit: number = 20): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon';
    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url, {
      params: {
        limit,
        offset: page * 10,
      },
    });

    const pokemonPromises = data.results.map((info) => {
      return pokeApi.get<PokeApiPokemon>(info.url);
    });

    //* Permite que todas las promesas se resuelvan al mismo tiempo y no una por una.
    //* Devuelve un arreglo con todas las respuestas de las promesas de los endpoints solicitados.
    const pokeApiPokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokeApiPokemons.map(item => PokemonMapper.pokeApiPokemonToEntity(item.data));

    //* Se usa Promise.all para que todas las promesas se resuelvan al mismo tiempo y no una por una.
    return await Promise.all(pokemonsPromises);
  } catch (error) {
    console.log(error);
    throw new Error('Error getting pokemons');
  }
}
