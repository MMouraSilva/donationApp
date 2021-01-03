import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import minhasDoacoes from './../pages/minhasDoacoes/index';

const Tab = createMaterialTopTabNavigator();

export default class TabNavigator extends Component {
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    render() {
        let typeUser;
        const { route } = this.props;
        typeUser = route.params.typeUser;
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
                {
                    typeUser == "d"
                    ? <Tab.Screen name="Disponíveis" component={minhasDoacoes} initialParams={{ page: "disponiveis" }} />
                    : null
                }
                <Tab.Screen name="Em andamento" component={minhasDoacoes} initialParams={{ page: "emAndamento" }} />
                <Tab.Screen name="Finalizadas" component={minhasDoacoes} initialParams={{ page: "finalizadas" }} />
            </Tab.Navigator>
        );
    }
}