import './App.css';
import NavBar from './components/NavBar';
import BlogPosts from './components/BlogPosts';
import React ,{ useState }from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const App=()=> {
  const [mode,setMode] =useState('light');
  const limit = 3;
  // const [progress,setProgress] =useState(0);
  
    const changeMode=()=>{
        if(mode==='light')
        {
            setMode('dark');
            document.body.style.background = '#2a2f32';
        }
        else{

            setMode('light');
            document.body.style.background = 'linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5)';
        }
    }
  return (
  <>
    <div>
    <Router>
    <NavBar mode={mode} changeMode={changeMode} />
        <Switch>
        <Route exact path="/"><BlogPosts mode={mode} key="general" limit={limit}/></Route> 
        <Route exact path="/Literacture"><BlogPosts mode={mode} key="Literacture" limit={limit} category="Literacture"/></Route> 
        <Route exact path="/Cricket"><BlogPosts mode={mode} key="Cricket" limit={limit} category="Cricket"/></Route> 
        <Route exact path="/Politics"><BlogPosts mode={mode} key="Politics" limit={limit} category="Politics"/></Route>
        <Route exact path="/Health"><BlogPosts mode={mode} key="Health" limit={limit} category="Health"/></Route>
        <Route exact path="/Technology"><BlogPosts mode={mode} key="Technology" limit={limit} category="Technology"/></Route>
           </Switch>
        </Router>
    </div>
  </>
  );
}

export default App;
