import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput, Switch, Alert, ScrollView } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, text, button, icon, titleView } from '../../styles/index.js';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import userService from './../../service/userService.js';

export default class Login extends Component {

    state = {
        switchValue: false,
        emailInput: null,
        status: false,
        email: null,
        password: null,
        type_user: null,
        secureTextEntry: true,
        iconName: "eye"
    }

    onIconPress = () => {
        let iconName = this.state.secureTextEntry ? "eye-off" : "eye"

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    componentDidMount() {
        this.setState({ switchValue: false, status: false})
    }

    toggleSwitch = value => {
        this.setState({ switchValue: value, status: value });
    }

    _login = async () => {
        const { navigation } = this.props;
        try{
            if(this.state.switchValue === false) {
                if(this.state.emailInput.match(/@/)) {
                    Alert.alert('E-mail Invalido');
                    return;
                }
            }
            const userEmail = await this.state.emailInput + '@aluno.ifsp.edu.br';
            this.setState({ email: userEmail});

            const loginForms = {
                email: this.state.email,
                password: this.state.password
            }
            const session = await userService.login(loginForms);

            navigation.reset({
                index: 0,
                routes: [{ name: 'telaInicial' }],
            });
        }catch(error) {
            console.log("Erro ao fazer login", error);
            Alert.alert("Erro ao fazer login", "Email ou senha incorretos.");
        }

    }

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={container}>
                <ScrollView
                    showsVerticalScrollIndicator ={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                >
                    <StatusBar style="light" />

                    <View style={content}>
                        <View style={titleView}>
                            <Text style={title}> Entre com sua conta e {"\n"} contribua com a comunidade </Text>
                        </View>
                        
                        <View style={Input.inputField}>
                            <Text style={Input.inputFieldText}> E-mail </Text>
                            <View style={Input.inputView}>
                                <TextInput 
                                    style={Input.input}
                                    onChangeText = {(emailInput) => this.setState({ emailInput })}
                                    />
                                {
                                    this.state.status ? null : <Text>
                                        @aluno.ifsp.edu.br
                                    </Text>
                                }
                            </View>

                            <Text style={Input.inputFieldText}> Senha </Text>
                            <View style={Input.inputView}>
                                <TextInput {...this.props} 
                                    style={Input.input}
                                    secureTextEntry={this.state.secureTextEntry}
                                    onChangeText = {(password) => this.setState({ password })}
                                />
                                <Pressable onPress={this.onIconPress}>
                                    <Icon name={this.state.iconName} size={20} />
                                </Pressable>
                            </View>

                            <Pressable
                                style={styles.forgot}
                                //onPress={() => alert('Recuperar Senha')}
                            >
                                <Text style={styles.forgotText}>
                                    Esqueci minha senha
                                </Text>
                            </Pressable>

                            <Text style={styles.switchText}>
                                <Switch
                                    style={styles.switch}
                                    onValueChange={this.toggleSwitch}
                                    value={this.state.switchValue}
                                />
                                Sou um doador
                            </Text>

                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                        ? '#43515c'
                                        : '#2D363D'
                                    },
                                    button.button
                                ]}
                                onPress={this._login}
                                >
                                    <Text style={button.text}>
                                        Entrar {" "}
                                    </Text>
                                    <Icon name="location-enter" style={icon} />
                            </Pressable>

                            <Text style={text}>Ainda não possui uma conta?</Text>
                            <Pressable
                                onPress={() => navigation.navigate('fluxoCadastro', {page: 'cadastroPasso1'})}
                                >
                                <Text style={styles.createAccount}>Crie uma conta</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}