import React, { Component } from 'react';
import { Text, Image, Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {
  IMAGE_PATH,
  PARALLAX_HEADER_HEIGHT,
  STICKY_HEADER_HEIGHT,
  AVATAR_SIZE
} from '../actionTypes/app';
import CardItemBordered from '../components/cardItemBordered';
import DefaultHeaderBack from '../components/defaultHeaderBack';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  parallaxForegroundSection: {
    height: 300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
  },
  stickySectionText: {
    backgroundColor: '#e26761',
    color: 'white',
    fontSize: 20,
    height: STICKY_HEADER_HEIGHT,
    paddingLeft: 10,
    paddingTop: 8,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 19,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 15,
    paddingVertical: 5
  },
  containerItem: {
    flex: 1,
    backgroundColor: 'white',
  },
});

class MoviesDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true };
    this.routeParams = props.navigation.state.params;
  }

  componentWillMount() {
    const movie = this.routeParams.movieItem;
    this.setState({
      movie,
      isLoading: false
    });
  }

  renderBackground = (movie) => {
    return (
      <View key="background">
        <Image source={{
          uri: `${IMAGE_PATH}${movie.item.poster_path}`,
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

  renderSticky = (movie) => {
    return (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{movie.item.title}</Text>
      </View>
    );
  }

  renderForeground = (movie) => {
    return (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={ styles.avatar } source={{
          uri: `${IMAGE_PATH}${movie.item.poster_path}`,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }} />
        <Text style={styles.sectionSpeakerText}>
          {movie.item.title}
        </Text>
        <Text style={styles.sectionTitleText}>
          Média total: {movie.item.vote_average}
        </Text>
      </View>
    );
  }
  
  addMovie() {
    console.log('add!');
  }

  render() {
    const { movie, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#800020" />
        </View>
      );
    }

    return (
      <Container>
        <DefaultHeaderBack title={'Filmes'} pageName={'Home'} />
        <View style={styles.containerItem}>
          <ParallaxScrollView
            backgroundColor="black"
            parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
            stickyHeaderHeight={STICKY_HEADER_HEIGHT}
            renderBackground={() => this.renderBackground(movie)}
            renderStickyHeader={() => this.renderSticky(movie)}
            renderForeground={() => this.renderForeground(movie)}
          >
            <CardItemBordered description={movie.item.overview} />
          </ParallaxScrollView>
        </View>
      </Container>
    );
  }
}

export default MoviesDetails;