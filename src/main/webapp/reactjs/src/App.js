import React from 'react';
import './App.css';

import {Container,Row,Col} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import NavigationBar from './component/NavigationBar';
import Welcome from "./component/Welcome";
import Footer from './component/Footer'
import Notice from './component/Notice'
import News from './component/News'
import NewsList from './component/NewsList'
import NoticeList from './component/NoticeList'
import viewNews from "./component/viewNews";
import viewNotice from "./component/viewNotice";

function App() {
  const marginTop = {
      marginTop:"5px"
  }
    return (
    <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path="/" exact component={Welcome}/>
                            <Route path="/NewsAdd" exact component={News}/>
                            <Route path="/NoticeAdd" exact component={Notice}/>
                            <Route path="/NewsList" exact component={NewsList}/>
                            <Route path="/NoticeList" exact component={NoticeList}/>
                            <Route path="/NewsEdit/:id" exact component={News}/>
                            <Route path="/NoticeEdit/:id" exact component={Notice}/>


                            <Route path="/viewNews" exact component={viewNews}/>
                            <Route path="/viewNotice" exact component={viewNotice}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
    </Router>
  );

}

export default App;
