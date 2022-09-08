import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FriendsCard from "../../components/FriendsCard";
import NavBar from "../../components/NavBar";
import { getFriendsListAsync } from "../../redux/friends";

const Friends = () => {
  const { friendList } = useSelector((state) => state.friends);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsListAsync()).unwrap();
  }, [dispatch]);

  // filter list
  const lists = friendList?.filter((f) => f._id !== user?._id);

  return (
    <>
      <NavBar />
      <Row className="mt-5">
        <Col sm={3}></Col>
        <Col sm={6} className="mt-2">
          {lists?.map((f) => (
            <FriendsCard
              friend_id={f._id}
              key={f._id}
              fname={f.fname}
              lname={f.lname}
              profile_image={f.profile_image}
              totalFriends={f.friends}
            />
          ))}
        </Col>
        <Col sm={3}></Col>
      </Row>
    </>
  );
};

export default Friends;
