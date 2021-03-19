import LandingHeader from './LandingHeader'
import { Flex } from '@chakra-ui/react'

const LandingLayout: React.FC = (props) => {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: '1200px' }}
      m="0 auto"
      {...props}
    >
      <LandingHeader />
      {props.children}
    </Flex>
  )
}

export default LandingLayout
