import { useState, useEffect } from 'react';
import axios from 'axios'
import Card from './components/Card';
import './styles.css';

const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)


  const getRandomWords = () => {

    const options = {
      method: 'GET',
      url: 'http://localhost:8000/words',
      params: {level: chosenLevel, area: 'sat'},
      
    };
  
    axios.request(options).then((response) => {
      setWords(response.data)
  
    }).catch((error) => {
      console.error(error)
    });
  }

  const checkAnswer = (option, index, correctAnswer) => {
    if(index === correctAnswer) {
      setCorrectAnswers(prevCorrectAnswers => [...prevCorrectAnswers, option  ])
      setScore(prevScore => prevScore + 1) 
    } else {
      setScore(prevScore => prevScore - 1)
    }
    setClicked(prevClicked => [...prevClicked, option])
  }

  useEffect(() => {
    if(chosenLevel) {
      getRandomWords()
    }
  }, [chosenLevel])


  return (
    <div className="board">
      <h1>Word Association Game</h1>

      {!chosenLevel && 
        <div className="level-selector">
          <p>Choose your level to begin</p>
          <select 
            className="levels"
            name="levels" 
            id="levels" 
            value={chosenLevel} 
            onChange={(e) => setChosenLevel(e.target.value)}
          >
            <option value=''>--choose--</option>
            <option className="level-option level-1" value="1">Level 1</option>
            <option className="level-option level-2" value="2">Level 2</option>
            <option className="level-option level-3" value="3">Level 3</option>
          </select>
        </div>
      }

      {chosenLevel && words && 
        <div className="question-area">
          <h1 className={`level-${chosenLevel}`}>You are at level {chosenLevel}</h1>
          <h2 className="score">Score: {score}</h2>
          
          <div className="cards">

            {words.quizlist.map((quiz, _index) => (
              <Card 
                chosenLevel={chosenLevel} 
                quiz={quiz} 
                checkAnswer={checkAnswer} 
                correctAnswers={correctAnswers}
                clicked={clicked}
                key={_index}
              />
          
            ))}
          </div>
          
        </div>
      }
      
    </div>
  );
}

export default App
