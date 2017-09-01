import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export default class AllCampuses extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            campuses: [],
            newCampusName: ''
        }
        this.deleteCampus = this.deleteCampus.bind(this);
        this.changeCampusName = this.changeCampusName.bind(this);
        this.submitNewCampus = this.submitNewCampus.bind(this);
    }
    
    componentDidMount() {
        axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => this.setState({campuses}));
    }

    deleteCampus(event)  {
        const campusId= document.getElementsByClassName('campus-delete')[0].name
        axios.delete(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(remainingCampuses => this.setState({campuses: remainingCampuses}))
    }

    changeCampusName (event) {
        this.setState({newCampusName : event.target.value});
    }

    submitNewCampus (event) {
        event.preventDefault();
        axios.post('/api/campuses', {
            name: this.state.newCampusName ? this.state.newCampusName : alert("Please Enter a Campus Name")
        })
        .then(res => res.data)
        .then(campus => this.setState({campuses: this.state.campuses.concat(campus)}))

        this.setState({newCampusName: ''});
    }
    
    render() {
        return (
            <div className = "all-campus-body ">
                <div className ="all-campus-container">
                    <div className= "all-campus-box">
                    <h1 className = "all-campus-header">Lunar Academy Campuses</h1>
                        {
                            this.state.campuses && this.state.campuses.map(campus => {
                                return (
                                    <div className = "campus-style clearfix campus-col-half">
                                        <img src = "https://c2.staticflickr.com/6/5228/5679642883_24a2e905e0_b.jpg" />
                                        <form className = "campus-box" onSubmit = {this.deleteCampus}>
                                            <p><NavLink className = "campus-link" to ={`campuses/${campus.id}`}> {campus.name} </NavLink></p>
                                            <button className ="campus-delete" name = {campus.id} type="submit">Delete Campus</button>
                                        </form>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
            <div className = "all-campus-container">
                <div className = "new-campus">
                    <h2>Create a New Campus: </h2>
                    <form onSubmit = {this.submitNewCampus}>
                            <input value = {this.state.newCampusName} type = 'text' onChange = {this.changeCampusName} />
                            <button type ="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}