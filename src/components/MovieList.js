import React from 'react';
import { Link } from 'react-router-dom';

class MovieList extends React.Component {






    truncateOverview = (string, maxLength) => {
        if (!string) return null;
        if (string.length <= maxLength) return string;
        return `${string.substring(0, maxLength)} ...`;
    }



    render() {

        return (
            <div className="row">


                {this.props.movies.map((movie, i) => (

                    <div className="col-lg-4" key={i}>


                        <div className="card mb-4 shadow-sm">
                            <img src={movie.imageURL} className="card-img-top" alt="Sample Movie" />
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{this.truncateOverview(movie.overview, 100)}</p>
                                <div className="d-flex justify-content-between align-items-center">



                                    <button type="button" onClick={(event) => this.props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>

                                    <Link type="button"
                                        className="btn btn-md btn-outline-primary"
                                        to={`edit/${movie.id}`}
                                    >Edit </Link>
                                    <Link type="button"
                                        className="btn btn-md btn-outline-primary"
                                        to={`detail/${movie.id}`}
                                    >Details </Link>




                                    <h2><span className="btn btn-md btn-outline-primary">{movie.sale}</span></h2>

                                </div>
                            </div>
                        </div>
                    </div>

                ))
                }

            </div >
        )
    }

}
export default MovieList;