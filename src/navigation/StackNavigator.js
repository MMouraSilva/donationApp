import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from '../pages/login';
import fluxoCadastro from '../pages/fluxoCadastro';
import DrawerNavigator from './DrawerNavigator';
import formEquips from './../pages/form-equipamento';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {

    state = {
        isSignedIn: null
    }

    getStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@sessionAccount')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }

    componentDidMount = async () => {
        const sessionAccount = await this.getStorage();
        if(sessionAccount == null) {
            this.setState({ isSignedIn: false });
        } else {
            this.setState({ isSignedIn: true });
        }
    }

    render() {
        return(
            <>
                {
                    this.state.isSignedIn == true ? (
                        <NavigationContainer>
                            <Stack.Navigator>
                                <Stack.Screen 
                                    name="DrawerNavigator" 
                                    component={DrawerNavigator} 
                                    options={{ 
                                        headerShown: false
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
                                    name="formEquips"
                                    component={formEquips}
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
                    ) :
                    this.state.isSignedIn == false ?
                    (
                        <NavigationContainer>
                            <Stack.Navigator>
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
                                    name="DrawerNavigator" 
                                    component={DrawerNavigator} 
                                    options={{ 
                                        headerShown: false
                                    }}
                                />
                                <Stack.Screen 
                                    name="formEquips"
                                    component={formEquips}
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
                    )
                    : null
                }
            </>
        );
    }
}