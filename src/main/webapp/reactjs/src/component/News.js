import React, {Component} from "react";

import {Card,Form,Button,Col} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave,faPlusSquare,faUndo,faList,faEdit} from "@fortawesome/free-solid-svg-icons";
import MyToast from './MyToast';
import axios from 'axios';

export default class News extends Component{


    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show=false;
        this.newsChange=this.newsChange.bind(this);
        this.submitNews = this.submitNews.bind(this);
    }

    initialState = {
        id:'',topic:'',created:'',expDate:'',content:''
    };

    componentDidMount() {
        const newsId = +this.props.match.params.id;
        if(newsId){
            this.findNewsById(newsId);
        }
    }

    findNewsById = (newsId) => {
        axios.get("http://localhost:8080/news/"+newsId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id:response.data.id,
                        topic: response.data.topic,
                        expDate:response.data.expDate,
                        created:response.data.created,
                        content:response.data.content
                    });
                }
            }).catch((error)=> {
            console.error("Error -"+error);
        });
    }

    resetNews = () => {

        this.setState(() => this.initialState);
    };


    submitNews = event =>{
        event.preventDefault();

        const news = {
            topic: this.state.topic,
            created:this.state.created,
            expDate:this.state.expDate,
            content:this.state.content
        };

        axios.post("http://localhost:8080/news",news)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                }
                else{
                    this.setState({"show":false});
                }
            });
    };

    updateNews = event => {
        event.preventDefault();

        const news = {
            id: this.state.id,
            topic: this.state.topic,
            created:this.state.created,
            expDate:this.state.expDate,
            content:this.state.content
        };

        axios.put("http://localhost:8080/news",news)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    setTimeout(() => this.newsList(),3000);
                }
                else{
                    this.setState({"show":false});
                }
            });
    }

    newsChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    newsList = () => {
        return this.props.history.push("/NewsList");
    };

    render() {
        const {topic,expDate,created,content} = this.state;


        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message={this.state.id ? " News Updated Successfully." :" News Saved Successfully."} type={"success"}/>
                </div>

                <Card className={"border border-dark bg-light text-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{this.state.id ? " Update News" : " Add News"}
                    </Card.Header>
                    <Form onReset={this.resetNews} onSubmit={this.state.id ? this.updateNews : this.submitNews} id="newsFromId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="fromGridTopic">
                                    <Form.Label>Topic</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="topic"
                                                  value={topic}
                                                  onChange={this.newsChange}
                                                  className={"bg-light text-dark"}
                                                  placeholder="Enter Topic"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="fromGridExpDate">
                                    <Form.Label>Exp Date</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="expDate"
                                                  value={expDate}
                                                  onChange={this.newsChange}
                                                  className={"bg-light text-dark"}
                                                  placeholder="Enter Exp Date"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="fromGridCreated">
                                    <Form.Label>Created</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="created"
                                                  value={created}
                                                  onChange={this.newsChange}
                                                  className={"bg-light text-dark"}
                                                  placeholder="Enter Created"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="fromGridContent">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="content"
                                                  value={content}
                                                  onChange={this.newsChange}
                                                  className={"bg-light text-dark"}
                                                  placeholder="Enter Content"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer sytle={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update":"Save"}
                            </Button>{'  '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{'  '}
                            <Button size="sm" variant="info" type="button" onClick={this.newsList.bind()}>
                                <FontAwesomeIcon icon={faList} /> News List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>




        );
    }
}

