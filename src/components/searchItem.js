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

const SearchItem = ({ show, navigation }) => {
  //const goToDetails = movieItem => navigation.navigate('MoviesDetails', { movieItem });
  const uriImagePath = `${IMAGE_PATH}${show.item.poster_path}`;
  const showName = show.item.title === undefined ? show.item.name : show.item.title;
  return (
    <ListItem
      roundAvatar
      title={showName}
      subtitle={show.item.overview}
      avatar={{ uri: uriImagePath }}
      containerStyle={styles.item}
      //onPress={() => goToDetails(show)}
    />
  );
};

export default withNavigation(SearchItem);