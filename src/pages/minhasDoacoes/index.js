import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title, equipamentsCard, icon } from '../../styles/index.js';
import { AntDesign as AntIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import donationService  from './../../service/donationService';
import userService from './../../service/userService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class minhasDoacoes extends Component {

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        equipamentos: [],
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
        if(this.state.equipamentos.length == 0) {
            const equipamentos = await donationService.getDonations();
            for (let equipObject of equipamentos.data) {
                const user = await userService.getUserById(equipObject.donorId);
                equipObject.donorName = user.data.name;
            }

            const session = await this.getStorage();
            let { id } = await session;
            const equip = await equipamentos.data;
            const userDonations = await equip.filter(equip => equip.donorId == id);

            this.setState({ equipamentos: userDonations });
        }
    }

    render() {
        let page;
        const { navigation } = this.props;
        const { route } = this.props;
        page = route.params.page;

        switch (page) {
            case 'disponiveis':
                return (
                    <View style={equipamentsCard.container}>
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
                            onPress={() => {
                                navigation.navigate('formEquips')
                            }}
                        >
                            <Text style={styles.buttonText}>
                                <AntIcons name="plus" style={icon.nextIcon} />
                                {"  "}
                                Doar
                            </Text>
                        </Pressable>
                    </View>
                        <ScrollView style={{ backgroundColor: "#f2f2f2" }}>
                            <StatusBar style="light" />
                            <View style={equipamentsCard.content}>
                                <View style={styles.titleView}>
                                    <Text style={title}> Equipamentos disponíveis {"\n"} para doação </Text>
                                </View>

                                <ScrollView
                                    style={equipamentsCard.scrollView}
                                    vertical
                                >
                                    <View style={equipamentsCard.scrollViewContainer}>
                                        {
                                            this.state.equipamentos.map(equip => 
                                                <Pressable
                                                    style={({ pressed }) => [
                                                        {
                                                            backgroundColor: pressed
                                                            ? "#43515C"
                                                            : "#fff"
                                                        },
                                                        equipamentsCard.equipsCard
                                                    ]}
                                                    key={equip.id}
                                                    onPress={() => alert(equip.name)}
                                                >
                                                    <View style={equipamentsCard.view}>
                                                        <Text style={equipamentsCard.equipName}>
                                                            {equip.name}
                                                        </Text>
                                                        <Text style={equipamentsCard.donorName}>
                                                            Doado por {equip.donorName}
                                                        </Text>
                                                        <View style={equipamentsCard.line}/>
                                                        <Text style={equipamentsCard.equipDescription}>
                                                            {equip.equipmentDescription}
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
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