import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    },
    box: {
        flex: 1
    },
    locationButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 150,
        marginTop: -20,
        width: 60,
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 25,
      },
});

export default Styles;