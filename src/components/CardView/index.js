import React from 'react';
import {View, Text} from 'react-native';
const CardView = ({id, title, temp, state}) => {
    
    return (
        <View>
            <Text>{title}</Text>
            <Text>{temp} {state}</Text>
        </View>
    );

}

export default CardView;