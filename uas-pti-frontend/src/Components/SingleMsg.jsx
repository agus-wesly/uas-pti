import { parseISO, formatDistanceToNow } from 'date-fns'
import { useDelMsgMutation } from '../features/auth'
import { Link } from 'react-router-dom'

const SingleMsg = ({ id, msg, date }) => {
  const parsedDate = parseISO(date)
  const timeAgo = formatDistanceToNow(parsedDate)
  const [delMsg, { isLoading }] = useDelMsgMutation()

  const handleDel = async () => {
    try {
      await delMsg({ id }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card md:w-[90%]">
      <div>{msg}</div>
      <p>About {timeAgo} ago</p>
      <div className="flex gap-2">
        <Link
          to={`/messages/${id}`}
          style={{
            backgroundColor: 'blue',
          }}
          className="delete-btn"
        >
          Detail
        </Link>
        <button disabled={isLoading} className="delete-btn" onClick={handleDel}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default SingleMsg
