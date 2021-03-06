import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
        width: windowWidth,
        backgroundColor: '#2D363D',
        height: windowHeight * 0.05
    },
    
    subHeader: {
        width: windowWidth,
        backgroundColor: '#2D363D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerIcon: {
        color: "#fff",
        fontSize: 30,
        marginLeft: 20,
        marginTop: 20
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
        height: "80%",
        width: windowWidth,
        marginTop: "12%",
    },

    scrollViewContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: windowWidth * 0.75,
        marginHorizontal: "12%",
    },

    text: {
        marginTop: "9%",
        marginLeft: "9.5%",
        fontSize: 12
    },

    textCategoria: {
        marginLeft: "10.5%",
        marginTop: '-1%',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },

    subTitle: {
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: '5%',
        marginLeft: '1%'
    },

    orderView: {
        marginTop: '-15%',
        width: windowWidth * 0.8,
    },

    content: {
        flex: 7,
        justifyContent: "center",
        marginTop: "20%"
    },

    orderContent: {
        borderBottomWidth: 2,
        borderBottomColor: '#FED500',
        marginBottom: '5%',
    },

    orderButton: {
        flexDirection: 'row',
        marginBottom: '5%'
    },

    orderText: {
        fontSize: 18,
        textTransform: 'capitalize'
    },

    orderIcon: {
        fontSize: 20,
        color: '#2D363D',
        marginTop: '1.5%',
        position: 'absolute',
        right: 0
    },

    categIcon: {
        fontSize: 20,
        color: '#2D363D',
        marginTop: '1.5%',
        position: 'absolute',
        right: "18%"
    },
})

export default styles;