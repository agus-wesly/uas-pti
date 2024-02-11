import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import { getUser, getUserId } from '../features/userSlice'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import copy from '../assets/copy.svg'

const Welcome = () => {
  const user = useSelector(getUser)
  const userId = useSelector(getUserId)
  const [copied, setCopied] = useState(false)

  const link = `http://localhost:3000/post/${userId}`

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copied])

  return (
    <>
      <Navbar user={user} />
      <div className="flex flex-col items-center">
        <div className="welcome-heading">
          <div className="container">
            Share this link to someone and let they send you a message
            <div className="link-container">
              <input type="text" disabled value={link} />
              <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
                <button className={`copy-btn ${copied ? 'copy' : null}`}>
                  <img src={copy} alt="copy" />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome
