import {
    icon
} from "leaflet";

export const ICON_RESTAU = new icon({
    iconUrl: "../images/restaurant-pin.png",
    iconSize: [30, 30],
})

export const ICON_DESTINATION = new icon({
    iconUrl: "../images/appointment-pin.png",
    iconSize: [35, 35],
})

export const ICON_USER = new icon({
    iconUrl: "../images/user-pin.png",
    iconSize: [35, 35],
})

export const colorPolyline = (number) => ({color : '#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(number,'0')});