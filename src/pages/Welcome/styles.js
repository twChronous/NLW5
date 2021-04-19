import { StyleSheet } from 'react-native'
import colors from '../../styles/colors';

export default StyleSheet.create({
    container: {
     flex: 1, 
     justifyContent: 'space-between', 
     alignItems: 'center' 
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.heading,
      marginTop: 38
    },
    subtitle: {
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 20,
      color: colors.heading
    },
    button: {
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      margin: 18,
      height: 56,
      width: 56
    },
    image: {
     width: 292,
     height: 294 
    },
    buttonText: {
      color: colors.white,
      fontSize: 24
    }
  })
  