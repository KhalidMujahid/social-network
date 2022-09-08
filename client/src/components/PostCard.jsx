import { Image } from "react-bootstrap";
import { FaComment, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { likeAndUnlikeAPost } from "../redux/post";
import { base } from "../services/constant/baseURL";

const PostCard = ({
  id,
  profileid,
  fname,
  time,
  lname,
  profileImage,
  postImage,
  postContent,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLikeAndUnLike = (e) => {
    e.preventDefault();

    try {
      dispatch(
        likeAndUnlikeAPost({
          author: user._id,
          post_id: id,
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res.data);
          if (res.data === "1") {
            console.log("Liked");
          } else {
            console.log("Unliked");
          }
        });
    } catch (error) {
      if (error.status === 501) {
        console.log("Server error");
      }
      if (error.status === 401) {
        console.log("Client error");
      }
    }
  };

  return (
    <>
      <div className="border mb-4 mt-4 border card">
        <div>
          <div className="d-flex align-items-center">
            <Image
              className="m-2"
              src={`${base}/${profileImage}`}
              alt=""
              roundedCircle
              style={{
                borderRadius: "100%",
                border: "1px solid blue",
                width: "50px",
                height: "50px",
              }}
            />
            <div className="my-2">
              {profileid === user?._id ? (
                <Link style={{ textDecoration: "none" }} to="/profile">
                  <p>
                    {fname} {lname}
                  </p>
                </Link>
              ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${profileid}`}
                >
                  <p>
                    {fname} {lname}
                  </p>
                </Link>
              )}
              <span className="text-primary">{format(time)}</span>
            </div>
          </div>
        </div>
        <div className="m-2">
          <Image
            src={`${base}/${postImage}`}
            className="img-thumbnail img-fluid"
            rounded
            style={{ height: "700", objectFit: "inherit" }}
            width="100%"
            alt=""
          />
        </div>
        <div className="p-2">
          <p>{postContent}</p>
        </div>
        <div className="mb-3">
          <div className="d-flex w-100 align-items-center justify-content-around">
            <div>
              <FaHeart
                className={likes.includes(user?._id) && "text-primary"}
                size={20}
                onClick={handleLikeAndUnLike}
              />
              ({likes.length})
            </div>
            <div>
              <Link to={`/post/${id}`} style={{ textDecoration: "none" }}>
                <FaComment size={20} />({comments.length})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
