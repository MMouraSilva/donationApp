import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import styles from './styles.js';
import { container, content, titleView, title, icon } from '../../styles/index.js';
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
        equipamento: [],
        order: "DESC",
        filter: "todos"
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

    orderSelect = async (order) => {
        const key = '@order';
        const { navigation } = this.props;
        if(order == 'ASC') {
            this.setStorage(order, key)
            navigation.goBack();
        }else if(order == 'DESC') {
            this.setStorage(order, key)
            navigation.goBack();
        }
    }

    filterSelect = async (filter) => {
        const key = '@filter';
        const { navigation } = this.props;
        const { route } = this.props;
        if(filter == 'todos') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'notebooks') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'monitores') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'teclados') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'pecasComputador') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'pecasNotebook') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'fones') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'headsets') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }else if(filter == 'microfones') {
            this.setStorage(filter, key)
            route.params.onGoBack(filter);
            navigation.goBack();
        }
    }

    refresh = async (data) => {
        this.setState({ filter: data });
    }

    componentDidMount = async () => {
        const { navigation } = this.props;
        const { route } = this.props;
        let page;

        const orderKey = '@order';
        const filterKey = '@filter';
        const order = await this.getStorage(orderKey);
        const filter = await this.getStorage(filterKey);

        if(order != null) {
            this.setState({ order });
        }

        if(filter != null) {
            this.setState({ filter });
        }

        if(route.params == null)
        {
            page = 'inicial';    
        }else {
            page = route.params.page;
        }
        if(page == 'ordenar' || page == 'categorias') {
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
                                    <FtIcons name="reorder" style={icon.headerIcon}/>
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
                                    onPress={() => {
                                        navigation.push('DrawerNavigator', {
                                            screen: 'telaInicial',
                                            params: { 
                                                page: 'categorias' ,
                                                onGoBack: this.refresh
                                            }
                                        })
                                    }}
                                >
                                    <Text style={styles.headerText}> 
                                        <OcIcons name="list-unordered" size={20} color='#FED500' />
                                        {"   "}Categorias 
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={content}>
                                <Text style={styles.text}> Visualizando a categoria </Text>
                                <Text style={styles.textCategoria}> 
                                    {
                                        this.state.filter == "todos" ? 
                                        'Todos os equipamentos' : 
                                        this.state.filter == "notebooks" ? 
                                        'Notebooks' :
                                        this.state.filter == "monitores" ? 
                                        'Monitores' :
                                        this.state.filter == "teclados" ? 
                                        'Teclados' :
                                        this.state.filter == "pecasComputador" ? 
                                        'Peças de computador' :
                                        this.state.filter == "pecasNotebook" ? 
                                        'Peças de notabook' :
                                        this.state.filter == "fones" ? 
                                        'Fones de ouvido' :
                                        this.state.filter == "headsets" ? 
                                        'Headsets' :
                                        this.state.filter == "microfones" ? 
                                        'Microfones' : ''
                                    }
                                </Text>
                                
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
                                    <Text style={title}> Catagorias </Text>
                                    <Text style={styles.subTitle}> Atual:{" "}
                                        {
                                            this.state.filter == "todos" ? 
                                            'Todos os equipamentos' : 
                                            this.state.filter == "notebooks" ? 
                                            'Notebooks' :
                                            this.state.filter == "monitores" ? 
                                            'Monitores' :
                                            this.state.filter == "teclados" ? 
                                            'Teclados' :
                                            this.state.filter == "pecasComputador" ? 
                                            'Peças de computador' :
                                            this.state.filter == "pecasNotebook" ? 
                                            'Peças de notabook' :
                                            this.state.filter == "fones" ? 
                                            'Fones de ouvido' :
                                            this.state.filter == "headsets" ? 
                                            'Headsets' :
                                            this.state.filter == "microfones" ? 
                                            'Microfones' : ''
                                        } 
                                    </Text>
                                </View>

                                <View style={styles.orderView}>
                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "todos"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Todos os equipamentos</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "notebooks"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Notebooks</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "monitores"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Monitores</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "teclados"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Teclados</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "pecasComputador"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Peças de computador</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "pecasNotebook"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Peças de notebook</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "fones"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Fones de ouvido</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "headsets"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Headsets</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

                                    <View style={styles.orderContent}>
                                        <Pressable
                                            style={styles.orderButton}
                                            onPress={() => {
                                                const filter = "microfones"
                                                this.filterSelect(filter)
                                            }}
                                        >
                                            <Text style={styles.orderText}>Microfones</Text>
                                            <Ioicon name="ios-arrow-forward" style={styles.orderIcon} />
                                        </Pressable>
                                    </View>

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
                                    <Text style={title}> Ordenar por </Text>
                                    <Text style={styles.subTitle}> Atual:{" "}
                                        {
                                            this.state.order == "DESC" ? 
                                            'Mais recentes' : 
                                            this.state.order == "ASC" ?
                                            'Mais antigos' : ''
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




