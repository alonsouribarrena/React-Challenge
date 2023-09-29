import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function LandingPage() {

  const [user, setUser] = useState('alonsouribarrena')
  const [search, setSearch] = useState('')
  const [infoUser, setInfoUser] = useState({})
  const [reposUser, setRepos] = useState([])
  

  useEffect(() => {
      axios.get(`https://api.github.com/users/${user}?client_id=e1bbbb9b607de8662fbb&client_secret=7ad368425b1244ada57a27cbd5f14af9d582d327&sort=created`)
      .then((result) => {
        setInfoUser(result.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }, [user])


  useEffect(() => {
    axios.get(`https://api.github.com/users/${user}/repos`)
    .then((result) => {
      setRepos(result.data)
    })
    .catch((err) => {
      console.log(err)
    });
}, [user])
  
  const onClick = (()=>{
    console.log(user)
    setUser(search)
    console.log(user)

  })

  return (
    <div className='container'>
      <div className='search'>
      <label>Search GitHub user:     </label>
      <input name="search" value={search} onChange={e=>setSearch(e.target.value)} />
      <button onClick={onClick}>Submit</button>
      </div>
      <hr />
      <div className='topPage'>
        <div className='avatar'>
          <img src={infoUser.avatar_url} alt='avatar-user' />
        </div>
        <div className='tableUser'>
          <table>
            <tbody>
              <tr>
                <td>
                <span style={{ fontWeight: 'bold' }}>Fullname</span> {infoUser.name}
                </td>
              </tr>
              <tr>
                <td>
                  <span style={{ fontWeight: 'bold' }}>Username:</span> {infoUser.login}
                </td>          
              </tr>
              <tr>

                  <td>
                    <span style={{ fontWeight: 'bold' }}>Location:</span> {infoUser.location}
                  </td>

              </tr>
              <tr>
                <td>
                  <span style={{ fontWeight: 'bold' }}>Email Address:</span> {infoUser.email}
                </td>
              </tr>              
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <div className='bottomPage'>
        <h3>
        User Repositores
        </h3>
        <div className='tableRepo'>
          {reposUser && reposUser.map(repo=>{
            return(
              <table key={repo.id}>
                <tbody>
                  <tr>
                    <td >
                      <a href={repo.html_url}  target="_blank" rel="noreferrer">{repo.name}:</a> {repo.description}
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          })}
      </div>
      </div>
    </div>
  )
}
