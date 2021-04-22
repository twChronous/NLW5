import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import styles from './styles'
import {
    Header, PlantCardSecundary
} from '../../components'
import waterdrop from '../../assets/waterdrop.png'
import { loadPlant, PlantProps } from '../../libs/storage';

export default function MyPlants() {
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState();

  useEffect(() => {
    async function loadStorageData() {
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
    }

    loadStorageData()
  }, [])

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
            <PlantCardSecundary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>

  );
}