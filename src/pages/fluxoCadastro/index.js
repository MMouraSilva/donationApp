import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, button, icon, headerRight } from '../../styles/index.js';
import { TextInputMask } from 'react-native-masked-text';
import { RadioButton } from 'react-native-paper';
import { FontAwesome5 as FontIcon, Ionicons as Ioicon, MaterialCommunityIcons as MtcIcon, MaterialIcons as MtIcon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AbandonarCadastro from '../abandonarCadastro/index.js';
import cepService from './../../service/cepService';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';

export default class fluxoCadastro extends Component {

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        name: null,
        email: null,
        date_of_birth: null,
        type_user: null,
        cep: null,
        address: null,
        number: null,
        complement: null,
        city: null,
        uf: null,
        page: 'cadastroPasso1',
        modalVisible: false,
        secureTextEntry: true,
        iconName: "eye",
        toggleCheckBox: false,
    }

    _cadastroPasso2 = async () => {
        if (this.state.name === null || this.state.date_of_birth === null || this.state.type_user === null)
        {
            alert("Preencha todos os campos!");
        }
        else
        {
            this.setState({page: 'cadastroPasso2'})
        }
    }

    _criarContaAluno = async () => {
        if(this.state.switchValue === false) {
            if(this.state.email.match(/@/)) {
                alert('E-mail Invalido');
            }
            else {
                const userEmail = await this.state.email + '@aluno.ifsp.edu.br';
                this.setState({ email: userEmail});
            }
        }
    }

    _criarContaDoador = async () => {

    }

    _cadastroPasso3 = async () => {
        if (this.state.cep === null || this.state.address === null || this.state.number === null 
            || this.state.complement === null || this.state.city === null || this.state.uf === null) {
                alert('Preencha todos os campos!')
        }
        else if (this.state.type_user === 'd') {
                this.setState({ page: 'cadastroDoador' })
            }
            else if (this.state.type_user === 'recebedor') {
                this.setState({ page: 'cadastroRecebedor' })
            }
    }

    onIconPress = () => {
        let iconName = this.state.secureTextEntry ? "eye-off" : "eye"

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }
    
    _abandon = async () => {
        const { navigation } = this.props;
        navigation.reset({
            index: 0,
            routes: [{ name: 'login' }],
        });
    }

        getCep = async (text) => {
        this.setState({
            cep: text
        });
        if(text && text.length == 9){
            text = text.replace('-','');
            const data = await cepService.getCep(text);
            this.setState({
                address: data.street,
                city: data.city,
                uf: data.state,
            });
        }
    }

    render() {
        const { type_user } = this.state;
        const { navigation } = this.props;
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const date = day + '-' + month + '-' + year;

        switch (this.state.page) {
            case 'cadastroPasso1':
                
                navigation.setOptions({
                    
                    headerRight: () => (
                        <View>
                        </View>
                    ),

                    headerLeft: () => (
                        <View style={styles.headerLeft}>
                            <Pressable onPress={this._abandon}>
                                <Ioicon name="md-arrow-back" size={30} color="#fff" />
                            </Pressable>
                        </View>
                    ),
                })

                return (
                    <View style={container}>
                        <StatusBar style="light" />
                        <View style={content}>
                            <Text style={title}> Crie sua conta e participe da {"\n"} comunidade </Text>
                            <View style={Input.inputField}>
                                <Text style={Input.inputFieldText}> Nome Completo </Text>
                                <View style={Input.inputView}>
                                    <TextInput 
                                        value={this.state.name}
                                        style={Input.input}
                                        onChangeText={(text) => this.setState({ name: text })}
                                    />
                                </View>
        
                                <Text style={Input.inputFieldText}> Data de Nascimento </Text>
                                <View style={styles.dateView}>
                                    <DatePicker
                                        date={this.state.date_of_birth}
                                        mode="date"
                                        format="DD-MM-YYYY"
                                        minDate="01-01-1920"
                                        maxDate={date}
                                        confirmBtnText="Confirmar"
                                        cancelBtnText="Cancelar"
                                        onDateChange={(date) => {
                                            this.setState({
                                                date_of_birth: date
                                            })
                                        }}
                                        style={styles.dataPicker}
                                    />
                                </View>
        
                                <Text style={styles.text}> Você quer se cadastrar como um: </Text>
                                
                                <View style={styles.radioView}>
                                    <View style={styles.radioField}>
                                        <RadioButton
                                            value="d"
                                            status={type_user === 'd' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ type_user: 'd' }); }}
                                        />
                                        <Text style={styles.text}> Sou um doador </Text>
                                    </View>
        
                                    <View style={styles.radioField}>
                                        <RadioButton
                                            value="recebedor"
                                            status={type_user === 'recebedor' ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setState({ type_user: 'recebedor' }); }}
                                        />
                                        <View style={styles.textView}>
                                            <Text style={styles.subText}> Apenas para estudantes do IFSP! </Text>
                                            <Text style={styles.text}> Sou um recebedor </Text>
                                        </View>
                                        <Pressable style={styles.iconButton}>
                                            <FontIcon name="question-circle" size={20} color="black" />
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
                                    onPress={this._cadastroPasso2}
                                >
                                        <Text style={button.text}>
                                            Prosseguir {"   "}
                                        </Text>
                                        <Ioicon name="ios-arrow-forward" style={icon} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )


            case 'cadastroPasso2':

                navigation.setOptions({
                headerRight: () => (
                    <View style={headerRight}>
                        <Pressable
                            onPress={() => {
                                this.setState({ modalVisible: true })
                            }}
                        >
                            <Ioicon name="md-close" size={30} color="#fff" />
                        </Pressable>
                    </View>
                ),

                headerLeft: () => (
                    <View style={styles.headerLeft}>
                        <Pressable
                            onPress={() => {
                                this.setState({ page: "cadastroPasso1" })
                            }}
                        >
                            <Ioicon name="md-arrow-back" size={30} color="#fff" />
                        </Pressable>
                    </View>
                ),
                })

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
                                        this.getCep(text);
                                    }}
                                />
                                </View>
                                
                                <Text style={Input.inputFieldText} > Logradouro </Text>
                                <View style={Input.inputView}>
                                    <TextInput 
                                        style={Input.input} 
                                        value={this.state.address} 
                                        onChangeText={text => {                                                               
                                            this.setState({
                                                address: text
                                            });
                                        }}
                                    />
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
                                            <Text style={styles.inputFieldText} > Complemento </Text>
                                            <View style={styles.inputView}>
                                                <TextInput 
                                                    style={styles.input}
                                                    value={this.state.complement}
                                                    onChangeText={text => {                                                               
                                                        this.setState({ complement: text });
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
        
                                    <View style={styles.inputPair}>
                                        <View style={styles.inputContent}>
                                            <Text style={styles.inputFieldText} > Cidade </Text>
                                            <View style={styles.inputView}>
                                                <TextInput 
                                                    style={styles.input} 
                                                    value={this.state.city} 
                                                    onChangeText={text => {                                                               
                                                        this.setState({ city: text });
                                                    }}
                                                />
                                            </View>
                                        </View>
        
                                        <View style={styles.inputContent}>
                                            <Text style={styles.inputFieldText} > UF </Text>
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
                                        onPress={this._cadastroPasso3}
                                    >
                                            <Text style={button.text}>
                                                Prosseguir {"   "}
                                            </Text>
                                            <Ioicon name="ios-arrow-forward" style={icon} />
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
                )

            case 'cadastroDoador': 
                navigation.setOptions({
                    headerRight: () => (
                        <View style={headerRight}>
                            <Pressable
                                onPress={() => {
                                    this.setState({ modalVisible: true })
                                }}
                            >
                                <Ioicon name="md-close" size={30} color="#fff" />
                            </Pressable>
                        </View>
                    ),

                    headerLeft: () => (
                        <View style={styles.headerLeft}>
                            <Pressable
                                onPress={() => {
                                    this.setState({ page: "cadastroPasso2" })
                                }}
                            >
                                <Ioicon name="md-arrow-back" size={30} color="#fff" />
                            </Pressable>
                        </View>
                    ),
                })
                return (
                    <View style={container}>
                        <StatusBar style="light" />
        
                        <View style={content}>
                            <Text style={title}> Estamos quase lá! {"\n"} Finalize sua conta </Text>
                            
                            <View style={Input.inputField}>
                                <Text style={Input.inputFieldText}> E-mail </Text>
                                <View style={Input.inputView}>
                                    <TextInput 
                                        style={Input.input}
                                        onChangeText={(text) => this.setState({ email: text })}
                                    />
                                </View>
        
                                <Text style={Input.inputFieldText}> Senha </Text>
                                <View style={Input.inputView}>
                                    <TextInput {...this.props} 
                                        style={Input.input}
                                        secureTextEntry={this.state.secureTextEntry}
                                    />
                                    <Pressable onPress={this.onIconPress}>
                                        <MtcIcon name={this.state.iconName} size={20} />
                                    </Pressable>
                                </View>
        
                                <Text style={Input.inputFieldText}> Confirmar Senha </Text>
                                <View style={Input.inputView}>
                                    <TextInput {...this.props} 
                                        style={Input.input}
                                        secureTextEntry={this.state.secureTextEntry}
                                    />
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
                                    onPress={this._criarContaDoador}
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
                )
            
            case 'cadastroRecebedor':
                navigation.setOptions({
                    headerRight: () => (
                        <View style={headerRight}>
                            <Pressable
                                onPress={() => {
                                    this.setState({ modalVisible: true })
                                }}
                            >
                                <Ioicon name="md-close" size={30} color="#fff" />
                            </Pressable>
                        </View>
                    ),

                    headerLeft: () => (
                        <View style={styles.headerLeft}>
                            <Pressable
                                onPress={() => {
                                    this.setState({ page: "cadastroPasso2" })
                                }}
                            >
                                <Ioicon name="md-arrow-back" size={30} color="#fff" />
                            </Pressable>
                        </View>
                    ),
                })
                return(
                    <View style={container}>
                        <StatusBar style="light" />
        
                        <View style={content}>
                            <Text style={title}> Estamos quase lá! {"\n"} Finalize sua conta </Text>
                            
                            <View style={Input.inputField}>
                                <Text style={Input.inputFieldText}> E-mail institucional </Text>
                                <View style={Input.inputView}>
                                    <TextInput 
                                        style={Input.input}
                                        onChangeText={(text) => this.setState({ email: text })}
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
                                        <MtcIcon name={this.state.iconName} size={20} />
                                    </Pressable>
                                </View>
        
                                <Text style={Input.inputFieldText}> Confirmar Senha </Text>
                                <View style={Input.inputView}>
                                    <TextInput {...this.props} 
                                        style={Input.input}
                                        secureTextEntry={this.state.secureTextEntry}
                                    />
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
                                    onPress={this._criarContaAluno}
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
                )

            default:
                return (
                  <div>You are a User.</div>
                )

        }
    }
}