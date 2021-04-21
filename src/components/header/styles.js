import { StyleSheet } from 'react-native'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import  { getStatusBarHeight } from 'react-native-iphone-x-helper'

export default StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 28,
        marginTop: getStatusBarHeight(),
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        lineHeight: 40
    }
})
 