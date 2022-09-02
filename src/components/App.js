import React from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from './Detail'
import Cards from './Cards'
import CreditCard from './CreditCard'
import utils from './utils'
import thunk from "redux-thunk"
import { reducer } from 'react';
import Basket from './Basket'

import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux"


import { useState } from "react";





/* import { Link } from 'react-router-dom'; */

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: "",
        showContent: false,
        admin: [],
        user: [],
        movies: [
            {
                "name": "The Matrix 3",
                "sale": "100$",
                "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
                "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
                "id": 14
            },
            {
                "name": "The Matrix Reloaded",
                "sale": "100$",
                "overview": "Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans, as more and more humans are being freed from the matrix and brought to Zion, the one and only stronghold of the Resistance. Neo himself has discovered his superpowers including super speed, ability to see the codes of the things inside the matrix and a certain degree of pre-cognition.",
                "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jBegA6V243J6HUnpcOILsRvBnGb.jpg",
                "id": 8
            },
            {
                "name": "Saw 3D",
                "sale": "100$",
                "overview": "SAW legacy, a group of Jigsaw survivors gathers to seek the support of self-help guru and fellow survivor Bobby Dagen, a man whose own dark secrets unleash a new wave of terror.",
                "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qHCZ6LjtmqWDfXXN28TlIC9OppK.jpg",
                "id": 11
            },
            {
                "name": "Hostage",
                "sale": "100$",
                "overview": "When a mafia accountant is taken hostage on his beat, a police officer – wracked by guilt from a prior stint as a negotiator – must negotiate the standoff, even as his own family is held captive by the mob.",
                "imageURL": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4hne3v6jN4MlCnhSkxOW7YspJhr.jpg",
                "id": 13
            },
        ]

    }



    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get("http://localhost:3002/movies");
        this.setState({ movies: response.data })


        /*  const hata = await axios.get("http://localhost:3002/movies", {
             validateStatus: function (status) {
                 return status < 100
             }
         }
         ) */


        const respons = await axios.get("http://localhost:3002/movies").then(respons => {
            console.log(respons.data); //sunucudan dönen data, js objesi                                          //Durum bilgilerini böyle alabiliriz.
            console.log(respons.status); //HTTP durum kodu
            console.log(respons.statusText); //HTTP durum mesajı
            console.log(respons.headers); //sunucudan dönen header bilgileri
            console.log(respons.config); //istek ile gönderilen konfigürasyon objesi

            const respon = axios.get("http://localhost:3002/movies").then((respon) => { })
                .catch((error) => {
                    console.log({ error })
                }
                )

        });
    }

    /* 
        async get2Movies() {
    
            const respons = await axios.get("http://localhost:3002/movies").catch(function (error) {
                if (error.respons) {
                    // İstek gönderildi ve sunucu 2xx aralığının dışında bir durum koduyla yanıt verdi
                    console.log(error.respons.data);
                    console.log(error.respons.status);
                    console.log(error.respons.headers);
                } else if (error.request) {
                    // İstek gönderildi ancak herhangi bir yanıt alınmadı
                    // `error.request`, tarayıcıda bir XMLHttpRequest objesidir ve
                    // node.js'de ise bir http.ClientRequest objesidir
                    console.log(error.request);
                } else {
                    // İsteği yapılandırırken bir şey oldu ve bu hatayı tetikledi
                    console.log('Hata', error.message);
                }
                console.log(error.config);
            }); */











    // DELETE MOVIE
    deleteMovie = async (movie) => {

        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
        this.setState(state => ({
            movies: newMovieList
        }))
    }


    // SEARCH MOVIE
    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }


    //Show
    Store = () => {
        const store = createStore(reducer, [applyMiddleware(thunk)]);
    }



    /*  showMore = (event) => {
         this.setState({ showContent: !this.state.showContent })
     } */

    // ADD MOVIE
    addMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie)
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))

        this.getMovies();
    }

    // EDIT MOVIE
    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
        this.getMovies();
    }




    detailMovie = async (id, detailMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, detailMovie)
        this.getMovies();
    }

    basketMovie = async (id, basketMovie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, basketMovie)
        this.getMovies();
    }
    render() {



        let filtredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });

        return (

            <Router>

                <div className="container">


                    <Switch>





                        <Route path="/" exact render={() => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-11">
                                        <nav className="navbar navbar-light bg-light static-top">
                                            <div className="container">
                                                <a className="navbar-brand" href="#!">EventHall</a>
                                                {/*  <a className="btn btn-md btn-danger  " style={{ float: 'right' }} onClick={(event) => this.showMore(this.addMovie)} href="#signup">Admin </a> */}
                                                {/* <a className="btn btn-md btn-danger  " style={{ float: 'right' }} onClick={(event) => this.showMore(this.setState.deleteMovie)} href="#signup">Admin </a> */}

                                            </div>
                                        </nav>
                                        <SearchBar searchMovieProp={this.searchMovie} />
                                    </div>
                                </div>


                                <MovieList
                                    movies={filtredMovies}
                                    deleteMovieProp={this.deleteMovie}

                                />
                            </React.Fragment>
                        )}>

                        </Route>

                        <Route path="/add" render={({ history }) => (

                            <AddMovie

                                onAddMovie={(movie) => {

                                    this.addMovie(movie)
                                    history.push("/")

                                }
                                }

                            />

                        )}>

                        </Route>

                        <Route path="/edit/:id" render={(props) => (

                            <EditMovie
                                {...props}
                                onEditMovie={(id, movie) => {
                                    this.editMovie(id, movie)
                                }
                                }

                            />


                        )}>



                        </Route>
                        <Route path="/detail/:id" render={(props) => (


                            <Detail


                                {...props}
                                onDetailMovie={(id, movie) => {

                                    this.detailMovie(id, movie)

                                }

                                }

                            />


                        )}>




                        </Route>
                        <Route path="/creditcard/:id" render={({ props }) => (

                            <CreditCard
                                movies={this.state.movies}
                                {...props}
                                onBasketMovie={(id, movie) => {

                                    this.basketMovie(id, movie)

                                }
                                }



                            />

                        )}>

                        </Route>

                    </Switch>
                </div >

            </Router >
        )

    }


}

export default App;