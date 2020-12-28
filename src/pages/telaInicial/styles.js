import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        height: "40%",
        backgroundColor: "#2D363D",
    },

    headerIcon: {
        color: "#fff",
        fontSize: 30,
        marginTop: 50,
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
    }
})

export default styles;