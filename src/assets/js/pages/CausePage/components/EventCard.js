import React from 'react';
import moment from 'moment';

export default class EventCard extends React.Component {
	render() {
    let {event, eventId} = this.props;
    const dateFormat = "MMM Do [at] h:mm a";

    let startTime = moment(event.startDate).format(dateFormat),
      endTime = moment(event.endDate).format(dateFormat);

		return (
      <a href={event.link} target="_new" className="card">
        <div className="card-block">
          <div className="card-text card__header">
            {event.name}
          </div>
          <p className="card__description">
            {event.description} <br/>
            <i className="fa fa-clock-o"></i> {startTime} Until {endTime} <br/>
          </p>
          <p className="card__location">
            <i className="fa fa-map-marker"></i> {event.location} <br/>
            <i className="fa fa-location-arrow"></i> {event.address} <br/>
          </p>
        </div>
      </a>);
	}
}
