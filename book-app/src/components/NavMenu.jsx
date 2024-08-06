import { HStack, Box } from "@chakra-ui/react"
import Nav from "./pages/Nav"
import Search from "./Search"

const NavMenu = ({books, setBooks, allbooks}) => {

  return (
    <div>
         <Box p='4'>
         <HStack spacing={{ base: '1em', sm: '2em', md: '4em', lg: '8em' }}>
            <Nav></Nav>
            <Search books={books} setBooks={setBooks} allbooks={allbooks}></Search>
        </HStack>
        </Box>
    </div>
  )
}

export default NavMenu