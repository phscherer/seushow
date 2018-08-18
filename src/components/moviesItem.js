import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { IMAGE_PATH } from '../actionTypes/app';

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 0,
    margin: 1,
  }
});

const MovieItem = ({ movie, navigation }) => {
  const goToDetails = movieItem => navigation.navigate('MoviesDetails', { movieItem });
  const uriImagePath = `${IMAGE_PATH}${movie.item.poster_path}`;
  return (
    <ListItem
      roundAvatar
      title={movie.item.title}
      subtitle={movie.item.overview}
      avatar={{ uri: uriImagePath }}
      containerStyle={styles.item}
      onPress={() => goToDetails(movie)}
    />
  );
};

export default withNavigation(MovieItem);