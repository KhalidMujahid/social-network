import { useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  Image,
  Modal,
} from "react-bootstrap";
import { FaPodcast, FaSave, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../redux/user";
import { base } from "../services/constant/baseURL";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [input, setInput] = useState({
    fname: user?.fname,
    lname: user?.lname,
    email: user?.email,
    phone: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = (e) => {
    e.preventDefault();

    try {
      dispatch(
        updateProfilePicture({
          id: user._id,
          image: newImage,
        })
      );
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
      <div>
        {/* Update profile details modal */}
        <Modal show={toggle}>
          <Modal.Header>
            <Modal.Title>My Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ButtonGroup>
              <FormControl
                name="fname"
                value={input.fname}
                type="text"
                onChange={handleChange}
                placeholder="First name"
              />
              <FormControl
                name="lname"
                value={input.lname}
                type="text"
                onChange={handleChange}
                placeholder="Last name"
              />
            </ButtonGroup>
            <ButtonGroup className="mt-3">
              <FormControl
                name="email"
                value={input.email}
                type="email"
                onChange={handleChange}
                placeholder="Email"
              />
              <FormControl
                name="number"
                type="text"
                onChange={handleChange}
                value={input.phone}
                placeholder="Phone number"
              />
            </ButtonGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success">
              Save <FaSave />
            </Button>
            <Button variant="outline-danger" onClick={() => setToggle(false)}>
              Close X
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Update profile image */}
        <Modal show={toggleProfile}>
          <Modal.Header>
            <Modal.Title>Upload Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={handleUploadImage}>
              Update <FaSave />
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setToggleProfile(false)}
            >
              Close X
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          <div className="border mt-3" style={{ height: "19rem" }}>
            <center>
              <div className="mt-3">
                <Image
                  src={`${base}/${user?.profile_image}`}
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
                  {user?.fname} {user?.lname}
                </h4>
              </div>
              <div className="m-4 d-flex justify-content-around">
                <div>
                  Post <FaPodcast />
                  <span className="bg-primary badge">
                    {user?.posts?.length}
                  </span>
                </div>
                <div>
                  Friends <FaUsers />
                  <span className="bg-primary badge">
                    {user?.friends?.length}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => setToggle(true)}
                  variant="outline-primary"
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => setToggleProfile(true)}
                  variant="outline-primary"
                >
                  Change profile
                </Button>
              </div>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
