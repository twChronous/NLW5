import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import styles from './styles';

import { Button } from '../../components/'
import colors from '../../styles/colors';

export default function UserIdentification() {
    const [isFocused, setFocus] = useState(false);
    const [isFilled, setFilled] = useState(true);
    const [name, setName] = useState();

    function handleInputFocus() {
        setFocus(true)
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
                                onChange={handleInputChange}
                            />

                            <View style={styles.footer}>
                                <Button name='Continuar' place='Confirmation' />
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}