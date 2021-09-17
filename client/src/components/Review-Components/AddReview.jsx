import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import {
  ratingDesc, fitDesc, comfortDesc, qualityDesc, lenDesc, widthDesc, sizeDesc,
} from './helper.js';
import {
  reviewFormReducer, SELECT_RATING,
  ADD_SUMMARY, ADD_BODY, SELECT_REC, ADD_USER,
  ADD_EMAIL, ADD_COMFORT, ADD_QUALITY, ADD_FIT, ADD_SIZE, ADD_WIDTH,
  ADD_LENGTH, initialState, CLEAR_ENTRIES, ADD_PHOTOS,
} from './Review-Reducers/formsReducer.jsx';

const AddReview = (props) => {
  const [state, dispatch] = useReducer(reviewFormReducer, initialState);
  const [sizefitId, setSizeFitId] = useState(0);
  const [widthlengthId, setWidthLengthId] = useState(0);
  const [sizefitRating, setSizeFitRating] = useState(0);
  const [widthlengthRating, setWidthLengthRating] = useState(0);
  const [comfortId, setComfortId] = useState(0);
  const [qualityId, setQualityId] = useState(0);
  const [submitClick, setSubmitClick] = useState(false);
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState(false);
  const mapArray = new Array(5).fill(1);
  const { characteristics } = props;
  const handleChange = (e) => {
    dispatch({ type: e.target.name, payload: e.target.value });
  };
  const handlePhotoChange = (e) => {
    dispatch({ type: ADD_PHOTOS, payload: e.target.files });
  };

  const submitMessage = () => {
    if (submitClick) {
      if (reviewSubmitStatus) {
        return (
          <>
            <p>Review Submission Successful!</p>
            <i className="bi bi-card-checklist" />
          </>
        );
      }
      return (<p className="error-message"><em>Please Fill out Required</em></p>);
    }
  };

  const getSizeId = (data) => new Promise((resolve, reject) => {
    if (data.Fit) {
      resolve(data);
    } else if (data.Size) {
      resolve(data);
    } else {
      reject(data);
    }
  })
    .then((result) => {
      setSizeFitId(result.Fit.id || result.Size.id);
      setSizeFitRating(result.Fit ? state.fit : state.size);
    })
    .catch((err) => {
      console.log(err);
    });

  const getLengthId = (data) => new Promise((resolve, reject) => {
    if (data.Length) {
      resolve(data);
    } else if (data.Width) {
      resolve(data);
    } else {
      reject(data);
    }
  })
    .then((result) => {
      setWidthLengthId(result.Length.id || result.Width.id);
      setWidthLengthRating(result.Length ? state.length : state.width);
    })
    .catch((err) => {
      console.log(err);
    });

  const getComfortId = (data) => new Promise((resolve) => {
    resolve(data.Comfort);
  })
    .then((result) => {
      setComfortId(Number(result.id));
    });

  const getQualityId = (data) => new Promise((resolve) => {
    resolve(data.Quality);
  })
    .then((result) => {
      setQualityId(Number(result.id));
    });

  const data = {
    product_id: props.productId,
    rating: state.selectedRating,
    summary: state.summaryText,
    body: state.bodyText,
    recommend: state.selectRec === 'true',
    name: state.addUsername,
    email: state.addEmail,
    photos: state.addPhotos,
    characteristics: {
      [sizefitId]: sizefitRating,
      [widthlengthId]: widthlengthRating,
      [comfortId]: state.comfort,
      [qualityId]: state.quality,
    },
  };

  // const headers = {
  //   'Content-Type': 'application/json',
  // };
  const postNewReview = (e) => {
    e.preventDefault();
    axios.post('/api/reviews', data)
      .then(() => {
        console.log('Review Posted');
        setReviewSubmitStatus(true);
        setSubmitClick(true);
        dispatch({ type: CLEAR_ENTRIES });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({ type: CLEAR_ENTRIES });
        setSubmitClick(true);
        console.log(err.response);
      });
  };
  useEffect(() => {
    getSizeId(characteristics);
    getLengthId(characteristics);
    getQualityId(characteristics);
    getComfortId(characteristics);
  }, [characteristics]);

  return (
    <div className="modal" id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title" id="reviewModalLabel">Write A Review</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div>
            <p className="about-product">About the Product Name Here</p>
          </div>
          <div className="modal-body">
            <form>
              <p>Overall Rating</p>
              <div className="mb-3">
                {mapArray.map((radio, i) => (
                  <div className="form-check form-check-inline" key={i + 1}>
                    <label className="form-check-label" htmlFor={`inlineRadio${i + 1}`}>
                      {ratingDesc(i + 1)}
                      <input onChange={handleChange} className="form-check-input" type="radio" name={SELECT_RATING} id={`inlineRadio${i + 1}`} value={i + 1} />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <p>Do you recommend this product?</p>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                    <input onChange={handleChange} className="form-check-input" type="radio" name={SELECT_REC} id="inlineRadio1" value="true" />
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                    <input onChange={handleChange} className="form-check-input" type="radio" name={SELECT_REC} id="inlineRadio2" value="false" />
                  </label>
                </div>
              </div>
              <div className="characteristics-radio">
                <p>Characteristics</p>
                <h6 className="radio-characteristic-labels">
                  {props.characteristics.Fit ? 'Fit' : 'Size'}
                </h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {props.characteristics.Fit ? fitDesc(i + 1) : sizeDesc(i + 1)}
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="radio"
                        id={`inlineRadio${i + 1}`}
                        name={props.characteristics.Fit ? ADD_FIT : ADD_SIZE}
                        value={i + 1}
                      />
                    </label>
                  </div>
                ))}
                <h6 className="radio-characteristic-labels">
                  {props.characteristics.Length ? 'Length' : 'Width'}
                </h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {props.characteristics.Length ? lenDesc(i + 1) : widthDesc(i + 1)}
                      <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="radio"
                        id={`inlineRadio${i + 1}`}
                        name={props.characteristics.Length ? ADD_LENGTH : ADD_WIDTH}
                        value={i + 1}
                      />
                    </label>
                  </div>
                ))}
                <h6 className="radio-characteristic-labels">Comfort</h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {comfortDesc(i + 1)}
                      <input onChange={handleChange} className="form-check-input" type="radio" id={`inlineRadio${i + 1}`} name={ADD_COMFORT} value={i + 1} />
                    </label>
                  </div>
                ))}
                <h6 className="radio-characteristic-labels">Quality</h6>
                {mapArray.map((radio, i) => (
                  <div className="radio-label-vertical-wrapper" key={i + 1}>
                    <label className="radio-label-vertical" htmlFor={`inlineRadio${i + 1}`}>
                      {qualityDesc(i + 1)}
                      <input onChange={handleChange} className="form-check-input" type="radio" id={`inlineRadio${i + 1}`} name={ADD_QUALITY} value={i + 1} />
                    </label>
                  </div>
                ))}
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
                  placeholder="Example: Best purchase ever!"
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
                  minLength="50"
                  id="message-text"
                  placeholder="Why did you like the product or not?"
                  name={ADD_BODY}
                  value={state.bodyText}
                  onChange={handleChange}
                />
                {state.bodyText.length < 50
                  ? (
                    <p className="text-muted">
                      <small>
                        Minimum required characters left: [
                        {50 - state.bodyText.length}
                        ]
                      </small>
                    </p>
                  )
                  : <p className="text-muted"><small>Minimum reached</small></p>}
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">What is your nickname</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  placeholder="Example: jackson11!"
                  value={state.addUsername}
                  name={ADD_USER}
                  onChange={handleChange}
                />
                <p className="text-muted">
                  <small>
                    For privacy reasons, do not use your full name or email address
                  </small>
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">Your email</label>
                <input
                  type="email"
                  className="form-control"
                  maxLength="60"
                  id="message-text"
                  required
                  placeholder="Example: jackson11@email.com"
                  value={state.addEmail}
                  name={ADD_EMAIL}
                  onChange={handleChange}
                />
                <p className="text-muted">
                  <small>
                    For authentication reasons, you will not be emailed
                  </small>
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Photo Upload</label>
                <br />
                <input onChange={handlePhotoChange} type="file" accept=".jpg,.png," className="form-control-file" id="exampleFormControlFile1" />
                <br />
              </div>
              <div className="modal-footer">
                {submitMessage()}
                <button type="button" onClick={() => { props.handleModalClick; }} className="btn btn-outline-secondary w-30 p-3" data-bs-dismiss="modal">Close</button>
                <button type="submit" onClick={(e) => postNewReview(e)} className="btn btn-outline-dark w-30 p-3">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
