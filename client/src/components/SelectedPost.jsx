import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearSinglePost,
  getSinglePostAsync,
  handleCommentAsync,
} from "../redux/post";
import CommentCard from "./CommentCard";
import PostCard from "./PostCard";

const SelectedPost = () => {
  const { singlePost } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const goBack = useNavigate();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (!comment) {
      setError(true);
      return;
    }

    try {
      dispatch(
        handleCommentAsync({
          author: user?._id,
          post_id: id,
          text_content: comment,
        })
      ).unwrap();

      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getSinglePostAsync({ id }));

    return () => {
      clearSinglePost();
    };
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
            <div>
              <h5 className="text-primary">
                {singlePost?.author?.fname}'s post
              </h5>
            </div>
          </Container>
          <Container fluid>
            <PostCard
              id={1}
              fname={singlePost?.author?.fname}
              lname={singlePost?.author?.lname}
              profileImage={singlePost?.author?.profile_image}
              postImage={singlePost?.post_image}
              postContent={singlePost?.content}
              likes={singlePost?.loves || "0"}
              comments={singlePost?.comments || 0}
            />
            <hr />
            {error && <p className="text-danger">Field is required!</p>}
            <div className="border p-2 d-flex jusitfy-content-between mb-3">
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                placeholder={`Hey ${user?.fname} comment text field here...`}
                style={{ resize: "none" }}
                className="form-control"
              />
              <Button onClick={handleClick}>
                Comment <FaPlus />
              </Button>
            </div>
            {singlePost?.comments?.length === 0 ? (
              <>
                <div className="d-flex justify-content-center align-items-center mb-5">
                  <p>
                    No Comment on this post <br /> Be the first to comment
                  </p>
                </div>
              </>
            ) : (
              singlePost?.comments?.map((comment) => (
                <CommentCard
                  key={comment._id}
                  fname={comment?.author?.fname}
                  lname={comment?.author?.lname}
                  profileImage={comment?.author?.profile_image}
                  text={comment?.text_content}
                  comment_id={comment._id}
                />
              ))
            )}
          </Container>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </>
  );
};

export default SelectedPost;
