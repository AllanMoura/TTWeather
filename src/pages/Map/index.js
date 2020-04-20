import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {guidGenerator} from './../../services/util';
import WeatherCard from './../../components/WeatherCard';
import api from './../../services/api';
import Styles from './styles';

const Map = (props) => {

    const {latitude, longitude} = props.route.params;
    const initialRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    const [location, setLocation] = useState({
        latitude: latitude,
        longitude: longitude,
        title: '',
        id: guidGenerator(),
    });

    const [weather, setWeather] = useState({
        description: '',
        icon: '',
        temp: 0,
        humidity: ''
    });

    async function getWeather(latitude, longitude){
        console.log("Antes da call");
        const response = await api.get(`/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${"0c7e0440d9f55835bb3a1f247490bc4f"}`);
        console.log("Depois da call");
        console.log(response);
        
        const infos  = {
            description: response.data.weather[0].description,
            icon: `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
            temp: response.data.main.temp,
            humidity: `${response.data.main.humidity} %`
        }

        setWeather(infos);

    }

    useEffect( () => {
        getWeather(location.latitude, location.longitude);
        if(props.route.params?.item){
            setLocation(props.route.params.item);
        }
    }, []);

    function handleLocationPress(event) {
        setLocation({...location,
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
        getWeather(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude);
    }

    function handleAddPress(){
        
        props.navigation.navigate("List", {location: location});
    }

    return(
        <View style = {Styles.box}>
            <MapView
                style = {Styles.map}
                initialRegion = {initialRegion}
                onPress = {(event) => {handleLocationPress(event)}}>
                
                <Marker 
                    coordinate = {location}
                    title = {"Marker"}/>

            </MapView>
            
            <WeatherCard 
                weather = {weather}
                location = {location}
                setLocation = {setLocation}/>
            
            <TouchableOpacity style={Styles.locationButton} onPress={() => {handleAddPress()}}>
                <Icon name="add" color={'#fff'} size={45} />
            </TouchableOpacity>
                    
        </View>
    );
}

export default Map;