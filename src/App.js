import React, { useState, useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('');
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetch("https://reqres.in/api/users")
      .then(res => res.json())
      .then(db => setUser(db.data))
      .catch(err => alert(err))
      .finally(() => setIsLoading(false))
    console.log(users);
  }, [])

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const onClickPlus = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else
      setInvites(prev => [...prev, id])
  }

  const onClickSend = () => {
    setSuccess(!success)
    setInvites([])
  }

  return (
    <div className="App">
      {
        (success ? <Success count={invites.length} onClickSend={onClickSend} /> : <Users items={users} isLoading={isLoading} searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} invites={invites} onClickPlus={onClickPlus} onClickSend={onClickSend} />)
      }
    </div>
  );
}

export default App;
