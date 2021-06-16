import React, { useState } from 'react';
import Card from '../shared/Card';
import styles from './SideBar.module.scss';
import ProfileImage from '../../assets/images/profile.jpg';
import CovidImage from '../../assets/iconsColored/covidInfoCenter.png';
import FriendsImage from '../../assets/iconsColored/friends.png';
import PagesImage from '../../assets/iconsColored/pages.png';
import GroupsImage from '../../assets/iconsColored/groups.png';
import WatchImage from '../../assets/iconsColored/watch.png';
import MemoriesImage from '../../assets/iconsColored/memories.png';
import MarketplaceImage from '../../assets/iconsColored/marketplace.png';
import EventsImage from '../../assets/iconsColored/events.png';
import SavedImage from '../../assets/iconsColored/saved.png';
import { ReactComponent as SeeMoreIcon } from '../../assets/icons/see_more.svg';
import { ReactComponent as SeeLessIcon } from '../../assets/icons/see_less.svg';
import AdCentreImage from '../../assets/iconsColored/adcentre.png';
import AdsManagerImage from '../../assets/iconsColored/adsManager.png';
import BloodDonationsImage from '../../assets/iconsColored/bloodDonations.png';
import ClimateScienceInformationCentreImage from '../../assets/iconsColored/climate.png';
import CommunityHelpImage from '../../assets/iconsColored/communityHelp.png';
import EmotionalHealthImage from '../../assets/iconsColored/emotionalHealth.png';
import FavouritesImage from '../../assets/iconsColored/favourites.png';
import FilmsImage from '../../assets/iconsColored/films.png';
import FriendListsImage from '../../assets/iconsColored/friendLists.png';
import FundraisersImage from '../../assets/iconsColored/fundraisers.png';
import GamingVideoImage from '../../assets/iconsColored/gamingVideo.png';
import JobsImage from '../../assets/iconsColored/jobs.png';
import LiveVideosImage from '../../assets/iconsColored/liveVideos.png';
import MessengerImage from '../../assets/iconsColored/messenger.png';
import MessengerKidsImage from '../../assets/iconsColored/messengerKids.png';
import MostRecentImage from '../../assets/iconsColored/mostRecent.png';
import OffersImage from '../../assets/iconsColored/offers.png';
import PlayGamesImage from '../../assets/iconsColored/playGames.png';
import RecentAdActivityImage from '../../assets/iconsColored/recent.png';
import WeatherImage from '../../assets/iconsColored/weather.png';
import { useLoggedInUserState } from '../../state/userState';
function SideBar() {
  const [isHovered, setIsHovered] = useState(false);
  const [showMoreItems, setShowMoreItems] = useState(false);
  const { loggedInUser } = useLoggedInUserState();
  return (
    <div
      className={styles.sideBarBlock + (isHovered ? ' scrollBar' : '')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card image={ProfileImage}>{loggedInUser.username}</Card>
      <Card image={CovidImage}>COVID-19 Information Centre</Card>
      <Card image={FriendsImage}>Friends</Card>
      <Card image={PagesImage}>Pages</Card>
      <Card image={GroupsImage}>Groups</Card>
      <Card image={WatchImage}>Watch</Card>
      <Card image={MemoriesImage}>Memories</Card>
      <Card image={MarketplaceImage}>Marketplace</Card>
      <Card image={EventsImage}>Events</Card>
      <Card image={SavedImage}>Saved</Card>
      {showMoreItems && (
        <>
          <Card image={AdCentreImage}>Ad Centre</Card>
          <Card image={AdsManagerImage}>Ads Manager</Card>
          <Card image={BloodDonationsImage}>Blood Donations</Card>
          <Card image={ClimateScienceInformationCentreImage}>
            Climate Science Information Centre
          </Card>
          <Card image={CommunityHelpImage}>Community Help</Card>
          <Card image={EmotionalHealthImage}>Emotional health</Card>
          <Card image={FavouritesImage}>Favourites</Card>
          <Card image={FilmsImage}>Films</Card>
          <Card image={FriendListsImage}>Friend lists</Card>
          <Card image={FundraisersImage}>Fundraisers</Card>
          <Card image={GamingVideoImage}>Gaming video</Card>
          <Card image={JobsImage}>Jobs</Card>
          <Card image={LiveVideosImage}>Live videos</Card>
          <Card image={MessengerImage}>Messenger</Card>
          <Card image={MessengerKidsImage}>Messenger kids</Card>
          <Card image={MostRecentImage}>Most recent</Card>
          <Card image={OffersImage}>Offers</Card>
          <Card image={PlayGamesImage}>Play games</Card>
          <Card image={RecentAdActivityImage}>Recent ad activity</Card>
          <Card image={WeatherImage}>Weather</Card>
        </>
      )}
      {showMoreItems ? (
        <Card
          icon={<SeeLessIcon />}
          enhanceSvg
          onClick={() => {
            setShowMoreItems(false);
            // console.log('clicked');
          }}
          listenClickOnCard
        >
          See less
        </Card>
      ) : (
        <Card
          icon={<SeeMoreIcon />}
          enhanceSvg
          onClick={() => {
            setShowMoreItems(true);
            // console.log('clicked');
          }}
          listenClickOnCard
        >
          See more
        </Card>
      )}
    </div>
  );
}

export default SideBar;
