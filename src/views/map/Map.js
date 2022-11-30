import React from 'react';
import Chatbox from './partials/Chatbox';
import ListRestaurant from './partials/ListRestaurant';
import ListUser from './partials/ListUser';
import MapLeaflet from './partials/MapLeaflet';

const Map = () =>  (
    <div className={'section-map-container'} >
      <ListRestaurant />
      <MapLeaflet  />
      <div>
        <button>Leave</button>
        <ListUser />
        <Chatbox />
      </div>
    </div>
  );

export default Map;
