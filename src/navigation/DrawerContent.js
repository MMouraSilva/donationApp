import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles.js';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons as MtcIcon, MaterialIcons as MtIcon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
    Text,
    Appbar,
} from 'react-native-paper';

export default class DrawerContent extends Component {
    
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        id: null,
        name: null,
    }
    
    getSessionCreateAccount = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@sessionAccount')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }
    
    clearSessionCreateAccount = async () => {
        try {
            await AsyncStorage.clear()
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }

    componentDidMount = async () => {
        const sessionAccount = await this.getSessionCreateAccount();
        let { name, id } = await sessionAccount;
        this.setState({ name, id });
    }
    
    render() {
        const { navigation } = this.props;
        return (
            <View style={{flex: 1}}>
                <Drawer.Section>
                    <Appbar.Header style={{backgroundColor: '#2D363D'}} />
                </Drawer.Section>
                <DrawerContentScrollView
                    showsVerticalScrollIndicator ={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                >
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection: 'row', marginTop: 15}}>
                                <Avatar.Image
                                    source={{
                                        //uri: ''
                                    }}
                                    size={65}
                                    style={{backgroundColor: '#2D363D', marginBottom: '15%'}}
                                />
                                <View style={{marginLeft: '5%', flexDirection: 'column'}}>
                                    <Caption style={styles.caption}>Boas vindas,</Caption>
                                    <Title style={styles.title}>{this.state.name}</Title>
                                </View>
                            </View>
                        </View>

                        <Drawer.Section>

                            <DrawerItem
                                style={styles.drawerItem}
                                icon={() => (
                                    <MtcIcon
                                        name="home"
                                        size={30}
                                        color="#2D363D"
                                    />
                                )}
                                label="Início"
                                labelStyle={styles.itemLabel}
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'telaInicial' }],
                                    });
                                }}
                            />

                            <DrawerItem
                                style={styles.drawerItem}
                                icon={() => (
                                    <MtcIcon
                                        name="heart"
                                        size={30}
                                        color="#2D363D"
                                    />
                                )}
                                label="Doações"
                                labelStyle={styles.itemLabel}
                                onPress={() => {
                                    navigation.navigate('DrawerNavigator', {
                                        screen: 'TabStackNavigator',
                                        params: { 
                                            page: ''
                                        }
                                    })
                                }}
                            />

                            <DrawerItem
                                style={styles.drawerItem}
                                icon={() => (
                                    <MtcIcon
                                        name="account"
                                        size={30}
                                        color="#2D363D"
                                    />
                                )}
                                label="Perfil"
                                labelStyle={styles.itemLabel}
                                onPress={() => {}}
                            />

                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={() => (
                            <MtcIcon
                                name="exit-to-app"
                                size={30}
                                color="#FED500"
                            />
                        )}
                        label="Sair da minha conta"
                        labelStyle={styles.logoutLabel}
                        onPress={() => {
                            this.clearSessionCreateAccount();

                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'login' }],
                            });
                        }}
                    />
                </Drawer.Section>
            </View>
        )
    }
}