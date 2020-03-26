import React, { Component } from 'react'
import { HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {Link} from "react-router-dom"

const { SubMenu } = Menu;


export default class Header extends Component {
    render() {
        return (
            <div >                  
                <Menu                    
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: "6em" , width:"100%" }} 
                >
                    <Link to="/"><HomeOutlined style={{marginRight:"1%" , fontSize:"2.5em" , color:'#EAECEEF'}}/></Link>
                    <SubMenu
                        key="sub1"
                        title={
                           
                            <span><b style={{fontSize:"1.3em"}}>Root Of Equations</b></span>
                        }  
                    > 
                        <Menu.Item key="1"><Link to="/Bisection"/>Bisection</Menu.Item>
                        <Menu.Item key="2"><Link to="/FalsePosition"/>False Position</Menu.Item>
                        <Menu.Item key="3"><Link to="/OnePoint"/>One Point</Menu.Item>
                        <Menu.Item key="4"><Link to="/NewtonRaphson"/>Newton Raphson</Menu.Item>
                        <Menu.Item key="5"><Link to="/Secant"/>Secant</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span><b style={{fontSize:"1.3em"}}>Linear Equations</b></span>
                        }
                    >
                        
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span><b style={{fontSize:"1.3em"}}>Iterpolation</b></span>
                        }
                    >
                        
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span><b style={{fontSize:"1.3em"}}>Integration</b></span>
                        }
                    >
                        
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        title={
                            <span><b style={{fontSize:"1.3em"}}>Diff</b></span>
                        }
                    >
                       
                    </SubMenu>
                </Menu>               
            </div>
        )
    }
}