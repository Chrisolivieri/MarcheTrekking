import React, { useContext, useEffect, useState } from "react";
import {
  deleteComment,
  editComment,
  loadComments,
  newComment,
} from "../../../../data/Fetch";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { UserContext } from "../../../../context/UserContextProvider";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, token } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [commentDelete, setCommentDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(null);

  const decodedToken = token ? jwtDecode(token) : null;

  const params = useParams();
  const { id } = params;

  const initialFormState = {
    content: "",
    trekkingRoutes: params.id,
    user: userInfo?._id || null,
  };

  const [formValue, setFormValue] = useState(initialFormState);

  const handleClose = () => {
    setEdit(false);
    setFormValue(initialFormState);
  };

  const handleChangeFormValue = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSaveComment = async () => {
    try {
      if (edit) {
        await editComment(id, editCommentId, formValue);
      } else {
        await newComment(params.id, formValue);
      }
      const commentsRes = await loadComments(params.id);
      setComments(commentsRes.data);
      setFormValue(initialFormState);
      handleClose();
    } catch (error) {
      console.log("Errore: ", error);
    }
  };

  const handleEditComment = (comment) => {
    setEdit(true);
    setEditCommentId(comment._id);
    setFormValue({ ...formValue, content: comment.content });
  };

  const handleShowConfirmModal = (commentId) => {
    setCommentDelete(commentId);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setCommentDelete(null);
    setShowConfirmModal(false);
  };

  const confirmDeleteComment = async () => {
    
    try {
      if (commentDelete) {
        const response = await deleteComment(id,commentDelete);
       

        const commentsRes = await loadComments(params.id);
        setComments(commentsRes.data);

        handleCloseConfirmModal();
      }
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

  useEffect(() => {
    if (decodedToken) {
    }
  }, [decodedToken]);

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
                          <div>
                            <p>{"Commento di " + comment.user.name}</p>
                            <img src={comment.user.avatar} alt="" />

                            {comment.user &&
                              comment.user._id === decodedToken?.id && (
                                <>
                                  <button
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: 10,
                                    }}
                                    onClick={() => handleEditComment(comment)}
                                  >
                                    modifica
                                  </button>
                                  <button
                                    style={{
                                      cursor: "pointer",
                                      marginLeft: 10,
                                    }}
                                    onClick={() =>
                                      handleShowConfirmModal(comment._id)
                                    }
                                  >
                                    elimina
                                  </button>
                                </>
                              )}
                          </div>
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
          <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
            <Modal.Header closeButton>
              <Modal.Title>Conferma Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sei sicuro di voler eliminare questo commento? Questa azione è
              irreversibile.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmModal}>
                Annulla
              </Button>
              <Button variant="danger" onClick={confirmDeleteComment}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>

        {edit && ( // show form only if edit is true
          <div className="form">
            <div className="row">
              <div className="input-div">
                <button
                  className="cancel-btn"
                  onClick={handleClose}
                  type="button"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}

        {token ? (
          <div className="form">
            <div className="row">
              <div className="input-div">
                <textarea
                  rows="2"
                  className="input-box"
                  placeholder="Scrivi qui un commento"
                  name="content"
                  value={formValue.content}
                  onChange={handleChangeFormValue}
                />
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
          </div>
        ) : (
          <div>Accedi per lasciare un commento.</div>
        )}
      </Container>
    );
  }
};

export default CommentsSection;
