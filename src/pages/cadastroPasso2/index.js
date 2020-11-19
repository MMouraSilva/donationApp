import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, button, icon, headerRight } from '../../styles/index.js';
import { TextInputMask } from 'react-native-masked-text';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AbandonarCadastro from '../abandonarCadastro/index.js';

export default class cadastroPasso2 extends Component {

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        modalVisible: false,
        cep: null,
        number: null,
        uf: null,
    }

    componentDidMount() {
    const { navigation } = this.props;
        navigation.setOptions({
        headerRight: () => (
            <View style={headerRight}>
                <Pressable
                    onPress={() => {
                        this.setState({ modalVisible: true })
                    }}
                >
                    <Icon name="md-close" size={30} color="#fff" />
                </Pressable>
            </View>
        ),
        })
    }

    _abandon = async () => {
        const { navigation } = this.props;
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
    }

    _continueRegister = async () => {
        const { navigation } = this.props;
        navigation.navigate('cadastroDoador')
    }

    render() {
        return (
            <View style={container}>
                <StatusBar style="light" />
                <View style={content}>
                    <Text style={title}> Falta pouco para criarmos {"\n"} sua conta! </Text>

                    <View style={Input.inputField}>
                        <Text style={Input.inputFieldText}> CEP </Text>
                        <View style={Input.inputView}>
                        <TextInputMask
                            style={Input.input}
                            type={'zip-code'}
                            value={this.state.cep}
                            onChangeText={text => {
                                this.setState({
                                cep: text
                                })
                            }}
                        />
                        </View>
                        
                        <Text style={Input.inputFieldText}> Logradouro </Text>
                        <View style={Input.inputView}>
                            <TextInput style={Input.input}/>
                        </View>

                        <View style={styles.inputField}>

                            <View style={styles.inputPair}>
                                <View style={styles.inputContent}>
                                    <Text style={styles.inputFieldText}> Número </Text>
                                    <View style={styles.inputView}>
                                        <TextInputMask
                                            style={styles.input}
                                            type={'only-numbers'}
                                            value={this.state.number}
                                            onChangeText={text => {
                                                this.setState({
                                                    number: text
                                                })
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputContent}>
                                    <Text style={styles.inputFieldText}> Complemento </Text>
                                    <View style={styles.inputView}>
                                        <TextInput style={styles.input}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.inputPair}>
                                <View style={styles.inputContent}>
                                    <Text style={styles.inputFieldText}> Cidade </Text>
                                    <View style={styles.inputView}>
                                        <TextInput style={styles.input}/>
                                    </View>
                                </View>

                                <View style={styles.inputContent}>
                                    <Text style={styles.inputFieldText}> UF </Text>
                                    <View style={styles.inputView}>
                                        
                                        <TextInputMask
                                            type={'custom'}
                                            options={{
                                                mask: 'AA',
                                                translation: { 
                                                    A: val => val.toUpperCase() 
                                                } 
                                            }}
                                            value={this.state.uf}
                                            onChangeText={text => {
                                                this.setState({
                                                uf: text
                                                })
                                            }}
                                            style={styles.input}
                                        />

                                    </View>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.buttonView}>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                        ? '#43515c'
                                        : '#2D363D'
                                    },
                                    button.button
                                ]}
                                onPress={this._continueRegister}
                            >
                                    <Text style={button.text}>
                                        Prosseguir {"   "}
                                    </Text>
                                    <Icon name="ios-arrow-forward" style={icon} />
                            </Pressable>
                        </View>

                    </View>
                </View>
                
                <AbandonarCadastro 
                    isVisible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    onSwipeComplete={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    onPress={this._abandon}
                />
            </View>
        );
    }
}