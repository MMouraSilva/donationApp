import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
//import formEquips from './../pages/formEquipamentos';
import { FontAwesome as FtIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    render(){
        let typeUser;
        const { navigation } = this.props;
        const { route } = this.props;
        typeUser = route.params.typeUser;
        return(
                <Stack.Navigator initialRouteName="TabNavigator">
                    <Stack.Screen 
                        name="TabNavigator" 
                        component={TabNavigator}
                        initialParams={{ typeUser: typeUser }}
                        options={{ 
                            title: '',
                            headerStyle: {
                                backgroundColor: '#2D363D'
                            },
                            headerLeft: () => (
                                    <Pressable
                                        onPress={ navigation.openDrawer }
                                        style={{ marginLeft: 20 }}
                                    >
                                        <FtIcons name="reorder" size={30} color="#fff" />
                                    </Pressable>
                            )
                        }}
                    />
                </Stack.Navigator>
        );
    }
}