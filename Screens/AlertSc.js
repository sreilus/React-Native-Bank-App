import React, { Component } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Input } from '../components';

export default class AlertSc extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show modal" style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }} onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center', marginBottom: 50 }}>
          <View style={styles.modalMessageContent}>
            {/* <Text style={{ marginBottom: 20 }}>Havale Yap</Text> */}
            <Input
              full
              number
              maxLength={30}
              label="Göndereceğiniz Hesap Numarası"
              style={{ marginBottom: 5, width: 250, backgroundColor: '#cfcfcf' }}
            //defaultValue='1'              
            />
            <Input
              full
              number
              label="Para Miktarı"
              maxLength={30}
              style={{ marginBottom: 20, width: 250, backgroundColor: '#cfcfcf' }}
            //defaultValue='1'              
            />
            <View style={styles.modalView}>
              <Button title="İptal Et" style={{ marginRight: 20, }} onPress={this.toggleModal} />
              <Button title="Gönder" onPress={this.toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  modalMessageContent: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    padding: 1,
    borderRadius: 10
  },
  modalView: {
    flex: 0.1,
    flexDirection: 'row',
    alignContent: 'space-between'
  }
})