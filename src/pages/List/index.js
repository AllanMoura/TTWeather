import React, {useState} from 'react';
import {View, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Cardview from './../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';

const List = (props) => {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            title: "Lugar Massa",
            temp: 23,
            state: "rainy",
        },
        {
            id: 2,
            title: "Lugar Massa 2",
            temp: 25,
            state: "Sunny",
        },
        {
            id: 3,
            title: "Lugar Massa 3",
            temp: 32,
            state: "cloudy",
        },
    ]);

    async function requestLocationPermission() {
        let granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
        if(granted) {
            return true;
        }else {
            try {
                granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if(granted){
                    return true;
                }else{
                    return false;
                }
            } catch(err) {
                //TODO
                console.warn(err);
                return false;
            }
        }
    }

    async function handleNewLocation() {
    
        const granted = requestLocationPermission();
        if(granted) {
            console.log("Ta permitido");
            Geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    props.navigation.navigate("Map", {latitude, longitude});
                },
                (err) => {
                    //TODO
                    console.log(err);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
            );
            
        }else{
           //TODO
           console.log("Deu ruim");
        }
        
    }

    return (
        <View>
            <FlatList 
                data = {favorites}
                renderItem = {({item}) => <Cardview id = {item.id} title = {item.title} temp = {item.temp} state = {item.state}/>}
                keyExtractor = {item => item.id.toString()}/>
            <Button title = "Add new Location" onPress = { () => {handleNewLocation()}}/>

        </View>
    );
}

export default List;