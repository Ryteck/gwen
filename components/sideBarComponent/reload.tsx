import { FC, useEffect } from 'react'
import authHelper from '../../helpers/authHelper'
import { useRouter } from 'next/router'
import api from '../../libs/api'

const Reload: FC = () => {
  const router = useRouter()

  async function validate () {
    try {
      if (!sessionStorage.getItem('type')) {
        if (localStorage.getItem('type')) {
          authHelper.localToSession()
        } else {
          return router.push('/')
        }
      }

      const token = sessionStorage.getItem('token')

      await api
        .post('users/auth/reload', {}, { headers: { authorization: token } })
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => {
          throw error
        })
    } catch (error) {
      authHelper.clearAll()
      router.push('/')
    }
  }

  useEffect(() => {
    if (sessionStorage && localStorage) {
      validate()
    }
  }, [])

  return <></>
}

export default Reload
