import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import WeatherCard from './../../components/WeatherCard';
import Styles from './styles';

const Map = (props) => {
    const {latitude, longitude} = props.route.params;
    const initialRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const [location, setLocation] = useState({
        latitude: latitude,
        longitude: longitude,
    });


    function handleLocationPress(e) {
        setLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        })
    }

    return (
        <View style = {Styles.box}>
            <MapView 
                style = {Styles.map} 
                initialRegion = {initialRegion} 
                onPress = {e => handleLocationPress(e)}
            >

                <Marker 
                    coordinate = {location}
                    title = {"Marker"}
                />
            </MapView>
            
            <WeatherCard 
                latitude = {location.latitude}
                longitude = {location.longitude}
            />
        </View>
    );
}

export default Map;