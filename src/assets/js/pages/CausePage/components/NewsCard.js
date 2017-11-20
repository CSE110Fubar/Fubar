import React from 'react';

export default class NewsCard extends React.Component {
	render() {
    let {news, newsId} = this.props;

		return (<a href={news.url} target="_new" className="card">
        <div className="card-block">
          <div className="card-text card__header">
            {news.name}
          </div>
        </div>
      </a>);
	}
}
