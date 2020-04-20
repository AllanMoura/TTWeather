import React, {useState, useEffect} from 'react';
import {View, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import Cardview from './../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';
import Styles from './styles';

const List = (props) => {
    const [favorites, setFavorites] = useState([]);

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

    function handleDeleteButton(id){
        const newFavorites = favorites.filter(item => item.id !== id);
        setFavorites(newFavorites);
    }
    
    useEffect( () => {
        if(props.route.params?.location){
            console.log("Funcão que cria uma nova localização para adicionar a lista")
            console.log(props.route.params.location);
            setFavorites([...favorites, props.route.params.location]);
        }
    }, [props.route.params?.location]);

    return (
        <View style = {Styles.container}>
            <FlatList 
                contentContainerStyle = {Styles.list}
                data = {favorites}
                renderItem = {({item}) => <Cardview item = {item} handleDeleteButton = {handleDeleteButton}/>}
                keyExtractor = {item => item.id.toString()}/>
            <Button title = "Add new Location" onPress = { () => {handleNewLocation()}}/>

        </View>
    );
}

export default List;