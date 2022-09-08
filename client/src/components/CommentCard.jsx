import { Image } from "react-bootstrap";
import { FaHeart, FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { base } from "../services/constant/baseURL";

const CommentCard = ({ fname, lname, profileImage, text, comment_id }) => {
  const { comments } = useSelector((state) => state.comments);

  return (
    <>
      <div className="rounded p-3 mb-4 border w-100 h-50">
        <div>
          <Image
            src={`${base}/${profileImage}`}
            alt=""
            style={{ border: "1px solid blue" }}
            width="40"
            height="40"
            roundedCircle
          />
          <span className="mx-2 text-primary">
            {fname} {lname}
          </span>
        </div>
        <div className="mt-2 h-50">{text}</div>
        <hr />
        <div className="d-flex justify-content-around aling-items-center">
          <div>
            <FaHeart />
            (0)
          </div>
          <div>
            <Link
              to={`/comment/${comment_id}`}
              style={{ textDecoration: "none" }}
            >
              <FaComment />({comments.length})
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
