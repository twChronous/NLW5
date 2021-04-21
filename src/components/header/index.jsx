import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import styles from './styles';
import Luvas from '../../assets/Luvas.png'

export default function Header() {
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.greeting}> Olá, </Text>
            <Text style={styles.userName} >AAA</Text>
            </View>
            <Image style={styles.image} source={Luvas} />
        </View>
)}