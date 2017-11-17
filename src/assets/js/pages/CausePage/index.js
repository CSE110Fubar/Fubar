import React from 'react';

import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import EventCard from './components/EventCard';
import StanceBar from './components/StanceBar';

export default class CausePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      cause: {},
      events: {}
    };
  }

  componentWillMount() {
    let {params} = this.props.match;

    // Load data from API here, store in state
    Api.getCause(params.causeId)
        .once('value')
        .then((snapshot) => {
          this.setState({
            cause: snapshot.val()
          });

          snapshot.val().events.map((eventId) => {
            Api.getEvents(eventId)
                .once('value')
                .then((snapshot) => {
                  this.setState({
                    events: {...this.state.events, [eventId]: snapshot.val()}
                  });
                });
          })
        })
        .catch(console.error);
  }

	render() {
    let {cause, events} = this.state;

    if (!cause) {
      return <div>Loading...</div>;
    }

		return (<div className="cause-page">
      <Hero background={cause.image} />
      <div className="container cause-page__content">
        <div className="row">
          <div className="col-12">
            <h1 className="cause-page__header">
              {cause.name}{' '}
              <button className="btn">Follow</button>
            </h1>
          </div>
          <div className="col-12">
            <h4 className="cause-page__description">{cause.description}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <h2>Related News Articles</h2>
          </div>
          <div className="col-4">
            <StanceBar progress={cause.supportingUsers.length /
              (cause.supportingUsers.length + cause.opposingUsers.length)} />
            <div className="row">
              <div className="col-6">
                {cause.supportingUsers && cause.supportingUsers.length}{' '}
                Supporters
                <button className="btn btn-success">
                  Support Cause
                </button>
              </div>
              <div className="col-6">
              {cause.opposingUsers && cause.opposingUsers.length}{' '}
              Opposers
                <button className="btn btn-danger">
                  Oppose Cause
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2>Facebook Events</h2>
            {Object.keys(events).map((eventId) =>
                <EventCard event={events[eventId]} eventId={eventId} key={eventId} />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2>Related Public Figures</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-6 column">
            <h3>Supporters</h3>
          </div>
          <div className="col-6 column">
            <h3>Opposers</h3>
          </div>
        </div>
      </div>
    </div>);
	}
}
