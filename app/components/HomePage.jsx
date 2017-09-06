import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


export default class HomePage extends Component {
    render() {
        return (
            <div className ="clearfix bigDiv">
                <div className ="main-body-container">
                    <div className = "main-body-style">
                        <h1 id = "lunar-academy-title" >Welcome to Lunar Academy</h1>
                    </div>
                </div>
            </div>
        )
    }
}
