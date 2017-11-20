import React from 'react';

export default class StanceBar extends React.Component {
	render() {
    let {progress} = this.props;
    
    return (<div className={`stance-bar ${progress == 0 ?
        'stance-bar--empty' : ''}`}>
      <div className="stance-bar__support"
        style={{width: (progress * 100) + "%"}}></div>
    </div>);
	}
}