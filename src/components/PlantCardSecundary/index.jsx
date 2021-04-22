import React from 'react';
import {
    Text,
    View
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg';


import styles from './styles';

export default function PlantCardSecundary({data, ...rest}) {
    return (
        <RectButton
        style={styles.container}
        {...rest}
        >
            <SvgFromUri 
            uri={data.photo}  
            width={50}
            height={50}
            />
            <Text style={styles.title}>
                {data.name}
                </Text>
            <View style={styles.details}>
            <Text style={styles.timeLabel}>
                Regar ás
                </Text>
            <Text style={styles.time}>
                {data.hour}
                </Text>
            </View>
        </RectButton>
    )}
  