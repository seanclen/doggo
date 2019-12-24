import React, { Component } from 'react'

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

export default class DoggoPreview extends Component {
  constructor() {
    super()
    this.state = {
      images: [],
      noImages: true,
    }
  }
  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.breed !== this.props.breed) {
      this.fetchImages();
    }
  }

  fetchImages() {
     if (this.props.breed !== '') {
       fetch('https://dog.ceo/api/breed/' + this.props.breed.name + '/images/random/4')
       .then(response => response.json())
       .then(data => this.populateImages(data.message))
     }
  }

  populateImages(images) {
    this.setState({
      images: images,
      noImages: false,
    })
  }

  render() {
    const { noImages, images } = this.state
    if (noImages) {
      return (null)
    }
    return(
      <div className="container mt-lg-5 pt-lg-5 text-center">
        <CardDeck>
          {images.map(item => {
            return (
              <Card key={item}>
                <Card.Img variant="top" src={item} />
                <Card.Body>
                  <Card.Title>{this.props.breed.name}</Card.Title>
                  <Card.Text className="text-muted">{item}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <button className="btn btn-primary" onClick={() => this.props.addFavoriteDoggo(item)}>Add me</button>
                </Card.Footer>
              </Card>
            )
          })}
        </CardDeck>
      </div>
    )
  }
}

// <Col sm={3}>
//   <Image src={images[0]} fluid />
// </Col>
// <Col sm={3}>
//   <Image src={images[1]} fluid />
// </Col>
// <Col sm={3}>
//   <Image src={images[2]} fluid />
// </Col>
// <Col sm={3}>
//   <Image src={images[3]} fluid />
// </Col>
// </Row>
