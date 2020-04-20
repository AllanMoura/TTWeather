import React from 'react';
import {View, Text} from 'react-native';
const CardView = ({id, title, latitude, longitude}) => {
    
    return (
        <View>
            <Text>{title}</Text>
            <Text>{latitude} {longitude}</Text>
        </View>
    );

}

export default CardView;