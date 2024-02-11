import { useSelector } from "react-redux";
import { useGetUserMsgQuery } from "../features/auth";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";
import { getUser, getUserId } from "../features/userSlice";
import SingleMsg from "../Components/SingleMsg";
import notFound from "../assets/not-found.png";

const Message = () => {
  const userId = useSelector(getUserId);

  const { data: messages, isLoading, isError, isSuccess } = useGetUserMsgQuery(String(userId));

  const user = useSelector(getUser);

  let allMessage;

  if (isLoading) allMessage = <Loading />;
  if (isSuccess) {
    if (messages?.messages === "No messages") {
      allMessage = (
        <div className="w-[296px] mx-auto translate-y-1/4">
          <img src={notFound} alt="notfound" />
          <p className="font-Aksidenz text-[18px] text-center">No message yet</p>
        </div>
      );
    } else {
      allMessage = (
        <div className="p-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
          {messages.map((msg, i) => (
            <SingleMsg id={msg.id} msg={msg.message} date={msg.date} key={i} />
          ))}
        </div>
      );
    }
  }
  if (isError) allMessage = <Loading />;

  return (
    <div className="w-full h-[90vh]">
      <Navbar user={user} />
      {allMessage}
    </div>
  );
};

export default Message;
