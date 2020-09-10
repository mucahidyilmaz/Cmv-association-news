import React, {Component} from "react";

import {Card,Form,Button,Col} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave,faPlusSquare,faUndo,faList,faEdit} from "@fortawesome/free-solid-svg-icons";
import MyToast from './MyToast';
import axios from 'axios';

export default class Notice extends Component{


    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show=false;
        this.noticeChange=this.noticeChange.bind(this);
        this.submitNotice = this.submitNotice.bind(this);
    }

    initialState = {
        id:'',topic:'',created:'',expDate:'',coverPhotoURL:'',content:''
    };

    componentDidMount() {
        const noticeId = this.props.match.params.id;
        if(noticeId){
            this.findNoticeById(noticeId);
        }
    }

    findNoticeById = (noticeId) => {
        axios.get("http://localhost:8080/notice/"+noticeId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id:response.data.id,
                        topic: response.data.topic,
                        expDate:response.data.expDate,
                        created:response.data.created,
                        coverPhotoURL:response.data.coverPhotoURL,
                        content:response.data.content
                    });
                }
            }).catch((error)=> {
            console.error("Error -"+error);
        });
    }

    resetNotice = () => {

        this.setState(() => this.initialState);
    };


    submitNotice = event =>{
        event.preventDefault();

        const notice = {
            topic: this.state.topic,
            created:this.state.created,
            expDate:this.state.expDate,
            coverPhotoURL:this.state.coverPhotoURL,
            content:this.state.content
        };

        axios.post("http://localhost:8080/notice",notice)
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

    updateNotice = event => {
        event.preventDefault();

        const notice = {
            id: this.state.id,
            topic: this.state.topic,
            created:this.state.created,
            expDate:this.state.expDate,
            coverPhotoURL:this.coverPhotoURL,
            content:this.state.content
        };

        axios.put("http://localhost:8080/notice",notice)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    setTimeout(() => this.noticeList(),3000);
                }
                else{
                    this.setState({"show":false});
                }
            });
    }

    noticeChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    noticeList = () => {
        return this.props.history.push("/NoticeList");
    };

    render() {
        const {topic,expDate,created,coverPhotoURL,content} = this.state;


        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message={this.state.id ? " Notice Updated Successfully." :" Notice Saved Successfully."} type={"success"}/>
                </div>

                <Card className={"border border-dark bg-light text-dark"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{this.state.id ? " Update Notice" : " Add Notice"}
                    </Card.Header>
                    <Form onReset={this.resetNotice} onSubmit={this.state.id ? this.updateNotice : this.submitNotice} id="noticeFromId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="fromGridTopic">
                                    <Form.Label>Topic</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="topic"
                                                  value={topic}
                                                  onChange={this.noticeChange}
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
                                                  onChange={this.noticeChange}
                                                  className={"bg-light text-dark"}
                                                  placeholder="Enter Exp Date"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="fromGridCreated">
                                    <Form.Label>Created</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="created"
                                                  value={created}
                                                  onChange={this.noticeChange}
                                                  className={"bg-light text-dark"}
                                                  placeholder="Enter Created"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="fromGriCoverPhotoURL">
                                    <Form.Label>coverPhotoURL</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="coverPhotoURL"
                                        value={coverPhotoURL}
                                        onChange={this.noticeChange}
                                        className={"bg-light text-dark"}
                                        placeholder="Enter Photo Url"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="fromGridContent">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="content"
                                                  value={content}
                                                  onChange={this.noticeChange}
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
                            <Button size="sm" variant="info" type="button" onClick={this.noticeList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Notice List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>




        );
    }
}































