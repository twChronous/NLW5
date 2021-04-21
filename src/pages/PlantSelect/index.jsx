import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';
import styles from './styles';

import { 
    Header,
    EnvoirmentButton,
    PlantCardPrimary,
    Load
 } from '../../components'
import api from '../../services/api'
import colors from '../../styles/colors';

export default function PlantSelect() {
    const [enviroments, setEnviroments] = useState();
    const [plants, setPLants] = useState();
    const [filteredPlants, setFilteredPlants] = useState();
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    async function fetchPlants() {
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if(!data) return setLoading(true)

        if(page > 1 ) {
            setPLants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
        setPLants(data);
        setFilteredPlants(data)
        }
        setLoading(false)
        setLoadingMore(false)
    }

    function handleEnvironmentSelected(environment) {
        setEnviromentSelected(environment);
    
        if (environment === 'all')
          return setFilteredPlants(plants);
    
        const filtered = plants.filter(plant => 
          plant.environments.includes(environment)
        )
    
        setFilteredPlants(filtered);
      }

      function handleFetchMore(distance) {
          if(distance < 1) return;
          setLoadingMore(true)
          setPage(oldValue => oldValue + 1)
          fetchPlants();
      }
    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api
            .get('plants_environments?_sort=title&_order=asc')
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }
        fetchEnviroment();
    }, [])

    useEffect(() => {
        fetchPlants();
    }, [])

    if(loading) {
       return <Load />
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Header />
                    <Text style={styles.title}>
                        Em qual ambiente
                </Text>
                    <Text style={styles.subTitle}>
                        Você quer por sua planta
                </Text>
            </View>
            <View>
                <FlatList 
                data={enviroments}
                renderItem={({ item }) => (
                    <EnvoirmentButton 
                    title={item.title} 
                    active={item.key === enviromentSelected}
                    onPress={() => handleEnvironmentSelected(item.key)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
            <FlatList 
                data={filteredPlants}
                renderItem={({ item }) => (
                    <PlantCardPrimary data={item}
                    />
                )}
                showsVericalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}
                onEndReached={({ distanceFromEnd }) => 
                handleFetchMore(distanceFromEnd)
            }
            ListFooterComponent={
                loadingMore ?
                <ActivityIndicator color={colors.green} />
                : null
            }
                />
            </View>
        </View>
    )
}