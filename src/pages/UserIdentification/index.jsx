import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ToastAndroid,
    Platform
} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/core'
import { Button } from '../../components/'
import colors from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UserIdentification() {
    const [isFocused, setFocus] = useState(false);
    const [isFilled, setFilled] = useState(true);
    const [name, setName] = useState();

    const navigation = useNavigation();

    const confirmationProps = {
            title: 'prontinho',
            subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
            buttonTitle: 'Começar',
            icon: 'smile',
            nextScreen: 'PlantSelect'
        }
    
    function handleInputFocus() {
        setFocus(true)
    };

    async function handleStart() {
        if(!name)
        return (
            Platform.OS = 'android '? 
            ToastAndroid.show(
            "Me diga como chamar você 😢", 
            ToastAndroid.SHORT,
            ToastAndroid.CENTER) 
            :
            Alert.alert(`Me diga como chamar você 😢`) 
        )

        try{

            await AsyncStorage.setItem('@plantmanager:user', name);

            navigation.navigate('Confirmation', confirmationProps);
        } catch{
            Platform.OS = 'android '? 
            ToastAndroid.show(
            "Não foi possivel salvar seu nome", 
            ToastAndroid.SHORT,
            ToastAndroid.CENTER) 
            :
            Alert.alert("Não foi possivel salvar seu nome") 
        }
    }

    function handleInputBlur() {
        setFocus(false)
        setFilled(name ? false : true)
    }
    function handleInputChange(value) {
        isFilled ? setName(value) : setName(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😀' : '😆'}
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                            chamar você?
                        </Text>
                            </View>

                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || !isFilled)
                                    && { borderColor: colors.green }
                                ]}
                                placeholder='Digite o seu nome'
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footer}>
                                <Button
                                    name='Continuar'
                                    onPress={handleStart} />
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}