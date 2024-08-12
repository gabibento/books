import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody  } from '@chakra-ui/react'

const ModalContainer = ({Component, text, isOpen, onClose}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader textAlign={"center"} fontSize={"1.5em"} color='brand.500'>{text}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
       {<Component close={onClose}/>}
      </ModalBody>
    </ModalContent>
  </Modal>
    
  )
}

export default ModalContainer