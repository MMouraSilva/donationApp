import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { FontAwesome as FtIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    render(){
        const { navigation } = this.props;
        return(
                <Stack.Navigator initialRouteName="TabNavigator">
                    <Stack.Screen 
                        name="TabNavigator" 
                        component={TabNavigator}
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