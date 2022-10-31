import './index.scss';
import React, { useState } from 'react';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({ result }) {
  const allQuestions = questions.length
  
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {result} ответа из {allQuestions}</h2>
      <a href="/"><button>Попробовать снова</button></a>
    </div>
  );
}

function Game({ step, question, onClickVariant }) {
  const percentage = Math.round(step / questions.length * 100)

  return (
    <>
      <div className="progress">
        <div style={{ width: percentage + '%' }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => <li onClick={() => onClickVariant(index)} key={index}  >{text}</li>)
        }
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0)
  const [result, setResult] = useState(0)
  const question = questions[step]

  const onClickVariant = (variant) => {
    console.log(step, variant);
    setStep(step + 1)
    if (variant == question.correct) {
      setResult(result + 1)
    }
  }

  return (
    <div className="App">
      {
        step !== questions.length ? <Game question={question} onClickVariant={onClickVariant} step={step} /> : <Result result={result} />
      }
    </div>
  );
}

export default App;
