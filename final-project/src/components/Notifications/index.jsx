import { useNotifications, useAuth } from "../../contexts"
import './styles.css'
import Notification from "./Notification"

function Notifications({handleClose}) {
    const {user} = useAuth()
    const {notifications} = useNotifications()

    const decline = '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>'

    const trash= '<svg class=svg-icon xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>'

    function deleteAll() {
        console.log('deleting all notifications')
    }

    return (
        <>
        <div className="notification-header">
            <span className="container-header">Notifications</span>
            <button className="close-modal-btn" onClick={handleClose}>
                <div className="btn-icon" dangerouslySetInnerHTML={{__html: decline}} />
            </button>
        </div>
        { user && notifications && notifications.length > 0 ?
            <div className="delete-all-btn">
            <span>Delete all </span>
            <button className="delete-btn" onClick={() => deleteAll()}>
            <div
                className="btn-icon"
                dangerouslySetInnerHTML={{ __html: trash }}
            />
            </button>
            </div>
            : ""
        }
        <div className="notification-container">
            <ul className="notification-list">
                {user && notifications && notifications.length > 0? 
                notifications.map((n,i) => {
                    return (<Notification n={n} key={i} trash={trash}/>)
                })
                : <li>No notifications</li>
                }
            </ul>            
        </div>
        </>
    )
}

export default Notifications
