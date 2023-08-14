import {socket} from './socket';

export default function eventListeners() {

    socket.on("username", data => {
        // Update context here with...

        // Friends

        // Friend_Requests

        // Messages

        // Notifications

        // Assignments


    })

    socket.on("message", msg => {
        // Update message context here
    })

    socket.on("friend_req", req => {
        // Update friend request context here
    })

    socket.on("add_friend", friend => {
        // Update friends context here
    })

    socket.on("notification", noti => {
        // Update notifications list
    })

    socket
}