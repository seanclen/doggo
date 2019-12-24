import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from "react-bootstrap"

export default class Doggo extends Component {
  static PropTypes = {
    doggo: PropTypes.object.isRequired,
    removeDoggo: PropTypes.function.isRequired,
  }

  handleSave = (id) => {

  }

  handleRemove = (id) => {
    this.props.removeDoggo(id)
  }

  render() {
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Doggo</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button variant="primary">I like this one!</Button>
      </Card.Body>
    </Card>
  }
}
