import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput, VirtualizedList } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, text, button, icon } from '../../styles/index.js';
import { TextInputMask } from 'react-native-masked-text';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

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
            <View style={styles.quitButtonView}>
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
                                                /**
                                                 * mask: (String | required | default '')
                                                 * the mask pattern
                                                 * 9 - accept digit.
                                                 * A - accept alpha.
                                                 * S - accept alphanumeric.
                                                 * * - accept all, EXCEPT white space.
                                                */
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
                
                <Modal
                    animationType="fade"
                    transparent={true}
                    isVisible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    onBackdropPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    swipeDirection={('down')}
                    onSwipeComplete={() => this.setState({ modalVisible: !this.state.modalVisible })}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalHeader}/>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle} > Abandonar cadastro </Text>
                            <Text> {"\n"} Você tem certeza que quer abandonar o {"\n"} cadastro e voltar para a tela inicial? {"\n"}{"\n"}</Text>

                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                        ? '#43515c'
                                        : '#2D363D',
                                    },
                                    button.button
                                ]}
                                onPress={this._abandon}
                            >
                                    <Text style={button.text}>
                                        Sim, abandonar {" "}
                                    </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}