import React, {Component} from "react";

import {Card,Table,ButtonGroup,Button} from 'react-bootstrap';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from 'axios';
import MyToast from "./MyToast";

export default class NewsList extends Component{

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
            .then(response => response.data)
            .then((data)=> {
                this.setState({news: data});
            });
    };

    deleteNews = (newsId) =>{
        axios.delete("http://localhost:8080/news/"+newsId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        news: this.state.news.filter(news => news.id !== newsId)
                    })
                }else{
                    this.setState({"show":false});
                }
            });
    };


    render() {


        return(
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message={"News Delete Successfully."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-light text-dark"}>
                    <Card.Header><FontAwesomeIcon icon ={faList } /> News List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Created</th>
                                <th>Exp Date</th>
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
                                        <td>{news.expDate}</td>
                                        <td>{news.created}</td>
                                        <td>{news.content}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"NewsEdit/"+news.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon ={faEdit}/></Link>{'  '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteNews.bind(this,news.id)}><FontAwesomeIcon icon ={faTrash}/></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>


        )

    }
}

