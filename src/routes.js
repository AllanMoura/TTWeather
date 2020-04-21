import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import ListScreen from './pages/List';
import Map from './pages/Map';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName = "List">
            <Stack.Screen
                name = "List" 
                component = {ListScreen}
                options={{
                    headerTitleAlign: 'center',
                    title: 'Locais preferidos',
                    headerStyle: {
                      backgroundColor: '#e74c3c',
                      
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
            />
            <Stack.Screen 
                name = "Map"
                component = {Map}
                    options={{
                        headerTitleAlign: 'center',
                        title: 'Selecione um local',
                        headerStyle: {
                            backgroundColor: '#e74c3c',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
        </Stack.Navigator>
    );
}

export default Routes;