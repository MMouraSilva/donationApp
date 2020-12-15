import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    radioField: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    radioView: {
        marginTop: 10,
        marginBottom: 80
    },

    subText: {
        fontSize: 11
    },

    text: {
        fontSize: 16
    },
    
    iconButton: {
        marginLeft: 80
    },

    textView: {
        flexDirection: "column",
        alignItems: "flex-start",
    },

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
    },

    headerLeft: {
        marginLeft: 20
    },

    checkBoxView: {
        flexDirection: 'row',
        marginBottom: 80,
        marginTop: 30,
        alignItems: 'center',
    },

    checkBoxText: {
        marginLeft: 10
    },

    dateView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: 50,
        marginBottom: 50
    },

    dataPicker: {
        marginTop: 10.5
    }
})

export default styles;