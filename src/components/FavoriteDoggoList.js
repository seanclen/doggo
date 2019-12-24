import React, { Component } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export default class DoggoList extends Component {
  getBreedName(data) {
    let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+-?\w+)\/\w+\.\w+/g;
    let match = regex.exec(data);
    return match[1];
  }

  render() {
    const doggoList = this.props.favoriteDoggos
    if (doggoList.length === 0) {
      return (
        <div className="container ml-md-5 mr-md-5 mt-md-5">
          <h1>favorite doggos</h1>
          <p>Nothing here :(</p>
        </div>
      )
    }
    return(
      <div className="container ml-md-5 mr-md-5 mt-md-5">
        <h1>favorite doggos</h1>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={6}>
              <ListGroup>
                { doggoList.map(doggo => {
                  return (
                    <ListGroup.Item action key={`#`+ doggo} href={`#`+ doggo}>
                      {this.getBreedName(doggo)}
                    </ListGroup.Item>
                  )})
                }
              </ListGroup>
            </Col>
            <Col sm={6}>
              <Tab.Content>
                { doggoList.map(doggo => {
                  return (
                    <Tab.Pane key={`#`+ doggo} eventKey={`#`+ doggo}>
                      <h3 className="mb-0">{this.getBreedName(doggo)} <button className="small btn-danger" onClick={() => this.props.removeFavoriteDoggo(doggo)}>remove</button></h3>
                      <Image src={doggo} fluid />
                    </Tab.Pane>
                  )})
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}
