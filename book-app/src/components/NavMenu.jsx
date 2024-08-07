import { HStack, Box } from "@chakra-ui/react"
import Nav from "./pages/Nav"
import Search from "./Search"

const NavMenu = ({books, setBooks, allbooks}) => {

  return (
    <div>
         <Box p={{ base: '2', sm: '3', md: '6', lg: '7'}}>
         <HStack>
            <Nav></Nav>
            <Search books={books} setBooks={setBooks} allbooks={allbooks}></Search>
        </HStack>
        </Box>
    </div>
  )
}

export default NavMenu