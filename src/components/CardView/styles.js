import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    box: {
        backgroundColor: '#4d94ff',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom:15,
        elevation: 5,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0000ff'
    },
    coords: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        width: 100,
        height: 70
    },
    texts: {
        justifyContent: 'space-between'
    },
    textFont: {
        fontSize: 20
    },
    celcius: {
        fontSize: 30
    },
    buttons: {
        backgroundColor: '#e74c3c',
        borderRadius: 150,
        marginRight: 15,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    boxButtons: {
        flexDirection: 'row',
    },

});

export default Styles;