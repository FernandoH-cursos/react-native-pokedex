import {FlatList, StyleSheet, View} from 'react-native';
import { Text } from 'react-native-paper';

import { usePokemonsInfinite } from '../../hooks/usePokemonsInfinite';

import { PokeballBg } from '../../components/ui/PokeballBg';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

import { globalTheme } from '../../../config/theme/global-theme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const HomeScreen = () => {
  //* Para moviles con notch (pantalla con muesca o agujero en el top)
  const {top } = useSafeAreaInsets();

  const { queryPokemons,pokemons} = usePokemonsInfinite();

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />

      <FlatList
        data={pokemons}
        //* key de cada item de la lista
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        //* 2 columnas tendrá el diseño
        numColumns={2}
        //* Muestra un header antes de la lista de pokemones
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        //* Este Threshold indica que cuando se llegue al 60% del final de la lista, se carguen más pokemones
        onEndReachedThreshold={0.6}
        //* Permite cargar más pokemones cuando se llega al final de la lista
        onEndReached={() => queryPokemons.fetchNextPage()}
        //* Quita el scroll vertical del FlatList
        showsVerticalScrollIndicator={false}
        style={{paddingTop: top + 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
