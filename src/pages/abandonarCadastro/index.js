import React, { Component } from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from './styles.js';
import { button } from '../../styles/index.js';
import Modal from 'react-native-modal';

export default class AbandonarCadastro extends Component {
    render() {
        const { isVisible, onRequestClose, onBackdropPress, onSwipeComplete, onPress } = this.props;
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    isVisible={isVisible}
                    onRequestClose={onRequestClose}
                    onBackdropPress={onBackdropPress}
                    swipeDirection={('down')}
                    onSwipeComplete={onSwipeComplete}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalHeader}/>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle} > Abandonar cadastro </Text>
                            <Text> {"\n"} Você tem certeza que quer abandonar o {"\n"} cadastro e voltar para a tela inicial? {"\n"}{"\n"}</Text>

                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed
                                        ? '#43515c'
                                        : '#2D363D',
                                    },
                                    button.button
                                ]}
                                onPress={onPress}
                            >
                                    <Text style={button.text}>
                                        Sim, abandonar {" "}
                                    </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}