import { Flex, Box, Grid } from '@chakra-ui/react'
import { withAuthUser } from 'next-firebase-auth'

const BoxDemo = () => {
  const flexSettings = {
    flex: '1',
    minW: '300px',
    color: 'white',
    mx: '6',
    mb: '6',
  }

  const gridSettings = {
    w: '100%',
    color: 'white',
  }

  return (
    <div>
      <Flex w="100%" justify="space-between" flexWrap="wrap">
        <Box {...flexSettings} bg={'red.500'}>
          I'm a box
        </Box>
        <Box {...flexSettings} bg={'blue.500'}>
          I'm a box
        </Box>
        <Box {...flexSettings} bg={'green.500'}>
          I'm a box
        </Box>
        <Box {...flexSettings} bg={'purple.500'}>
          I'm a box
        </Box>
      </Flex>

      <Grid
        w="100%"
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={6}
      >
        <Box {...gridSettings} bg={'red.500'}>
          I'm a box
        </Box>
        <Box {...gridSettings} bg={'blue.500'}>
          I'm a box
        </Box>
        <Box {...gridSettings} bg={'green.500'}>
          I'm a box
        </Box>
        <Box {...gridSettings} bg={'purple.500'}>
          I'm a box
        </Box>
      </Grid>
    </div>
  )
}

export default withAuthUser()(BoxDemo)
