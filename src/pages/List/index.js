import React, {useState} from 'react';
import {View, Text,} from 'react-native';

import Cardview from './../../components/CardView';
import { FlatList } from 'react-native-gesture-handler';

const List = () => {
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


    return (
        <View>
            <FlatList 
                data = {favorites}
                renderItem = {({item}) => <Cardview id = {item.id} title = {item.title} temp = {item.temp} state = {item.state}/>}
                keyExtractor = {item => item.id.toString()}/>
        </View>
    );
}

export default List;