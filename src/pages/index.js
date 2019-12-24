import React from "react"

import SelectSearch from 'react-select-search'
import DoggoPreview from '../components/DoggoPreview'
import FavoriteDoggoList from "../components/FavoriteDoggoList"

import Layout from "../components/Layout"
import '../../node_modules/react-select-search/style.css'

class Index extends React.Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('doggo')) {
      this.state = JSON.parse(localStorage.getItem('doggo'))
    } else {
      this.state = {
        breed: '',
        emptyResults: true,
        dropdownPlaceholder: '',
        breeds: [],
        favoriteBreeds: [],
      }
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.favoriteBreedExists = this.favoriteBreedExists.bind(this);
    this.addRandomDoggo = this.addRandomDoggo.bind(this);
    this.addFavoriteDoggo = this.addFavoriteDoggo.bind(this);
    this.removeFavoriteDoggo = this.removeFavoriteDoggo.bind(this);
  }

  getInitialState() {
    return JSON.parse(localStorage.getItem('doggo') || '{}');
  }


  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => this.populateBreedDropdown(data.message))
    .catch(error => this.notifyError(error))
  }

  populateBreedDropdown(data) {
    var breeds = []
    for (var i in data) {
      // value for react-select-search
      breeds.push({name: i, value: i, subbreeds: data[i]})
    }
    this.setState({
      breeds: breeds,
      emptyResults: false,
      dropdownPlaceholder: breeds[Math.round(Math.random() * breeds.length)].value,
    })
  }

  handleDropdownChange(b) {
    this.setState({
      breed: b,
      dropdownPlaceholder: b.name,
    })
  }

  favoriteBreedExists(image) {
    const { favoriteBreeds } = this.state
    const breedName = this.getBreedName(image)

    var breedExists = false
    for (var b = 0; b < favoriteBreeds.length; b++) {
      if (this.getBreedName(favoriteBreeds[b]) === breedName) {
        breedExists = true
      }
    }
    return breedExists
  }

  addRandomDoggo() {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => this.addFavoriteDoggo(data.message))
    .catch(error => this.notifyError(error))
  }

  addFavoriteDoggo(image) {
    const { favoriteBreeds } = this.state
    if (image && !this.favoriteBreedExists(image)) {
      favoriteBreeds.push(image)
      this.setState({
        favoriteBreeds: favoriteBreeds
      })
      localStorage.setItem('doggo', JSON.stringify(this.state));
    }
  }

  removeFavoriteDoggo(image) {
    const { favoriteBreeds } = this.state
    if (image && favoriteBreeds.includes(image)) {
      var filtered = favoriteBreeds.filter((value, index, arr) => {
        return value !== image
      })
      this.setState({
        favoriteBreeds: filtered
      })
      localStorage.setItem('doggo', JSON.stringify(this.state));
    }
  }

  getBreedName(data) {
    let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+-?\w+)\/\w+\.\w+/g;
    let match = regex.exec(data);
    return match[1];
  }

  notifyError(error) {
    alert("Bark bark... Something went wrong.")
  }

  render() {
    const { emptyResults, breeds, breed, dropdownPlaceholder } = this.state
    return (
      <Layout>
        <div className="container mt-lg-5 pt-lg-5">
          <div className="mainContainer mb-5">
            <div className="row">
              <div className="col-lg-12 col-md-12 text-center">
                <div className="gatsby-square">
                  <h1>doggo</h1>
                  <h5>Create a collection of your favorite doggo breeds!</h5>
                </div>
                {emptyResults ? (
                  <p>No Doggos :(</p>
                ) : (
                  <div className="mt-4">
                    <SelectSearch options={breeds} value = {breed.value} name="breed" placeholder={dropdownPlaceholder} onChange={this.handleDropdownChange}/>
                    <button className="btn btn-light" onClick={this.addRandomDoggo}>I'm Feeling Curious</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DoggoPreview breed={breed} addFavoriteDoggo={this.addFavoriteDoggo} />
          <FavoriteDoggoList favoriteDoggos={this.state.favoriteBreeds} removeFavoriteDoggo={this.removeFavoriteDoggo} />
        </div>
      </Layout>
    )
  }
}

export default Index
