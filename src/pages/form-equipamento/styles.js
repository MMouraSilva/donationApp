import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '12%'
      },

    categoriaView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: "8%",
        marginBottom: "12%",
        alignItems: "center"
    },

    descriptionInput: {
        height: "100%",
        width: windowWidth - 100,
        flex: 1,
        textAlignVertical: 'top'
    },

    descriptionView: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: "20%",
        marginBottom: "9%",
        alignItems: "center"
    },

    inputField: {
        flex: 4,
        height: windowHeight * 0.6
    },
});

export default styles;