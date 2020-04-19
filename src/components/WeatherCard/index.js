import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import Styles from './styles';

const WeatherCard = (props) => {

    const {weather, location, setLocation} = props;
    
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
            <TextInput 
                style = {Styles.inputText} 
                placeholder = {"Ensira um nome para o local"}
                value = {location.title}
                onChangeText = {text => {setLocation({...location, title: text})}}
            />
            
        </View>
        
    );
}

export default WeatherCard;