import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then( response => {
      setRepositories(response.data)
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: 'https://github.com/BLoboF/basicReactJs.git', 
      title: "Basic Reactjs", 
      techs: 'ReactJs',
    });

    const repository = response.data
    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repositoryDeleted = repositories.slice(id)
    setRepositories(repositoryDeleted)
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => {
              const id = repository.id
              handleRemoveRepository(id)
            }
            }>
              Remover
          </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
