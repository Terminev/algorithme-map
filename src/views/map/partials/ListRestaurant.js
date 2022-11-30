import React from 'react'
import {Restaurants} from "../../../config/Restaurant"

export const ListRestaurant = () => {
  return (
    <div className={"listRestaurant"}>
      <h3>Liste des restaurants</h3>
      <ul>
      {Restaurants.map(restaurant => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
        
      </ul>
        

    </div>
  )
}

export default ListRestaurant;