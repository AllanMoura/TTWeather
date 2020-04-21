import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    list: {
        padding: 20,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10,
        borderRadius: 150,
        backgroundColor: '#e74c3c',
     },
});

export default Styles;