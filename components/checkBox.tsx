import { FC } from 'react'
import Style from '../styles/components/CheckBox'
import { FaRegSquare, FaRegCheckSquare } from 'react-icons/fa'

interface CheckBoxProps {
    question: string;
    getValue: boolean;
    setValue: (value: boolean) => void;
}

const CheckBox: FC<CheckBoxProps> = props => {
  const { question, getValue, setValue } = props
  return (
        <Style onClick={() => setValue(!getValue)}>
            {
                getValue
                  ? <FaRegCheckSquare color="#F2EEDC" size="22" />
                  : <FaRegSquare color="#F2EEDC" size="22" />
            }
            {
                question
            }
        </Style>
  )
}

export default CheckBox
