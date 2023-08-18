import {io} from 'socket.io-client';

const URL = "https://sightreader.onrender.com/"; // change to what ever url the api is on

export const socket = io(URL, {
    autoConnect: false //will be set to false later on
});
