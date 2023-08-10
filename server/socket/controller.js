const Friends = require('./models/friends');
const Friend_Requests = require('./models/friend_requests');
const Messages = require('./models/messages');
const Notifications = require('./models/notifications');
const User = require('./models/user');

function controller(io) {
    let users = {};
    io.on('connection', async socket => {
        console.log('New socket connected');
        // write socket events here
        //maybe need to join socket into it's own id??

        // When user logs in, they will trigger the "username" event by sending their username to the server.
        socket.on("username", async (username) => {
            // Need to add username and socket id to users array
            users[username] = socket.id;

            // Adds username value to the socket
            //Not sure this works, but we will see ...
            socket.username = username;
            console.log(users);

            // Fetching data from db.
            const friends = await Friends.getAllFriends(username);
            const friend_requests = await Friend_Requests.getAll(username)
            const messages = await Messages.getAll(username);
            const notifications = await Notifications.getAll(username);

            const data = {
                "friends" : friends,
                "friend_requests" : friend_requests,
                "messages" : messages,
                "notifications" : notifications
            }

            io.to(socket.id).emit("username", data)
        })

        socket.on("message", async (message) => {
            // message needs to have: sender, recipient, type, content

            // Adds message to db.
            const msg = await Messages.create(message);

            // Needs to add notification to db.
            const noti = await Notifications.create_message_received(message.username);

            // Need to send message back to sender and recipient.
            io.to(socket.id).emit("message", message); // back to sender
            io.to(users[message.username]).emit("message", message); // to recipient

            // Need to send recipient the notification
            io.to(users[message.username]).emit("notification", noti);
        })

        socket.on("friend_req", async (req) => {
            // req needs to have: sender, recipient.

            // Creates friend request.
            const req = await Friend_Requests.create(req);

            // Created notification.
            const noti = await Notifications.create_friend_req_received(req.sender);

            // Sends friend request to recipient.
            io.to(users[req.recipient]).emit("friend_req", req);

            // Sends notification to recipient.
            io.to(users[req.recipient]).emit("notification", noti);

        })

        socket.on("friend_req_resp", async (resp) => {
            // resp needs to have: sender, recipient, status ("accepted" or "rejected")

            // Deletes friend request
            const friend_req = await Friend_Requests.getOne(resp.sender, resp.recipient);
            await friend_req.delete();

            if (resp.status === "accepted") {
                // Adds friend
                await Friends.create(resp.sender, resp.recipient);
            }

            // Creates notification
            const noti = await Notifications.create_friend_req_response(resp.recipient, resp.status);

            // Sends notification to sender
            io.to(users[req.sender]).emit("notification", noti);
            
        })
        
        socket.on('disconnect', () => {
            users.delete(socket.username)
            console.log(`Socket disconnected`);
        })
    })
}

module.exports = controller;