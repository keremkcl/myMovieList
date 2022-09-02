import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import IncDecCounter from './InDecCounter';
import { IconName } from "react-icons/md";
import { Link } from 'react-router-dom';






class Detail extends React.Component {



    state = {
        name: "",
        sale: "",
        overview: "",
        imageURL: "",
        value: " ",


    }



    async componentDidMount() {

        const id = this.props.match.params.id;
        //console.log(id)


        //then komutuna göre hata kodlarına göre işle.
        const response = await axios.get(`http://localhost:3002/movies/${id}`)

        //console.log(response.data);

        const movie = response.data;

        this.setState({
            name: movie.name,
            sale: movie.sale,
            overview: movie.overview,
            imageURL: movie.imageURL
        })

    }


    /* showAlert = () => {

        const [showAlert, setShowAlert] = useState(false);14r

    }


    handleShowAlert = () => this.setShowAlert(true); */

    IncDecCounter() {
        let [num, setNum] = useState(0);
        let incNum = () => {
            if (num < 10) {
                setNum(Number(num) + 1);
            }
        };
        let decNum = () => {
            if (num > 0) {
                setNum(num - 1);
            }
        }
        let handleChange = (e) => {
            setNum(e.target.value);
        }
    }




    onInputChange = (e) => {
        //    console.log(e.target.name);
        //    console.log(e.target.value);

        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onClick = () => {
        this.setState({
            userInput: 'Test'
        })
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

        const detailMovie = {
            name,
            sale,
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

        const ucret = (`${e.target.value}` * 100)
        console.log(`${ucret}`)

    }
    CompleteItem = (e) => {


        e.preventDefault();


        console.log(`${e.target.value}` * this.state.sale)


    }







    render() {

        return (
            <section className="py-6" >
                <div className="container px-5 px-lg-5 my-5">
                    <div className="row gx-6 gx-lg-6 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={this.state.imageURL} alt="..." /></div>
                        <div className="col-md-4">

                            <h1 className="display-3 fw-bolder">{this.state.name}</h1>
                            <div className="fs-4 mb-5">
                                <span className="text-decoration-line-through">{this.state.sale}</span>

                            </div>
                            <p className="lead">{this.state.overview}</p>

                            <div className='display-4 fw-bolder '>

                                <IncDecCounter />

                            </div>










                            {/* 
                            <div className="d-grid gap-2">
                                <button className="btn btn-outline-primary mr-3" onClick={this.buyItem} type="button" value="1">1</button>
                                <button className="btn btn-outline-primary mr-1" onClick={this.buyItem} type="button" value="2">2</button>
                                <button className="btn btn-outline-primary mr-3" onClick={this.buyItem} type="button" value="3">3</button>
                                <button className="btn btn-outline-primary mr-1" onClick={this.buyItem} type="button" value="4">4</button>
                                <button className="btn btn-outline-primary mr-3" onClick={this.buyItem} type="button" value="5">5</button>
                                <button style={{ left: '-10px' }} className="btn btn-outline-dark flex-shrink-0 " value={this.buyItem} onClick={this.CompleteItem} type="button"  >




                                    <i className="bi-cart-fill me-1"></i>
                                    Satın Al
                                </button> */}





                            {/* 
                            <div className="d-flex align-items-start flex-column mb-auto p-1 " style={{ height: '100px' }}>







                                <button style={{ right: '50px' }} className="btn btn-outline-dark " onClick={this.CompleteItem} type="button"  >




                                    <i className="bi-cart-fill me-1"></i>
                                    Satın Al
                                </button>

                            </div> */}
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </section >
        )

    }
}



export default Detail;