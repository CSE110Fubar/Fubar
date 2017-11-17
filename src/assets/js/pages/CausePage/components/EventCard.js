import React from 'react';

export default class EventCard extends React.Component {
	render() {
    let {event, eventId} = this.props;

		return (<div className="col-sm-12">
      <div className="card">
        <div className="card-block">
          <div className="card-text card__header">
            {event.name}
          </div>
          <p className="card__description">{event.description}</p>
          <p className="card__description">
            Start Date: {event.startDate} <br/>
            End Date: {event.endDate} <br/>
            Location: {event.location} <br/>
            Address: {event.address} <br/>
          </p>
        </div>
      </div>
    </div>);
	}
}
