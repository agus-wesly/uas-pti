import { Routes, Route } from 'react-router-dom'
import {
  Layout,
  Login,
  Register,
  Message,
  CreatePost,
  Error,
  Welcome,
  PersistanceLogin,
  MessageDetail,
} from './Routes'
import RequireAuth from './Components/RequireAuth'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="post/:id" element={<CreatePost />} />

        {/* Protected Routes */}
        <Route element={<PersistanceLogin />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Welcome />} />
            <Route path={'messages'} element={<Message />} />
            <Route path={'messages/:id'} element={<MessageDetail />} />
          </Route>
        </Route>
        {/* Page not found here */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default App
