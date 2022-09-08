import { Image } from "react-bootstrap";
import { base } from "../services/constant/baseURL";

const Chats = ({ fname, lname, text, profileImage }) => {
  return (
    <>
      <div className="border mt-1 d-flex p-2">
        <div className="me-4">
          <Image
            src={`${base}/${profileImage}`}
            alt=""
            width="60"
            height="60"
            style={{
              objectFit: "cover",
              border: ".9px solid blue",
              borderRadius: "100%",
            }}
          />
        </div>
        <div className="me-2 w-100">
          <div>
            <div>
              <span className="float-end text-white bg-danger border rounded badge">
                1+
              </span>
            </div>
            <div>
              <h6>
                <strong>
                  {fname} {lname}
                </strong>
              </h6>
            </div>
            <div>{text}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
