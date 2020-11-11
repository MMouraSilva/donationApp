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
    }
})

export default styles;