import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {RequestLocationPermission, OrderDescArray } from './../../services/util';
import AsyncStorage from '@react-native-community/async-storage';

import Cardview from './../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';
import Styles from './styles';

const List = (props) => {
    const [favorites, setFavorites] = useState([]);

    async function handleNewLocation() {
        console.log("Função que executa ao clicar o botão de nova localização")
        const granted = RequestLocationPermission();
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
        saveFavorites(newFavorites);
    }

    function handleEditButton(item){
        const {latitude, longitude} = item;
        console.log("Função que executa ao tentar editar um local")
        const granted = RequestLocationPermission();
        if (granted) {
            props.navigation.navigate("Map", {latitude, longitude, item});
        }
    }

    async function saveFavorites(list){
        try{
            return await AsyncStorage.setItem('favorites', JSON.stringify(list));
        }catch(err){
            console.log("Problema ao armazenar");
        }
    }

    useEffect( () => { 
        if(props.route.params?.location){
            //Check the id, if it already exists, is a edit, else, a new object
            let isEdit = false;
            const fav = favorites.map((item) => {
                if(item.id === props.route.params.location.id){
                    console.log("Existe um com mesmo id")
                    isEdit = true;
                    return props.route.params.location; //updates the object
                }
                return item;
            });

            if(isEdit){
                setFavorites(fav);
                saveFavorites(fav);
            }else{
                fav.unshift(props.route.params.location);
                setFavorites(fav);
                saveFavorites(fav);
            }
        }
    }, [props.route.params?.location]);

    useEffect( () => {
        async function getList(){
            try {
                const data = await AsyncStorage.getItem('favorites');
                if (data !== null){
                    const list = OrderDescArray(JSON.parse(data));
                    setFavorites(list);
                }
            }catch(err){
                console.log("erro na busca dos arquivos");
                console.log(err)
            }
        }
        getList();
    }, []);

    return (
        <View style = {Styles.container}>
            <FlatList 
                contentContainerStyle = {Styles.list}
                data = {favorites}
                renderItem = {({item}) => <Cardview item = {item} handleDeleteButton = {handleDeleteButton} handleEditButton = {handleEditButton}/>}
                keyExtractor = {item => item.id.toString()}/>
            <Button title = "Add new Location" onPress = { () => {handleNewLocation()}}/>

        </View>
    );
}

export default List;