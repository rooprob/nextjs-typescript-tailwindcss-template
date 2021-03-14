import {
  Stack,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Spinner
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react";

const Spinners = () => {
  let [progress, update] = useState(0)

  const randomNum = (min:number, max:number):number=> Math.floor(Math.random() * (max - min + 1) + min)

  useEffect(() => setInterval(() => {
    // Reset to 0 when reaches 100
    update(progress < 100 ? progress += randomNum(0, 4) : 0)
  }, 500), [])

  return (
    <div>
      <Stack>
        <CircularProgress color="green" isIndeterminate>
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
        <CircularProgress value={progress} size="100px" thickness={0.1} color="purple" />
        <Progress value={progress} w="90%" />
        <Progress value={progress + 10} w="90%" hasStripe isAnimated />
        <Spinner
          thickness="3px"
          speed="1s"
          emptyColor="gray.200"
          color="blue.500"
          size="2xl"
        />
      </Stack>
    </div>
  );
}
export default Spinners;