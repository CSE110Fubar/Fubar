import React from 'react';

export default class PetitionModal extends React.Component {
  render() {
    let {setValue, name, description, image, newPetition} = this.props;

    return (<div className="modal fade" id="petition_form">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4><span className="glyphicon glyphicon-lock"></span>Add Petition</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="CauseTitle">Title</label>
                <input type="title" className="form-control" id="CauseTitle" placeholder="Enter Cause Title" value={name} onChange={setValue('name')}/>
              </div>
              <div className="form-group">
                <label htmlFor="CauseDescription">Description</label>
                <textarea className="form-control" id="CauseDescription" placeholder="Enter Cause Description" rows="3" value={description} onChange={setValue('description')}></textarea>
              </div>
              <div className="form-group">
                <div className="form-group">
                  <label htmlFor="ImageInput">Image URL</label>
                  <input type="url" className="form-control" id="ImageInput" value={image} onChange={setValue('image')}/>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary pull-right" data-toggle="modal" data-target="#petition_form" onClick={newPetition}>Submit</button>
          </div>
        </div>
      </div>
    </div>);
  }
};