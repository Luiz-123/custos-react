import './App.css'
import HelloWorld from './components/HelloWorld'
import SaveMyName from './components/SaveMyName'
import Pessoa from './components/Pessoa'
import Frase from './components/Frase'
import List from './components/List'
import Evento from './components/Evento'
import Form from './components/Form'
import Condicional from './components/Condicional'
import OutraLista from './components/OutraLista'
import { useState} from 'react'
import SeuNome from './components/SeuNome'
import Saudacao from './components/Saudacao'

import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Contato from './pages/Contato'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


function App() {
    const name='Luiz'
    const newName = name.toUpperCase()
    const [nome, setNome] = useState()

    function sun(a,b) {
      return a+b
    }

    const url = 'http://via.placeholder.com/150'

    const meusItems = ['React','Vue','Angular']

  return (
    <div className="App">

      <Router>

        <Navbar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/empresa">
          <Empresa />
        </Route>
        <Route path="/Contato">
          <Contato />
        </Route>        
      </Switch>

        <Footer />

      </Router>

      
      {/*
      <SeuNome setNome={ setNome } />
      <Saudacao nome={ nome } />
      
      <OutraLista items={meusItems} />
      <OutraLista items={[]} />
       
      <Condicional />
            
      <Evento />
      
      <Form />
    
      <Frase /> 
      <Frase /> 
     
      <Pessoa name="Ana" idade="28" profissao="dev" foto="http://via.placeholder.com/150"/>

      <List />
      */}

      {/*
      <h1>Olá React!</h1>
      <p>Primeira Aula.</p>
      <p>Olá, { newName }</p>
      <p>Soma {2+2}</p>
      <p>Soma {sun(1,3)}</p>
      <img src={url} alt="Minha imagenm" />
      */}
    </div>
  );
}

export default App;
