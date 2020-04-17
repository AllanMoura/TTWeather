import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import Styles from './styles';

const Map = () => {
    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    function onLocationChange(event){
        setLocation({
            ...location,
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
    }

    return (
        <View style = {Styles.box}>
            <MapView provider = {'google'} style = {Styles.map} region = {location} onPress = {e => {onLocationChange(e)}}>
                <Marker coordinate = {location} title = {'Marker'}/>
            </MapView>
        </View>
    );
}

export default Map;