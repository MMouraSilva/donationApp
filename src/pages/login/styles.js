import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  passwordInput: {
    height: 30,
    width: windowWidth - 100,
    marginBottom: 40,
    flex: 1
  },

  loginInput: {
    height: 30,
    width: windowWidth - 100,
    marginBottom: 40,
    flex: 1
  },

  email: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 30,
    marginBottom: 30
  },

  password: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 30,
    marginBottom: 30
  },

  text: {
    fontSize: 11
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    width: windowWidth - 70,
    flex: 1,
    marginTop: 40,
    marginBottom: -20
  },

  loginScreen: {
    flex: 4
  },

  switch: {
    height: 12
  },

  switchText: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 50,
  },
  
  forgot: {
    alignItems: "flex-end",
    marginTop: -25,
  },

  forgotText: {
    color: '#2D363D',
    fontWeight: 'bold',
    fontSize: 14
  },

  textAccount: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 50
  },

  createAccount: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },

  icon: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FED500',
  }
});

export default styles;