import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    userInfoSection: {
        flexDirection: 'row',
        width: width - 100,
        marginTop: '10%'
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '-5%'
    },

    caption: {
        fontSize: 14,
        marginTop: '5%',
        marginLeft: '2.5%'
    },

    userInfo: {
        height: "100%",
        width: width - 70,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '5%'
    },

    userInfoText: {
        fontSize: 12
    },

    userInfoView: {
        flex: 4,
    },

    userInfoTitle: {
        fontSize: 11,
        marginBottom: '-1%'
    },

    editButton: {
        position: 'absolute',
        right: 0
    },

    editText: {
        fontWeight: 'bold'
    },

    changePassword: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: '15%'
    },

    inputField: {
        flex: 4,
        height: height * 0.6
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 60,
        width: width * 0.8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
    },

    inputPair: {
        flexDirection: "row",
        width: '63%'
    },

    halfInputField: {
        flex: 4,
        flexDirection: "column",
        width: width - 150,
    },

    input: {
        height: "100%",
        width: width / 2 - 50,
        flex: 1,
    },

    inputView: {
        flexDirection: "column",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: "25%",
    },

    inputContent: {
        marginRight: "3%",
        marginBottom: "-25%",
        width: '100%',
    },
})


export default styles;