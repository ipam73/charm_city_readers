import React from "react";
import NumberInput from "../common/NumberInput";
import DatePicker from "react-datepicker";

require("!style!css!less!./AddTimeForm.less");

var AddTimeForm = React.createClass({
  propTypes: {
    readDate: React.PropTypes.object.isRequired,
    readMinutes: React.PropTypes.number.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onMinsChange: React.PropTypes.func.isRequired,
    onDateChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object,
  },

  render: function() {
    return (
      <form>
        <div className="panel application-panel container-fluid container">
          <div className="TIMEFORM--panel-default">
            <div className="TIMEFORM--panel-body">
              <img src="/images/BuddyPlaceholder.png" alt="Icon"></img>
              <div className="content">
                <p>Date</p>
                <DatePicker
                  selected={this.props.readDate}
                  onChange={this.props.onDateChange}
                  maxDate={this.props.maxDate}
                  popoverAttachment='bottom center'
                  popoverTargetAttachment='top center'
                />
                <NumberInput
                  name="minutes"
                  label="Minutes Read"
                  placeholder="Minutes read"
                  value={this.props.readMinutes}
                  onChange={this.props.onMinsChange}
                  error={this.props.errors.minutes}
                />
              </div>
            </div>
            <div className="TIMEFORM--panel-footer">
              <input
                type="submit"
                value="Save"
                className="btn btn-default"
                onClick={this.props.onSave}
              />
              <input
                type="submit"
                value="Cancel"
                className="btn btn-default"
                onClick={this.props.onCancel}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = AddTimeForm;
