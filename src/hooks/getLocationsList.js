import { endpoints } from "../endpoints";

/**
 * Fetching location list and coordinates based on the location text
 */
export async function getLocationsList ({
    locationText
}){
    const response = await fetch(endpoints.autocompleteLocation + locationText)
    const responseData = await response.json().then((response) => {
        return response.features?.reduce((accumulator, location) => {
            return accumulator.concat({ label: location.properties.label, coordinates: location.geometry.coordinates, isUpdated: false });
          }, []);
      });

      return responseData
}