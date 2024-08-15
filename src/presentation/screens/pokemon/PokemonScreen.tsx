import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import { Chip, Text } from 'react-native-paper';

import {usePokemon} from '../../hooks/usePokemon';

import { FadeInImage } from '../../components/ui/FadeInImage';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStackParams} from '../../navigator/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import { Formatter } from '../../../config/helpers/formatter';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useThemeContext } from '../../hooks/shared/useThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route}: Props) => {
  const {pokemonId} = route.params;

  const { top } = useSafeAreaInsets();
  const { isDark } = useThemeContext();

  const { queryPokemon } = usePokemon(pokemonId);

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  if (queryPokemon.isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: queryPokemon.data?.color}}
      //* Desactiva el efecto de rebote al llegar al final de la pantalla
      bounces={false}
      //* Desactiva la barra de scroll vertical
      showsVerticalScrollIndicator={false}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(queryPokemon.data?.name!) + '\n'}#
          {queryPokemon.data?.id}
        </Text>

        {/* Pokeball */}
        <Image source={pokeballImg} style={styles.pokeball} />

        <FadeInImage
          uri={queryPokemon.data?.avatar!}
          style={styles.pokemonImage}
        />
      </View>

      {/* Types */}
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {queryPokemon.data?.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>

      {/* Sprites */}
      <FlatList
        data={queryPokemon.data?.sprites}
        //* Permite mostrar la lista de sprites de forma horizontal
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        //* Centra los elementos de la lista horizontalmente
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({item}) => (
          <FadeInImage
            uri={item}
            style={{width: 100, height: 100, marginHorizontal: 5}}
          />
        )}
      />

      {/* abilities */}
      <Text style={styles.subTitle}>Abilities</Text>
      <FlatList
        data={queryPokemon.data?.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={styles.subTitle}>Stats</Text>

      <FlatList
        data={queryPokemon.data?.stats}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>{item.value}</Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={styles.subTitle}>Moves</Text>
      <FlatList
        data={queryPokemon.data?.moves}
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <View style={styles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={styles.subTitle}>Games</Text>
      <FlatList
        data={queryPokemon.data?.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      <View style={{height: 100}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
});
