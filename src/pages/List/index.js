import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {RequestLocationPermission, OrderDescArray } from './../../services/util';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cardview from './../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';
import Styles from './styles';

const List = (props) => {
    const [favorites, setFavorites] = useState([]);

    async function handleNewLocation() {
        const granted = RequestLocationPermission();
        if(granted) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    props.navigation.navigate("Map", {latitude, longitude});
                },
                (err) => {
                    Alert.alert("Problema ao buscar a localização do usuário.")
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
            );
            
        }else{
            Alert.alert("Permissão para acessar localização não fornecida.");
        }
        
    }

    function handleDeleteButton(id){
        const newFavorites = favorites.filter(item => item.id !== id);
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    }

    function handleEditButton(item){
        const {latitude, longitude} = item;
        const granted = RequestLocationPermission();
        if (granted) {
            props.navigation.navigate("Map", {latitude, longitude, item});
        }
    }

    async function saveFavorites(list){
        try{
            return await AsyncStorage.setItem('favorites', JSON.stringify(list));
        }catch(err){
            Alert.alert("Erro ao armazenar informações de arquivos locais.")
        }
    }

    useEffect( () => { 
        if(props.route.params?.location){
            //Check the id, if it already exists, is a edit, else, a new object
            let isEdit = false;
            const fav = favorites.map((item) => {
                if(item.id === props.route.params.location.id){
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
                Alert.alert("Problemas ao buscar informações dos arquivos locais.");
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
            <TouchableOpacity
                onPress = {() => {handleNewLocation()}}
                style = {Styles.touchableOpacityStyle}>
                <Icon name="add" color={'#fff'} size={45} />
            </TouchableOpacity>

        </View>
    );
}

export default List;