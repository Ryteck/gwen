import 'react-toastify/dist/ReactToastify.min.css'
import { FC } from 'react'
import { ToastContainer } from 'react-toastify'

const NotificationComponent: FC = () => {
  return <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
    />
}

export default NotificationComponent
