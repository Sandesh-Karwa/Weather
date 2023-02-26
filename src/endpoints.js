import { geoCodeApiKey } from "./config";

// Base URL for Geocode earth location API
const geoCodeBaseUrl = "https://api.geocode.earth/v1/";

// Base URL for meteomatics weather API
const meteomaticsBaseUrl = "https://api.meteomatics.com/";

// Declaring all the endpoints used in the application
export const endpoints = {
  autocompleteLocation: `${geoCodeBaseUrl}autocomplete?api_key=${geoCodeApiKey}&text=`,
  getlocation: `${geoCodeBaseUrl}search?api_key=${geoCodeApiKey}&text=`,
  getMaps: meteomaticsBaseUrl
};