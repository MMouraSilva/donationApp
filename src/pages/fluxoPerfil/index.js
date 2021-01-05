import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Pressable, ScrollView, Dimensions } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title, Input, icon } from '../../styles/index.js';
import { FontAwesome as FtIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from './../../service/userService.js';
import {
    Avatar,
    Title,
    Caption,
    Text,
    Appbar,
} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export default class fluxoPerfil extends Component {

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        name: null,
        typeUser: null,
        dateOfBirth: null,
        email: null,
        address: null,
        number: null,
        complement: null,
        city: null,
        uf: null,
        cep: null
    }

    getStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@sessionAccount')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }

    setStorage = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.mergeItem('@sessionAccount', jsonValue)
        } catch (e) {
            console.log("Deu erro: ", e);
        }
    }

    componentDidMount = async () => {
        const session = await this.getStorage();
        let { name, typeUser, dateOfBirth, email, address, number, complement, city, uf, cep } = await session;
        this.setState({ name, typeUser, dateOfBirth, email, address, number, complement, city, uf, cep });
    }

    render() {
        let page;
        const { navigation } = this.props;
        const { route } = this.props;
        page = route.params.page;

        switch (page) {
            case 'perfil':
                return (
                    <View style={container}>
                            <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                                <Pressable onPress={ navigation.openDrawer }>
                                    <FtIcons name="reorder" style={icon.headerIcon}/>
                                </Pressable>
                            </Appbar.Header>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={styles.userInfoSection}>
                                    <Avatar.Image
                                        source={{
                                            //uri: ''
                                        }}
                                        size={65}
                                        style={{backgroundColor: '#2D363D', marginBottom: '15%'}}
                                    />
                                    <View style={{marginLeft: '5%', flexDirection: 'column'}}>
                                        <Caption style={styles.caption}>
                                            { 
                                                this.state.typeUser == "r" ?
                                                "Recebedor" :
                                                this.state.typeUser == "d" ?
                                                "Doador" :
                                                null
                                            }
                                         </Caption>
                                        <Title style={styles.title}> {this.state.name} </Title>
                                    </View>
                                </View>

                                <View style={styles.userInfoView}>
                                    <Text style={styles.userInfoTitle}> Data de nascimento </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}> {this.state.dateOfBirth} </Text>
                                    </View>

                                    <Text style={styles.userInfoTitle}> E-mail </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}> {this.state.email} </Text>
    
                                        <Pressable style={styles.editButton}>
                                            <Text style={styles.editText}> Editar </Text>
                                        </Pressable>

                                    </View>
                                    
                                    <Text style={styles.userInfoTitle}> Endereço </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}>
                                            {" "}{this.state.address}, {this.state.number},
                                            {"\n"}{
                                                this.state.complement != null ?
                                                " " + this.state.complement + ", " : ""
                                            } {this.state.city} - {this.state.uf}. CEP {this.state.cep}
                                        </Text>
                                            
                                        <Pressable style={styles.editButton}>
                                            <Text style={styles.editText}> Editar </Text>
                                        </Pressable>


                                    </View>

                                    <Pressable>
                                        <Text style={styles.changePassword}> Alterar minha senha </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )
            
            case 'alterarSenha':
                return (
                    <View style={container}>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>

                            </View>
                        </ScrollView>
                    </View>
                )

            case 'alterarEmail':
                return (
                    <View style={container}>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                            </View>
                        </ScrollView>
                    </View>
                )

            case 'alterarEndereco':
                return (
                    <View style={container}>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                            </View>
                        </ScrollView>
                    </View>
                )
        }
    }
}