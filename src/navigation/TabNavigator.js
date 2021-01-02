import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import minhasDoacoes from './../pages/minhasDoacoes/index';

const Tab = createMaterialTopTabNavigator();

export default class TabNavigator extends Component {
    render() {
        return (
            <Tab.Navigator 
                initialRouteName="minhasDoacoes"
                tabBarOptions={{
                    activeTintColor: "#fff",
                    indicatorStyle: { backgroundColor: "#FED500" },
                    style: { backgroundColor: "#2D363D" },
                    labelStyle: { textTransform: "none" }
                }}
            >
                <Tab.Screen name="Disponíveis" component={minhasDoacoes} initialParams={{ page: "disponiveis" }} />
                <Tab.Screen name="Em andamento" component={minhasDoacoes} initialParams={{ page: "emAndamento" }} />
                <Tab.Screen name="Finalizados" component={minhasDoacoes} initialParams={{ page: "finalizados" }} />
            </Tab.Navigator>
        );
    }
}