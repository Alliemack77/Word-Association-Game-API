const Card = ({chosenLevel, quiz, checkAnswer, clicked, correctAnswers }) => {

    return (
            <div className={`card level-${chosenLevel}`} >
              <div className="questions">
                {quiz.quiz.map(question => <p key={question}>{question}</p>)}
              </div>

              <div className="answers">
                {
                  quiz.option.map((option, index) =>  {
                    return (
                        <>
                        <button 
                            className={`answer level-${chosenLevel}`} 
                            key={option}
                            disabled={clicked.includes(option)}
                            onClick={() => (checkAnswer(option, index + 1, quiz.correct))}
                        >{option}</button>
                        { correctAnswers.includes(option) && <p className="correct">Correct!</p> }
                        </>
                      
                      )
                    })
                }
              </div>
            </div>
    )
}

export default Card

