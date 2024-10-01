import React, { useContext, useEffect, useState } from "react";
import { loadComments, newComment } from "../../../../data/Fetch";
import { Col, Container, Row, Image } from "react-bootstrap";
import { UserContext } from "../../../../context/UserContextProvider";
import { useParams } from "react-router-dom";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, token } = useContext(UserContext);
  const params = useParams();

  const initialFormState = {
    content: "",
    trekkingRoutes: params.id,
    user: userInfo?._id || null,
  };

  const [formValue, setFormValue] = useState(initialFormState);

  const handleChangeFormValue = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSaveComment = async () => {
    try {
      await newComment(params.id, formValue);
      const commentsRes = await loadComments(params.id);
      setComments(commentsRes.data);
      setFormValue(initialFormState);
    } catch (error) {
      console.log("Errore: ", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await loadComments(params.id);
        if (response) {
          setComments(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <Container>
        <Row>
          <h3 className="mt-5">Sezione Commenti</h3>
          <div className="comments">
            {comments.map((comment, i) => (
              <Col
                key={`item-${i}`}
                md={8}
                className="mb-3"
                style={{ marginBottom: 20 }}
              >
                <Container>
                  <Row>
                    <Col>
                      <div className="d-flex">
                        <h3>{comment.content}</h3>
                        {comment.user ? (
                          <>
                            <p>{"Commento di " + comment.user.name}</p>
                            <img src={comment.user.avatar} alt="" />
                          </>
                        ) : (
                          <p>Commento anonimo</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
            ))}
          </div>
        </Row>
        {token ? (
          <div className="form">
            <div className="row">
              <div className="row">
                <div className="input-div">
                  <div className="d-flex">
                    <Row>
                      <Col xs={"auto"} className="pe-0">
                        <Image
                          className="blog-author"
                          src={userInfo.avatar}
                          roundedCircle
                        />
                      </Col>
                      <Col>
                        <h6>{userInfo.name}</h6>
                      </Col>
                    </Row>
                  </div>
                  <textarea
                    rows="2"
                    className="input-box"
                    placeholder="Scrivi qui un commento"
                    name="content"
                    value={formValue.content}
                    onChange={handleChangeFormValue}
                  />
                </div>
              </div>
            </div>
            <div className="btn-div">
              <button
                className="post-btn"
                onClick={handleSaveComment}
                type="button"
              >
                Post
              </button>
            </div>
          </div>
        ) : (
          <div>Accedi per lasciare un commento.</div>
        )}
      </Container>
    );
  }
};

export default CommentsSection;
