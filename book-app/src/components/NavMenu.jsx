import { HStack, Box } from "@chakra-ui/react"
import Nav from "./pages/Nav"
import Search from "./Search"

const NavMenu = ({books, setBooks, allbooks}) => {

  return (
    <div>
         <Box p={[ '2', '3', '6', '7']}>
          <HStack  display={['block', 'flex', 'flex', 'flex']}>
              <Nav></Nav>
              <Search books={books} setBooks={setBooks} allbooks={allbooks}></Search>
          </HStack>
        </Box>
    </div>
  )
}

export default NavMenu