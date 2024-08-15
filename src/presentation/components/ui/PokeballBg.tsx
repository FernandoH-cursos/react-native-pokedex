import {Image, ImageStyle, StyleProp, View} from 'react-native';

import {useThemeContext} from '../../hooks/shared/useThemeContext';

interface Props {
  style?: StyleProp<ImageStyle>;
}

export const PokeballBg = ({style}: Props) => {
  const {isDark} = useThemeContext();

  //* Imagen de la pokebola segun el tema, ya sea light o dark.
  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  return (
    <View>
      <Image
        source={pokeballImg}
        style={[{width: 300, height: 300, opacity: 0.3}, style]}
      />
    </View>
  );
};

