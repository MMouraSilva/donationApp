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
        height: 30,
        marginBottom: 30
    },


    input: {
        height: 30,
        width: windowWidth - 100,
        marginBottom: 40,
        flex: 1
    },
});

export default Input;