import React, {Component} from "react";
import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component {
        render() {
         return(
             <Jumbotron className="bg-light text-dark">
                 <h1>Welcome to Admin Page</h1>
                 <p>
                     You can perform News and Notice operations with the above buttons on this page.
                 </p>
             </Jumbotron>
         );
        }
}

