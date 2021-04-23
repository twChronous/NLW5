import React from 'react';
import {
    Animated,
    Text,
    View
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons'

import styles from './styles';
import colors from '../../styles/colors';

export default function PlantCardSecundary({ data, handleRemove, ...rest }) {
    return (
        <Swipeable
        overshootRight={false}
        renderRightActions={() => (
            <Animated.View>
                <View>
                    <RectButton
                    style={styles.buttonRemove}
                    onPress={handleRemove}
                    >
                        <Feather name='trash' size={32} color={colors.white} />
                    </RectButton>
                </View>
            </Animated.View>
        )}
        >
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
        </Swipeable>
    )
}
