import React from 'react';
import axios from 'axios';
import { useState } from 'react';

class Detail extends React.Component {

    state = {
        name: "",
        sale: "",
        overview: "",
        imageURL: "",
        value: " "

    }



    async componentDidMount() {

        const id = this.props.match.params.id;
        //console.log(id)

        const response = await axios.get(`http://localhost:3002/movies/${id}`);
        //console.log(response.data);

        const movie = response.data;

        this.setState({
            name: movie.name,
            sale: movie.sale,
            overview: movie.overview,
            imageURL: movie.imageURL
        })

    }





    onInputChange = (e) => {
        //    console.log(e.target.name);
        //    console.log(e.target.value);

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        /* 
                const name = this.state.name;
                const rating = this.state.rating;
                const overview = this.state.overview;
                const imageURL = this.state.imageURL; */

        const { name, rating, overview, imageURL } = this.state;

        const id = this.props.match.params.id;

        const detailMovie = {
            name,
            rating,
            overview,
            imageURL
        }

        this.props.onDetailMovie(id, detailMovie);
        this.props.history.push('/');

    }
    YourComponent = (e) => {
        const [value, setValue] = useState("");

        const nameChangeHandler = (e) => {
            setValue(e.target.value)
        };
    }



    buyItem = (e) => {

        e.preventDefault();

        /* console.log(`${this.state.sale}*num`) */

        this.setState({
            [e.target.value]: e.target.value
        })

        console.log(`${e.target.value}`)



    };

    render() {

        return (
            <section className="py-5" >
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={this.state.imageURL} alt="..." /></div>
                        <div className="col-md-6">

                            <h1 className="display-5 fw-bolder">{this.state.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">{this.state.sale}</span>

                            </div>
                            <p className="lead">{this.state.overview}</p>
                            <div className="d-flex">
                                <input className="form-control text-center me-3" id="inputQuantity" type="num" />

                                <button onClick={this.nameChangeHandler} className="btn btn-outline-dark flex-shrink-0" type="button" value={this.value} >



                                    <i onChange={this.nameChangeHandler} className="bi-cart-fill me-1"></i>
                                    Satın Al
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        )

    }
}



export default Detail;