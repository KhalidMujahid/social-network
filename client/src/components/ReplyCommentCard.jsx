import { Image } from "react-bootstrap";
import { base } from "../services/constant/baseURL";

const ReplyCommentCard = ({ fname, lname, text, profileImage }) => {
  return (
    <>
      <div className="rounded p-3 mb-4 border w-100 h-auto">
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
      </div>
    </>
  );
};

export default ReplyCommentCard;
