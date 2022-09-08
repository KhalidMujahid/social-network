import { useEffect, useState, memo } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FeedPost from "../../components/FeedPost";
import NavBar from "../../components/NavBar";
import PostCard from "../../components/PostCard";
import { getPostAsync } from "../../redux/post";
import { Spinner } from "react-bootstrap";
import { socket } from "../../services/sockets/socket";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = () => {
      setLoad(true);
      dispatch(getPostAsync())
        .unwrap()
        .then((res) => {
          setPosts(res.data);
          setLoad(false);
        });
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      socket.emit("add-user", user?._id);
    }
  }, [dispatch, user]);

  useEffect(() => {
    socket.on("new-post", (values) => {
      const others = [...posts];
      others.unshift(values);
      setPosts(others);
    });
  }, [posts]);

  if (loading)
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-primary d-flex align-items-center">
          <Spinner animation="border" />
          <h3>Wait a sec...</h3>
        </div>
      </div>
    );

  return (
    <>
      <Row>
        <div className="bg-primary">
          <Col>
            <NavBar />
          </Col>
        </div>
      </Row>

      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <FeedPost />
          {load ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "80vh" }}
            >
              <div className="d-flex align-items-center text-primary">
                <Spinner animation="border" />
                <h5>Loading posts....</h5>
              </div>
            </div>
          ) : posts?.length !== 0 ? (
            posts?.map((d) => (
              <PostCard
                key={d._id}
                profileid={d?.author?._id}
                id={d?._id}
                time={d?.createdAt}
                fname={d?.author?.fname}
                lname={d?.author?.lname}
                profileImage={d?.author?.profile_image}
                postImage={d?.post_image}
                postContent={d?.content}
                likes={d?.loves}
                comments={d?.comments}
              />
            ))
          ) : (
            <div
              className="container d-flex align-items-center justify-content-center"
              style={{ height: "80vh" }}
            >
              <h1 className="text-primary">No Post Yet</h1>
            </div>
          )}
        </Col>
        <Col sm={3}></Col>
      </Row>
    </>
  );
};

export default memo(Home);
