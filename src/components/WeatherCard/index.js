import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import Styles from './styles';

const WeatherCard = (props) => {

    const {weather} = props;

    return (
        <View style = {Styles.card}>
            <Text style = {Styles.title}>Clima</Text>
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

export default WeatherCard;