import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import ListScreen from './pages/List';
import Map from './pages/Map';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName = "Map">
            <Stack.Screen name = "List" component = {ListScreen}/>
            <Stack.Screen name = "Map" component = {Map}/>
        </Stack.Navigator>
    );
}

export default Routes;