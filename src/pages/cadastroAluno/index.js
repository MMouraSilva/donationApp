import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, button, icon, headerRight } from '../../styles/index.js';
import { MaterialCommunityIcons as Icon, MaterialIcons as MtIcon, Ionicons as IoIcon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import AbandonarCadastro from '../abandonarCadastro/index.js';

export default class cadastroAluno extends Component {

    state = {
        emailInput: null,
        email: null,
        secureTextEntry: true,
        iconName: "eye",
        toggleCheckBox: false,
        modalVisible: false
    }

    onIconPress = () => {
        let iconName = this.state.secureTextEntry ? "eye-off" : "eye"

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    _createAccount = async () => {
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

    _abandon = async () => {
        const { navigation } = this.props;
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
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
                        <IoIcon name="md-close" size={30} color="#fff" />
                    </Pressable>
                </View>
            ),
            })
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
                    <Text style={title}> Estamos quase lá! {"\n"} Finalize sua conta </Text>
                    
                    <View style={Input.inputField}>
                        <Text style={Input.inputFieldText}> E-mail institucional </Text>
                        <View style={Input.inputView}>
                            <TextInput 
                                style={Input.input}
                                onChangeText={(inputValue) => this.setState({ emailInput: inputValue })}
                            />
                                <Text>
                                    @aluno.ifsp.edu.br
                                </Text>
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

                        <Text style={Input.inputFieldText}> Confirmar Senha </Text>
                        <View style={Input.inputView}>
                            <TextInput {...this.props} 
                                style={Input.input}
                                secureTextEntry={this.state.secureTextEntry}
                            />
                            <Pressable onPress={this.onIconPress}>
                                <Icon name={this.state.iconName} size={20} />
                            </Pressable>
                        </View>

                        <View style={styles.checkBoxView}>
                            <CheckBox
                                disabled={false}
                                value={this.state.toggleCheckBox}
                                onValueChange={(newValue) => this.setState({ toggleCheckBox: newValue })}
                            />
                            <Text style={styles.checkBoxText}>
                                Li e concordo com os termos de uso {"\n"} e privacidade
                            </Text>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                    ? '#43515c'
                                    : '#2D363D'
                                },
                                button.button
                            ]} 
                            onPress={this._createAccount}
                        >
                            <MtIcon name="account-box" style={icon} />
                            <Text style={button.text}>
                                {" "} Criar minha conta 
                            </Text>
                        </Pressable>
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