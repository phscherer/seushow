import React, { Component } from 'react';
import {
  Text, Container, Content, Card,
  CardItem, Body, Button, Icon,
  Picker, Form
} from 'native-base';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';
import * as firebase from 'firebase';
import b64 from 'base-64';
import { cardButton } from '../styles/index';

const showLists = [
  'paraAssistir',
  'ativas',
  'favoritos',
  'finalizadas',
  'filmesAssistidos'
];
const styles = StyleSheet.create(cardButton);
const window = Dimensions.get('window');

const modalStyles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    height: window.height*0.3,
    width: window.width*0.9,
    backgroundColor: '#d3d3d3',
    elevation: 10,
    borderRadius: 5
  },
  anotherView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  pickerStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  }
});

class CardItemBordered extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalVisible: false,
      selectedList: 'paraAssistir',
    }
  }

  setModalVisible = (condition) => {
    this.setState({ modalVisible: condition });
  }

  onValueChange = (value) => {
    this.setState({ selectedList: value });
  }

  incrementShowList = (list, show) => {
    let user = firebase.auth().currentUser;
    let emailBase64 = b64.encode(user.email);
    let typeShow = !show.title ? 'serie' : 'movie';
    firebase.database()
      .ref(`/users/${emailBase64}/${list}/${show.id}`)
      .push({
        showId: show.id,
        type: typeShow
      })
      .then(() => console.log('Success!'))
      .catch(error => this.setState({ errorMessage: error.message }));
    let episodios = 0;
    let qtdeShows = 0;
    firebase.database()
      .ref(`/users/${emailBase64}/`)
      .on('value', snapshot => {
        episodios = snapshot.val().episodiosAssistidos !== undefined ? snapshot.val().episodiosAssistidos : 0;
        qtdeShows = snapshot.val().quantidadeShows !== undefined ? snapshot.val().quantidadeShows : 0;
      });
    firebase.database()
      .ref(`/users/${emailBase64}/`)
      .update({
        episodiosAssistidos: episodios,
        quantidadeShows: qtdeShows + 1
      });
  }

  disassociateShow = (show) => {
    let user = firebase.auth().currentUser;
    let emailBase64 = b64.encode(user.email);
    let qtdeShows = 0;
    firebase.database().ref(`/users/${emailBase64}/`)
      .on('value', snapshot => {
        qtdeShows = snapshot.val().quantidadeShows !== undefined ? snapshot.val().quantidadeShows : 0;
      });
    showLists.forEach((list) => {
      firebase.database().ref(`/users/${emailBase64}/${list}/${show.id}`).remove();
    });
    firebase.database().ref(`/users/${emailBase64}/`).update({ quantidadeShows: qtdeShows - 1 });
  }

  render() {
    const { show } = this.props;
    return (
      <Container style={{ flex: 1 }}>
        <Content padder style={{ flex: 1 }}>
          <Card style={{ borderColor: '#AB3737' }}>
            <CardItem header bordered>
              <Text style={{ color: '#AB3737' }}>Sobre</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  {show.overview === '' ? 'Sem informações.' : _.slice(show.overview, 0, 675)}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <View style={styles.buttonView}>
            <Button
              success
              style={styles.button}
              onPress={() => this.setModalVisible(true)}
            >
              <Icon
                name='ios-add-circle'
                style={styles.buttonIcon}
              />
            </Button>
            <Button
              danger
              style={styles.button}
              onPress={() => {
                Alert.alert(
                  'Desassociar show',
                  'Tem certeza de que deseja desassociar o show de suas listas?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Ok', onPress: () => this.disassociateShow(show)},
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Icon
                name='md-trash'
                style={styles.buttonIcon}
              />
            </Button>
          </View>
          <View style={modalStyles.viewStyle}>
            <Modal
              animationType='slide'
              transparent={true}
              isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setModalVisible(false)}
              onModalHide={() => this.setState({ selectedList: undefined })}
            >
              <View style={modalStyles.viewStyle}>
                <View style={modalStyles.dialogStyle}>
                  <Text style={modalStyles.titleText}>Adicionar à lista...</Text>
                  <View style={modalStyles.pickerStyle}>
                    { !show.title &&
                      <Picker
                        mode='dropdown'
                        iosIcon={<Icon name='ios-arrow-down-outline' />}
                        placeholder='Selecione a lista'
                        style={{ width: undefined }}
                        selectedValue={this.state.selectedList}
                        onValueChange={this.onValueChange}
                      >
                        <Picker.Item label="Para assistir" value="paraAssistir" />
                        <Picker.Item label="Ativas" value="ativas" />
                        <Picker.Item label="Finalizadas" value="finalizadas" />
                        <Picker.Item label="Favoritos" value="favoritos" />
                      </Picker>
                    }
                    {
                      !show.name &&
                      <Picker
                        mode='dropdown'
                        iosIcon={<Icon name='ios-arrow-down-outline' />}
                        placeholder='Selecione a lista'
                        style={{ width: undefined }}
                        selectedValue={this.state.selectedList}
                        onValueChange={this.onValueChange}
                      >
                        <Picker.Item label="Para assistir" value="paraAssistir" />
                        <Picker.Item label="Assistidos" value="filmesAssistidos" />
                        <Picker.Item label="Favoritos" value="favoritos" />
                      </Picker>
                    }
                  </View>
                  <View style={styles.buttonView}>
                    <Button
                      dark
                      style={styles.button}
                      onPress={() => {
                        this.incrementShowList(this.state.selectedList, show);
                        Alert.alert(
                          'Sucesso!',
                          'Show adicionado à lista com sucesso!',
                          [
                            { text: 'Ok', onPress: () => this.setModalVisible(false)},
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <Text>Confirmar</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </Content>
      </Container>
    );
  }
}

export default CardItemBordered;