import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput, Switch } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, text, button, icon } from '../../styles/index.js';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default class Login extends Component {

    state = {
        switchValue: false,
        emailInput: null,
        status: false,
        email: null,
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
        if(this.state.switchValue === false) {
            if(this.state.emailInput.match(/@/)) {
                alert('E-mail Invalido');
            }
            else {
                const userEmail = await this.state.emailInput + '@aluno.ifsp.edu.br';
                this.setState({ email: userEmail});
            }
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
                <StatusBar style="light" />

                <View style={content}>
                    <Text style={title}> Entre com sua conta e {"\n"} contribua com a comunidade </Text>
                    
                    <View style={Input.inputField}>
                        <Text style={Input.inputFieldText}> E-mail </Text>
                        <View style={Input.inputView}>
                            <TextInput 
                                style={Input.input}
                                onChangeText={(inputValue) => this.setState({ emailInput: inputValue })}
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
                            onPress={() => navigation.navigate('cadastroPasso1')}
                        >
                            <Text style={styles.createAccount}>Crie uma conta</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
}