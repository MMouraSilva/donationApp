import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        width: windowWidth,
        height: 50,
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
        marginLeft: 20
    },

    scrollView: {
        height: '100%',
        width: windowWidth
    },

    scrollViewContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: windowWidth - 80,
        marginHorizontal: 40,
    },

    text: {
        marginTop: 30,
        marginLeft: 40,
        fontSize: 11
    },

    textCategoria: {
        marginLeft: 40,
        fontWeight: 'bold'
    }
})

export default styles;