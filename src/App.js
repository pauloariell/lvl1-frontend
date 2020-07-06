import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

function App() {
  /**
   * UseStates retorna um array com 2 posições
   * 
   * 1. Váriavel com o seu valor
   * 2. Função para atualizarmos esse valor
   * 3. Utilizar Imutabilidade (básicamente recriar o objeto todo do zero)
   */
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  //handle -> padrão de nome utilizado para funções que o usuario tem interação
  async function handleAddProject(){
    const response = await api.post('projects', {
        title: `Desafio Reactjs BootCamp ${Date.now()}`,
        owner: "Paulo Chaves"
      }
    );

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    /**
     * Fragment <></>
     * Usado para evitar de usar uma div para colocar os components dentro
    */
    <>
      <Header title="Olar" />

      {/* <img width={300} src={backgroundImage} alt=""/> */}

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject} >Add New Project </button>
    </>
  );
}

export default App;