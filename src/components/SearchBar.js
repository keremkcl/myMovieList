import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {



    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={this.handleFormSubmit} >


                <div className="form-row mb-5" >
                    <div className="col-12" style={{ top: '40px' }}>
                        <input

                            onChange={this.props.searchMovieProp}
                            type="text" className="form-control"
                            placeholder="Search a event"


                        />

                    </div>




                    <div className="col-12" style={{ right: '-120px', width: '30px' }}>
                        <Link
                            to="/add"
                            type="button"
                            className="btn btn-md btn-danger"
                            style={{ float: 'right' }}>Add Event
                        </Link>


                    </div>



                </div>
            </form >
        )

    }
}


export default SearchBar;