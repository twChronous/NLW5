import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core'

import styles from './styles';
import { Button } from '../../components/'

const emojis = {
    hug: '🤗',
    smile: '😀'
}
export default function Confirmation() {
    const navigation = useNavigation();

    const routes = useRoute();

    const {
        title, 
        subtitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params
    
    function handleStart() {
        navigation.navigate(nextScreen)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button name={buttonTitle} onPress={handleStart} />
                </View>
            </View>
        </SafeAreaView>
    )
}
