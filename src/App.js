import React, { useState, useEffect } from 'react';
import './index.scss';
import Collection from './Collection';


function App() {
  const [search, setSearch] = useState("")
  const [tagsId, setTagsId] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [collection, setCollection] = useState([])
  const [itemsOnPage, setItemsOnPage] = useState(1)

  const amountPages = Math.ceil(collection.length / itemsOnPage);
  const tags = ["Все", "Море", "Горы", "Архитектура", "Города"]

  const onSearchInput = obj => obj.name.toLowerCase().includes(search.toLowerCase())

  useEffect(() => {
    setIsLoading(true)

    const currentTag = obj => obj.category === tagsId

    fetch("./data.json")
      .then(res => res.json())
      .then(data => {
        if (tagsId === 0) {
          setCollection(data.collections)
        } else setCollection(data.collections.filter(currentTag))
      })
      .catch(err => alert("error - " + err))
      .finally(() => setIsLoading(false))
  }, [tagsId, search])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {tags.map((obj, index) => <li
            key={index}
            className={tagsId === index && "active"}
            onClick={() => {
              setTagsId(index)
              setCurrentPage(1)
              console.log(collection)
            }}
          >{obj}</li>)}
        </ul>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
          className="search-input"
          placeholder="Поиск по названию" />
        <ul className="pagination">
          <li className='active'>Количество коллекций на странице</li>
          {
            collection.filter(onSearchInput).map((_, ind) => <li
              key={ind}
              onClick={() => setItemsOnPage(ind + 1)}
              className={itemsOnPage === (ind + 1) && "active"}
            >{ind + 1}</li>)
          }
        </ul>
      </div>
      <div className="content">
        {isLoading ? (<h2>Идет загрузка...</h2>) : (collection
          .filter(onSearchInput)
          .map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />))).slice(currentPage * itemsOnPage - itemsOnPage, currentPage * itemsOnPage)}
      </div>
      <ul className="pagination">
        {
          // collection.filter(onSearchInput)
          [...Array(amountPages)]
            .map((_, i) => (
              <li
              key={i}
                className={currentPage === (i + 1) && "active"}
                onClick={() => setCurrentPage(i + 1)}
              >{i + 1}</li>
            ))}
      </ul>
    </div>
  );
}

export default App;
