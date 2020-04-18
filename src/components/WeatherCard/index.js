import React from 'react';
import {View, Text} from 'react-native';
import Styles from './styles';

const WeatherCard = (props) => {

    const {latitude, longitude} = props;
    
    return (
        <View style = {Styles.card}>
            <Text style = {Styles.title}>Clima</Text>
            <View style = {Styles.coords}>
                <Text>Lat.</Text>
                <Text>{latitude}</Text>
            </View>
            <View style = {Styles.coords}>
                <Text>Lon.</Text>
                <Text>{longitude}</Text>
            </View>
        </View>
    );
}

export default WeatherCard;