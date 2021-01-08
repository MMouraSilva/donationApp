import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Pressable, ScrollView, Dimensions, Button, TextInput } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title, Input, icon } from '../../styles/index.js';
import { FontAwesome as FtIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userService from './../../service/userService.js';
import cepService from './../../service/cepService';
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
        user:{
            id : null,
            name: null,
            typeUser: null,
            dateOfBirth: null,
            email: null,
            address: null,
            number: null,
            complement: null,
            city: null,
            uf: null,
            cep: null,
            password:null,
            passwordConfirm:null
        },
        page: 'perfil'
        
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
        
        const { route } = this.props;
        const page = route.params.page;
        const session = await this.getStorage();
        let { name, typeUser, dateOfBirth, email, address, number, complement, city, uf, cep, id } = await session;
        this.setState({page, user:{ name, typeUser, dateOfBirth, email, address, number, complement, city, uf, cep, id }});
    }

    componentWillUnmount = async () => {
        this.setPage('perfil')
    }

    setPage(page){
        this.setState({page});
    }

    setEmail(email){
        const user = this.state.user;
        user.email = email;
        this.setState({user});
    }

    setValue(field,value){
        const user = this.state.user;
        user[field] = value;
        this.setState({user});
    }

    async update(){
        await userService.updateUser(this.state.user);
        delete this.state.user.password
        delete this.state.user.passwordConfirm
        await this.setStorage(this.state.user);
        this.setPage('perfil');
    }

    invalidPassword(){
        if(!this.state.user.password || !this.state.user.passwordConfirm){
            return true;
        }

        if(this.state.user.password != this.state.user.passwordConfirm){
            return true;
        }

        return false;
    }

    getCep = async (text) => {
        let cep = text.trim(); 
        const user = this.state.user;
        user.cep = cep;
        this.setState({
            user
        });        
        cep = text.replace('-','');
        if(cep && cep.length == 8){
            const data = await cepService.getCep(cep);
            user.address = data.street;
            user.city =  data.city;
            user.uf = data.state;
            this.setState({
                user
            });
        }
    }

    render() {
        const { navigation } = this.props;
        switch (this.state.page) {
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
                                        <Text style={styles.userInfoText}> {this.state.user.dateOfBirth} </Text>
                                    </View>

                                    <Text style={styles.userInfoTitle}> E-mail </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}> {this.state.user.email} </Text>
    
                                        <Pressable onPress={()=>{this.setPage('alterarEmail')}} style={styles.editButton}>
                                            <Text style={styles.editText}> Editar </Text>
                                        </Pressable>

                                    </View>
                                    
                                    <Text style={styles.userInfoTitle}> Endereço </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}>
                                            {" "}{this.state.user.address}, {this.state.user.number},
                                            {"\n"}{
                                                this.state.complement != null ?
                                                " " + this.state.user.complement + ", " : ""
                                            } {this.state.user.city} - {this.state.user.uf}. CEP {this.state.user.cep}
                                        </Text>
                                            
                                        <Pressable onPress={()=>{this.setPage('alterarEndereco')}} style={styles.editButton}>
                                            <Text style={styles.editText}> Editar </Text>
                                        </Pressable>


                                    </View>

                                    <Pressable>
                                        <Text onPress={()=>{this.setPage('alterarSenha')}} style={styles.changePassword}> Alterar minha senha </Text>
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
                            <Button title='Voltar' onPress={()=>{this.setPage('perfil')}}/>
                                <Text> Digite a Senha </Text>
                                <View>
                                    <TextInput 
                                    onChangeText = {(password) => this.setValue('password',password)}
                                    autoCapitalize = 'none'
                                    />
                                </View>

                                <Text> Digite a senha novamente </Text>
                                <View>
                                    <TextInput 
                                    onChangeText = {(password) => this.setValue('passwordConfirm',password)}
                                    autoCapitalize = 'none'
                                    />
                                </View>
                                <Button disabled={this.invalidPassword()} 
                                onPress={()=>{this.update()}} title='Atualizar'></Button>
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
                                <Button title='Voltar' onPress={()=>{this.setPage('perfil')}}/>
                                <Text> Email </Text>
                                <View>
                                    <TextInput 
                                    value={this.state.user.email}
                                    onChangeText = {(email) => this.setEmail(email)}
                                    autoCapitalize = 'none'
                                    />
                                </View>
                                <Button onPress={()=>{this.update()}} title='Atualizar'></Button>
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
                                <Button title='Voltar' onPress={()=>{this.setPage('perfil')}}/>
                                <Text> Endereço </Text>
                                <View>
                                    <TextInput 
                                    value={this.state.user.address}
                                    onChangeText = {(value) => this.setValue('address',value)}
                                    autoCapitalize = 'none'
                                    />
                                </View>
                                
                                <Text> Número </Text>
                                <View>
                                    <TextInput 
                                    value={this.state.user.number}
                                    onChangeText = {(value) => this.setValue('number',value)}
                                    autoCapitalize = 'none'
                                    />
                                </View>

                                <Text> Complemento </Text>
                                <View>
                                    <TextInput 
                                    value={this.state.user.complement}
                                    onChangeText = {(value) => this.setValue('complement',value)}
                                    autoCapitalize = 'none'
                                    />
                                </View>

                                <Text> Cidade </Text>
                                <View>
                                    <TextInput 
                                    value={this.state.user.city}
                                    onChangeText = {(value) => this.setValue('city',value)}
                                    autoCapitalize = 'none'
                                    />
                                </View>

                                <Text> UF </Text>
                                <View>
                                    <TextInput 
                                    value={this.state.user.uf}
                                    onChangeText = {(value) => this.setValue('uf',value)}
                                    autoCapitalize = 'none'
                                    />
                                </View>

                                <Text> CEP </Text>
                                <View>
                                    <TextInput 
                                    value={this.state.user.cep}
                                    onChangeText = {(value) => this.getCep(value)}
                                    autoCapitalize = 'none'
                                    />
                                </View>
                                <Button onPress={()=>{this.update()}} title='Atualizar'></Button>
                            </View>
                        </ScrollView>
                    </View>
                )
        }
    }
}