import React, { useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


import styles from './styles';
import Luvas from '../../assets/Luvas.png'

export default function Header() {
    const [userName, setUserName] = useState()

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user')

            setUserName(user)
        }
        loadStorageUserName()
    }, [])

    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.greeting}> Olá, </Text>
            <Text style={styles.userName} >{userName}</Text>
            </View>
            <Image style={styles.image} source={Luvas} />
        </View>
)}