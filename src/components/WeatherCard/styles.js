import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    card: {
        backgroundColor: '#4d94ff',
        borderRadius: 20,
        opacity: 0.75,
        marginTop: -200,
        marginHorizontal: 20,
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 15,
        shadowColor: '#000',
        elevation: 20
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
    }
});

export default Styles;