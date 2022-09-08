import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearAuthor,
  getAllCommentByIDAsync,
  makeReplyOnCommentAsync,
  getMainCommentByIDAsync,
} from "../redux/comment";
import CommentCard from "./CommentCard";
import ReplyCommentCard from "./ReplyCommentCard";

const ReplyComment = () => {
  const { author } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.user);
  const [replies, setReplies] = useState([]);
  const [comment, setComment] = useState([]);
  const goBack = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    if (!comment) return;

    try {
      dispatch(
        makeReplyOnCommentAsync({
          comment_id: id,
          author: user?._id,
          comment_text: comment,
        })
      ).unwrap();
      setComment("");
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    dispatch(
      getMainCommentByIDAsync({
        id,
      })
    );
    return () => {
      dispatch(clearAuthor());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const loadComments = () => {
      dispatch(
        getAllCommentByIDAsync({
          id,
        })
      )
        .unwrap()
        .then((res) => setReplies(res.data));
    };
    loadComments();
  }, [dispatch, id]);

  return (
    <>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <Container
            className="p-3 border d-flex justify-content-between align-items-center"
            fluid
          >
            <div>
              <FaArrowLeft onClick={() => goBack(-1)} /> Back
            </div>
            <div>Replie's</div>
          </Container>
          <Container fluid className="mt-2">
            <CommentCard
              profileImage={author?.author?.profile_image}
              fname={author?.author?.fname}
              lname={author?.author?.lname}
              text={author?.text_content}
            />
            <hr />
            {replies?.length !== 0 ? (
              replies?.map((replie) => (
                <ReplyCommentCard
                  key={replie._id}
                  fname={replie?.author?.fname}
                  lname={replie?.author?.lname}
                  text={replie?.comment_text}
                  profileImage={replie?.author?.profile_image}
                />
              ))
            ) : (
              <>
                <div className="text-center text-primary">
                  <h5>No Replies</h5>
                </div>
              </>
            )}
            <hr />
            <div className="h-100 border p-2 d-flex jusitfy-content-between mb-3">
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder={`Hey ${user?.fname} comment text field here...`}
                style={{ resize: "none" }}
                className="form-control"
              />
              <Button onClick={handleClick}>
                Reply <FaPlus />
              </Button>
            </div>
          </Container>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </>
  );
};

export default ReplyComment;
