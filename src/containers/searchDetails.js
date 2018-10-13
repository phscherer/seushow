import React, { Component } from 'react';
import { Text, Image, Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Container, Header, Icon, Button, Title, Body, Left } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import axios from 'axios';

import CardItemBordered from '../components/cardItemBordered';
import { showsDetails, cardButton } from '../styles/index';
import { API_KEY } from '../actionTypes/app';

import {
  IMAGE_PATH,
  PARALLAX_HEADER_HEIGHT,
  STICKY_HEADER_HEIGHT,
  AVATAR_SIZE
} from '../actionTypes/app';

const window = Dimensions.get('window');
const styles = StyleSheet.create(showsDetails);
const buttonStyles = StyleSheet.create(cardButton);

class SearchDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, genres: [] };
    this.routeParams = props.navigation.state.params;
  }

  componentWillMount() {
    const tvShow = this.routeParams.showItem;
    const genresEspecifies = [];
    tvShow.item.genre_ids.map((genreId) => {
      axios.get(`https://api.themoviedb.org/3/genre/${genreId}?api_key=${API_KEY}&language=pt-BR`)
        .then((response) => {
          genresEspecifies.push(response.data);
          this.setState({ genres: [...genresEspecifies] });
        }).catch(() => console.log('Erro ao obter gênero!'));
    });
    this.setState({
      tvShow,
      isLoading: false
    });
  }

  renderBackground = (tvShow) => {
    return (
      <View key="background">
        <Image source={{
          uri: `${IMAGE_PATH}${tvShow.item.poster_path}`,
          width: window.width,
          height: PARALLAX_HEADER_HEIGHT,
        }}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          width: window.width,
          height: PARALLAX_HEADER_HEIGHT,
        }}
        />
      </View>
    );
  }

  renderSticky = (tvShow) => {
    const showName = tvShow.item.title === undefined ? tvShow.item.original_name : tvShow.item.title;
    return (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{showName}</Text>
      </View>
    );
  }

  renderForeground = (tvShow) => {
    const showName = tvShow.item.title === undefined ? tvShow.item.original_name : tvShow.item.title;
    return (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={ styles.avatar } source={{
          uri: `${IMAGE_PATH}${tvShow.item.poster_path}`,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }} />
        <Text style={styles.sectionSpeakerText}>
          {showName}
        </Text>
        <Text style={styles.sectionTitleText}>
          Gêneros: { this.genresNormalized(this.state.genres) }
        </Text>
        <Text style={styles.sectionTitleText}>
          Média total: {tvShow.item.vote_average}
        </Text>
      </View>
    );
  }

  goToPage = (showId) => {
    const backPage = 'SearchDetails';
    this.props.navigation.navigate('Seasons', { showId, backPage });
  }

  genresNormalized = (genres) => {
    let names = '';
    genres.forEach((genre) => {
      if (names === '') {
        names = genre.name;
      } else {
        names = `${names}, ${genre.name}`;
      }
    });
    return names;
  }

  render() {
    const { tvShow, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#800020" />
        </View>
      );
    }

    return (
      <Container>
        <Header style={{ backgroundColor: '#AB3737' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Search')}>
              <Icon type='EvilIcons' name='arrow-left' />
            </Button>
          </Left>
          <Body>
            <Title>Seu Show</Title>
          </Body>
        </Header>
        <View style={styles.containerItem}>
          <ParallaxScrollView
            backgroundColor="black"
            parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
            stickyHeaderHeight={STICKY_HEADER_HEIGHT}
            renderBackground={() => this.renderBackground(tvShow)}
            renderStickyHeader={() => this.renderSticky(tvShow)}
            renderForeground={() => this.renderForeground(tvShow)}
          >
            {
              !tvShow.item.title &&
              <View style={buttonStyles.buttonView}>
                <Button
                  dark
                  style={buttonStyles.button}
                  onPress={() => this.goToPage(tvShow.item.id)}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Temporadas</Text>
                  <Icon name='ios-arrow-round-forward' />
                </Button>
              </View>
            }
            <CardItemBordered show={tvShow.item} />
          </ParallaxScrollView>
        </View>
      </Container>
    );
  }
}

export default SearchDetails;