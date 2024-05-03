import secrets from "../secrets.json";

export const apiURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${secrets.API_KEY}&format=json&nojsoncallback=1`;
