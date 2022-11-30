import React from 'react';
import Chatbox from './partials/Chatbox';
import ListRestaurant from './partials/ListRestaurant';
import ListUser from './partials/ListUser';
import MapLeaflet from './partials/MapLeaflet';

const Map = () =>  (
    <div className={'section-map-container'} >
      <h4>Rendez-vous à 13h : tu dois partir à 8h</h4>
      <ListRestaurant />
      <MapLeaflet  />
      <div className='container-right'>
        <button className='button-leave'>QUITTER</button>
        <ListUser />
        <Chatbox />
      </div>
    </div>
  );

export default Map;
