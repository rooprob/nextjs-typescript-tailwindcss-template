import { Stack, Flex, Box, Button, Heading } from '@chakra-ui/react'
import { withAuthUser } from 'next-firebase-auth'
import React, { useState } from 'react'

const BoxDemo2 = () => {
  const [boxHeight, editHeight] = useState(20)
  const [boxColor, editColor] = useState('red')
  const [colorIntensity, editIntensity] = useState(500)

  const boxSettings = {
    flex: '1',
    color: 'white',
    h: `${boxHeight}px`,
    bg: `${boxColor}.${colorIntensity}`,
  }

  return (
    <div>
      <Box {...boxSettings}>I'm a Box</Box>
      <Flex justifyContent="space-around">
        <Stack>
          <Heading size="md">Size</Heading>
          <Button
            variantColor="red"
            onClick={() => editHeight(boxHeight - 10)}
            border="none"
          >
            Shrink
          </Button>
          <Button
            variantColor="green"
            onClick={() => editHeight(boxHeight + 10)}
            border="none"
          >
            Grow
          </Button>
        </Stack>

        <Stack>
          <Heading size="md">Color</Heading>

          <Flex w="200px" justifyContent="space-between">
            <Stack>
              <Button
                variantColor="green"
                onClick={() => editColor('green')}
                border="none"
              >
                Green
              </Button>
              <Button
                variantColor="blue"
                onClick={() => editColor('blue')}
                border="none"
              >
                Blue
              </Button>
              <Button
                variantColor="red"
                onClick={() => editColor('red')}
                border="none"
              >
                Red
              </Button>
            </Stack>

            <Stack>
              <Button
                variantColor="gray"
                variant="outline"
                onClick={() => editIntensity(colorIntensity - 100)}
                border="none"
              >
                Lighter
              </Button>
              <Button
                variantColor="gray"
                variant="outline"
                onClick={() => editIntensity(colorIntensity + 100)}
                border="none"
              >
                Darker
              </Button>
            </Stack>
          </Flex>
        </Stack>
      </Flex>
    </div>
  )
}

export default withAuthUser()(BoxDemo2)
