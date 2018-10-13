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

const SeasonsItem = ({ seasonDetail, navigation }) => {
  const goToDetails = seasonItem => navigation.navigate('ShowsDetails', { seasonItem });
  const uriImagePath = `${IMAGE_PATH}${seasonDetail.item.poster_path}`;
  return (
    <ListItem
      roundAvatar
      title={seasonDetail.item.name}
      subtitle={`Total de episódios: ${seasonDetail.item.episode_count}`}
      avatar={{ uri: uriImagePath }}
      containerStyle={styles.item}
      onPress={() => goToDetails(seasonDetail)}
    />
  );
};

export default withNavigation(SeasonsItem);