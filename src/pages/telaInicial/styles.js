import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    headerIcon: {
        color: "#fff",
        fontSize: 30,
        marginLeft: 20
    },
    
    subHeader: {
        width: windowWidth,
        height: "25%",
        backgroundColor: '#2D363D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerText: {
        color: '#fff',
    },

    headerButton: {
        width: windowWidth / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerLeft: {
        marginLeft: 10
    },

    scrollView: {
        height: "100%",
        width: windowWidth,
        marginTop: "12%",
    },

    scrollViewContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: windowWidth - 80,
        marginHorizontal: "12%",
    },

    text: {
        marginTop: "9%",
        marginLeft: "9.5%",
        fontSize: 11
    },

    textCategoria: {
        marginLeft: "9.5%",
        fontWeight: 'bold'
    },

    subTitle: {
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: '5%',
        marginLeft: '1%'
    },

    orderView: {
        marginTop: '-15%',
        width: windowWidth - 80,
    },

    orderContent: {
        borderBottomWidth: 2,
        borderBottomColor: '#FED500',
        marginBottom: '5%',
    },

    orderButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%'
    },

    orderText: {
        fontSize: 18
    },

    orderIcon: {
        fontSize: 20,
        color: '#2D363D',
        marginTop: '1.5%',
    }
})

export default styles;