import React, {useState, useEffect} from 'react';
import {View, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Cardview from './../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';

const List = (props) => {
    const [favorites, setFavorites] = useState([
        {
            id: "6b33fce8-1745-f8de-4ad8-4ee42585oprf",
            latitude: 10,
            longitude: 10,
            title: "Biribiri"
        },
        {
            id: "6b33fce8-1743-f8de-4ad8-4ef42585oprf",
            latitude: 20,
            longitude: 20,
            title: "Birileibe"
        },
        {
            id: "6b33fcd8-1715-f2de-4ad8-4eee2e85oprf",
            latitude: 45,
            longitude: 20,
            title: "Besomorph"
        },
    ]);

    async function requestLocationPermission() {
        console.log("Pedindo permissão do usuário para acessar localização")
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
        console.log("Função que executa ao clicar o botão de nova localização")
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
    
    useEffect( () => {
        if(props.route.params?.location){
            console.log("Funcão que cria uma nova localização para adicionar a lista")
            console.log(props.route.params.location);
            setFavorites([...favorites, props.route.params.location]);
        }
    }, [props.route.params?.location]);

    return (
        <View>
            <FlatList 
                data = {favorites}
                renderItem = {({item}) => <Cardview id = {item.id} title = {item.title} latitude = {item.latitude} longitude = {item.longitude}/>}
                keyExtractor = {item => item.id.toString()}/>
            <Button title = "Add new Location" onPress = { () => {handleNewLocation()}}/>

        </View>
    );
}

export default List;