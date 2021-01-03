import React, { Component } from 'react';
import { Text, View, Pressable, Button , TextInput, Alert, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-community/picker';
import categoryService from './../../service/categoryService';
import donationService  from './../../service/donationService';
import userService  from './../../service/userService';

export default class formEquips extends Component {

  state = {
    donation : {
      id : null,
      name: null,
      equipmentDescription: null,
      allowWithdrawalAddress: false,
      category: null,
      donorId : null,
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

  componentDidMount = async () => {
    if(this.state.categorys.length == 0){
      const response = await categoryService.getAllCategory();
      this.state.categorys = response.data;
      this.setState({ categorys:this.state.categorys});
    }
    if(this.state.user.name == undefined){
      const userId = 'c5e31b6e-754c-4644-ae9d-e1797e820629';
      const response = await userService.getUserById(userId);
      const user = response.data;
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
    console.log('>>> this.state.user',this.state.user);
    return this.state.user.number && this.state.user.address;
  }
  

  setDescription(description){
    this.state.donation.equipmentDescription = description;
    this.setState({ donation:this.state.donation});
  }

  
  async createEquip(){

    const donation = this.state.donation;
    // pegar o id do usuario logado e colocar na propriedade do donation.donorId
    donation.donorId = 'c5e31b6e-754c-4644-ae9d-e1797e820629'
    const response = await donationService.createDonation(donation);
    if(!response){
      // exibir para o usuario que houve um erro e voltar para a lista de equipamentos
    }

    // navegar pra a lista de equipamentos

  }

  updateEquip(){
    const response = await donationService.updateDonation(donation);
    if(!response){
      // exibir para o usuario que houve um erro e voltar para a lista de equipamentos
    }

    // navegar pra a lista de equipamentos
  }

  render() {


    return (<View >
      <Text style={{paddingBottom:20}}>
        Doe um equipamento para a comunidade
      </Text>


      <View style={{paddingBottom:20}}>
        <Text > Título do equipamento </Text>
        <TextInput 
      
            style={{ borderBottomWidth: 1,
              borderBottomColor: '#000',}}
            placeholder="digite ..."
            onChangeText = {(name) =>this.setName(name)}
            autoCapitalize = 'none'
        />
      </View>
      <View style={{paddingBottom:20}}>
        <Text > Descrição do Equipamento </Text>
        <TextInput 
      
            style={{ borderBottomWidth: 1,
              borderBottomColor: '#000',}}
            placeholder="digite ..."
            onChangeText = {(equipmentDescription) => this.setDescription(equipmentDescription)}
            autoCapitalize = 'none'
        />
      </View>
      <View style={{paddingBottom:20}}>
        <Text > Categoria </Text>
        <Picker
        selectedValue={this.state.categorySelected}
        style={{ height: 50 }}
        onValueChange={(itemValue, itemIndex) => this.setCategory(itemValue)}
      >
        {this.getCategoryAll()}
      </Picker>
       
      </View>

      {
        this.isValidAddress() ? (<Text style={{paddingBottom:20}}>
          <Switch
                onValueChange={(value)=>this.setAllowWithdrawalAddress(value)}
                value={this.state.donation.allowWithdrawalAddress}
            />
            Permitir retirada no meu endereço
        </Text>) : (<></>)
      }
      
      <Button 
        style={{paddingBottom:20}}
        title="Doar equipamento"
        onPress={()=>{this.createEquip()}}
      >
      </Button>
      

    </View>)

  }

}