import React from 'react';
import FontAwesome from 'react-fontawesome';

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
      opposingFigures: {},
      following: false
    };
  }
  
  componentWillMount() {
    checkAuth((user) => {
      this.setState({user: user})
      this.updateUserFollowing();
    });

    // Load data from API here, store in state
    this.loadCause();
  }

  followCause = () => {
    return Api.userFollowCause(this.state.user.uid,
      this.props.match.params.causeId)
    .then(this.loadCause);
  }

  unfollowCause = () => {
    return Api.userUnfollowCause(this.state.user.uid,
      this.props.match.params.causeId)
    .then(this.loadCause);
  };

  updateUserFollowing = () => {
    let {user} = this.state;
    let {causeId} = this.props.match.params;

    if(!user) return;

    Api.getUserFollowing(user.uid, causeId)
    .then(following => this.setState({following}));
  }

  loadCause = () => {
    let {params} = this.props.match;

    Api.getCause(params.causeId)
    .once('value')
    .then((snapshot) => {
      this.setState({
        cause: snapshot.val()
      });

      let cause = snapshot.val();

      cause.events && cause.events.map((eventId) => 
        Api.getEvent(eventId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              events: {...this.state.events, [eventId]: snapshot.val()}
            });
          })
      );

      cause.supportingPublicFigures && 
        cause.supportingPublicFigures.map((figureId) => 
        Api.getPublicFigure(figureId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              supportingFigures: {...this.state.supportingFigures,
                [figureId]: snapshot.val()}
            });
          })
      );

      cause.opposingPublicFigures && 
        cause.opposingPublicFigures.map((figureId) =>
        Api.getPublicFigure(figureId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              opposingFigures: {...this.state.opposingFigures,
                [figureId]: snapshot.val()}
            });
          })
      );

      cause.news && cause.news.map((newsId) =>
        Api.getNews(newsId)
          .once('value')
          .then((snapshot) => {
            this.setState({
              news: {...this.state.news,
                [newsId]: snapshot.val()}
            });
          })
      );

      this.updateUserFollowing();
    })
    .catch(console.error);
  }

  /**
   * Removes the user from both the opposing and supporting users list
   */
  removeStance = () => {
    let {user} = this.state;
    let {params} = this.props.match;

    if (!user) return;

    let supporting = Api.getSupportingUsers(params.causeId);
    let opposing = Api.getOpposingUsers(params.causeId);

    let remSupp = supporting
    .once('value')
    .then((snapshot) => {
      let val = snapshot.val();
      if (val === null) return;
      Object.keys(val).forEach((uid) => {
        if (val[uid] == user.uid) {
          supporting.child(uid).remove();
        }
      })
    });

    let remOpp = opposing
    .once('value')
    .then((snapshot) => {
      let val = snapshot.val();
      if (val === null) return;
      Object.keys(val).forEach((uid) => {
        if (val[uid] == user.uid) {
          opposing.child(uid).remove();
        }
      })
    });

    return Promise.all([remSupp, remOpp]);
  }

  /**
   * Adds the user to the list of supporting users and refreshes
   */
  supportCause = () => {
    let {user} = this.state;
    let {params} = this.props.match;

    if (!user) return;

    this.removeStance()
    .then(() => {
      let supporting = Api.getSupportingUsers(params.causeId);
      let newUser = supporting.push();
      return newUser.set(user.uid);
    })
    .then(this.followCause);
  }

  /**
   * Adds the user to the list of opposing users and refreshes
   */
  opposeCause = () => {
    let {user} = this.state;
    let {params} = this.props.match;

    if (!user) return;

    this.removeStance()
    .then(() => {
      let opposing = Api.getOpposingUsers(params.causeId);
      let newUser = opposing.push();
      return newUser.set(user.uid);
    })
    .then(this.followCause);
  }

	render() {
    let {cause, events, news,
      supportingFigures, opposingFigures, user, following} = this.state;

    let stanceProgress = 0;
    if (cause.supportingUsers && cause.opposingUsers) {
      let supporting = Object.values(cause.supportingUsers).length,
        opposing = Object.values(cause.opposingUsers).length;

      stanceProgress = supporting / (supporting + opposing);
    }

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
              {following && <button href="#" onClick={this.unfollowCause}
                className="btn btn-danger">
                <FontAwesome name="eye-slash" /> Unfollow
              </button>}
              {!following && <button href="#" onClick={this.followCause}
                className="btn btn-primary">
                <FontAwesome name="eye" /> Follow
              </button>}
            </h1>
          </div>
          <div className="col-8">
            <h4 className="cause-page__description">{cause.description}</h4>
          </div>
          <div className="col-4">
            <StanceBar progress={stanceProgress} />
            <div className="row">
              <div className="col-6">
                {cause.supportingUsers ?
                  Object.values(cause.supportingUsers).length : '0'}
                {' '}
                Supporters
                {user && <button onClick={this.supportCause}
                  className="btn btn-success">
                  Support
                </button>}
              </div>
              <div className="col-6">
                {cause.opposingUsers ?
                  Object.values(cause.opposingUsers).length : '0'}{' '}
                Opposers
                {user && <button onClick={this.opposeCause}
                  className="btn btn-danger">
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
              {user && <a href="#">
                <i className="cause-page__add-event fa fa-plus fa-plus-small">
                </i>
              </a>}
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
            <div className="row">
              {!supportingFigures && <div className="col-12">None</div>}
              {Object.keys(supportingFigures).map((figureId) => 
                <div className="col-sm-6 col-lg-3" key={figureId}>
                  <PublicFigureCard publicFigure={supportingFigures[figureId]}
                    publicFigureId={figureId} />
                </div>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              {!opposingFigures && <div className="col-12">None</div>}
              {Object.keys(opposingFigures).map((figureId) => 
                <div className="col-sm-6 col-lg-3" key={figureId}>
                  <PublicFigureCard publicFigure={opposingFigures[figureId]}
                    publicFigureId={figureId} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>);
	}
}
