import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import { container, title, content, Input, button, icon, titleView } from './../../styles/index';
import styles from './styles.js';
import { Picker } from '@react-native-picker/picker';
import categoryService from './../../service/categoryService';
import donationService  from './../../service/donationService';
import { AntDesign as AntIcons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class formEquips extends Component {

  function(props) {
    const navigation = useNavigation();
    return <MyBackButton {...props} navigation={navigation} />
  }

  state = {
    donation: {
      id: null,
      name: null,
      equipmentDescription: null,
      allowWithdrawalAddress: false,
      category: null,
      donorId: null,
      recipientId: null,
      status: null,
      interestedStudent: null,
      equipmentDelivery: null,
      creationDate: new Date(),
    },
    categorys:[],
    categorySelected:'',
    user : {}
  }

  getStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@sessionAccount')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log("Deu erro:", e);
    }
}


  componentDidMount = async () => {
    if(this.state.categorys.length == 0){
      const response = await categoryService.getAllCategory();
      this.state.categorys = response.data;
      this.setState({ categorys:this.state.categorys});
    }
    if(this.state.user.name == undefined){
      const response = await this.getStorage();
      const user = response;
      this.setState({user})
    }
  }

  setAllowWithdrawalAddress(value){
    this.state.donation.allowWithdrawalAddress = value;
    this.setState({ donation:this.state.donation});
  }

  setName(name){
    this.state.donation.name = name;
    this.setState({ donation:this.state.donation});
  }

  setCategory(value){
    this.state.donation.category = value;
    this.setState({ donation:this.state.donation});
    this.state.categorySelected = value;
    this.setState({ categorySelected:this.state.categorySelected});
  }

  getCategoryAll(){
    const pickers = [];
    this.state.categorys.forEach((category,index) => {
      pickers.push(<Picker.Item key={index} label={category.name} value={category.name} />);
    });
    return pickers
  }

  isValidAddress(){
    return this.state.user.number && this.state.user.address;
  }
  

  setDescription(description){
    this.state.donation.equipmentDescription = description;
    this.setState({ donation:this.state.donation});
  }

  
  async createEquip(){
    const { navigation } = this.props;
    const donation = this.state.donation;
    // pegar o id do usuario logado e colocar na propriedade do donation.donorId
    donation.donorId = this.state.user.id;
    const response = await donationService.createDonation(donation);
    if(!response){
      // exibir para o usuario que houve um erro e voltar para a lista de equipamentos
      Alert.alert("Erro", "Não foi possível criar a doação.");
      navigation.goBack();
      navigation.navigate('DrawerNavigator', {
        screen: 'TabStackNavigator',
      })
    }
    // navegar pra a lista de equipamentos
    navigation.goBack();
    navigation.navigate('DrawerNavigator', {
      screen: 'TabStackNavigator',
    })
  }

  async updateEquip(){
    const { navigation } = this.props;
    const response = await donationService.updateDonation(donation);
    if(!response){
      // exibir para o usuario que houve um erro e voltar para a lista de equipamentos
      Alert.alert("Erro", "Não foi possível atualizar a doação.");
      navigation.goBack();
    }
    navigation.goBack();
  }

  render() {
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
              <Text style={title}> Doe um equipamento para a {"\n"} comunidade </Text>
            </View>

            <View style={styles.inputField}>
              <Text style={Input.inputFieldText}> Título do equipamento </Text>
              <View style={Input.inputView}>
                <TextInput 
                  style={Input.input}
                  onChangeText={(name) =>this.setName(name)}
                  autoCapitalize='none'
                />
              </View>

              <Text style={Input.inputFieldText}> Descrição do Equipamento </Text>
              <View style={styles.descriptionView}>
                <TextInput 
                  style={styles.descriptionInput}
                  onChangeText = {(equipmentDescription) => this.setDescription(equipmentDescription)}
                  autoCapitalize = 'none'
                  multiline={true}
                />
              </View>

              <Text style={Input.inputFieldText}> Categoria </Text>
              <View style={styles.categoriaView}>
                <Picker
                  selectedValue={this.state.categorySelected}
                  style={Input.input}
                  onValueChange={(itemValue, itemIndex) => this.setCategory(itemValue)}
                >
                {this.getCategoryAll()}
              </Picker>
              
              </View>

              {
                this.isValidAddress() ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    disabled={false}
                    value={this.state.donation.allowWithdrawalAddress}
                    onValueChange={(value)=>this.setAllowWithdrawalAddress(value)}
                  />
                  <Text>
                    Permitir retirada no meu endereço
                  </Text>
                </View>
                ) : (<></>)
              }
              
              <Pressable 
                style={({ pressed }) => [
                  {
                      backgroundColor: pressed
                      ? '#43515c'
                      : '#2D363D'
                  },
                  styles.button
                ]}
                onPress={()=>{this.createEquip()}}
              >
                <Text style={button.text}> 
                <AntIcons name="plus" style={icon.nextIcon} />
                  {"   "}Doar equipamento 
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}