import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import login from '../pages/login';
import fluxoCadastro from '../pages/fluxoCadastro';
import telaInicial from '../pages/telaInicial';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Navigation extends Component {

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="login">
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
                        name="fluxoCadastro" 
                        component={fluxoCadastro} 
                        options={{ 
                            title: '',
                            headerStyle: {
                                backgroundColor: '#2D363D'   
                            },
                            headerTintColor: '#fff'
                        }}
                    />
                    <Stack.Screen 
                        name="telaInicial" 
                        component={telaInicial} 
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