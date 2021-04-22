import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export async function savePlant(plant) {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data)) : {};

    const newPlant = {
      [plant.id]: {
        data: plant
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