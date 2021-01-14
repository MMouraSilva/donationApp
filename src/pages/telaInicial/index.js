import { StatusBar } from 'expo-status-bar';
import React, { Component, PureComponent } from 'react';
import { Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title, icon, equipamentsCard } from '../../styles/index.js';
import { Octicons as OcIcons, FontAwesome as FtIcons, Ionicons as Ioicon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import donationService  from './../../service/donationService';
import userService from './../../service/userService.js';
import categoryService from './../../service/categoryService';
import {
    Appbar,
} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export default class telaInicial extends Component {
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        equipamentos: [],
        order: "DESC",
        categorys:[],
    }

    setStorage = async (value, key) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log("Deu erro: ", e);
        }
    }

    getStorage = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            return value != null ? value : null;
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }

    orderBy(order, equipamentos){
        return equipamentos.sort((current,next) => {
          if(current.creationDate > next.creationDate && order == "ASC"){
            return 1;
          }
      
          if(current.creationDate < next.creationDate && order == "ASC"){
            return -1;
          }
      
          if(current.creationDate < next.creationDate && order == "DESC"){
            return 1;
          }
      
          if(current.creationDate > next.creationDate && order == "DESC"){
            return -1;
          }
      
          return 0;
      
        })
      }

    componentDidMount = async () => {
        const { navigation } = this.props;
        const { route } = this.props;
        let page;

        if(this.state.equipamentos.length == 0) {
            const equipamentos = await donationService.getDonations();
            for (let equipObject of equipamentos.data) {
                const user = await userService.getUserById(equipObject.donorId);
                equipObject.donorName = user.data.name;
            }
            this.setState({ equipamentos: equipamentos.data });
        }

        if(this.state.categorys.length == 0){
            const response = await categoryService.getAllCategory();
            this.state.categorys = response.data;
            this.setState({ categorys:this.state.categorys});
        }

        const orderKey = '@order';
        const order = await this.getStorage(orderKey);

        if(order != null) {
            this.setState({ order });
        }

        page = route.params.page;

        if(page == 'ordenar' || page == 'categorias') {
            navigation.setOptions({
                gestureEnabled: false
            })
        }
    }

    render () {
        const { navigation } = this.props;
        const { route } = this.props;

        let page = route.params.page;
        let filter;
        let order;
        let equipamentos;
        let equipsFiltrados;

        if(route.params.order == null){
            order = "DESC"
        }else {
            order = route.params.order;
        }

        if(route.params.filter == null){
            filter = "Todos"
        }else {
            filter = route.params.filter;
        }

        if(route.params.equipamentos == null){
            equipamentos = this.state.equipamentos;
        } else {
            equipamentos = route.params.equipamentos;
        }

        const equipsOrdenados = this.orderBy(order, equipamentos);

        if(filter == "Todos"){
            equipsFiltrados = equipsOrdenados;
        } else{
            equipsFiltrados = equipsOrdenados.filter(equips => equips.category == filter);
        }

        switch (page) {
            case 'inicial':
                return (
                    <View style={equipamentsCard.container}>
                        <Appbar.Header style={styles.header}>
                            <Pressable onPress={ navigation.openDrawer }>
                                <FtIcons name="reorder" style={styles.headerIcon}/>
                            </Pressable>
                        </Appbar.Header>
                        <Appbar.Header style={styles.subHeader}>
                            <Pressable
                                style={() => [
                                    styles.headerButton
                                ]}
                                onPress={() => {
                                    navigation.navigate('DrawerNavigator', {
                                        screen: 'ordenar',
                                        equipamentos: equipamentos
                                    })
                                }}
                            >
                                <Text style={styles.headerText}>
                                    <OcIcons name="list-ordered" size={20} color="#FED500" />
                                    {"   "}Ordenar
                                </Text>
                            </Pressable>
                            <Pressable
                                style={() => [
                                    styles.headerButton,
                                    {
                                        borderLeftWidth: 1,
                                        borderLeftColor: '#21282e'
                                    }
                                ]}
                                onPress={() => {
                                    navigation.navigate('DrawerNavigator', {
                                        screen: 'categorias'
                                    })
                                }}
                                >
                                <Text style={styles.headerText}> 
                                    <OcIcons name="list-unordered" size={20} color='#FED500' />
                                    {"   "}Categorias 
                                </Text>
                            </Pressable>
                        </Appbar.Header>
                        <ScrollView style={{ backgroundColor: "#f2f2f2" }}>
                            <StatusBar style="light" />
                            <View style={equipamentsCard.content}>
                                <Text style={styles.text}> Visualizando a categoria </Text>
                                <Text style={styles.textCategoria}> 
                                    {
                                        filter
                                    }
                                </Text>
                                
                                <ScrollView
                                    style={equipamentsCard.scrollView}
                                    vertical
                                >
                                    <View style={equipamentsCard.scrollViewContainer}>
                                        {
                                            equipsFiltrados.map(equip => 
                                                <Pressable
                                                    style={({ pressed }) => [
                                                        {
                                                            backgroundColor: pressed
                                                            ? "#43515C"
                                                            : "#fff"
                                                        },
                                                        equipamentsCard.equipsCard
                                                    ]}
                                                    key={equip.id}
                                                    onPress={() => alert(equip.name)}
                                                >
                                                    <View style={equipamentsCard.view}>
                                                        <Text style={equipamentsCard.equipName}>
                                                            {equip.name}
                                                        </Text>
                                                        <Text style={equipamentsCard.donorName}>
                                                            Doado por {equip.donorName}
                                                        </Text>
                                                        <View style={equipamentsCard.line}/>
                                                        <Text style={equipamentsCard.equipDescription}>
                                                            {equip.equipmentDescription}
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            )
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                )
            case 'categorias':
                return (
                    <View style={container}>
                            <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                                <Pressable onPress={() => {
                                    navigation.goBack();
                                }}>
                                    <Ioicon name="md-arrow-back" style={icon.headerIcon} />
                                </Pressable>
                            </Appbar.Header>
                        <ScrollView>
                            <StatusBar style="light" />

                            <View style={styles.content}>
                                <View style={titleView}>
                                    <Text style={title}> Catagorias </Text>
                                    <Text style={styles.subTitle}> Atual:{" "}
                                        {
                                            filter
                                        } 
                                    </Text>
                                </View>
                                
                                <View style={styles.orderView}>
                                    <ScrollView
                                        style={equipamentsCard.scrollView}
                                        vertical
                                    >
                                        {
                                            this.state.categorys.map(categs => 
                                                <View style={styles.orderContent} key={categs.id}>
                                                    <Pressable
                                                        style={styles.orderButton}
                                                        onPress={() => {
                                                            const filter = categs.name
                                                            navigation.goBack();
                                                            navigation.navigate('DrawerNavigator', {
                                                                screen: 'telaInicial',
                                                                params: {
                                                                    filter: filter,
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <Text style={styles.orderText}>{categs.name}</Text>
                                                        <Ioicon name="ios-arrow-forward" style={styles.categIcon} />
                                                    </Pressable>
                                                </View>
                                            )
                                        }
                                    </ScrollView>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )

            case 'ordenar':
                return (
                    <View style={container}>
                            <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                                <Pressable onPress={() => { navigation.goBack() }}>
                                    <Ioicon name="md-arrow-back" style={icon.headerIcon} />
                                </Pressable>
                            </Appbar.Header>
                        <ScrollView
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        >
                            <StatusBar style="light" />

                            <View style={content}>
                                <View style={titleView}>
                                    <Text style={title}>Ordenar por</Text>
                                    <Text style={styles.subTitle}>Atual:{" "}
                                        {
                                            order == "DESC" ?
                                            'Mais recentes' :
                                            order == "ASC" ?
                                            'Mais antigos' :
                                            null
                                        } 
                                    </Text>
                                </View>

                                <View style={styles.orderView}>
                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const order = "DESC"
                                                navigation.goBack();
                                                navigation.navigate('DrawerNavigator', {
                                                    screen: 'telaInicial',
                                                    params: {
                                                        order: order
                                                    }
                                                })
                                            }}
                                        >
                                            <Text style={styles.orderText}>Mais recentes</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const order = "ASC"
                                                navigation.goBack();
                                                navigation.navigate('DrawerNavigator', {
                                                    screen: 'telaInicial',
                                                    params: {
                                                        order: order
                                                    }
                                                })
                                            }}
                                        >
                                            <Text style={styles.orderText}>Mais antigos</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                </View>

                            </View>
                        </ScrollView>
                    </View>
                )
        }
    }
}




