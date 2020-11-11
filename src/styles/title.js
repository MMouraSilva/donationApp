import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const title = {
    fontWeight: 'bold',
    fontSize: 20,
    width: windowWidth - 70,
    flex: 1,
    marginTop: 40,
    marginBottom: -20
  }

  export default title;