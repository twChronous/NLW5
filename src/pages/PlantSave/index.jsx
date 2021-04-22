import React, { useState } from 'react';
import {
    Image,
    Platform,
    ToastAndroid,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { SvgFromUri } from 'react-native-svg'
import { useRoute, useNavigation } from '@react-navigation/core'
import DateTimePicker from '@react-native-community/datetimepicker'
import { isBefore, format } from 'date-fns'

import styles from './styles';
import { Button } from '../../components/'
import waterdrop from '../../assets/waterdrop.png'
import { savePlant } from '../../libs/storage'

export default function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const navigation = useNavigation();
    const route = useRoute();
    const { plant } = route.params

    const confirmationProps = {
        title: 'Tudo certo ',
        subtitle: 'Fique tranquilo que sempre vamos lembrar vocẽ de cuidar da sua plantinha com muito cuidado',
        buttonTitle: 'Muito Obrigado',
        icon: 'hug',
        nextScreen: 'MyPlants'
    }

    function handleChangeTime(event, dateTime) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState)
        }
        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return (
                Platform.OS = 'android ' ?
                    ToastAndroid.show(
                        "Escolha uma data futura! 🕰️",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER)
                    :
                    Alert.alert(`Escolha uma data futura! 🕰️`)
            )
        }
        if (dateTime) setSelectedDateTime(dateTime)
    }
    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    }
    async function handleSave() {
        try{
            await savePlant({
                ...plant,
                dateNotification: selectedDateTime
            });

        navigation.navigate('Confirmation', confirmationProps);
        } catch(e) {
            console.log(e)
            Platform.OS = 'android ' ?
            ToastAndroid.show(
                "Não foi possivel salvar 😦",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER)
            :
            Alert.alert(`Não foi possivel salvar 😦`)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />
                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horario para ser lembrado:
                </Text>
                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                        onPress={ () => handleOpenDateTimePickerForAndroid()}
                        style={styles.dateTimePickerButton}
                        >
                            <Text style={styles.dateTimePickerText}>
                               {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )
                }
                {
                    showDatePicker &&
                    <DateTimePicker
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                    />
                }
                <Button
                    name='Cadastrar planta'
                    onPress={handleSave}
                />

            </View>
        </View>
    )
}
