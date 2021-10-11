import axios from 'axios';

export const getReviewInfo = {
  getMetaData: (id, callback) => {
    axios({
      url: `http://localhost:3030/api/reviews/meta?product_id=${id}`,
      method: 'GET',
    })
      .then(({ data }) => {
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },

  helpfulRequest: (reviewId, callback) => {
    axios({
      url: `http://localhost:3030/api/reviews/${review_id}/helpful`,
      method: 'PUT',
    })
      .then(() => {
        console.log('Helpful Review added!');
      })
      .catch((err) => {
        callback(err);
      });
  },

  reportRequest: (reviewId, callback) => {
    axios({
      url: `http://localhost:3030/api/reviews/${review_id}/report`,
      method: 'PUT',
    })
      .then(() => {
        console.log('Review Reported');
      })
      .catch((err) => {
        callback(err);
      });
  },
};

export const getAverageRating = (id, callback) => {
  axios({
    url: `http://localhost:3030/api/reviews/meta?product_id=${id}`,
    method: 'GET',
  })
    .then(({ data }) => {
      const average = Object.values(data.ratings)
        .reduce((r, a, i) => (Number(r) + Number(a)
        * Number(Object.keys(data.ratings)[i])))
        / Object.values(data.ratings)
          .reduce((prev, curr) => Number(prev) + Number(curr)) || 0;
      callback(average);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getAllReviews = (id, selected, callback) => {
  axios({
    url: `http://localhost:3030/api/reviews?product_id=${id}&count=100&sort=${selected}`,
    method: 'GET',
  })
    .then(({ data }) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
};
