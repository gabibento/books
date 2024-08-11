import { Button } from "@chakra-ui/react"
import styles from './ButtonForm.module.css'

const ButtonForm = ({text}) => {
  return (
    <div className={styles["button-container"]}>
        <Button mt={'2'} className={styles.button} type="submit" variant={'solid'} colorScheme="brand" width={"7em"}>{text}</Button>
    </div>
  )
  
}

export default ButtonForm