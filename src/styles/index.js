import { STICKY_HEADER_HEIGHT, AVATAR_SIZE } from '../actionTypes/app';

export const cardButton = {
  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 7,
  },
};

export const showsDetails = {
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
    paddingTop: 50,
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
};