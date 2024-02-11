import { useSelector } from 'react-redux'
import { useGetMsgQuery } from '../features/auth'
import Navbar from '../Components/Navbar'
import Loading from '../Components/Loading'
import { getUser, getUserId } from '../features/userSlice'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { useDelMsgMutation } from '../features/auth'
import { useParams, useNavigate } from 'react-router-dom'

const Message = () => {
  const param = useParams()
  const messageId = param.id

  const {
    data: message,
    isLoading,
    isError,
  } = useGetMsgQuery(String(messageId))

  console.log('m', message)

  const user = useSelector(getUser)

  if (isLoading) return <Loading />
  if (isError) return <Loading />

  return (
    <div className="w-full h-[90vh]">
      <Navbar user={user} />
      {message ? (
        <SingleMsg id={message.id} msg={message.message} date={message.date} />
      ) : null}
    </div>
  )
}

export default Message

const SingleMsg = ({ id, msg, date }) => {
  const parsedDate = parseISO(date)
  const timeAgo = formatDistanceToNow(parsedDate)
  const [delMsg, { isLoading }] = useDelMsgMutation()
  const navigate = useNavigate()

  const handleDel = async () => {
    try {
      await delMsg({ id }).unwrap()
      navigate('/messages')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-md mx-auto my-10">
      <button onClick={() => navigate(-1)} className="mb-5">
        Kembali
      </button>
      <p className="text-3xl font-bold">{msg}</p>
      <p className="text-md mt-2">About {timeAgo} ago</p>
      <button disabled={isLoading} className="delete-btn" onClick={handleDel}>
        Delete
      </button>
    </div>
  )
}
