import React, {Component} from 'react';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom';
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';
import StudentsOfCampus from './StudentsOfCampus';
import SingleStudent from './SingleStudent';
import HomePage from './HomePage';

export default class Academy extends Component {

  render() {
    return(
      <BrowserRouter>
        <div>
          <div className = "wrap">
          <div className = 'lunar-container clearfix'>
            <img src='https://www.goodfreephotos.com/albums/vector-images/yellow-crescent-half-moon-vector-clipart.png' />
            <h1 className='main-title'><NavLink className ="lunar-nav-style" to="/">Lunar Academy</NavLink></h1>
            <ul className = 'lunar-navigation'>
                <li><NavLink className ="lunar-nav-style" to = "/">Home</NavLink></li>
                <li><NavLink className ="lunar-nav-style" to ="/students">Students</NavLink></li>
                <li><NavLink className ="lunar-nav-style" to = "/campuses">Campuses</NavLink></li>
            </ul>
          </div>
          
      
          <Switch>
            <Route exact path = "/" component = {HomePage} />
            <Route exact path ="/campuses" component ={AllCampuses} />
            <Route exact path = "/students" component ={AllStudents} />
            <Route exact path = "/students/:studentId" component = {SingleStudent}/>
            <Route exact path = "/campuses/:campusId" component = {StudentsOfCampus}/>
          </Switch>
          </div>
          <footer className = "lunar-container clearfix">
            <div className = "lunar-footer">
              <h3 className='footer-title'><NavLink className ="lunar-nav-style" to="/">&copy;Lunar Academy</NavLink></h3>
                <ul className = 'footer-navigation'>
                  <li><NavLink className ="lunar-nav-style" to = "/">Home</NavLink></li>
                  <li><NavLink className ="lunar-nav-style" to ="/students">Students</NavLink></li>
                  <li><NavLink className ="lunar-nav-style" to = "/campuses">Campuses</NavLink></li>
                </ul>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    )
  }
}
