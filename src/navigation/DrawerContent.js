import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles.js';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { MaterialCommunityIcons as MtIcon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DrawerContent extends Component {
    
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }
    
    clearSessionCreateAccount = async () => {
        try {
            await AsyncStorage.clear()
        } catch(e) {
            console.log("Deu erro:", e);
        }
    }
    
    render() {
        const { navigation } = this.props;
        return (
            <View style={{flex: 1}}>
                <DrawerContentScrollView>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View>

                            </View>
                        </View>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={() => (
                            <MtIcon name="exit-to-app" size={30} color="#FED500" />
                        )}
                        label="Sair da minha conta"
                        labelStyle={styles.label}
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