import React, { Component } from 'react';
import {
  Text, Container, Content, Card,
  CardItem, Body, Button, Icon,
  Picker, Form
} from 'native-base';
import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';
import { cardButton } from '../styles/index';

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
    width: window.width*0.5,
  }
});

class CardItemBordered extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalVisible: false,
      selectedList: undefined,
    }
  }

  setModalVisible = (condition) => {
    this.setState({ modalVisible: condition });
  }

  onValueChange = (value) => {
    this.setState({ selectedList: value });
  }

  render() {
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
                  {this.props.show.overview === '' ? 'Sem informações.' : _.slice(this.props.show.overview, 0, 675)}
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
            <Button danger style={styles.button}>
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
                    <Picker
                      mode='dropdown'
                      iosIcon={<Icon name='ios-arrow-down-outline' />}
                      placeholder='Selecione a lista'
                      style={{ width: undefined }}
                      selectedValue={this.state.selectedList}
                      onValueChange={this.onValueChange}
                    >
                      <Picker.Item label="Para assistir" value="lista01" />
                      <Picker.Item label="Ativas" value="lista02" />
                      <Picker.Item label="Finalizadas" value="lista03" />
                      <Picker.Item label="Favoritas" value="lista04" />
                    </Picker>
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