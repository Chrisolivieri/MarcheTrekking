import React, { useContext, useEffect, useState } from "react";
import {
  deleteComment,
  editComment,
  loadComments,
  newComment,
} from "../../../../data/Fetch";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { UserContext } from "../../../../context/UserContextProvider";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { IoIosSend } from "react-icons/io";
import "./CommentsSection.css";

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
      console.log(initialFormState);
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
        const response = await deleteComment(id, commentDelete);

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
      // window.scrollTo(0, 0);
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
      <Container className="commentSection">
        <Row>
          <h5 className="mt-5">
            {comments.length} {comments.length === 1 ? "Commento" : "Commenti"}
          </h5>
          <div className="comments">
            {comments.map((comment, i) => (
              <Col
                key={`item-${i}`}
                md={8}
                className="mb-3"
                style={{ marginBottom: 20 }}
              >
                <Col md={12}>
                  <div className="singleComment">
                    <div className="d-flex">
                      <img
                        className="avatarComment"
                        src={comment.user?.avatar}
                        alt=""
                      />
                      <div className="d-flex flex-column commentContent">
                        <h5 className="userNameComment">
                          {comment.user?.name || "Anonimo"}
                        </h5>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                    {comment.user ? (
                      <div>
                        {comment.user &&
                          comment.user._id === decodedToken?.id && (
                            <>
                              <Button size="sm"
                                
                                onClick={() => handleEditComment(comment)}
                                className="editComment"
                              >
                                <CiEdit /> Modifica
                              </Button>
                              <Button size="sm"
                                className="deleteComment"
                                onClick={() =>
                                  handleShowConfirmModal(comment._id)
                                }
                              >
                                <MdDelete /> Elimina
                              </Button>
                            </>
                          )}
                      </div>
                    ) : null}
                  </div>
                </Col>
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
                <TiDelete /> Annulla
              </Button>
              <Button variant="danger" onClick={confirmDeleteComment}>
                <MdDelete /> Elimina
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>

        {edit && ( // show form only if edit is true
          <div className="form">
            <div className="row">
              <div className="input-div">
                <Button
                  variant="secondary"
                  className="mb-1"
                  onClick={handleClose}
                  type="button"
                >
                  <TiDelete /> Annulla
                </Button>
              </div>
            </div>
          </div>
        )}

        {token ? (
          <>
            <div className="d-flex align-items-center">
              <div className="text-area">
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
                <Button
                  className="post-btn"
                  onClick={handleSaveComment}
                  type="button"
                >
                 <IoIosSend /> Post
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center m-5">
            <p><Link to="/login">Accedi</Link> per lasciare un commento</p>
          </div>
        )}
      </Container>
    );
  }
};

export default CommentsSection;
