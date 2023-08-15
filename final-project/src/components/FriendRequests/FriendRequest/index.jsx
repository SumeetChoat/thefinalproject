import { useAuth } from "../../../contexts"

function FriendRequest({request, type, accept, decline, pending}) {
    const {user} = useAuth()
    console.log(request,type)

    function acceptRequest(request){

    }

    function declineRequest(request){

    }

    return (
        <div className="friend-requests-item">
            {type == 's' ? request.recipient : request.sender}
            {type == 'r' ? 
            <div className="friend-requests-btn">
                <button className="accept-btn" onClick={()=>acceptRequest(request)}>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: accept}}/>
                </button>
                <button className="decline-btn" onClick={()=>declineRequest(request)}>
                    <div className="btn-icon" dangerouslySetInnerHTML={{ __html: decline}}/>
                </button>
            </div>
            :
            <div className="pending-icon">
                <button className="pending-btn">
                    <div className="btn-icon" dangerouslySetInnerHTML={{__html: pending}}></div>
                </button>
            </div>
        }
        </div>
    )
}

export default FriendRequest
