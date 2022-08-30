

import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard.jsx';
const cardImage = [
  {"src": "/images/cube-1.PNG", matched: false },
  {"src": "/images/archilc-1.PNG", matched: false},
  {"src": "/images/dog-1.PNG", matched: false },
  {"src": "/images/eye-1.PNG", matched: false},
  {"src": "/images/sun-1.PNG", matched: false },
  {"src": "/images/tria-1.PNG", matched: false },
]
function App() {
  const [cards, setCards]= useState([])
  const [turns, setTurns]= useState(0)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)
  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImage,...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

      setFirstChoice(null)
      setSecondChoice(null)
      setCards(shuffledCards)
      setTurns(0)
  }
 // handle choice
  const handleChoice = (card) =>{
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)  
  }
  useEffect(() => {
    
    if(firstChoice && secondChoice){
      setDisabled(true)
      if(firstChoice.src === secondChoice.src){
        setCards(prevCards=> {
          return  prevCards.map(card => {
            if(card.src === firstChoice.src){
              return{...card, matched: true}
            }
            else{
              return card
            }
          })
        } )
        resetTurn();
      }
      else{      
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice])
  console.log(cards)
  const resetTurn = () =>{
    setFirstChoice(null)
    setSecondChoice(null)
    setTurns(prevTurns=> prevTurns + 1)
    setDisabled(false)
  }
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>Start a New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === firstChoice || card === secondChoice || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
            <p>Turns: {turns}</p>
    </div>
  );
}
export default App;
