import ImageColors from 'react-native-image-colors'

export const getColorFromImage = async (imageUri: string) => {
  const fallBackColor = 'grey';

  //* Permite obtener los colores de una imagen según la url
  const color = await ImageColors.getColors(imageUri, {
    fallback: fallBackColor,
  });

  //* Dependiendo de la plataforma, se obtiene el color de fondo de la imagen
  switch (color.platform) {
    case 'android':
      return color.dominant ?? fallBackColor;
    case 'ios':
      return color.background ?? fallBackColor;
    default:
      return fallBackColor;
  }
}
