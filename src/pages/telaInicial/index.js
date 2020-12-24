import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import styles from './styles.js';
import { container, content, Input, text } from '../../styles/index.js';
import { useNavigation } from '@react-navigation/native';
import { Octicons as OcIcons, FontAwesome as FtIcons } from '@expo/vector-icons';

export default class telaInicial extends Component {
    
    function(props) {
        const navigation = useNavigation();
        return <MyBackButton {...props} navigation={navigation} />
    }

    state = {
        page: 'inicial',
        categoria: 'Todos os equipamentos',
        equipamento: []
    }

    _menu = async () => {

    }

    componentDidMount () {
        const { navigation } = this.props;

        if(this.state.page == 'inicial') {
            navigation.setOptions({

                headerLeft: () => (
                    <View style={styles.headerLeft}>
                        <Pressable onPress={this._menu}>
                            <FtIcons name="reorder" size={30} color="#fff" />
                        </Pressable>
                    </View>
                ),
            })
        }
    }

    render () {
        switch (this.state.page) {
            case 'inicial':
                return (
                    <View style={container}>
                        <ScrollView
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}
                        >
                            <StatusBar style="light" />
                            <View style={styles.header}>
                                <Pressable
                                    style={() => [
                                        styles.headerButton
                                    ]}
                                    onPress={this._login}
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
                    <View>
    
                    </View>
                )
        }
    }
}




