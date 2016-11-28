import React from "react";
import SummaryPanel from "./SummaryPanel";

function StudentList(props) {
  return (
    <div>
      <div>
        {Object.keys(props.students).map(
          (student_id, i) => {
            return (
              <SummaryPanel
                key={student_id}
                student={props.students[student_id]}
              />);
          }
        )}
      </div>
    </div>
  );
}

StudentList.propTypes = {
  students: React.PropTypes.object.isRequired,
};

module.exports = StudentList;
