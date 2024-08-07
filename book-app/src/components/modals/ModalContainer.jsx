import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody  } from '@chakra-ui/react'

const ModalContainer = ({Component, text, isOpen, onClose}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{text}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
       {<Component onClose={onClose}/>}
      </ModalBody>
    </ModalContent>
  </Modal>
    
  )
}

export default ModalContainer