import React from 'react';
import { 
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity
 } from 'react-native'
import wateringImg from '../../assets/watering.png'
import styles from './styles'

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> 
      Gerencie {'\n'}
      suas plantas {'\n'}
      de forma fácil </Text>

      <Image 
      source={wateringImg} 
      style={styles.image}
      resizeMode='contain' 
      />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas.
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          >
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
