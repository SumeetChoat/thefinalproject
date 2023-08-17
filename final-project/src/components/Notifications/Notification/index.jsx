function Notification({n, trash}) {

    function deleteNotification(n){
        console.log('deleting ',n)
    }
    
    return (
        <li className="notification-item">
            <span className="notification-msg">{n.message}</span>
            {/* <button className="delete-btn" onClick={()=>deleteNotification(n)}>
                <div className="btn-icon" dangerouslySetInnerHTML={{ __html: trash}}/>
            </button> */}
        </li>
    )
}

export default Notification
