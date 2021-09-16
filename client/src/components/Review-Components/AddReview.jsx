import React, { useReducer } from 'react';
// import axios from 'axios';
import {
  ratingDesc, fitDesc, comfortDesc, qualityDesc,
} from './characteristics.js';
import {
  reviewFormReducer, SELECT_RATING,
  ADD_SUMMARY, ADD_BODY, SELECT_REC, ADD_USER,
  ADD_EMAIL, ADD_COMFORT, ADD_QUALITY, ADD_FIT, initialState,
} from './Review-Reducers/formsReducer.jsx';

const AddReview = (props) => {
  const [state, dispatch] = useReducer(reviewFormReducer, initialState);
  const mapArray = new Array(5).fill(1);
  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  return (
    <div className="modal" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title" id="reviewModalLabel">Write A Review</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div>
            <p>About the Product Name Here</p>
          </div>
          <div className="modal-body-review">
            <form>
              <p>Overall Rating</p>
              {mapArray.map((radio, i) => (
                <div className="form-check form-check-inline" key={i + 1}>
                  <label className="form-check-label" htmlFor={`inlineRadio${i + 1}`}>
                    {ratingDesc(i + 1)}
                  </label>
                  <input onChange={handleChange} className="form-check-input" type="radio" name={SELECT_RATING} id={`inlineRadio${i + 1}`} value={i + 1} />
                </div>
              ))}
              <div className="mb-3">
                <p>Do you recommend this product?</p>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                  </label>
                  <input onChange={handleChange} className="form-check-input" type="radio" name={SELECT_REC} id="inlineRadio1" value="true" />
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                  <input onChange={handleChange} className="form-check-input" type="radio" name={SELECT_REC} id="inlineRadio2" value="false" />
                </div>
              </div>
              <div className="characteristics-radio">
                <p>Characteristics</p>
                <label className="form-check-label">
                  Fit
                  {mapArray.map((radio, i) => (
                    <div className="form-check form-check-inline" key={i + 1}>
                      <label className="form-check-label" htmlFor={`inlineRadio${i + 1}`}>
                        {fitDesc(i + 1)}
                      </label>
                      <br />
                      <input onChange={handleChange} className="form-check-input" type="radio" id={`inlineRadio${i + 1}`} name={ADD_FIT} value={i + 1} />
                    </div>
                  ))}
                </label>
                <label className="form-check-label">
                  Comfort
                  {mapArray.map((radio, i) => (
                    <div className="form-check form-check-inline" key={i + 1}>
                      <label className="form-check-label" htmlFor={`inlineRadio${i + 1}`}>
                        {comfortDesc(i + 1)}
                      </label>
                      <br />
                      <input onChange={handleChange} className="form-check-input" type="radio" id={`inlineRadio${i + 1}`} name={ADD_COMFORT} value={i + 1} />
                    </div>
                  ))}
                </label>
                <label className="form-check-label">
                  Quality
                  {mapArray.map((radio, i) => (
                    <div className="form-check form-check-inline" key={i + 1}>
                      <label className="form-check-label" htmlFor={`inlineRadio${i + 1}`}>
                        {qualityDesc(i + 1)}
                      </label>
                      <br />
                      <input onChange={handleChange} className="form-check-input" type="radio" id={`inlineRadio${i + 1}`} name={ADD_QUALITY} value={i + 1} />
                    </div>
                  ))}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Review summary</label>
                <textarea
                  type="text"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  name={ADD_SUMMARY}
                  value={state.summaryText}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Review body</label>
                <textarea
                  type="text"
                  className="form-control"
                  maxLength="1000"
                  id="message-text"
                  required
                  name={ADD_BODY}
                  value={state.bodyText}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Photo Upload</label>
                <br />
                <input onChange={handleChange} type="file" accept=".jpg,.png," className="form-control-file" id="exampleFormControlFile1" />
                <br />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">What is your nickname</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  value={state.addUsername}
                  name={ADD_USER}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Your email</label>
                <input
                  type="email"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  value={state.addEmail}
                  name={ADD_EMAIL}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => { props.handleModalClick }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" onClick={() => { console.log('test'); }} className="btn btn-primary" data-bs-dismiss="modal">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
