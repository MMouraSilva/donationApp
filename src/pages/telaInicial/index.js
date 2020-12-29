import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title } from '../../styles/index.js';
import { Octicons as OcIcons, FontAwesome as FtIcons, Ionicons as Ioicon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        categoria: 'Todos os equipamentos',
        equipamento: [],
        order: "DESC"
    }

    setStorage = async (value) => {
        try {
            await AsyncStorage.setItem('@order', value)
        } catch (e) {
            console.log("Deu erro: ", e);
        }
    }

    getStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('@order')
            return value != null ? value : null;
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }

    clearStorage = async () => {
        try {
            await AsyncStorage.clear()
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }

    orderSelect = async (order) => {
        const { navigation } = this.props;
        if(order == 'ASC') {
            this.setStorage(order)
            navigation.goBack();
        }else if(order == 'DESC') {
            this.setStorage(order)
            navigation.goBack();
        }
    }

    componentDidMount = async () => {
        const { navigation } = this.props;
        const { route } = this.props;
        let page;

        const order = await this.getStorage();

        if(order != null) {
            this.setState({ order });
        }

        if(route.params == null)
        {
            page = 'inicial';    
        }else {
            page = route.params.page;
        }
        if(page == 'ordenar') {
            navigation.setOptions({
                gestureEnabled: false
            })
        }
    }

    render () {
        let page;
        const { navigation } = this.props;
        const { route } = this.props;
        if(route.params == null)
        {
            page = 'inicial';    
        }else {
            page = route.params.page;
        }

        switch (page) {
            case 'inicial':
                return (
                    <View style={container}>
                        <ScrollView
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        >
                            <StatusBar style="light" />
                            <Appbar.Header style={{backgroundColor: '#2D363D'}}>
                                <Pressable onPress={ navigation.openDrawer }>
                                    <FtIcons name="reorder" style={styles.headerIcon}/>
                                </Pressable>
                            </Appbar.Header>
                            <View style={styles.subHeader}>
                                <Pressable
                                    style={() => [
                                        styles.headerButton
                                    ]}
                                    onPress={() => {
                                        navigation.push('DrawerNavigator', {
                                            screen: 'telaInicial',
                                            params: { page: 'ordenar' }
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
                                    onPress={this._login}
                                >
                                    <Text style={styles.headerText}> 
                                        <OcIcons name="list-unordered" size={20} color='#FED500' />
                                        {"   "}Categorias 
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={content}>
                                <Text style={styles.text}> Visualizando a categoria </Text>
                                <Text style={styles.textCategoria}> {this.state.categoria} </Text>
                                
                                <ScrollView
                                    style={styles.scrollView}
                                    vertical
                                >
                                    <View style={styles.scrollViewContainer}>
                                        {/*{
                                            this.state.equipamentos.map(equip => 
                                        <Pressable
                                        style={({ pressed }) => [
                                            {
                                                backgroundColor: pressed
                                                ? onPressedColor
                                                : pressableColor
                                            },
                                            buttonColor
                                        ]}
                                            key={equip.id}
                                            onPress={() => alert('Pressionado')}
                                        >
                                            <Text style={textColor}>
                                            {equip.name}
                                            </Text>
                                            </Pressable>
                                            )
                                        }  exibição dos equipamentos disponiveis*/}
                                    </View>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                )
            case 'categorias':
    
            case 'ordenar':
                return (
                    <View style={container}>
                            <Appbar.Header style={{backgroundColor: '#2D363D', width: windowWidth}}>
                                <Pressable onPress={() => { navigation.goBack() }}>
                                    <Ioicon name="md-arrow-back" style={styles.headerIcon} />
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
                                    <Text style={title}> Ordenar por </Text>
                                    <Text style={styles.subTitle}> Atual:{" "}
                                        {
                                            this.state.order == "DESC" ? 
                                            'Mais recentes' : 
                                            this.state.order == "ASC" ?
                                            'Mais antigos' : 'aa'
                                        } 
                                    </Text>
                                </View>


                                <View style={styles.orderView}>
                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const order = "DESC"
                                                this.orderSelect(order)
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
                                                this.orderSelect(order)
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




