import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import telaInicial from './../pages/telaInicial';
import DrawerContent from './DrawerContent';
import TabStackNavigator from './TabStackNavigator';
import fluxoPerfil from './../pages/fluxoPerfil';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    render() {
        return(
                <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="telaInicial">
                    <Drawer.Screen name="telaInicial" component={telaInicial} initialParams={{ page: "inicial" }}/>
                    <Drawer.Screen name="categorias" component={telaInicial} initialParams={{ page: "categorias" }}/>
                    <Drawer.Screen name="ordenar" component={telaInicial} initialParams={{ page: "ordenar" }}/>
                    <Drawer.Screen name="TabStackNavigator" component={TabStackNavigator}/>
                    <Drawer.Screen name="fluxoPerfil" component={fluxoPerfil}/>
                </Drawer.Navigator>
        );
    }
}