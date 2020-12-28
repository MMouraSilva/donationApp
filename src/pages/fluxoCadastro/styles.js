import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    radioField: {
        flexDirection: "row",
        marginTop: "3%",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    radioView: {
        marginTop: "3%",
        marginBottom: "24%"
    },

    subText: {
        fontSize: 11
    },

    text: {
        fontSize: 16
    },
    
    iconButton: {
        marginLeft: "24%"
    },

    textView: {
        flexDirection: "column",
        alignItems: "flex-start",
    },

    inputContent: {
        marginRight: "3%",
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
        height: "40%",
    },


    input: {
        height: "100%",
        width: windowWidth / 2 - 50,
        flex: 1,
    },

    buttonView: {
        flex: 4,
        marginTop: "20%"
    },

    checkBoxView: {
        flexDirection: 'row',
        marginBottom: "24%",
        marginTop: "9%",
        alignItems: 'center',
    },

    checkBoxText: {
        marginLeft: "3%"
    },

    dateView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: "6.5%",
        marginBottom: "15%"
    },

    datePicker: {
        marginTop: "2%",
        marginBottom: "1.5%",
    },

    dateText: {
        marginLeft: "1.5%",
        marginRight: "1.5%",
    }
})

export default styles;