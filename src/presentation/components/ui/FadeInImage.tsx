import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  View,
} from 'react-native';
import {useAnimation} from '../../hooks/shared/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style}: Props) => {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const isDisposed = useRef(false);

  //* Limpiar el useEffect cuando el componente se desmonte
  useEffect(() => {
    return () => {
      isDisposed.current = true;
    };
  }, []);

  //* Este método se ejecuta cuando la imagen ya se cargó
  const onLoadEnd = () => {
    //* Si el componente ya se desmontó, no se ejecuta el fadeIn
    if (isDisposed.current) return;
    //* El fadeIn se ejecuta cuando la imagen ya se cargó y permite agregar un efecto de transición
    fadeIn({});
    //* Cambia el estado de isLoading a false
    setIsLoading(false);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        onLoadEnd={onLoadEnd}
        //* 'resizeMode' permite ajustar la imagen al tamaño del contenedor
        style={[style, {opacity: animatedOpacity,resizeMode: 'contain'}]}
      />
    </View>
  );
};
