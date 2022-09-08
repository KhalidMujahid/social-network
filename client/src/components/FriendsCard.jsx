import { useState } from "react";
import { Alert, Image } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFriendAsync } from "../redux/user";
import { base } from "../services/constant/baseURL";
import { Link } from "react-router-dom";

const FriendsCard = ({
  friend_id,
  fname,
  lname,
  profile_image,
  totalFriends,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    try {
      dispatch(
        addFriendAsync({
          author: user?._id,
          friend_id,
        })
      )
        .unwrap()
        .then(() => {
          setAdd(true);
        })
        .catch((error) => {
          setMessage(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {message && (
        <Alert dismissible className="m-2">
          <p>{message}</p>
        </Alert>
      )}
      <div className="d-flex border justify-content-between align-items-center p-3 mt-2">
        <div className="d-flex">
          <Image
            src={`${base}/${profile_image}`}
            alt=""
            thumbnail
            width="65"
            height="65"
            style={{ borderRadius: "100%" }}
          />
          <div className="mx-2">
            <p>
              {fname} {lname}
            </p>
            <span>{totalFriends.length} friends</span>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <Link
              className="me-3"
              to={`/profile/${friend_id}`}
              style={{ textDecoration: "none" }}
            >
              View profile
            </Link>
            <div>
              {add ? (
                <p>Request sent</p>
              ) : (
                <FaPlus
                  size={25}
                  className="text-primary"
                  onClick={handleClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsCard;
