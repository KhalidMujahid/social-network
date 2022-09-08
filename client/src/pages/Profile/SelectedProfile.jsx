import { useEffect } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaPlus, FaPodcast, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/PostCard";
import { getSelectedProfile } from "../../redux/user";
import { base } from "../../services/constant/baseURL";

const SelectedProfile = () => {
  const { id } = useParams();
  const { profile, loading } = useSelector((state) => state.user);
  const goBack = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSelectedProfile({
        id,
      })
    );
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <Container className="p-3 border " fluid>
              <div>
                <FaArrowLeft onClick={() => goBack(-1)} /> Back
              </div>
            </Container>
            <div>
              <div className="border mt-3" style={{ height: "19rem" }}>
                <center>
                  <div className="mt-3">
                    <Image
                      src={`${base}/${profile?.profile_image}`}
                      alt=""
                      width="100"
                      height="100"
                      style={{
                        borderRadius: "100%",
                        border: "2px solid blue",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="m-3">
                    <h4>
                      {profile?.fname} {profile?.lname}
                    </h4>
                  </div>
                  <div className="m-4 d-flex justify-content-around">
                    <div>
                      Post <FaPodcast />
                      <span className="bg-primary badge">
                        {profile?.posts?.length}
                      </span>
                    </div>
                    <div>
                      Friends <FaUsers />
                      <span className="bg-primary badge">
                        {profile?.friends?.length}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline-primary">
                      Add Friend <FaPlus />
                    </Button>
                  </div>
                </center>
              </div>
            </div>

            {profile?.posts?.length !== 0
              ? profile?.posts?.map((post) => (
                  <PostCard
                    key={post?._id}
                    id={post._id}
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

export default SelectedProfile;
