import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import styles from './styles';
import { Button } from '../../components/'

export default function Confirmation() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😀
                </Text>
                <Text style={styles.title}>
                    Prontinho
                </Text>
                <Text style={styles.subtitle}>
                    Agora vamos começar a cuidar das suas
                    plantinhas com muito cuidado
                </Text>
                <View style={styles.footer}>
                    <Button name='Começar' place='PlantSelect' />
                </View>
            </View>
        </SafeAreaView>
    )
}
