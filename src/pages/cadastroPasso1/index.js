import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, button, icon } from '../../styles/index.js';
import { TextInputMask } from 'react-native-masked-text';
import { RadioButton } from 'react-native-paper';
import { FontAwesome5 as Icon, Ionicons as Ioicon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default class cadastroPasso1 extends Component {

    state = {
        dt: null,
        checked: null
    }

    _continueRegister = async () => {
        const { navigation } = this.props;
        navigation.navigate('cadastroPasso2', {visible: false});
    }

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    render() {
        const { checked } = this.state;
        return (
            <View style={container}>
                <StatusBar style="light" />
                <View style={content}>
                    <Text style={title}> Crie sua conta e participe da {"\n"} comunidade </Text>
                    <View style={Input.inputField}>
                        <Text style={Input.inputFieldText}> Nome Completo </Text>
                        <View style={Input.inputView}>
                            <TextInput 
                                style={Input.input}
                                onChangeText={(inputValue) => this.setState({ emailInput: inputValue })}
                            />
                        </View>

                        <Text style={Input.inputFieldText}> Data de Nascimento </Text>
                        <View style={Input.inputView}>
                            <TextInputMask
                                style={Input.input}
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY'
                                }}
                                value={this.state.dt}
                                onChangeText={(text) => {
                                    this.setState({
                                        dt: text
                                    })
                                }}
                                ref={(ref) => this.dateTimeField = ref}
                            />
                        </View>

                        <Text style={styles.text}> Você quer se cadastrar como um: </Text>
                        
                        <View style={styles.radioView}>
                            <View style={styles.radioField}>
                                <RadioButton
                                    value="first"
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: 'first' }); }}
                                />
                                <Text style={styles.text}> Sou um doador </Text>
                            </View>

                            <View style={styles.radioField}>
                                <RadioButton
                                    value="second"
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: 'second' }); }}
                                />
                                <View style={styles.textView}>
                                    <Text style={styles.subText}> Apenas para estudantes do IFSP! </Text>
                                    <Text style={styles.text}> Sou um recebedor </Text>
                                </View>
                                <Pressable style={styles.iconButton}>
                                    <Icon name="question-circle" size={20} color="black" />
                                </Pressable>
                            </View>
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
                            onPress={this._continueRegister}
                        >
                                <Text style={button.text}>
                                    Prosseguir {"   "}
                                </Text>
                                <Ioicon name="ios-arrow-forward" style={icon} />
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
}