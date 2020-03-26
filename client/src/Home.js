import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

import {Link} from "react-router-dom"

export default class Home extends Component{
    render() {
        return(
            <div>
                <Header/>

                <br/>
                <div className="container" style={{marginTop:"5%",marginBottom:"5%",width:"80%"}}>   
                               
                </div>
                <section>
                    <b style={{textAlign:"center" , fontSize:50}}>Root Of Equations</b>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12" style={{marginTop:"5%"}}>
                                <div className="card" style={{width:"100%" , height:"50em" , marginBottom:"5%" , backgroundColor:"#FFFFFF"}}>
                                    <div className="card-body">
                                        <p className="card-text">   
                                                                       
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12" style={{marginTop:"5%"}}>
                                <div className="card" style={{width:"100%" , height:"50em" , marginBottom:"5%", marginBottom:"5%" , backgroundColor:"#000000"}}>
                                    <img src="./images/formula.png" className="card-img-top" alt="..." style={{ width:"30%" , marginLeft:"36%" , marginTop:"10%" }}/>
                                    <div className="card-body">
                                        <p className="card-text">
                                            <Link to="/Bisection"><b style={{color:'white' , fontSize:15}}>Bisection</b></Link><hr/>
                                            <Link to="/FalsePosition"><b style={{color:'white' , fontSize:15}}>False-Position</b></Link><hr/>
                                            <Link to="/OnePoint"><b style={{color:'white' , fontSize:15}}>One-Point Iteration</b></Link><hr/>
                                            <Link to="/NewtonRaphson"><b style={{color:'white' , fontSize:15}}>Newton Raphson</b></Link><hr/>
                                            <Link to="/Secant"><b style={{color:'white' , fontSize:15}}>Secant</b></Link><hr/>                                          
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12" style={{marginTop:"5%"}}>
                                <div className="card" style={{width:"100%" , height:"50em" , marginBottom:"5%" , backgroundColor:"#FFFFFF"}}>
                                    <div className="card-body">
                                        <p className="card-text">
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        )
    }
}