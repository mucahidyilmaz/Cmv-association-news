import React, {Component} from "react";

import {Card,Table} from 'react-bootstrap';


import axios from 'axios';


export default class viewNotice extends Component{

    constructor(props) {
        super(props);
        this.state={
            notice : []
        };
    }

    componentDidMount() {
        this.findAllNotice();
    }

    findAllNotice(){

        axios.get("http://localhost:8080/notice")
            .then(response => response.data )
            .then((data)=> {
                this.setState({notice: data});
            });
    };



    render() {
        return(
                <Card className={"border border-dark bg-light text-dark"}>
                    <Card.Header> Notice List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Topic</th>
                                <th>Created / ExpDate</th>
                                <th>Content</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.notice.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">{this.state.notice.length} Notice Available.</td>
                                </tr> :
                                this.state.notice.map((notice) => (
                                    <tr key={notice.id}>

                                        <td>
                                            <img src={notice.coverPhotoURL} width="100" height="100" alt="brand"/>
                                        </td>
                                        <td>{notice.topic}</td>
                                        <td>{notice.expDate} {notice.created}</td>
                                        <td>{notice.content}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
        )

    }
}

