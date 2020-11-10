import { FC, useState } from 'react'
import Style from '../styles/components/userBlockComponentStyle'
import { FaCrown, FaRegSave, FaSyncAlt, FaTrash, FaUser } from 'react-icons/fa'

interface UserBlockInterface {
    username: string;
    firstname: string;
    lastname: string;
    administrador: boolean;
}

const UserBlock: FC<UserBlockInterface> = props => {
  const { username, firstname, lastname, administrador } = props

  const [getUsername, setUsername] = useState(username)
  const [getFirstname, setFirstname] = useState(firstname)
  const [getLastname, setLastname] = useState(lastname)
  const [getAdministrador, setAdministrador] = useState(administrador)

  return (
      <Style>
          <div className='block-container'>
            <input placeholder='username' value={getUsername} onChange={e => setUsername(e.target.value)}/>
            <input placeholder='firstname' value={getFirstname} onChange={e => setFirstname(e.target.value)}/>
            <input placeholder='lastname' value={getLastname} onChange={e => setLastname(e.target.value)}/>
            <div className='admSwitch'>
                {
                    getAdministrador
                      ? <FaCrown color="#F2EEDC" size="22" className='iconSelect'/>
                      : <FaUser color="#F2EEDC" size="22" className='iconSelect' />
                }

            </div>
            <div className='block-controlls'>
                <FaRegSave color="#F2EEDC" size="22" className='iconSelect'/>
                <FaSyncAlt color="#F2EEDC" size="22" className='iconSelect'/>
                <FaTrash color="#F2EEDC" size="22" className='iconSelect'/>
            </div>
          </div>
      </Style>
  )
}

export default UserBlock