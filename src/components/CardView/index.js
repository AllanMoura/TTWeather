import React, { useState, useEffect } from 'react';
import {View, Text, Image} from 'react-native';
import api from './../../services/api';
import Styles from './styles';

const CardView = ({item}) => {
    const [weather, setWeather] = useState({
        description: '',
        icon: '',
        temp: 0,
        humidity: '',
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
        getWeather(item.latitude, item.longitude);
    }, []);

    return (
        <View style = {Styles.box}>
            <Text style = {Styles.title}>{item.title}</Text>
            <View style = {Styles.coords}>
                <Image 
                    style = {Styles.image}
                    source = {{uri: weather.icon}}/>
                
                <View style = {Styles.texts}>
                    <Text style = {Styles.celcius}>{weather.temp} &#8451;</Text>
                    <View style = {Styles.coords}>
                        <Text style = {Styles.textFont}>Umidade: </Text>
                        <Text style = {Styles.textFont}>{weather.humidity}</Text>
                    </View>
                    <View style = {Styles.coords}>
                        <Text style = {Styles.textFont}>{weather.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

}

export default CardView;