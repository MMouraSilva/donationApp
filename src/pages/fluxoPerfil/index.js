import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Pressable, ScrollView, Dimensions, TextInput, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styles from './styles.js';
import { container, content, titleView, title, Input, icon, button } from '../../styles/index.js';
import { FontAwesome as FtIcon, Ionicons as Ioicon, MaterialCommunityIcons as MtcIcon } from '@expo/vector-icons';
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
            id: null,
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
            password: null,
            passwordConfirm: null,
        },
        oldEmail: null,
        oldEmailConfirm: null,
        page: 'perfil',
        iconName: "eye",
        secureTextEntry: true,
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

    onIconPress = () => {
        let iconName = this.state.secureTextEntry ? "eye-off" : "eye"

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    componentDidMount = async () => {
        const { route } = this.props;
        const page = route.params.page;
        const session = await this.getStorage();
        let { name, typeUser, dateOfBirth, email, address, number, complement, city, uf, cep, id } = await session;
        this.setState({page, oldEmail: email, user:{ name, typeUser, dateOfBirth, email, address, number, complement, city, uf, cep, id }});
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
        const { navigation } = this.props;
        if(this.state.page == "alterarSenha" && this.invalidPassword == true){
            Alert.alert("Erro", "As senhas devem ser iguais.");
            return;
        }
        if(this.state.page == "alterarEmail" && this.state.oldEmail != this.state.oldEmailConfirm){
            Alert.alert("Erro", "O email antigo está incorreto.");
            return;
        }
            await userService.updateUser(this.state.user);
            delete this.state.user.password
            delete this.state.user.passwordConfirm
            await this.setStorage(this.state.user);
            navigation.goBack();
            navigation.navigate('DrawerNavigator', {
                screen: 'fluxoPerfil',
                params: {
                    userInfo: this.state.user,
                }
            })
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
        const { route } = this.props;
        let userInfo
        if(route.params.userInfo == null) {
            userInfo = this.state.user;
       }else {
           userInfo = route.params.userInfo;
       }

        switch (this.state.page) {
            case 'perfil':
                return (
                    <View style={container}>
                            <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                                <Pressable onPress={ navigation.openDrawer }>
                                    <FtIcon name="reorder" style={icon.headerIcon}/>
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
                                                userInfo.typeUser == "r" ?
                                                "Recebedor" :
                                                userInfo.typeUser == "d" ?
                                                "Doador" :
                                                null
                                            }
                                         </Caption>
                                        <Title style={styles.title}> {userInfo.name} </Title>
                                    </View>
                                </View>

                                <View style={styles.userInfoView}>
                                    <Text style={styles.userInfoTitle}> Data de nascimento </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}> {userInfo.dateOfBirth} </Text>
                                    </View>

                                    <Text style={styles.userInfoTitle}> E-mail </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}> {userInfo.email} </Text>
    
                                        <Pressable 
                                            onPress={()=> {
                                                navigation.push('DrawerNavigator', {
                                                    screen: 'fluxoPerfil',
                                                    params: { 
                                                        page: 'alterarEmail'
                                                    }
                                                })
                                            }}
                                            style={styles.editButton}
                                        >
                                            <Text style={styles.editText}> Editar </Text>
                                        </Pressable>

                                    </View>
                                    
                                    <Text style={styles.userInfoTitle}> Endereço </Text>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userInfoText}>
                                            {" "}{userInfo.address}, {userInfo.number},
                                            {"\n"}{
                                                userInfo.complement != null ? 
                                                userInfo.complement != "" ?
                                                " " + userInfo.complement + ", " : "" : ""
                                            } {userInfo.city} - {userInfo.uf} CEP {userInfo.cep}
                                        </Text>
                                            
                                        <Pressable 
                                            onPress={()=> {
                                                navigation.push('DrawerNavigator', {
                                                    screen: 'fluxoPerfil',
                                                    params: { 
                                                        page: 'alterarEndereco'
                                                    }
                                                })
                                            }}
                                            style={styles.editButton}
                                        >
                                            <Text style={styles.editText}> Editar </Text>
                                        </Pressable>


                                    </View>

                                    <Pressable
                                        onPress={()=> {
                                            navigation.push('DrawerNavigator', {
                                                screen: 'fluxoPerfil',
                                                params: { 
                                                    page: 'alterarSenha'
                                                }
                                            })
                                        }}
                                    >
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
                        <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                            <Pressable onPress={ navigation.openDrawer }>
                                <FtIcon name="reorder" style={icon.headerIcon}/>
                            </Pressable>
                        </Appbar.Header>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}>Alteração de dados: {"\n"}Senha </Text>
                                </View>
                                <View style={styles.inputField}>
                                    {/*
                                    <Text style={Input.inputFieldText}> Senha antiga </Text>
                                    <View style={Input.inputView}>
                                        <TextInput
                                            style={Input.input}
                                            secureTextEntry={this.state.secureTextEntry}
                                            onChangeText = {(password) => this.setState({ oldPassword })}
                                            autoCapitalize = 'none'
                                        />
                                        <Pressable onPress={this.onIconPress}>
                                            <Icon name={this.state.iconName} size={20} />
                                        </Pressable>
                                    </View>*/}
                                    
                                    <Text style={Input.inputFieldText}> Nova senha </Text>
                                    <View style={Input.inputView}>
                                        <TextInput
                                            style={Input.input}
                                            onChangeText = {(password) => this.setValue('password',password)}
                                            secureTextEntry={this.state.secureTextEntry}
                                            autoCapitalize = 'none'
                                        />
                                        <Pressable onPress={this.onIconPress}>
                                            <MtcIcon name={this.state.iconName} size={20} />
                                        </Pressable>
                                    </View>

                                    <Text style={Input.inputFieldText}> Confirmar nova senha </Text>
                                    <View style={Input.inputView}>
                                        <TextInput
                                            style={Input.input}
                                            onChangeText = {(password) => this.setValue('passwordConfirm',password)}
                                            secureTextEntry={this.state.secureTextEntry}
                                            autoCapitalize = 'none'
                                        />
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
                                        onPress={()=>{this.update()}}
                                    >
                                            <Ioicon name="md-checkmark" style={icon.nextIcon} />
                                            <Text style={button.text}>
                                                {"   "} Atualizar
                                            </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )

            case 'alterarEmail':
                return (
                    <View style={container}>
                        <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                            <Pressable onPress={ navigation.openDrawer }>
                                <FtIcon name="reorder" style={icon.headerIcon}/>
                            </Pressable>
                        </Appbar.Header>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}>Alteração de dados: {"\n"}E-mail </Text>
                                </View>
                                <View style={styles.inputField}>
                                    <Text style={Input.inputFieldText}> E-mail antigo </Text>
                                    <View style={Input.inputView}>
                                        <TextInput 
                                            style={Input.input}
                                            onChangeText = {(text) => {this.setState({ oldEmailConfirm: text })}}
                                            autoCapitalize = 'none'
                                        />
                                    </View>

                                    <Text style={Input.inputFieldText}> Novo e-mail </Text>
                                    <View style={Input.inputView}>
                                        <TextInput 
                                            style={Input.input}
                                            onChangeText={(text) => this.setEmail(text)}
                                            autoCapitalize='none'
                                        />
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
                                        onPress={()=>{this.update()}}
                                    >
                                            <Ioicon name="md-checkmark" style={icon.nextIcon} />
                                            <Text style={button.text}>
                                                {"   "} Atualizar
                                            </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )

            case 'alterarEndereco':
                return (
                    <View style={container}>
                        <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                            <Pressable onPress={ navigation.openDrawer }>
                                <FtIcon name="reorder" style={icon.headerIcon}/>
                            </Pressable>
                        </Appbar.Header>
                        <ScrollView>
                            <StatusBar style="light" />
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}>Alteração de dados: {"\n"}Endereço </Text>
                                </View>
                                <View style={styles.inputField}>
                                    <Text style={Input.inputFieldText}> CEP </Text>
                                    <View style={Input.inputView}>
                                        <TextInputMask
                                            style={Input.input}
                                            type={'zip-code'}
                                            value={this.state.user.cep}
                                            onChangeText={(value) => { this.getCep(value); }}
                                        />
                                    </View>

                                    <Text style={Input.inputFieldText}> Logradouro </Text>
                                    <View style={Input.inputView}>
                                        <TextInput 
                                            value={this.state.user.address}
                                            onChangeText = {(value) => this.setValue('address',value)}
                                            autoCapitalize = 'none'
                                            style={Input.input}
                                        />
                                    </View>
                                    
                                    <View style={styles.halfInputField}>
                                        <View style={styles.inputPair}>
                                            <View style={styles.inputContent}>
                                                <Text style={Input.inputFieldText}> Número </Text>
                                                <View style={styles.inputView}>
                                                    <TextInputMask
                                                        style={styles.input}
                                                        type={'only-numbers'}
                                                        value={this.state.user.number}
                                                        onChangeText = {(value) => this.setValue('number',value)}
                                                    />
                                                </View>
                                            </View>

                                            <View style={styles.inputContent}>
                                                <Text style={Input.inputFieldText}> Complemento </Text>
                                                <View style={styles.inputView}>
                                                    <TextInput 
                                                        value={this.state.user.complement}
                                                        onChangeText = {(value) => this.setValue('complement',value)}
                                                        autoCapitalize = 'none'
                                                        style={styles.input}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.inputPair}>
                                            <View style={styles.inputContent}>
                                                <Text style={Input.inputFieldText}> Cidade </Text>
                                                <View style={styles.inputView}>
                                                    <TextInput 
                                                        value={this.state.user.city}
                                                        onChangeText = {(value) => this.setValue('city',value)}
                                                        autoCapitalize = 'none'
                                                        style={styles.input}
                                                    />
                                                </View>
                                            </View>

                                            <View style={styles.inputContent}>
                                                <Text style={Input.inputFieldText}> UF </Text>
                                                <View style={styles.inputView}>
                                                    <TextInputMask
                                                        type={'custom'}
                                                        options={{
                                                            mask: 'AA',
                                                            translation: { 
                                                                A: val => val.toUpperCase() 
                                                            } 
                                                        }}
                                                        value={this.state.user.uf}
                                                        onChangeText = {(value) => this.setValue('uf',value)}
                                                        style={styles.input}
                                                    />
                                                </View>
                                            </View>
                                        </View>
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
                                        onPress={()=>{this.update()}}
                                    >
                                            <Ioicon name="md-checkmark" style={icon.nextIcon} />
                                            <Text style={button.text}>
                                                {"   "} Atualizar
                                            </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )
        }
    }
}