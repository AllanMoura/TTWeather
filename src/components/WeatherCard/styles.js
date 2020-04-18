import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        opacity: 0.75,
        marginTop: -170,
        marginHorizontal: 40,
        padding: 25,
        shadowColor: '#000',
        elevation: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e74c3c'
    },
    coords: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});

export default Styles;