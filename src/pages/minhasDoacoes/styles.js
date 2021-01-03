import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    button: {
        position: 'absolute',
        width: 120,
        height: 55,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50,
        right: 20,
        zIndex: 500,
        shadowColor: '#2D363D',
        shadowOpacity: 0.3,
        shadowRadius: 45,
        shadowOffset: { width: 1, height: 13 },
        elevation: 8
    },
  
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },

    buttonView: {
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
        right: 0
    },

    scrollView: {
    }
})


export default styles;