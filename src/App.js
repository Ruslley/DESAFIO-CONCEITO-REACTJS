import React,{useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";



function App() {
  const [repositories,setRepositories]=useState([]);


  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);

    });
    
    },[]);




  async function handleAddRepository() {

    // TODO
    const response = await api.post('repositories',
    {
      title:'Umbriel',
      url: 'https://www.github.com/rocketseat/umbriel',
      techs: ['Node.Js','ReactJs']

    });
    setRepositories([...repositories, response.data]); 

    /*Copiando o repositorie e adicionando a resposta "response"
    recebida no data, -> response.data
    */

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository =>{ 
    // estou setando o array repositories e filtrando todos os id diferente do que eu removi.
      repository.id !== id
    }))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>(
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li> 
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
