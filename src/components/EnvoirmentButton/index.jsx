import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles';

export default function EnvoirmentButton({ title, active = false, ...rest }) {
    return (
        <RectButton 
            style={[
                styles.container,
                active && styles.containerActive
            ]}
            {...rest}
            >

            <Text 
            style={[
                styles.text,
                active && styles.textActive
            ]} >{title}
            </Text>
        </RectButton>
    )
}