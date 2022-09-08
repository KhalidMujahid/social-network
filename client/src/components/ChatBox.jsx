import { useEffect, useRef, useState } from "react";
import { Button, Image } from "react-bootstrap";
import {
  FaArrowLeft,
  FaBars,
  FaCircle,
  FaMicrophone,
  FaPaperPlane,
  FaPhone,
  FaSmile,
  FaVideo,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMessageAsync,
  removeMessage,
  sendMessageAsync,
} from "../redux/message";
import { getSelectedProfile } from "../redux/user";
import MessageCard from "./MessageCard";
import { socket } from "../services/sockets/socket";
import { base } from "../services/constant/baseURL";

const ChatBox = () => {
  const scrollRef = useRef();
  const [text, setText] = useState("");
  const { profile, loading, user } = useSelector((state) => state.user);
  const { loading: load } = useSelector((state) => state.message);
  const [messages, setMessages] = useState([]);
  const [news, setNews] = useState(null);
  const { id } = useParams();

  const goBack = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMessageAsync({
        from: user?._id,
        to: id,
      })
    )
      .unwrap()
      .then((res) => setMessages(res.data));
    return () => {
      dispatch(removeMessage());
    };
  }, [dispatch, id, user?._id]);

  useEffect(() => {
    dispatch(
      getSelectedProfile({
        id,
      })
    );
  }, [dispatch, id]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!text) {
      return false;
    }

    try {
      dispatch(
        sendMessageAsync({
          from: user?._id,
          to: id,
          message: text,
        })
      );

      socket.emit("send-message", {
        from: user?._id,
        to: id,
        message: text,
      });

      const msg = [...messages];
      msg.push({
        me: true,
        message: text,
        created: Date.now(),
      });
      setMessages(msg);

      // clear text input
      setText("");
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("recive-message", (message) => {
        setNews({ chat_id: message.from, me: false, message: message.message });
      });
    }
  }, []);

  useEffect(() => {
    if (news?.chat_id === id) {
      news && setMessages((prev) => [...prev, news]);
    }
  }, [news, id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  if (loading && load) return <p>Loading....please wait</p>;

  return (
    <>
      {user && (
        <div
          style={{
            height: "100vh",
            display: "grid",
            gridTemplateRows: "15% 1fr 10%",
          }}
        >
          <div className="p-3 bg-light d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center justify-content-between">
              <div className="mx-1">
                <span>
                  <FaArrowLeft onClick={() => goBack(-1)} />
                </span>
              </div>
              <Image
                src={`${base}/${profile?.profile_image}`}
                roundedCircle
                className="mx-1"
                alt=""
                style={{
                  width: "40px",
                  height: "40px",
                  border: ".9px solid blue",
                }}
              />
              <div className="mx-2 d-flex flex-column">
                <span>
                  {profile?.fname} {profile?.lname}
                </span>
                <span>
                  {socket ? (
                    <>
                      Active <FaCircle className="text-success" />
                    </>
                  ) : (
                    <>
                      Offline <FaCircle className="text-danger" />
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="w-25 d-flex justify-content-between">
              <div>
                <FaPhone />
              </div>
              <div>
                <FaVideo />
              </div>
              <div>
                <FaBars />
              </div>
            </div>
          </div>
          {/* Messages area */}
          <div
            style={{ height: "none", overflowY: "scroll" }}
            className="border"
          >
            <div className="rounded mt-2 d-flex justify-content-center bg-light p-2">
              <p>Messages are end to end encrypted</p>
            </div>
            <div>
              {messages?.map((message, index) => (
                <MessageCard
                  key={index}
                  time={message.created}
                  val={scrollRef}
                  me={message.me ? true : false}
                  text={message.message}
                />
              ))}
            </div>
          </div>
          <div className="bg-light d-flex justify-content-around align-items-center rounded-pill">
            <Button className="rounded-pill" variant="outline-dark">
              <FaSmile />
            </Button>
            <textarea
              type="text"
              style={{ resize: "none" }}
              placeholder="Enter text..."
              className="h-75 p-2 form-control w-75 rounded-pill"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Button
              className="rounded-pill"
              variant="outline-dark"
              onClick={handleClick}
            >
              <FaPaperPlane />
            </Button>
            <Button className="rounded-pill" variant="outline-dark">
              <FaMicrophone />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
