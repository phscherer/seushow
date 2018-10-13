import React, { Component } from 'react';
import { Text, Image, Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import CardItemBordered from '../components/cardItemBordered';
import DefaultHeaderBack from '../components/defaultHeaderBack';
import { showsDetails, cardButton } from '../styles/index';

import {
  IMAGE_PATH,
  PARALLAX_HEADER_HEIGHT,
  STICKY_HEADER_HEIGHT,
  AVATAR_SIZE
} from '../actionTypes/app';

const window = Dimensions.get('window');
const styles = StyleSheet.create(showsDetails);
const buttonStyles = StyleSheet.create(cardButton);

class ShowsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true };
    this.routeParams = props.navigation.state.params;
  }

  componentWillMount() {
    const tvShow = this.routeParams.showItem;
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
          Média total: {tvShow.item.vote_average}
        </Text>
      </View>
    );
  }

  goToPage = (showId) => {
    const backPage = 'ShowsDetails';
    this.props.navigation.navigate('Seasons', { showId, backPage });
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
        <DefaultHeaderBack title={'TV Shows'} pageName={this.routeParams.backPage} backSearchPage={'ShowsDetails'} />
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

export default ShowsDetails;