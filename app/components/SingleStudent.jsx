import React, {Component} from 'react';
import axios from 'axios';

export default class SingleStudent extends Component {

    constructor (props) {
        super (props);
        this.state = {
            student: {},
            campuses: [],
            name : '',
            email: '',
            age: '',
            campusId: 0,
            emptyCampus: "N/A"
        }
        this.nameChange = this.nameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.ageChange = this.ageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.campusChange = this.campusChange.bind(this);
    }

    componentDidMount() {
        const studentId = this.props.match.params.studentId
        const gettingStudent = axios.get(`/api/students/${studentId}`);
        const gettingCampuses = axios.get('/api/campuses');

        Promise.all([gettingStudent,gettingCampuses])
        .then(resArray => resArray.map(res => res.data))
        .then(schoolData => {
            let student = schoolData[0];
            let campuses = schoolData[1];
            this.setState({ student: student, campuses: campuses, campusId: campuses[0] && campuses[0].id || this.state.emptyCampus});
        });
    }

    nameChange(event) {
        this.setState({name : event.target.value});
    }

    emailChange(event) {
        this.setState({email : event.target.value});
    }

    ageChange(event) {
        this.setState({age: (event.target.value)});
    }

    campusChange(event) {
        this.setState({campusId: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const studentId = this.props.match.params.studentId;
        axios.put(`/api/students/${studentId}`, {
            name: this.state.name ? this.state.name : this.state.student[0].name,
            email: this.state.email ? this.state.email : this.state.student[0].email,
            age: this.state.age ? this.state.age: parseInt(this.state.student[0].age),
            campusId: this.state.campusId
        })
        .then(res => res.data)
        .then(updatedStudent => this.setState({student: updatedStudent}));

        this.setState({name: '', email: '', age: ''})
    }

    render() {
        return(
            <div className = "lunar-single-student-body">
                <div className = "lunar-student-container">
                    <div className ="lunar-single-student-style">
                        <h1>Student Information</h1>
                        <h2>Name:&nbsp;&nbsp;{this.state.student[0] && this.state.student[0].name}</h2>
                        <hr />
                        <h2>Email:&nbsp;&nbsp;{this.state.student[0] && this.state.student[0].email}</h2>
                        <hr />
                        <h2>Age:&nbsp;&nbsp;{this.state.student[0] && this.state.student[0].age}</h2>
                        <hr />
                        <h2>Campus:&nbsp;&nbsp;{this.state.student[0] && this.state.student[0].campus && this.state.student[0].campus.name || this.state.emptyCampus}</h2>
                     

                <div className = "edit-student">
                    <h3>Edit Student Information</h3>
                    <form className ="lunar-single-student-form form-container" onSubmit = {this.handleSubmit}>
                        <h4>Name: </h4>
                        <input value = {this.state.name} type='text' onChange = {this.nameChange}/>
                        <h4>Email: </h4>
                        <input value = {this.state.email} type='text'onChange = {this.emailChange}/> < br/>
                        <h4>Age: </h4>
                        <input value = {this.state.age} type='text' onChange = {this.ageChange}/>
                        <h4>Campus: </h4>
                        <select onChange = {this.campusChange}>
                            {
                                this.state.campuses.map(campus => {
                                    return (
                                        <option value = {campus.id}>{campus.name}</option>
                                    )
                                })
                            }
                        </select>
                        <br />
                        <button type='submit'>Submit</button>
                    </form>
                    </div>
                    </div>
                </div>
            </div>   
        )
    }
}