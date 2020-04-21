import React, { useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from './../../services/api';
import Styles from './styles';

const CardView = ({item, handleDeleteButton, handleEditButton}) => {
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
    }, [item]);

    return (
        <View style = {Styles.box}>
            <Text style = {Styles.title}>{item.title}</Text>
            <View style = {Styles.coords}>
                <Image 
                    style = {Styles.image}
                    source = {weather.icon == ''? null :{uri: weather.icon}}/>
                
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
            <View style = {Styles.boxButtons}>
                <TouchableOpacity style={Styles.buttons} onPress={() => {handleDeleteButton(item.id)}}>
                    <Icon name="delete" color={'#000'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.buttons} onPress={() => {handleEditButton(item)}}>
                    <Icon name="edit" color={'#000'} size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default CardView;