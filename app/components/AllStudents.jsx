import React, {Component} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import avatar from 'cartoon-avatar';

export default class AllStudents extends Component {

    constructor (props){
        super (props)
        this.state = {
            students: [],
            campuses: [],
            name: '',
            email: '',
            age: '',
            campusId: 0,
        }
        
        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.ageChange = this.ageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.campusChange = this.campusChange.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    componentDidMount() {
        const gettingStudents = axios.get('/api/students')
        const gettingCampuses =  axios.get('/api/campuses')

        Promise.all([gettingStudents, gettingCampuses])
        .then(resArray => resArray.map(res => res.data))
        .then(academyArray => {
            let students = academyArray[0];
            let campuses = academyArray[1];
            this.setState({students: students, campuses: campuses, campusId: campuses[0] && campuses[0].id || 0});
        })
    }

    nameChange(event) {
        this.setState({ name: event.target.value});
    }
 
    emailChange(event) {
        this.setState({ email : event.target.value});
    }

    ageChange(event) {
        this.setState({age: (event.target.value)});
    }

    campusChange(event){
        this.setState({campusId : parseInt(event.target.value)});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/students', {
            name: this.state.name ? this.state.name : alert("Please enter a name"),
            email: this.state.email ? this.state.email : alert("Please enter an e-mail"),
            age: parseInt(this.state.age) ? parseInt(this.state.age) : alert("Please enter an age"),
            campusId: this.state.campusId ? this.state.campusId : alert("Please create a campus")
        })
        .then(res => res.data)
        .then(newStudent => this.setState({students: this.state.students.concat(newStudent)})
        )

        this.setState({name: '', email: '', age: ''});
    }

    deleteStudent(event) {
        event.preventDefault();
        const studentId = document.getElementsByClassName('deleteStudent')[0].name
        axios.delete(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(students => this.setState({ students: students }))
    }

    render() {
        console.log(this.state.avatars)
        return (
            <div className ="lunar-student-body">
                <div className ="lunar-student-container">
                    <div className = "all-student-box">
                    <h1>Students</h1>
                        {
                        this.state.students && this.state.students.map(student => {
                            return(
                                <div className = "lunar-student-box-model campus-col-half">
                                    <img src={avatar.generate_avatar()} />
                                    <form className = "student-model" onSubmit = {this.deleteStudent}>
                                        <p>Name: <NavLink className = "lunar-student-link" to = {`/students/${student.id}`} >{student.name}</NavLink></p>
                                        <p>Campus: <NavLink className = "lunar-student-link" to = {`/campuses/${student.campusId}`} >{student.campus && student.campus.name || "N/A"}</NavLink></p>
                                        <button className = "deleteStudent" name ={student.id} type='submit'>Delete</button>
                                    </form>
                                </div>
                                )
                            })
                        }
                    </div>
            </div>
            
            <div className = "lunar-student-container">
                <div className = "new-student">
                        <h3>Create a New Student</h3>
                        <form className = "form-container" onSubmit = {this.handleSubmit}>
                            <h4>Name: </h4>
                            <input value = {this.state.name} onChange = {this.nameChange} type = 'text' name = "name" /> 
                            <h4>Email: </h4>
                            <input value = {this.state.email} onChange = {this.emailChange} type = 'text' name = "email" /> <br />
                            <h4>Age: </h4>
                            <input value = {this.state.age} onChange = {this.ageChange} type = 'text' name = "age" /> 
                            <h4>Campus: </h4>
                            <select onChange = {this.campusChange}>
                                {
                                    this.state.campuses && this.state.campuses.map(campus => {
                                        return(
                                            <option value ={campus.id}>{campus.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <br />
                            <button type = "submit">Submit</button>
                        </form>
                </div>
            </div>
        </div>
        )
    }
}


