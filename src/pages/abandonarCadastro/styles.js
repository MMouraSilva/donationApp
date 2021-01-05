import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#fff',
        marginBottom: "-7.5%",
        marginLeft: "-5.5%",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth - 1,
        height: windowHeight * 0.38,
        position: 'absolute',
        bottom: 0
    },

    modalContent: {
        width: windowWidth - 60,
    },

    modalTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },

    modalHeader: {
        backgroundColor: '#A9A9A9',
        width: windowWidth - 250,
        height: "3%",
        marginTop: "-6%",
        marginBottom: "10%",
    },
})

export default styles;