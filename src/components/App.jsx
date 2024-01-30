import React, { Component } from 'react';
import * as API from '../Services/pixabay-api';
import { Container } from './App.styled';
import { Searchbar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

class App extends Component {
  state = {
    images: [],
    values: '',
    page: 1,
    status: 'inactive',
  };

  async loadImages() {
    const { images, values, page } = this.state;

    try {
      const { hits, totalHits } = await API.getImages(values, page);
      this.setState({
        images: [...images, ...hits],
        status: Math.ceil(totalHits / 12) <= page ? 'inactive' : 'resolved',
      });
    } catch (error) {
      alert('Uh-oh, there was an error! Give the page a reload and try again.');
      this.setState({ status: 'rejected' });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { page, values } = this.state;

    if (prevState.page !== page || prevState.values !== values) {
      await this.loadImages();
    }
  }

  updateValues = values => {
    this.setState({ images: [], values, page: 1, status: 'pending' });
  };

  updatePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { updateValues, updatePage } = this;
    const { images, status } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={updateValues} />
        <ImageGallery images={images} />
        {status === 'resolved' && <Button handleClick={updatePage} />}
        {status === 'pending' && <Loader />}
      </Container>
    );
  }
}

export default App;
