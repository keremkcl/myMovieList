import React from 'react';
import axios from 'axios';

class EditMovie extends React.Component {

    state = {
        name: "",
        sale: "",
        overview: "",
        imageURL: ""
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
                const sale = this.state.sale;
                const overview = this.state.overview;
                const imageURL = this.state.imageURL; */

        const { name, sale, overview, imageURL } = this.state;

        const id = this.props.match.params.id;

        const updatedMovie = {
            name,
            sale,
            overview,
            imageURL
        }

        this.props.onEditMovie(id, updatedMovie);
        this.props.history.push('/');

    }


    render() {

        return (
            <div className="container">
                <form className="mt-5" onSubmit={this.handleFormSubmit}>
                    <input className="form-control" id="disabledInput" type="text" placeholder="EDIT The Form To UPDATE A Movie.." disabled />
                    <div className="form-row">
                        <div className="form-group col-md-10">
                            <label htmlFor="inputName">Name</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputSale">Sale</label>
                            <input
                                type="text"
                                className="form-control"
                                name="sale"
                                value={this.state.sale}
                                onChange={this.onInputChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputImage">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageURL"
                                value={this.state.imageURL}
                                onChange={this.onInputChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="overviewTextarea">Overview</label>
                            <textarea
                                className="form-control"
                                name="overview"
                                rows="5"
                                value={this.state.overview}
                                onChange={this.onInputChange}></textarea>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-danger btn-block" value="Edit Movie" />
                </form>
            </div>
        )

    }
}


export default EditMovie;