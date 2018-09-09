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

const SearchItem = ({ tvShow, navigation }) => {
  const goToDetails = showItem => navigation.navigate('SearchDetails', { showItem });
  const uriImagePath = `${IMAGE_PATH}${tvShow.item.poster_path}`;
  const showName = tvShow.item.title === undefined ? tvShow.item.original_name : tvShow.item.title;
  return (
    <ListItem
      roundAvatar
      title={showName}
      subtitle={tvShow.item.overview}
      avatar={{ uri: uriImagePath }}
      containerStyle={styles.item}
      onPress={() => goToDetails(tvShow)}
    />
  );
};

export default withNavigation(SearchItem);