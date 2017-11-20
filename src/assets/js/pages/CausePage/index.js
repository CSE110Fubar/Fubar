import React from 'react';

import checkAuth from '~/data/Auth';
import * as Api from '~/data/Api';
import Hero from '~/components/Hero';
import PublicFigureCard from '~/components/PublicFigureCard';
import EventCard from './components/EventCard';
import NewsCard from './components/NewsCard';
import StanceBar from './components/StanceBar';

export default class CausePage extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder state
    this.state = {
      user: {},
      cause: {},
      news: {},
      events: {},
      supportingFigures: {},
      opposingFigures: {}
    };
  }

  componentWillMount() {
    checkAuth((user) => this.setState({user: user}));

    let {params} = this.props.match;

    // Load data from API here, store in state
    Api.getCause(params.causeId)
    .once('value')
    .then((snapshot) => {
      this.setState({
        cause: snapshot.val()
      });

      snapshot.val().events.map((eventId) => 
        Api.getEvent(eventId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              events: {...this.state.events, [eventId]: snapshot.val()}
            });
          })
      );

      snapshot.val().supportingPublicFigures.map((figureId) => 
        Api.getPublicFigure(figureId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              supportingFigures: {...this.state.supportingFigures,
                [figureId]: snapshot.val()}
            });
          })
      );

      snapshot.val().opposingPublicFigures.map((figureId) =>
        Api.getPublicFigure(figureId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              opposingFigures: {...this.state.opposingFigures,
                [figureId]: snapshot.val()}
            });
          })
      );

      snapshot.val().news.map((newsId) =>
        Api.getNews(newsId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              news: {...this.state.news,
                [newsId]: snapshot.val()}
            });
          })
      );
    })
    .catch(console.error);
  }

	render() {
    let {cause, events, news,
      supportingFigures, opposingFigures, user} = this.state;

    if (!cause.name) {
      return <div>Loading...</div>;
    }

		return (<div className="cause-page">
      <Hero background={cause.image} />
      <div className="container cause-page__content">
        <div className="row">
          <div className="col-12">
            <h1 className="cause-page__header">
              {cause.name}{' '}
              <button href="#" className="btn btn-primary">Follow</button>
            </h1>
          </div>
          <div className="col-8">
            <h4 className="cause-page__description">{cause.description}</h4>
          </div>
          <div className="col-4">
            <StanceBar progress={cause.supportingUsers.length /
              (cause.supportingUsers.length + cause.opposingUsers.length)} />
            <div className="row">
              <div className="col-6">
                {cause.supportingUsers && cause.supportingUsers.length}{' '}
                Supporters
                {user && <button className="btn btn-success">
                  Support
                </button>}
              </div>
              <div className="col-6">
              {cause.opposingUsers && cause.opposingUsers.length}{' '}
              Opposers
                {user && <button className="btn btn-danger">
                  Oppose
                </button>}
              </div>
            </div>
          </div>
        </div>

        <section className="row cause-page__section">
          <div className="col-12">
            <h3 className="cause-page__section-header">Related News Articles</h3>
          </div>
          {!news && <div className="col-12">No News Articles</div>}
          {Object.keys(news).map((newsId) => 
            <div className="col-md-4" key={newsId}>
              <NewsCard news={news[newsId]} newsId={newsId} />
            </div>
          )}
        </section>

        <section className="row cause-page__section">
          <div className="col-12">
            <h3 className="cause-page__section-header">
              Facebook Events{' '}
              {user && <button className="btn btn-primary">Add an Event</button>}
            </h3>
          </div>
          {!events && <div className="col-12">No Events</div>}
          {Object.keys(events).map((eventId) => 
            <div className="col-md-4" key={eventId}>
              <EventCard event={events[eventId]} eventId={eventId} />
            </div>
          )}
        </section>

        <section className="row cause-page__section">
          <div className="col-6">
            <h3 className="cause-page__section-header">Supporters</h3>
          </div>
          <div className="col-6">
            <h3 className="cause-page__section-header">Opposers</h3>
          </div>
          <div className="col-6">
            {!supportingFigures && <div className="col-12">None</div>}
            {Object.keys(supportingFigures).map((figureId) => 
              <PublicFigureCard publicFigure={supportingFigures[figureId]}
                publicFigureId={figureId} key={figureId} />
            )}
          </div>
          <div className="col-6">
            {!opposingFigures && <div className="col-12">None</div>}
            {Object.keys(opposingFigures).map((figureId) => 
              <PublicFigureCard publicFigure={opposingFigures[figureId]}
                publicFigureId={figureId} key={figureId} />
            )}
          </div>
        </section>
      </div>
    </div>);
	}
}
