/* eslint-disable react/prop-types */
import "../../pages/profilePage/styles.css";
import { useAuth, useAssignmentList } from "../../contexts";
import AssignmentsItem from "./AssignmentsItem";

function AssignmentsList({ start, edit, trash }) {
  const { assignmentList } = useAssignmentList();
  const { user } = useAuth();

  return (
    <div className="assignments-lists">
      <div className="assignments-list-container assignments-completed">
        {user &&
        assignmentList &&
        assignmentList.filter((a) => a.completed).length !== 0 ? (
          <>
            {assignmentList
              .filter((a) => a.completed)
              .map((a, i) => {
                return (
                  <AssignmentsItem
                    start={start}
                    edit={edit}
                    trash={trash}
                    assignment={a}
                    key={i}
                  />
                );
              })}
          </>
        ) : (
          ""
        )}
      </div>

      <div className="assignments-list-container assignments-incomplete">
        {user &&
        assignmentList &&
        assignmentList.filter((a) => !a.completed).length !== 0 ? (
          <>
            {assignmentList
              .filter((a) => !a.completed)
              .map((a, i) => {
                return (
                  <AssignmentsItem
                    start={start}
                    edit={edit}
                    trash={trash}
                    assignment={a}
                    key={i}
                  />
                );
              })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AssignmentsList;
