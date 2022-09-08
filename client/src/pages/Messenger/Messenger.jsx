import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chats from "../../components/Chats";
import NavBar from "../../components/NavBar";
import { getMyFriendsListAsync } from "../../redux/friends";

const Messenger = () => {
  const { user } = useSelector((state) => state.user);
  const { chatList } = useSelector((state) => state.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMyFriendsListAsync({
        author: user?._id,
      })
    );
  }, [dispatch, user]);

  return (
    <>
      <NavBar />
      <Row className="mt-5">
        <Col sm={3}></Col>
        <Col sm={6} className="mt-2">
          {chatList?.length !== 0 ? (
            <div
              className="border"
              style={{ height: "auto", overflowY: "scroll" }}
            >
              {chatList?.map((d) => (
                <Link
                  to={`/messenge/chat/${d?.friend?._id}`}
                  style={{ textDecoration: "none" }}
                  key={d._id}
                >
                  <Chats
                    fname={d?.friend?.fname}
                    lname={d?.friend?.lname}
                    text={
                      d?.lastMessage
                        ? d?.lastMessage
                        : `${d?.friend?.fname} is saying hi!`
                    }
                    profileImage={d?.friend?.profile_image}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="container d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <h4 className="text-primary text-center">
                Connet with friends by adding them up
              </h4>
            </div>
          )}
        </Col>
        <Col sm={3}></Col>
      </Row>
    </>
  );
};

export default Messenger;
