import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    quitButtonView: {
        marginRight: 20
    },

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

    inputContent: {
        marginRight: 10,
        width: '100%',
    },

    inputPair: {
        flexDirection: "row",
        width: '63%'
    },

    inputField: {
        flex: 4,
        flexDirection: "column",
        width: windowWidth - 150,
    },

    inputFieldText: {
        fontSize: 11
    },

    inputView: {
        flexDirection: "column",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: 30,
        marginBottom: 30
    },


    input: {
        height: 30,
        width: windowWidth / 2 - 50,
        flex: 1,
    },

    buttonView: {
        flex: 4
    }
})

export default styles;