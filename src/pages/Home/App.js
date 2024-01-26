import { useState } from 'react';
import background from '../../assets/background.png'
import Header from "../../components/Header/index.js";
import ItemList from "../../components/itemList/index.jsx";
import './styles.css';

function App() {
const [user, setUser] = useState('');
const [currentUser, setCurrentUser] = useState();
const [repos, setRepos] = useState(null);

async function handleUser () {
  const userData = await fetch(`https://api.github.com/users/${user}`);
  const newUser = await userData.json();

  if (newUser.name){
    const {avatar_url, name, bio, login} = newUser;
    setCurrentUser({avatar_url, name, bio, login});
  }

  const userRepos = await fetch(`https://api.github.com/users/${user}/repos`);
  const newRepos = await userRepos.json();


  if(newRepos.length){
    setRepos(newRepos);
  }
};

return (
  <div className="App">
    <Header/>
    <div className="content">
      <img src={background} alt="background-app" className="background"/>
      <div className="section">
        <input value={user} name="usuario" placeholder="@usuario!"  onChange={e => setUser(e.target.value)}/>
        <button onClick={handleUser}>Buscar</button>

        {currentUser?.name ?(<>
          <div className="profile">
          <img src={currentUser.avatar_url} alt="profile-picture" className="profilePicture"/>
          <div className="profileData">
            <h3>{currentUser.name}</h3>
            <p>{currentUser.login}</p>
            <p>{currentUser.bio}</p>
          </div>
          </div>
          <hr/>
        </>) : null}
 
        {repos?.length ? (<>
          <div className="repositories">
            <h4>Repositórios</h4>
          {repos
          .filter(repo => repo.description)
          .map(repo => (
            <ItemList key={repo.id} title={repo.name} description={repo.description}/>
          ))}
          </div>
        </>) :null}
      </div>
    </div>
  </div>
  );
}

export default App;
