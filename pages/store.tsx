import { FC, useState } from 'react'
import MyHead from '../components/myHeadComponent'
import Style from '../styles/pages/storePageStyle'
import SideBar from '../components/sideBarComponent'
import StorePageTable from '../components/storePageTableComponent'

type StorePages = 'current' | 'input' | 'output' | 'loan' | 'tools'

const Store: FC = () => {
  const [getStorePage, setStorePage] = useState<StorePages>('current')

  return (
    <>
      <MyHead title="Store" />
      <Style>
          <SideBar activePath='/store'/>
          <main>
              <div className="storeMenu">
                <input
                  type='button'
                  value='current'
                  className={getStorePage === 'current' ? 'active' : 'desactive'}
                  onClick={() => setStorePage('current')}
                  disabled={getStorePage === 'current'}
                />
                <input
                  type='button'
                  value='input'
                  className={getStorePage === 'input' ? 'active' : 'desactive'}
                  onClick={() => setStorePage('input')}
                  disabled={getStorePage === 'input'}
                />
                <input
                  type='button'
                  value='output'
                  className={getStorePage === 'output' ? 'active' : 'desactive'}
                  onClick={() => setStorePage('output')}
                  disabled={getStorePage === 'output'}
                />
                <input
                  type='button'
                  value='loan'
                  className={getStorePage === 'loan' ? 'active' : 'desactive'}
                  onClick={() => setStorePage('loan')}
                  disabled={getStorePage === 'loan'}
                />
                <input
                  type='button'
                  value='tools'
                  className={getStorePage === 'tools' ? 'active' : 'desactive'}
                  onClick={() => setStorePage('tools')}
                  disabled={getStorePage === 'tools'}
                />
              </div>
              <div className="storeContent">
                <StorePageTable table={getStorePage}/>
              </div>
          </main>
      </Style>
    </>
  )
}

export default Store
