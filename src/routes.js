import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import ListScreen from './pages/List';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "List" component = {ListScreen}/>
        </Stack.Navigator>
    );
}

export default Routes;