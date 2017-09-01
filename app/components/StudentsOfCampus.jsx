import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class StudentsOfCampus extends Component {
    
    constructor (props) {
        super (props);
        this.state = {
            campus: {},
            students: [],
            newCampusName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const campusId = this.props.match.params.campusId
        axios.get(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(campus => this.setState({campus}));
    }

    handleChange(event) {
        this.setState({newCampusName: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const campusId = this.props.match.params.campusId;
        axios.put(`/api/campuses/${campusId}`, {
            name : this.state.newCampusName
        })
        .then(res => res.data)
        .then(updatedCampus=> this.setState({campus: updatedCampus}));

        this.setState({newCampusName: ''})
    }

  
    render() {
        console.log(this.state.campus)
        return(
            <div className ="student-campus-body">
            <div className = "student-campus-container">
                <div className = "student-campus">
                <h1>List of Students for { this.state.campus[0] && this.state.campus[0].name }</h1>
                <div className ="each-student">
                    {
                        this.state.campus[0] && this.state.campus[0].users.filter(student => {
                            return student.campusId === this.state.campus[0].id
                        }).
                        map(student => {
                            return (                       
                                <div>    
                                    <p key = {student.id}><NavLink className = "each-student-link" to={`/students/${student.id}`}>{student.name}</NavLink></p>
                                    <hr />
                                </div>

                            )

                        })
                    }
                </div>
                <div className = "planet-student">
                <h3>Edit Campus</h3>
                <form className ="each-student-form" onSubmit = {this.handleSubmit}>
                    <h4>Name: </h4>
                    <input value = {this.state.newCampusName} onChange = {this.handleChange} type = 'text'></input>
                    <button type = "submit">Submit</button>
                </form>
                </div>
                </div>
            </div>
            </div>
        )
    }
}