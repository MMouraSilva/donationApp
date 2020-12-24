import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import styles from './styles.js';
import { container, title, content, Input, button, icon, headerRight, titleView } from '../../styles/index.js';
import { TextInputMask } from 'react-native-masked-text';
import { RadioButton } from 'react-native-paper';
import {
    FontAwesome5 as FontIcon,
    Ionicons as Ioicon,
    MaterialCommunityIcons as MtcIcon, 
    MaterialIcons as MtIcon,
    Foundation as FdtIcon
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AbandonarCadastro from '../abandonarCadastro/index.js';
import cepService from './../../service/cepService';
import CheckBox from '@react-native-community/checkbox';
import userService from './../../service/userService.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class fluxoCadastro extends Component {

    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
        date_of_birth: null,
        type_user: null,
        cep: null,
        address: null,
        number: null,
        complement: null,
        city: null,
        uf: null,
        modalVisible: false,
        secureTextEntry: true,
        iconName: "eye",
        toggleCheckBox: false,
        isDatePickerVisible: false,
        showDate: null
    }

    _cadastroPasso2 = async () => {
        const { navigation } = this.props;
  
        if (this.state.name === null || this.state.date_of_birth === null || this.state.type_user === null)
        {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }
        navigation.push('fluxoCadastro', {
            name: this.state.name,
            date_of_birth: this.state.date_of_birth,
            type_user: this.state.type_user,
            page: 'cadastroPasso2' })
    }
    
    _cadastroPasso3 = async () => {
        const { navigation } = this.props;
        if (this.state.cep === null || this.state.address === null || this.state.number === null 
            || this.state.complement === null || this.state.city === null || this.state.uf === null) {
                Alert.alert('Erro', 'Preencha todos os campos!')
        }
        else if (this.state.type_user === 'd') {
            navigation.push('fluxoCadastro', { 
                name: this.state.name,
                date_of_birth: this.state.date_of_birth,
                type_user: this.state.type_user,
                cep: this.state.cep,
                address: this.state.address,
                number: this.state.number,
                complement: this.state.complement,
                city: this.state.city,
                uf: this.state.uf,
                page: 'cadastroDoador' })
            }
            else if (this.state.type_user === 'r') {
                navigation.push('fluxoCadastro', { 
                    name: this.state.name,
                    date_of_birth: this.state.date_of_birth,
                    type_user: this.state.type_user,
                    cep: this.state.cep,
                    address: this.state.address,
                    number: this.state.number,
                    complement: this.state.complement,
                    city: this.state.city,
                    uf: this.state.uf,
                    page: 'cadastroRecebedor' })
            }
    }

    _criarConta = async () => {
        if(this.state.switchValue == false && this.state.email.match(/@/)) {
            Alert.alert('E-mail Invalido', 'A criação deste tipo de conta é permitida apenas com o e-mail institucional.');
            return;
        } else if(this.state.switchValue == true && !this.state.email.match(/@/)) {
            Alert.alert('Erro', 'E-mail invalido.');
            return;
        } else if(this.state.password == this.state.confirmPassword) {
            Alert.alert('Erro', 'As senhas devem ser iguais!');
            return;
        } else if(this.state.toggleCheckBox == false) {
            Alert.alert('Erro', 'Você deve concordar com os termos de uso.');
            return;
        } else if(this.state.switchValue == false) {
            const userEmail = await this.state.email + '@aluno.ifsp.edu.br';
            this.setState({ email: userEmail});
        }

        const { navigation } = this.props;
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            dateOfBirth: this.state.date_of_birth,
            typeUser: this.state.type_user,
            cep: this.state.cep,
            address: this.state.address,
            number: this.state.number,
            complement: this.state.complement,
            city: this.state.city,
            uf: this.state.uf,
        }
            
        try{
            const userCreated = await userService.create(user);
            console.log(userCreated);
            navigation.navigate('login')
        }catch(error){
            console.log("Erro ao criar a conta", error);
            Alert.alert('Erro ao criar a conta', 'Houve algum erro ao tentar criar a conta, tente novamente mais tarde.');
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
    
    componentDidMount = async () => {
        const { navigation } = this.props;
        const { route } = this.props;
        const { name, date_of_birth, type_user, cep, address, number, complement, city, uf, page } = route.params;
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const showDate = day + ("-") + month + ("-") + year
        this.setState({ showDate })

        if (page == 'cadastroPasso2') {
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
            })

            this.setState({ name, date_of_birth, type_user })
        } else if (page == 'cadastroDoador') {
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
            })

            this.setState({ name, date_of_birth, type_user, cep, address, number, complement, city, uf })
        } else if (page == 'cadastroRecebedor') {
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
            })

            this.setState({ name, date_of_birth, type_user, cep, address, number, complement, city, uf })
        }
    }

    render() {
        const { type_user } = this.state;
        const { route } = this.props;
        const page = route.params.page;

        switch (page) {
            case 'cadastroPasso1':
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
                                    <Text style={title}> Crie sua conta e participe da {"\n"} comunidade </Text>
                                </View>
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
                                        <Pressable
                                            style={styles.datePicker}
                                            onPress={() => {
                                                this.setState({ isDatePickerVisible: true })
                                            }}
                                        >
                                                <Text style={styles.dateText}>
                                                    {this.state.showDate}
                                                </Text>
                                        </Pressable>
                                        <FdtIcon name="calendar" style={styles.dateIcon} />
                                        <DateTimePickerModal
                                            isVisible={this.state.isDatePickerVisible}
                                            mode="date"
                                            onConfirm={(date) => {
                                                const fullDate = date.getDate() + ("-") + (date.getMonth() + 1) + ("-") + date.getFullYear();
                                                this.setState({ 
                                                    date_of_birth: fullDate,
                                                    isDatePickerVisible: false,
                                                    showDate: fullDate
                                                })
                                            }}
                                            onCancel={() => {
                                                this.setState({ isDatePickerVisible: false })
                                            }}
                                        />
                                    </View>
            
                                    <Text style={styles.text}> Você quer se cadastrar como um: </Text>
                                    
                                    <View style={styles.radioView}>
                                        <View style={styles.radioField}>
                                            <RadioButton
                                                value="d"
                                                status={type_user === 'd' ? 'checked' : 'unchecked'}
                                                onPress={() => { this.setState({ type_user: "d" });} }
                                            />
                                            <Text style={styles.text}> Sou um doador </Text>
                                        </View>
            
                                        <View style={styles.radioField}>
                                            <RadioButton
                                                value="r"
                                                status={type_user === 'r' ? 'checked' : 'unchecked'}
                                                onPress={() => { this.setState({ type_user: 'r' }); }}
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
                        </ScrollView>
                    </View>
                )


            case 'cadastroPasso2':
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
                                    <Text style={title}> Falta pouco para criarmos {"\n"} sua conta! </Text>
                                </View>
            
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
                        </ScrollView>
                    </View>
                )

            case 'cadastroDoador': 
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
                                    <Text style={title}> Estamos quase lá! {"\n"} Finalize sua conta </Text>
                                </View>
                                
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
                                        onPress={this._criarConta}
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
                        </ScrollView>
                    </View>
                )
            
            case 'cadastroRecebedor':
                return(
                    <View style={container}>
                        <ScrollView
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        >
                            <StatusBar style="light" />
            
                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}> Estamos quase lá! {"\n"} Finalize sua conta </Text>
                                </View>
                                
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
                                            onChangeText={(text) => this.setState({ password: text })}
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
                                            onChangeText={(text) => this.setState({ confirmPassword: text })}
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
                                        onPress={this._criarConta}
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
                        </ScrollView>
                    </View>
                )
        }
    }
}