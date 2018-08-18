import React, { Component } from 'react';
import { Text, Image, Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { IMAGE_PATH } from '../actionTypes/app';

const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 40;

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
  },
  stickySectionText: {
    backgroundColor: '#a6a6a6',
    color: 'white',
    fontSize: 20,
    height: STICKY_HEADER_HEIGHT,
    paddingLeft: 10,
    paddingTop: 8,
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
    const uriImagePath = `${IMAGE_PATH}${movie.item.poster_path}`;
    return (
      <View key="background">
        <Image source={{
          uri: uriImagePath,
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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ParallaxScrollView
          backgroundColor="black"
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          renderBackground={() => this.renderBackground(movie)}
          renderStickyHeader={() => this.renderSticky(movie)}
        >

        </ParallaxScrollView>
      </View>
    );
  }
}

export default MoviesDetails;