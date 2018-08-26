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

const SerieItem = ({ tvShow, navigation }) => {
  const goToDetails = serieItem => navigation.navigate('SeriesDetails', { serieItem });
  const uriImagePath = `${IMAGE_PATH}${tvShow.item.poster_path}`;
  return (
    <ListItem
      roundAvatar
      title={tvShow.item.original_name}
      subtitle={tvShow.item.overview}
      avatar={{ uri: uriImagePath }}
      containerStyle={styles.item}
      onPress={() => goToDetails(tvShow)}
    />
  );
};

export default withNavigation(SerieItem);