import React, {Component} from "react";

import {Card,Table} from 'react-bootstrap';


import axios from 'axios';


export default class viewNews extends Component{

    constructor(props) {
        super(props);
        this.state={
            news : []
        };
    }

    componentDidMount() {
        this.findAllNews();
    }

    findAllNews(){

        axios.get("http://localhost:8080/news")
            .then(response => response.data )
            .then((data)=> {
                this.setState({news: data});
            });
    };



    render() {
        return(


                <Card className={"border border-dark bg-light text-dark"}>
                    <Card.Header> News List </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Created / ExpDate</th>
                                <th>Content</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.news.length === 0 ?
                                <tr align="center">
                                    <td colSpan="5">{this.state.news.length} News Available.</td>
                                </tr> :
                                this.state.news.map((news) => (
                                    <tr key={news.id}>
                                        <td>{news.topic}</td>
                                        <td>{news.expDate} {news.created}</td>
                                        <td>{news.content}</td>
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

