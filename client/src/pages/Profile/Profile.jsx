import { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FeedPost from "../../components/FeedPost";
import NavBar from "../../components/NavBar";
import PostCard from "../../components/PostCard";
import ProfileCard from "../../components/ProfileCard";
import { getSelectedProfile } from "../../redux/user";

const Profile = () => {
  const { user, profile, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSelectedProfile({
        id: user?._id,
      })
    );
  }, [dispatch, user]);

  return (
    <>
      <NavBar />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="mt-5">
          <Col sm={3}></Col>
          <Col sm={6}>
            <ProfileCard />
            <div>
              <FeedPost />
            </div>
            {profile?.posts?.length !== 0
              ? profile?.posts?.map((post) => (
                  <PostCard
                    key={post?._id}
                    likes={post?.loves}
                    postImage={post?.post_image}
                    profileImage={profile?.profile_image}
                    fname={profile?.fname}
                    lname={profile?.lname}
                    comments={post?.comments}
                  />
                ))
              : ""}
          </Col>
        </Row>
      )}
    </>
  );
};

export default Profile;
