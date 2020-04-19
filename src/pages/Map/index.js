import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import api from './../../services/api';
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

    const [weather, setWeather] = useState({
        description: '',
        icon: '',
        temp: 0,
        humidity: ''
    });
    

    async function getWeather(){
        console.log("Antes da execução")
        try {
            const response = await api.get(`/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=pt_br&appid=${"0c7e0440d9f55835bb3a1f247490bc4f"}`);
            console.log("Depois da execução");
            const infos  = {
                description: response.data.weather[0].description,
                icon: `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
                temp: response.data.main.temp,
                humidity: `${response.data.main.humidity} %`
            }

            setWeather(infos);
            console.log(infos);
        } catch (err) {
            console.log(err);
        }
    }

    function handleLocationPress(e) {
        setLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        })
        getWeather();
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
                weather = {weather}
            />
        </View>
    );
}

export default Map;