import { format } from "timeago.js";

const MessageCard = ({ me, text, val, time }) => {
  return (
    <>
      <div
        ref={val}
        className={
          me
            ? "h-auto bg-primary border float-end w-50 m-3 p-3"
            : "h-auto bg-secondary border float-start w-50 m-3 p-3"
        }
      >
        <div>
          <span>{text}</span>
        </div>
        <div className="mt-2 float-start text-light">
          <span>{format(time)}</span>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
