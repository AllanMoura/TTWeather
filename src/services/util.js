import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function RequestLocationPermission() {
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

export function OrderDescArray(list){
    const orderedArray = list.sort(function (a, b){
        return (new Date(b.date) - new Date(a.date));
    });
    return orderedArray;
}