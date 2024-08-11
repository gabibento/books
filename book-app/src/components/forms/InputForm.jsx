import { Input } from '@chakra-ui/react';
import styles from './InputForm.module.css'

const InputForm = ({type, value, onChange}) => {
  return <Input mt={'2'}
    className={styles.input}
    type={type}
    value={value}
    onChange={onChange}
    />
  
}

export default InputForm