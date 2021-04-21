import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import LottieView from 'lottie-react-native';

import styles from './styles';
import loadAnimation from '../../assets/load.json'

export default function load() {
    return (
        <View style={styles.container}>
            <LottieView 
            source={loadAnimation}
            autoPlay
            loop
            style={styles.animation}
            />
        </View>
    )
}