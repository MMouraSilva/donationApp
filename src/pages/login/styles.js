import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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

  createAccount: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default styles;