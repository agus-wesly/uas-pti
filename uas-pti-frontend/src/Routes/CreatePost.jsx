import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useGetUserDataQuery, useSendMsgMutation } from "../features/auth";
import { useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import Loading from "../Components/Loading";
import "react-notifications-component/dist/theme.css";

const CreatePost = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  const { data: user, isLoading, isSuccess, isError } = useGetUserDataQuery(String(id));
  const [sendMsg, { isLoading: loading, isSuccess: success, isError: errorr }] = useSendMsgMutation();

  const handleSuccess = () => {
    Store.addNotification({
      title: "Success",
      message: "Successfully send the message",
      type: "success",
      insert: "right",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        showIcon: true,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (msg) {
        await sendMsg({ id, msg }).unwrap();
        setMsg("");
        handleSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  let element;
  if (isLoading) element = <Loading />;
  if (isError) element = <p>Error :(</p>;
  if (isSuccess)
    element = (
      <>
        <div className="post-container">
          <div className="post-header">
            <div className="img-container">
              <img src="https://firebasestorage.googleapis.com/v0/b/ask-fun-d10f0.appspot.com/o/images%2FsqjUXm49vOgB0IagzuJ0PDoGPvl2.jpg?alt=media&token=86e258d6-5ff8-4eaa-ab9a-dc00d1f32f25" alt="user" />
            </div>
            <div className="post-user">
              <p>@{user.username}</p>
              <b>Send me anonymous messages !</b>
            </div>
          </div>
          <form>
            <textarea placeholder="send me anonymous messages…" value={msg} onChange={(e) => setMsg(e.target.value)} autoComplete="off" maxLength="300" onKeyPress={handleKey} />
          </form>
        </div>
        <button disabled={!msg || loading} onClick={handleSubmit} className={`${success ? "btn-success" : errorr ? "btn-err" : null}`}>
          Send message !
        </button>
      </>
    );

  return (
    <>
      <Navbar />
      <ReactNotifications />
      <div className="create-post-container">{element}</div>
    </>
  );
};

export default CreatePost;
