import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications'


export async function savePlant(plant) {
  try {
    const nextTime = new Date(plant.dateNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency
    if(repeat_every === 'week') {
      const interval = Math.trunc(7/ times)
      nextTime.setDate(now.getDate() + interval)
    } else 
    nextTime.setDate(nextTime.getDate() + 1)

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime()) / 1000
    );
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heey, 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true
      }
    })

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data)) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
      }
    }

    await AsyncStorage.setItem('@plantmanager:plants', 
      JSON.stringify({
        ...newPlant,
        ...oldPlants
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlant() {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data)) : {};

    
    const plantsSorted = Object.keys(plants).map((plant) => {
      return {
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateNotification), 'HH:mm'),
      }
    })
     .sort((a, b) => 
      Math.floor(
       new Date(a.dateNotification).getTime() / 1000 -
        Math.floor(new Date(b.dateNotification).getTime() / 1000)
      ) 
    );

    return plantsSorted;
  } catch (error) {
   throw new Error(error);
 }
}

export async function removePlant(id) {
  const data = await AsyncStorage.getItem('@plantmanager:plants')
  const plants = data ? (JSON.parse(data)) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
  
  delete plants[id]

  await AsyncStorage.setItem(
    '@plantmanager:plants',
    (JSON.stringify(plants))
  )
}