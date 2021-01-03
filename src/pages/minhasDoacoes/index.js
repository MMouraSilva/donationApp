import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title, button, icon } from '../../styles/index.js';
import { AntDesign as AntIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    <View style={styles.buttonView}>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                    ? '#43515C'
                                    : '#2D363D'
                                },
                                styles.button
                            ]}
                            //onPress={}
                        >
                            <Text style={styles.buttonText}>
                                <AntIcons name="plus" style={icon.nextIcon} />
                                {"  "}
                                Doar
                            </Text>
                        </Pressable>
                    </View>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}> Equipamentos disponíveis {"\n"} para doação </Text>
                                </View>

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
                    <View style={container}>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}> Processos de doação {"\n"} em andamento </Text>
                                </View>

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

            case 'finalizadas':
                return (
                    <View style={container}>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}> Processos de doação {"\n"} já finalizados </Text>
                                </View>

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
        }
    }
}