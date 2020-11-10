import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput, Switch } from 'react-native';
import styles from './styles.js';
import { container, header, content } from '../../styles/index.js'


export default class App extends Component {
    render() {
        return (
            <View style={container}>
                <StatusBar style="light" />
                <View style={header}/>
                <View style={content}>
                    <View style={styles.registerScreen}>
                        <Text> Tela Cadastro Passo 1 </Text>
                    </View>
                </View>
            </View>
        );
    }
}

