import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput, Switch } from 'react-native';
import styles from './styles.js'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
            iconName: "eye",
        }
    }

    state = {
        switchValue: false
    }

    onIconPress = () => {
        let iconName = this.state.secureTextEntry ? "eye-off" : "eye"

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    toggleSwitch = value => {
        this.setState({ switchValue: value });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}/>

                <View style={styles.content}>
                    <Text style={styles.title}> Entre com sua conta e {"\n"} contribua com a comunidade </Text>
                    
                    <View style={styles.loginScreen}>
                        <Text style={styles.text}> E-mail </Text>
                        <View style={styles.email}>
                            <TextInput style={styles.loginInput}/>
                        </View>

                        <Text style={styles.text}> Senha </Text>
                        <View style={styles.password}>
                            <TextInput {...this.props} 
                                style={styles.passwordInput}
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
                                styles.button
                            ]}
                            //onPress={() => alert('Pressionado')}
                        >
                                <Text style={styles.buttonText}>
                                    Entrar {" "}
                                </Text>
                                <Icon name="location-enter" style={styles.icon} />
                        </Pressable>

                        <Text style={styles.textAccount}>Ainda não possui uma conta?</Text>
                        <Pressable>
                            <Text style={styles.createAccount}>Crie uma conta</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        );
    }
}

