import React from "react";
import {Link} from "react-router";

function AddTimeButton(props) {
  return (
    <div>
      <Link to={`/addtime/${props.studentID}`} className="btn btn-default">Log Time</Link>
    </div>
  );
}

AddTimeButton.propTypes = {
  studentID: React.PropTypes.string.isRequired,
};

module.exports = AddTimeButton;
