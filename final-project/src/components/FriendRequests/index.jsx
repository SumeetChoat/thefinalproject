import { useRequests, useAuth, useFriends } from "../../contexts";
import FriendRequest from "./FriendRequest";
import { useState } from "react";
import { socket } from "../../socket";

function FriendRequests({ accept, decline, pending, add }) {
  const { user } = useAuth();
  const { sentRequests } = useRequests();
  const { friends } = useFriends();
  const token = useAuth().token || localStorage.getItem("token");
  const [textFilter, setTextFilter] = useState("");

  function updateTextFilter(e) {
    setTextFilter(e.target.value);
  }

  async function addFriend(searchText) {
    setTextFilter("");
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
    };
    const resp = await fetch(
      `https://sight-reader-api.onrender.com/users/${searchText}`,
      options
    );
    const data = await resp.json();
    console.log("requests: ", sentRequests);
    console.log(
      "find: ",
      sentRequests.find(
        (r) => r.recipient !== searchText || r.sender !== searchText
      )
    );
    if (
      resp.ok &&
      !friends.find((f) => f.user1 == searchText || f.user2 == searchText) &&
      searchText !== user.username &&
      searchText.length > 0 &&
      !sentRequests.find(
        (r) => r.recipient == searchText || r.sender == searchText
      )
    ) {
      console.log(data);
      socket.emit("friend_req", {
        sender: user.username,
        recipient: searchText,
      });

      alert(`You have sent a friend request to user ${searchText}`);
    } else if (
      friends.find(
        (f) =>
          (f.user1 == searchText || f.user2 == searchText) &&
          searchText != user.username
      )
    ) {
      alert("You are already friends with this user.");
    } else if (searchText == user.username) {
      alert("You can't send a friend request to yourself!");
    } else if (sentRequests.find((r) => r.recipient == searchText)) {
      alert(`You have already sent a request to ${searchText}.`);
    } else if (sentRequests.find((r) => r.sender == searchText)) {
      alert(`The user ${searchText} has already sent you a request.`);
    } else {
      alert("There is no user with this username.");
    }
  }

  return (
    <>
      <div className="search-row">
        <input
          className="friend-request-input"
          type="text"
          placeholder="Add friends with username"
          value={textFilter}
          onChange={updateTextFilter}
        />
        <button className="add-btn" onClick={() => addFriend(textFilter)}>
          <div className="btn-icon" dangerouslySetInnerHTML={{ __html: add }} />
        </button>
      </div>

      <div className="friend-requests-list">
        {sentRequests && sentRequests.length > 0 ? (
          <div className="received-requests">
            {/* <hr></hr> */}
            {sentRequests.map((r) => {
              return r.sender !== user.username ? (
                <FriendRequest
                  request={r}
                  type="r"
                  key={r.request_id}
                  accept={accept}
                  decline={decline}
                  pending={pending}
                />
              ) : (
                ""
              );
            })}
          </div>
        ) : (
          ""
        )}
        {sentRequests && sentRequests.length > 0 ? (
          <div className="sent-requests">
            {/* <hr></hr> */}
            {sentRequests.map((r) => {
              return r.sender == user.username ? (
                <FriendRequest
                  request={r}
                  type="s"
                  key={r.request_id}
                  accept={accept}
                  decline={decline}
                  pending={pending}
                />
              ) : (
                ""
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default FriendRequests;
