import React, { useEffect, useState } from 'react';
import { 
  View,
  Image,
  Text,
  FlatList,
  Alert,
  Platform,
  ToastAndroid
  } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import styles from './styles'
import {
    Header, 
    PlantCardSecundary,
    Load
} from '../../components'
import waterdrop from '../../assets/waterdrop.png'
import { loadPlant, removePlant } from '../../libs/storage';

export default function MyPlants() {
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState();

  function handleRemove(plant) {
    Alert.alert('Remover', `Deseja remover á ${plant.name} ?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 🚰',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlants(oldData => (
              oldData.filter((item) => item.id != plant.id)
            ))
          } catch (error) {
            console.error(error)
              Alert.alert('Não foi possivel remover! 😔')
          }
        }
      }
    ])
  }
  useEffect(() => {
    async function loadStorageData() {
      try{
        const plantsStoraged = await loadPlant();
      
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateNotification).getTime(),
          new Date().getTime(),
          {
            locale: pt
          }
        )
  
        setNextWatered(`Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}`)
        setMyPlants(plantsStoraged);
        setLoading(false);
      } catch {
        return (
          Platform.OS = 'android '? 
          ToastAndroid.show(
          "Você precisa adicionar uma planta para vizualizar esta aba 😢", 
          ToastAndroid.LONG,
          ToastAndroid.CENTER) 
          :
          Alert.alert(`Você precisa adicionar uma planta para vizualizar esta aba  😢`) 
        )
    }
    }

    loadStorageData()
  }, [])

  if(loading) return <Load />
  
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecundary 
            data={item} 
            handleRemove={() => {handleRemove(item)}}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>

  );
}