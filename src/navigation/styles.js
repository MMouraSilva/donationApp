import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    bottomDrawerSection: {
        backgroundColor: "#2D363D",
        marginBottom: "-1%",
        height: "10%",
        justifyContent: 'center'
    },

    drawerContent: {
        flex: 1,
        height: windowHeight
    },

    userInfoSection: {
        paddingLeft: '10%'
    },

    logoutLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },

    itemLabel: {
        color: '#2D363D',
        fontWeight: 'bold',
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: '-5%'
    },

    caption: {
        fontSize: 14,
        marginTop: '5%'
    },

    drawerItem: {
        borderColor: '#FED500',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '75%',
        height: '18%',
        marginBottom: '-1.69%',
        marginLeft: '10%',
        justifyContent: 'center',
    },

})

export default styles;