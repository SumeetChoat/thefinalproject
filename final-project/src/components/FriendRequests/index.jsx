import { useRequests, useAuth } from "../../contexts";
import FriendRequest from "./FriendRequest";

function FriendRequests({accept, decline, pending}) {
    const {user} = useAuth()
    const {sentRequests} = useRequests()

    return (
        <div className="friend-requests-list">
            {sentRequests && sentRequests.length > 0 ?
                <div className="received-requests">
                    <hr></hr>
                    {sentRequests.map((r, i) => {
                        return (r.sender !== user.username ?
                        <FriendRequest request={r} type='r' key={i} accept={accept} decline={decline} pending={pending}/>
                        : <p></p>)
                    })
                    }
                </div>
                : <p></p>
            }
            {sentRequests && sentRequests.length > 0 ? 
                <div className="sent-requests">
                    <hr></hr>
                    {sentRequests.map((r,i) => {
                        return (r.sender == user.username ?
                        <FriendRequest request={r} type='s' key={i} accept={accept} decline={decline} pending={pending}/>
                        : <p></p>)
                    })
                    }
                </div>
                : <p></p>
            }
        </div>
    )
}

export default FriendRequests
