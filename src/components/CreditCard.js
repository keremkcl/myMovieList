import React from 'react';
import { render } from 'react-dom';
import Card from 'react-credit-cards';
import { useState } from 'react';
import { Alert } from 'bootstrap';
import IncDecCounter from './InDecCounter'
import axios from "react"
import { useParams } from 'react-router-dom';
import { BsFillBasket2Fill } from "react-icons/bs";

import SupportedCards from './Cards';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './utils';
import './styles.css';

import 'react-credit-cards/es/styles-compiled.css';

class CreditCard extends React.Component {
    state = {
        number: '',
        name1: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
        name: "",
        sale: "",
        num: 0,
        overview: "",
        imageURL: "",
        value: " ",
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

    async componentDidMount() {

        /* const id = this.props.match.params.id */
        //console.log(id)


        //then komutuna göre hata kodlarına göre işle.
        /* const response = await axios.get(`http://localhost:3002/movies/${this.state.movie.id}`) */

        //console.log(response.data);

        /* const movie = response.data; */

        /* this.setState({
            name: movie.name,
            sale: movie.sale,
            overview: movie.overview,
            imageURL: movie.imageURL
        }) */

    }


    handleFormSubmit = (e) => {
        e.preventDefault();
        /* 
                const name = this.state.name;
                const rating = this.state.rating;
                const overview = this.state.overview;
                const imageURL = this.state.imageURL; */

        const { name, sale, overview, imageURL } = this.state;

        const id = this.props.match.params.id;

        const basketMovie = {
            name,
            sale,
            overview,
            imageURL
        }

        this.props.onBasketMovie(id, basketMovie);
        this.props.history.push('/');

    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    Alert = (e) => {
        const [showAlert, setShowAlert] = useState(false);
        const handleShowAlert = () => setShowAlert(true);
        const [show, setShow] = useState(false)
    }

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
    };


    InDecCounter = () => {

        const [showAlert, setShowAlert] = useState(false);
        const handleShowAlert = () => setShowAlert(true);
        const [show, setShow] = useState(false)

        const [num, setNum] = useState(0);
        const incNum = (e) => {
            e.preventDefault();
            if (num < 10) {
                setNum(Number(num) + 1, e.target.value);
                console.log(`${e.target.value}`)
            }
        };
        function decNum(e) {
            e.preventDefault();
            if (num > 0) {
                setNum(Number(num) - 1, e.target.value);
                console.log(`${e.target.value}`);
            }


        }
        const handleChange = (e) => {
            setNum(e.target.value);
            e.preventDefault();
            /*    console.log(`${e.target.value}`) */

        }

        const CompleteItem = (e) => {
            e.preventDefault();


            setNum(e.target.value)
            const ucret = console.log(`${e.target.value}` * 100)

        }

        const ItemCost = (e) => {


            setNum(Number(num))
            console.log(`${Number(num)}` * 100)
        }



    }

    render() {
        const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

        return (
            <div key="Payment">
                <div className="App-payment">
                    <h1>React Credit Cards</h1>
                    <h4>Beautiful credit cards for your payment forms</h4>
                    <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    />
                    <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                            <small>E.g.: 49..., 51..., 36..., 37...</small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="form-control"
                                    placeholder="Valid Thru"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="form-actions">
                            <button className="btn btn-primary btn-block">PAY</button>
                        </div>
                    </form>

                    {/*   {formData && (
                        <div className="App-highlight">
                            {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
                        </div>
                    )} */}
                    <div>


                        {/*  <h1 style={{ position: "relative", top: "30px" }}>Sepet</h1 > */}
                        <BsFillBasket2Fill style={{ position: "relative", width: "400px", height: "80px", right: "-330px", top: "30px" }} />
                        {<h1 style={{ position: "relative", top: "30px" }}>Sepet</h1 >}


                        {<section className="py-6" >
                            <div className="container px-5 px-lg-6 my-5">
                                {this.state.movies.map((movie) => (
                                    <div className="row gx-6 gx-lg-6 align-items-center" key={movie.id}>
                                        <div className="col-md-6"><img style={{ position: "relative", top: "10px" }} className="card-img-top mb-5 mb-md-5" src={movie.imageURL} alt="..." /></div>
                                        <div className="col-md-4">

                                            <h1 className="display-5 fw-bolder">{movie.name}</h1>
                                            <div className="fs-4 mb-5">
                                                <span className="text-decoration-line-through" style={{ position: "relative", right: "-120px" }}>{movie.sale}</span>

                                            </div>
                                            <p className="lead">{this.state.overview}</p>



                                            <div className="input-group" style={{ right: "-20px" }} >
                                                <div className="input-group-prepend">
                                                    <button className="btn btn-outline-primary" style={{ left: "47px" }} type="button" value={this.state.num} onClick={() => (this.state.num - 1)}>-</button>
                                                </div>
                                                <input type="text" className="form-control mx-sm-5 mb-0 " value={this.state.num} onChange={this.handleChange} />
                                                <div className="input-group-prepend">
                                                    <button className="btn btn-outline-primary " style={{ right: "50px " }} type="button" value={this.state.num} onClick={this.state.num + 1}>+</button>

                                                    <div className="col-12  " style={{ left: '-30px', width: '30px' }}>



                                                    </div>

                                                </div>
                                                <div>




                                                </div>



                                            </div>


                                            <div className='col-md-12 text-center'>
                                                <button className="btn btn-outline-dark float-center  " value={this.num} type="submit"  >
                                                    {/*  <i style={{ right: "40px" }} className="bi-cart-fill me-1"></i> */}
                                                    Ücret:{`${(movie.sale)} `}
                                                </button>

                                            </div>



                                        </div>
                                    </div>


                                )
                                )}

                            </div>

                        </section>}

















                    </div>

                    {/*  <div className="App-badges">
                        <a
                            href="https://github.com/amarofashion/react-credit-cards"
                            className="github__btn">
                            <img
                                alt="View on GitHub"
                                src="https://cdn.jsdelivr.net/gh/gilbarbara/logos@2017.12/logos/github-icon.svg"
                            />
                            <span>View on GitHub</span>
                        </a>
                        <a href="https://codesandbox.io/s/ovvwzkzry9">
                            <img
                                alt="Edit ovvwzkzry9"
                                src="https://codesandbox.io/static/img/play-codesandbox.svg"
                            />
                        </a>
                    </div> */}


                </div >



                {/*  <Route path="/add" render={({ history }) => (
                            <AddMovie
                                onAddMovie={(movie) => {
                                    this.addMovie(movie)
                                    history.push("/")
                                }
                                }
                            />
                        )}>
                        </Route> */}
            </div >

        );
    }
}




export default CreditCard;