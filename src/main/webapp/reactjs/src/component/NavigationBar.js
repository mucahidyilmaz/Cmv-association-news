import React,{Component} from "react";

import {Navbar,Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component{
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Link to={""} className="navbar-brand">
                    <img src="https://icons.iconarchive.com/icons/iconsmind/outline/48/Newspaper-2-icon.png" width="30" height="30" alt="brand"/> Association News
                </Link>
                <Nav className="mr-auto">
                    <Link to={"NewsAdd"} className="nav-link">Add News</Link>

                    <Link to={"NoticeAdd"} className="nav-link">Add Notice</Link>

                    <Link to={"NewsList"} className="nav-link">News List</Link>

                    <Link to={"NoticeList"} className="nav-link">Notice List</Link>
                </Nav>
            </Navbar>
        )

    }
}
