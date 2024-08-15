import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';

import {getPokemons} from '../../actions/pokemons';

export const usePokemonsInfinite = () => {
  const queryClient = useQueryClient();

  const queryPokemons = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    //* Ejecuta el siguiente endpoint al llegar al final de la lista
    queryFn: async params => {
      //* 'params.pageParam' es el nro de la página que se está cargando
      const pokemons = await getPokemons(params.pageParam);

      pokemons.forEach(pokemon => {
        //* Guarda en cache cada pokemon que se obtiene para así no realizar la petición nuevamente por pokemon
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  return {
    queryPokemons,
    pokemons: queryPokemons.data?.pages.flat() ?? [],
  };
};
