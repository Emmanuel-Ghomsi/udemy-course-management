import "../../../assets/scss/comments.scss";
import { useState, useEffect } from "react";
import axios from "axios";

import moment from "moment";
import "moment/locale/fr";

function Review(props) {
  const token = `${process.env.REACT_APP_UDEMY_CLIENT_API}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [reviewsList, setReviewsList] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_UDEMY_HOSTNAME}/taught-courses/reviews/?course=${props.id}&ordering=created/?page_size=100`,
        config
      )
      .then((res) => {
        setReviewsList(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          {reviewsList != null ? (
            reviewsList?.map((review, index) => {
              return (
                <div key={review.id} className="comment">
                  <div className="user-banner">
                    <div className="user">
                      <h5>{review.user.name}</h5>
                    </div>
                  </div>
                  <div className="content">
                    <p>{review.content}</p>
                  </div>
                  <div className="footer">
                    <button className="btn react">
                      <i className="fa fa-star text-yellow"></i>&nbsp;
                      {review.rating}
                    </button>
                    <div className="divider"></div>
                    <span className="is-mute">
                      {moment(review.created).locale("fr").format("ll")}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <tr>
              <td>Chargement...</td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
}

export default Review;
