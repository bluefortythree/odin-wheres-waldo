import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import Main from './components/main'
import Stopwatch from './components/stopwatch'
import './App.css'

function App() {
  const [visibility, setVisibility] = useState(true)
  const [time, setTime] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [found, setFound] = useState({
    one: false,
    two: false,
    three: false
  })
  const [alreadyFound, setAlreadyFound] = useState(false)
  const [modal, setModal] = useState(false)
  const [position, setPosition] = useState({
    x: '',
    y: '',
  })
  const [successMessage, setSuccessMessage] = useState(false)
  const [failureMessage, setFailureMessage] = useState(false)
  const [gameOverMessage, setGameOverMessage] = useState(false)
  const [name, setName] = useState('')

  const min = Math.floor((time % 360000) / 6000)
  const sec = Math.floor((time % 6000) / 100)
  const ms = time % 100

  function startGame() {
    setVisibility(prevVisibility => !prevVisibility)
    setTime(0)
  }

  useEffect(() => {
    let interval;
    if(!gameOver && !visibility) {
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 1)
        }, 10)    
    }
    if(sec > 1500) {
      clearInterval(interval)
        setTimeout(() => setGameOver(true), 2000)
    }
    if(found.one && found.two && found.three) {
      clearInterval(interval)
    }
    return () => {
        clearInterval(interval)
        setGameOver(false)
    }
  }, [time, found])

  function reset() {
      setGameOver(false)
      setGameOverMessage(false)
      setTime(0)
      setFound({
        one: false,
        two: false,
        three: false
      })
      setModal(false)
      setPosition({x: '', y: ''})
      setAlreadyFound(false)
      setSuccessMessage(false)
      setFailureMessage(false)
  }

  function select(e) {
    const rect = e.target.getBoundingClientRect()
    setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        width: e.target.width,
        height: e.target.height
    })
    setModal(prevModal => !prevModal)
  }

  console.log(position)
  

  // width: 1889, height: 1218
  // telescope: x 508, y 663
  // waldo: x 1328 y 527
  // waldo2: x 1119 y 820
  // astronaut: x 1141 y 373

  function test(msg, x, y) {
    if(msg === 'telescope') {
      if(0.265 <= x/position.width && x/position.width <= 0.275 && 0.530 <= y/position.height && y/position.height <= 0.560) {
        if(!found.one) {
          setFound(prevFound => {
            return {
              ...prevFound,
              one: true,
            }
          })  
        } else {
          if(!alreadyFound) {
            setAlreadyFound(true)
            setTimeout(() => setAlreadyFound(false), 2000)
          }
        }
      } else {
        if(!failureMessage) {
          setFailureMessage(true)
          setTimeout(() => setFailureMessage(false), 2000)  
        }
      }
    } else if(msg === 'waldo') {
    if(0.699 <= x/position.width && x/position.width <= 0.709 && 0.423 <= y/position.height && y/position.height <= 0.439 || 0.588 <= x/position.width && x/position.width <= 0.598 && 0.665 <= y/position.height && y/position.height <= 0.681) { 
      if(!found.two) {
        setFound(prevFound => {
          return {
            ...prevFound,
            two: true,
          }
        })
      } else {
        if(!alreadyFound) {
          setAlreadyFound(true)
          setTimeout(() => setAlreadyFound(false), 2000)
        }
      }
      } else {
        if(!failureMessage) {
          setFailureMessage(true)
          setTimeout(() => setFailureMessage(false), 2000)  
        }
      }
    } else if(msg === 'astronaut') {
      if(0.598 <= x/position.width && x/position.width <= 0.609 && 0.295 <= y/position.height && y/position.height <= 0.316) {
        if(!found.three) {
          setFound(prevFound => {
            return {
              ...prevFound,
              three: true,
            }
          })  
        }
        else {
          if(!alreadyFound) {
            setAlreadyFound(true)
            setTimeout(() => setAlreadyFound(false), 2000)
          }
        }
      } else {
        if(!failureMessage) {
          setFailureMessage(true)
          setTimeout(() => setFailureMessage(false), 2000)  
        }
      }
    }
    setModal(prevModal => !prevModal)
  }

  useEffect(() => {
    if(found.one && found.two && found.three) {
      setSuccessMessage(true)
      setTimeout(() => setGameOverMessage(true), 1000)
      setTimeout(() => setGameOver(true), 1000)
    } else if(found.one || found.two || found.three) {
      if(!successMessage) {
        setSuccessMessage(true)
        setTimeout(() => setSuccessMessage(false), 2000)  
      }
    }
  }, [found])

  function handleNameChange(e) {
    setName(e.target.value)
    console.log(name)
  }

  function submitScore() {
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, time}),
    })
    .then(res => res.json())
    .then(() => {
      console.log('successful')
    })
  }

  return (
    <>
      <Navbar />
      {!visibility && !gameOver && <Stopwatch visibility={visibility} min={min} sec={sec} ms={ms} found={found} />}
      <Main visibility={visibility} min={min} sec={sec} ms={ms} gameOver={gameOver} handleClick={startGame} reset={reset} position={position} modal={modal} select={select} test={test} found={found} successMessage={successMessage} failureMessage={failureMessage} alreadyFound={alreadyFound} gameOverMessage={gameOverMessage} handleNameChange={handleNameChange} submitScore={submitScore} />
    </>
  )
}

export default App
