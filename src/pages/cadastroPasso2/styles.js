import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    quitButtonView: {
        marginRight: 20
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