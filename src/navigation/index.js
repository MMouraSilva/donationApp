import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from '../pages/login';
import cadastroPasso1 from '../pages/cadastroPasso1';

const Stack = createStackNavigator();

export default class Login extends Component {
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen 
                        name="login" 
                        component={login}
                        options={{ 
                            title: '',
                            headerStyle: {
                                backgroundColor: '#2D363D'
                            }
                        }}
                    />
                    <Stack.Screen 
                        name="cadastroPasso1" 
                        component={cadastroPasso1} 
                        options={{ 
                            title: '',
                            headerStyle: {
                                backgroundColor: '#2D363D'   
                            },
                            headerTintColor: '#fff'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}