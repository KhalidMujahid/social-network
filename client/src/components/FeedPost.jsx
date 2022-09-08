import { useState } from "react";
import { Button, FormControl, Image, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addNewPostAsync } from "../redux/post";
import { base } from "../services/constant/baseURL";
import { socket } from "../services/sockets/socket";

const FeedPost = () => {
  const { user } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    content: "",
    post_image: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (!inputs.content) {
      setError(true);
      return;
    }
    try {
      dispatch(
        addNewPostAsync({
          author: user._id,
          content: inputs.content,
          post_image: inputs.post_image,
        })
      )
        .unwrap()
        .then((res) => {
          setShowModal(false);
          socket.emit("post", res.data);
        });
    } catch (error) {
      if (error.status === 401) {
        console.log("401");
      }
      if (error.status === 501) {
        console.log("501");
      }
    }
  };

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <h4>All field are required</h4>}
          <textarea
            onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
            className="form-control"
            placeholder={`Hey ${user?.fname} what's on your mind?`}
            style={{ resize: "none", height: "200px" }}
          />
          <FormControl
            onChange={(e) =>
              setInputs({ ...inputs, post_image: e.target.files[0] })
            }
            type="file"
            className="mt-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick}>Post</Button>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="d-flex justify-content-between  align-items-center mt-5 border p-4 w-100"
        style={{ width: "100%" }}
      >
        <div>
          <Image
            src={`${base}/${user?.profile_image}`}
            alt=""
            roundedCircle
            width="50"
            height="50"
            style={{
              objectFit: "cover",
              border: "1px solid blue",
            }}
            className="me-4"
          />
        </div>
        <div className="w-100">
          <textarea
            className="form-control"
            disabled
            placeholder={`Hey ${user?.fname} what's on your mind?`}
            style={{ resize: "none" }}
          />
        </div>
        <div className="m-3">
          <Button onClick={() => setShowModal(true)}>
            Post <FaPlus />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FeedPost;
