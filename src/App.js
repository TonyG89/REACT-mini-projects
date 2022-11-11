import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

let day = new Date().getDate()
let month = new Date().getMonth() + 1

day < 10 ? day = "0" + day : day = day
month < 10 ? month = "0" + month : month = month

const today = day.toString() + month + new Date().getFullYear()

function App() {
  // const [rates, setRates] = useState([])
  const [date, setDate] = useState(today)
  const [fromCurrency, setFromCurrency] = useState("UAH")
  const [toCurrency, setToCurrency] = useState("USD")
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const ratesRef = React.useRef({})

  useEffect(() => {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json?date=" + date)
      .then(res => res.json())
      .then(json => {
        // setRates(json)
        ratesRef.current = json
        onChangeToPrice(1)
      })
      .catch(err => alert(err + " - помилка api"))
  }, [toCurrency, fromCurrency])

  const onChangeFromPrice = (value) => {
    const currency = (r) => r == "UAH" ? 1 : ratesRef.current.filter(i => i.cc == r)[0].rate
    const result = value * currency(fromCurrency) / currency(toCurrency)
    setFromPrice(value)
    setToPrice(result.toFixed(2))
  }

  const onChangeToPrice = (value) => {
    const currency = (r) => r == "UAH" ? 1 : ratesRef.current.filter(i => i.cc == r)[0].rate
    const result = currency(toCurrency) / currency(fromCurrency) * value
    setFromPrice(result.toFixed(2))
    setToPrice(value)
  }

  useEffect(() => {
    isLoading && onChangeFromPrice(fromPrice)
    setIsLoading(true)
  }, [fromCurrency])

  useEffect(() => {
    isLoading && onChangeToPrice(toPrice)
    setIsLoading(true)
  }, [toCurrency])

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
