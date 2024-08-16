import {FlatList, StyleSheet, View} from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';

import { usePokemonsInfinite } from '../../hooks/usePokemonsInfinite';

import { PokeballBg } from '../../components/ui/PokeballBg';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

import { globalTheme } from '../../../config/theme/global-theme';

import { RootStackParams } from '../../navigator/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParams,'HomeScreen'>{}

export const HomeScreen = ({navigation}: Props) => {
  //* Para moviles con notch (pantalla con muesca o agujero en el top)
  const {top} = useSafeAreaInsets();
  const theme = useTheme();

  const {queryPokemons, pokemons} = usePokemonsInfinite();

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

      {/*
        Botón flotante de react paper:
        - label: Texto que aparece en el botón
        - style: Estilo del botón
        - mode: Tipo de botón, 'elevated' es un botón con sombra
        - color: Color del texto del botón
        - onPress: Función que se ejecuta al presionar el botón
      */}
      <FAB
        label="Buscar"
        style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
        mode="elevated"
        color={theme.dark ? 'black' : 'white'}
        //* Redirige a la pantalla de búsqueda de pokemones
        onPress={() => navigation.push('SearchScreen')}
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
