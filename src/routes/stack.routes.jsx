import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';

import AuthRoutes from './tab.routes';

import { Welcome, UserIdentification, Confirmation, PlantSave} from '../pages'

const StackRoutes = createStackNavigator();

const AppRoutes = () => (
    <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
        cardStyle: {
            backgroundColor: colors.white
        }
    }}
    >
        <StackRoutes.Screen name="Welcome" component={Welcome} />
        <StackRoutes.Screen name="UserIdentification" component={UserIdentification} />        
        <StackRoutes.Screen name="Confirmation" component={Confirmation} />
        <StackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
        <StackRoutes.Screen name="PlantSave" component={PlantSave} />
        <StackRoutes.Screen name="MyPlants" component={AuthRoutes} />
    </StackRoutes.Navigator>
)

export default AppRoutes;