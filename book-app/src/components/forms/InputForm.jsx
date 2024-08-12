import { Input } from '@chakra-ui/react';
import styles from './InputForm.module.css'

const InputForm = ({type, value, name, onChange}) => {
  return <Input mt={'2'}
    className={styles.input}
    type={type}
    value={value}
    name={name}
    onChange={onChange} 
    focusBorderColor='brand.400'
    />
  
}

export default InputForm