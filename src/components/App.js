import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// App components
import Nav from './Nav';
import Gallery from './Gallery';
import SearchForm from './SearchForm';
import apikey from '../config';
import NotFound from './NotFound';
import Spinner from './Spinner';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            arr1: [],
            arr2: [],
            arr3: [],
            query: '',
            isLoading: true,
        };
    }

    handleData = (tag = 'motorcycle') => {
        axios
            .get(
                `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
            )
            .then((response) => {
                if (tag === 'motorcycle') {
                    this.setState({
                        arr1: response.data.photos.photo,
                        isLoading: false,
                    });
                } else if (tag === 'lake') {
                    this.setState({
                        arr2: response.data.photos.photo,
                        isLoading: false,
                    });
                } else if (tag === 'bird') {
                    this.setState({
                        arr3: response.data.photos.photo,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        images: response.data.photos.photo,
                        query: tag,
                        isLoading: false,
                    });
                }
            })
            .catch((error) => {
                console.log('Error getting data with axios', error);
            });
    };

    componentDidMount() {
        this.handleData('motorcycle');
        this.handleData('lake');
        this.handleData('bird');
    }

    render() {
        // console.log(this.state.images);
        return (
            <BrowserRouter>
                <div className="container">
                    <SearchForm onSearch={this.handleData} />
                    <Nav />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to={'/motorcycle'} />}
                        />
                        <Route
                            exact
                            path="/motorcycle"
                            render={() =>
                                this.state.isLoading ? (
                                    <Spinner />
                                ) : (
                                    <Gallery
                                        data={this.state.arr1}
                                        imageOf="motorcycle"
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/lake"
                            render={() =>
                                this.state.isLoading ? (
                                    <Spinner />
                                ) : (
                                    <Gallery
                                        data={this.state.arr2}
                                        imageOf="lake"
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/bird"
                            render={() =>
                                this.state.isLoading ? (
                                    <Spinner />
                                ) : (
                                    <Gallery
                                        data={this.state.arr3}
                                        imageOf="bird"
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/search/:query"
                            render={() =>
                                this.state.isLoading ? (
                                    <Spinner />
                                ) : (
                                    <Gallery
                                        data={this.state.images}
                                        imageOf={this.state.query}
                                    />
                                )
                            }
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
