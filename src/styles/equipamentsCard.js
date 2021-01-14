import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const equipamentsCard = StyleSheet.create({
    equipsCard: {
        height: windowHeight * 0.15,
        width: windowWidth * 0.8,
        marginBottom: '5%',
        shadowColor: '#2D363D',
        shadowOpacity: 0.3,
        shadowRadius: 45,
        shadowOffset: { width: 1, height: 13 },
        elevation: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FED500"
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

    content: {
        flex: 7,
        justifyContent: "center",
        backgroundColor: '#f2f2f2'
    },

    equipName: {
        fontWeight: 'bold',
        marginLeft: "4%",
        marginTop: "4%"
    },

    donorName: {
        fontSize: 13,
        marginLeft: "4%",
    },

    equipDescription: {
        fontSize: 13,
        marginLeft: "4%",
    },

    view: {
        backgroundColor: "#fff",
        marginLeft: "4%",
        height: "100%",
        width: "96%",
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10
    },

    line:{
        borderBottomWidth: 1,
        borderColor: "#FED500",
        width: "60%",
        marginLeft: "4%",
        marginTop: "1%",
        marginBottom: "1%"
    },

    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    }
    
})

export default equipamentsCard;