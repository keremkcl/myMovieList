import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import React from 'react';
import { useState } from "react";
import { MdAddShoppingCart } from 'react-icons/md'
function IncDecCounter() {



    const [showAlert, setShowAlert] = useState(false);
    const handleShowAlert = () => setShowAlert(true);
    const [show, setShow] = useState(false)

    let [num, setNum] = useState(0);
    let incNum = (e) => {
        e.preventDefault();
        if (num < 10) {
            setNum(Number(num) + 1, e.target.value);
            console.log(`${e.target.value}`)
        }
    };
    let decNum = (e) => {
        e.preventDefault();
        if (num > 0) {
            setNum(Number(num) - 1, e.target.value);
            console.log(`${e.target.value}`)
        }


    }
    let handleChange = (e) => {
        setNum(e.target.value);
        e.preventDefault();
        /*    console.log(`${e.target.value}`) */

    }

    let CompleteItem = (e) => {
        e.preventDefault();


        setNum(e.target.value)
        const ucret = console.log(`${e.target.value}` * 100)

    }

    let ItemCost = (e) => {


        setNum(Number(num))
        console.log(`${Number(num)}` * 100)
    }



    return (
        <>
            <div className="col-l-3 row-2">



                <div className="input-group" >
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-primary" style={{ left: "47px" }} type="button" value={num} onClick={decNum}>-</button>
                    </div>
                    <input type="text" className="form-control mx-sm-5 mb-0 " value={num} onChange={handleChange} />
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-primary " style={{ right: "50px " }} type="button" value={num} onClick={incNum}>+</button>

                        <div className="col-12  " style={{ left: '-30px', width: '30px' }}>
                            <Link

                                to="/creditcard/id "
                                type="button"
                                className="btn btn-md btn-danger"

                                style={{ float: 'right' }}>
                                <MdAddShoppingCart />

                            </Link>


                        </div>

                    </div>
                    <div>




                    </div>



                </div>





            </div>
            <div className='col-md-12 text-center'>
                <button className="btn btn-outline-dark float-center  " value={num} type="submit" onClick={ItemCost}  >
                    {/*  <i style={{ right: "40px" }} className="bi-cart-fill me-1"></i> */}
                    Ücret:{`${Number(num) * 100} $`}
                </button>
                <Alert style={{ width: "267px", right: "-30px", top: "10px" }} /* className="well well-xl " */ show={showAlert} variant="success" /*  onClose={() => setShow(false)} */ dismissible>
                    <i ></i>
                    Başarılı
                </Alert>
            </div>

        </>
    );
}

export default IncDecCounter;