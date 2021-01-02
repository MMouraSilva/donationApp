import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title, button } from '../../styles/index.js';
import { Octicons as OcIcons, FontAwesome as FtIcons, Ionicons as Ioicon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Appbar,
} from 'react-native-paper';

export default class minhasDoacoes extends Component {

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    render() {

        let page;
        const { navigation } = this.props;
        const { route } = this.props;
        page = route.params.page;

        switch (page) {
            case 'disponiveis':
                return (
                    <View style={container}>
                        <ScrollView
                            //showsVerticalScrollIndicator ={false}
                            //showsHorizontalScrollIndicator={false}
                            //scrollEnabled={false}
                        >
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}> Equipamentos disponíveis {"\n"} para doação </Text>
                                </View>
                                <Pressable
                                    style={({ pressed }) => [
                                        {
                                            backgroundColor: pressed
                                            ? '#43515c'
                                            : '#2D363D'
                                        },
                                        styles.button
                                    ]}
                                    //onPress={}
                                    >
                                        <Text style={styles.buttonText}>
                                            Doar
                                        </Text>
                                </Pressable>
                                <ScrollView style={styles.scrollView}>
                                    <View style={styles.scrollViewContainer}>
                                        {/*{
                                            this.state.equipamentos.map(equip => 
                                        <Pressable
                                        style={({ pressed }) => [
                                            {
                                                backgroundColor: pressed
                                                ? onPressedColor
                                                : pressableColor
                                            },
                                            buttonColor
                                        ]}
                                        key={equip.id}
                                        onPress={() => alert('Pressionado')}
                                        >
                                        <Text style={textColor}>
                                        {equip.name}
                                        </Text>
                                        </Pressable>
                                        )
                                    }  exibição dos equipamentos disponiveis*/}
                                    </View>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                )
            
            case 'emAndamento':
                return (
                    <View>
                        <ScrollView>
                            <Text> Em andamento </Text>
                        </ScrollView>
                    </View>
                )

            case 'finalizados':
                return (
                    <View>
                        <ScrollView>
                            <Text> Finalizados </Text>
                        </ScrollView>
                    </View>
                )
        }
    }
}