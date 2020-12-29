import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import telaInicial from '../pages/telaInicial';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default class inicialMenu extends Component {
    render(){
        return(
                <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="telaInicial">
                    <Drawer.Screen 
                        name="telaInicial" 
                        component={telaInicial}
                    />
                </Drawer.Navigator>
        );
    }
}