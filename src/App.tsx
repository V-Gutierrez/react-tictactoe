import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

type GridValue = 'x' | 'o' | null
type ScoreBoard = { x: number, o: number }

const INITIAL_STATE = [null, null, null, null, null, null, null, null, null]


function App() {
  const [grid, setGrid] = useState<GridValue[]>(INITIAL_STATE)
  const [playCount, setPlayCount] = useState<number>(0)
  const [scoreBoard, setScoreBoard] = useState<ScoreBoard>({ x: 0, o: 0 })

  const reset = () => {
    setGrid(INITIAL_STATE)
    setPlayCount(0)
  }

  const updateScore = (winner: keyof ScoreBoard) => {
    if (winner === 'x') {
      setScoreBoard(prev => ({ ...prev, x: prev.x + 1 }))
    }
    if (winner === 'o') {
      setScoreBoard(prev => ({ ...prev, o: prev.o + 1 }))
    }
  }


  const evaluateMarks = useCallback(() => {
    const firstRow: GridValue[] = []
    const secondRow: GridValue[] = []
    const thirdRow: GridValue[] = []
    let endGameMessage = ''

    grid.forEach((item, index) => {
      if (index <= 2 && index >= 0) firstRow.push(item)
      if (index <= 5 && index > 2) secondRow.push(item)
      if (index <= 9 && index > 5) thirdRow.push(item)
    })

    if (firstRow[0] === secondRow[0] && secondRow[0] === thirdRow[0] && firstRow[0]) {
      endGameMessage = `${firstRow[0]} venceu`
      updateScore(firstRow[0])
      alert(endGameMessage)
      reset()
    }

    if (firstRow[1] === secondRow[1] && secondRow[1] === thirdRow[1] && firstRow[1]) {
      endGameMessage = `${firstRow[1]} venceu`
      updateScore(firstRow[1])
      alert(endGameMessage)
      reset()
    }

    if (firstRow[2] === secondRow[2] && secondRow[2] === thirdRow[2] && firstRow[2]) {
      endGameMessage = `${firstRow[2]} venceu`
      updateScore(firstRow[2])
      alert(endGameMessage)
      reset()
    }

    if (firstRow[0] === secondRow[1] && secondRow[1] === thirdRow[2] && firstRow[0]) {
      endGameMessage = `${firstRow[0]} venceu`
      updateScore(firstRow[0])
      alert(endGameMessage)
      reset()
    }

    if (firstRow[2] === secondRow[1] && secondRow[1] === thirdRow[0] && firstRow[2]) {
      endGameMessage = `${firstRow[2]} venceu`
      updateScore(firstRow[2])
      alert(endGameMessage)
      reset()
    }

    if (firstRow.every((item, _, arr) => item === arr[0] && item !== null && item === 'x') || secondRow.every((item, _, arr) => item === arr[0] && item !== null && item === 'x') || thirdRow.every((item, _, arr) => item === arr[0] && item !== null && item === 'x')) {
      updateScore('x')
      endGameMessage = `x venceu`
      alert(endGameMessage)
      reset()
    }

    if (firstRow.every((item, _, arr) => item === arr[0] && item !== null && item === 'o') || secondRow.every((item, _, arr) => item === arr[0] && item !== null && item === 'o') || thirdRow.every((item, _, arr) => item === arr[0] && item !== null && item === 'o')) {
      updateScore('o')
      endGameMessage = `o venceu`
      alert(endGameMessage)
      reset()
    }

    // 0 , 1 , 2
    // 0 , 1 , 2
    // 0 , 1 , 2

  }, [grid])

  useEffect(() => {
    evaluateMarks()
  }, [evaluateMarks, playCount])

  const handleSlotClick = (index: number) => {
    const shallowGridCopy = [...grid]

    const isAllowedToPlay = shallowGridCopy[index] !== null

    if (!isAllowedToPlay) {

      shallowGridCopy[index] = playCount % 2 === 0 ? 'x' : 'o'


      setPlayCount(playCount <= 8 ? playCount + 1 : playCount)
      setGrid(shallowGridCopy)
    }
  }

  return (
    <div className="App">
      {grid.map((item, index) => {
        return <div key={index} onClick={() => handleSlotClick(index)} className="grid-slot">{item}</div>
      })}
      <p >X: {scoreBoard.x}</p>
      <p >O: {scoreBoard.o}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
