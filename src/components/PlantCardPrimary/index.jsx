import React from 'react';
import {
    Text,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg';


import styles from './styles';

export default function PlantCardPrimary({data}) {
    return (
        <RectButton
        style={styles.container}
        >
            <SvgFromUri 
            uri={data.photo}  
            width={70}
            height={70}
            />
            <Text style={styles.text}>
                {data.name}
                </Text>
        </RectButton>
    )}
  