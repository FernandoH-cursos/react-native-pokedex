import { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';

import { getPokemonByIds, getPokemonNamesWithId } from '../../../actions/pokemons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { globalTheme } from '../../../config/theme/global-theme';
import { useDebouncedValue } from '../../hooks/shared/useDebouncedValue';

export const SearchScreen = () => {
  const [term, setTerm] = useState('');

  const debouncedValue = useDebouncedValue(term);

  const { top } = useSafeAreaInsets();

  //* Obtiene la lista de id y nombres de los 1000 pokemones para filtrar en el input de búsqueda
  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  // TODO: Aplicar debouncing para no hacer tantas peticiones al servidor
  const pokemonNameIdList = useMemo(() => {
    //* Si el término de búsqueda es un número, no se filtra la lista
    if (!isNaN(Number(debouncedValue))) {
      const pokemon = pokemonNameList.find(({id}) => id === Number(debouncedValue));

      return pokemon ? [pokemon] : [];
    }
    //* Si el término de búsqueda está vacío o si es menor a 3 letras, no se filtra la lista
    if (debouncedValue.length === 0 || debouncedValue.length < 3) return [];

    return pokemonNameList.filter(pokemon => pokemon.name.includes(debouncedValue.toLocaleLowerCase()));
  }, [debouncedValue, pokemonNameList]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      {/*
        Componente de react paper para un input de texto:
        - placeholder: Texto que aparece en el input
        - mode: Tipo de input, 'flat' es un input sin bordes
        - autoFocus: Activa el input automáticamente
        - autoCorrect: Activa la corrección automática del input
        - onChangeText: Función que se ejecuta al cambiar el texto del input
        - value: Valor del input
      */}
      <TextInput
        placeholder="Buscar pokémon"
        mode="flat"
        autoFocus
        autoCorrect
        onChangeText={setTerm}
        value={term}
      />

      {/* Loader */}
      {isLoadingPokemons && <ActivityIndicator style={{ paddingTop: 20 }} />}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: top + 20 }}
        //* Agrega un espacio al final de la lista para que el último elemento no quede oculto por el teclado
        ListFooterComponent={<View style={{height: 150}} />}
      />
    </View>
  );
};
