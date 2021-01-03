import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    userInfoSection: {
        flexDirection: 'row',
        width: windowWidth - 100,
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
        width: windowWidth - 70,
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
})


export default styles;