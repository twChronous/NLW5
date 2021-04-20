import { StyleSheet, Dimensions } from 'react-native'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default StyleSheet.create({
    container: {
     flex: 1, 
    },
    wrapper: {
      justifyContent: 'space-around', 
      alignItems: 'center',
      paddingHorizontal: 20
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.heading,
      marginTop: 38,
      fontFamily: fonts.heading,
      lineHeight: 34,
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading,
      fontFamily: fonts.text,
    },
    image: {
      height: Dimensions.get('window').width * 0.7
    },
    button: {
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      marginTop: 18,
      height: 56,
      width: 56
    },
    buttonIcon: {
      fontSize: 32,
      color: colors.white
    }
  })
  