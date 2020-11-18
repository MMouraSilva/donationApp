import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: 500,
        marginBottom: -25,
        marginLeft: -20,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: "center",
        width: windowWidth - 1
    },

    modalContent: {
        width: windowWidth - 60,
        marginLeft: 30
    },

    modalTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },

    modalHeader: {
        backgroundColor: '#A9A9A9',
        width: windowWidth - 250,
        height: 10,
        marginLeft: 125,
        marginTop: -20,
        marginBottom: 40
    },
})

export default styles;