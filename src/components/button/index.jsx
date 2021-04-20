import React from 'react';
import { 
    TouchableOpacity, 
    Text 
} from 'react-native';
import { useNavigation } from '@react-navigation/core'

import styles from './styles';

export default function button({name, place}) {

  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate(place)
  }

    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={handleStart}
        activeOpacity={0.7}
        >
            <Text style={styles.text}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}