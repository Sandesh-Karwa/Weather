// API key for Geocode APIs
const geoCodeApiKey = "ge-d57d97f39a88ffd7";

// Username and password for accessing meteomatics APIs
const meteomaticsUrlHeader = () => {
    const username='willow_karwa'
    const password='6ePaY2xh7W'
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    return headers
}

export {
    geoCodeApiKey,
    meteomaticsUrlHeader
}