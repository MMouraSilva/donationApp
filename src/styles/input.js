import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;


const Input = StyleSheet.create({
    inputField: {
        flex: 4
    },

    inputFieldText: {
        fontSize: 11
    },

    inputView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: "6%",
        marginBottom: "9%",
        alignItems: "center"
    },


    input: {
        height: "100%",
        width: windowWidth - 100,
        flex: 1
    },
});

export default Input;