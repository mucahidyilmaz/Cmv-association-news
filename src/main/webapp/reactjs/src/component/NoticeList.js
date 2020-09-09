import React, {Component} from "react";

import {Card,Table,ButtonGroup,Button} from 'react-bootstrap';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from 'axios';
import MyToast from "./MyToast";


export default class NoticeList extends Component{

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

    deleteNotice = (noticeId) =>{
        axios.delete("http://localhost:8080/notice/"+noticeId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        notice: this.state.notice.filter(notice => notice.id !== noticeId)
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
                    <MyToast show = {this.state.show} message={"Notice Delete Successfully."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-light text-dark"}>
                    <Card.Header><FontAwesomeIcon icon ={faList } /> Notice List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Topic</th>
                                <th>Created</th>
                                <th>Exp Date</th>
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
                                        <td>{notice.expDate}</td>
                                        <td>{notice.created}</td>
                                        <td>{notice.content}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"NoticeAdd/"+notice.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon ={faEdit}/></Link>{'  '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteNotice.bind(this,notice.id)}><FontAwesomeIcon icon ={faTrash}/></Button>
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

