import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Cascader , Input , Button , Table , Switch  } from 'antd';
import { parse } from 'mathjs';
import axios from 'axios';

export default class Secant extends Component
{
  constructor(props)
    {
        super(props);
        this.state={
            proptions:[],
            Eq:null,
            Xinitial:null,
            Xinitialminus1:null,
            result:null,
            dataTable:[]
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:8080/show_Secant.php')//Docker//
        // axios.get('http://localhost/NumericalProject/server/show_Secant.php')
        .then(res=>{
            console.log(res.data);
            let item =[];
            let optionsArr = [];
            res.data.map(dataMap=>{
                let optionsObj = {};
                if(dataMap.EQ_Type==="Secant")
                {
                    item = item.concat(dataMap.EQ_Name);
                    optionsObj.value = dataMap.EQ_Name;
                    optionsObj.label = dataMap.EQ_Name;
                    optionsArr.push(optionsObj);
                    console.log(optionsObj);
                }
            })
            this.setState({
                options:optionsArr
            })
        })
    }

    Equet = (EqForSloveFuntion,xvalueforSlove) => {
   
      const NodeEqua = parse(EqForSloveFuntion); 
      const Equa = NodeEqua.compile();     
      let scope = {
          x:xvalueforSlove
      }
      return Equa.eval(scope);
       
  }
  
  err = (xmold, xmnew) => {
      var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) ;
      return er;
  }
  
  getValue = () => {
      const {Eq,Xinitial,Xinitialminus1} = this.state;
      var xi_inmain = parseFloat(Xinitial);
      var xi_minus1_inmain = parseFloat(Xinitialminus1);
      var xi_plus1;
      var fpx_inmainValue;
      let tableArrData = [];
      var errorValue = 1;
      var fixerrorValue = 0.0001;
      var i=0;
      while(errorValue>=fixerrorValue)
      {
        xi_plus1=xi_inmain-((this.Equet(Eq,xi_inmain)*(xi_minus1_inmain-xi_inmain))/(this.Equet(Eq,xi_minus1_inmain)-this.Equet(Eq,xi_inmain)));
        errorValue=this.err(xi_plus1,xi_inmain);


          let tableObjData = {};
          tableObjData.index = i;
          tableObjData.xi_plus1 = xi_plus1;
          tableObjData.errorValue = errorValue;
          tableArrData.push(tableObjData);
          // var row = table.insertRow(i);
  
          // var cel0 = row.insertCell(0);
          // var cel1 = row.insertCell(1);
          // var cel2 = row.insertCell(2);
          
          
  
          // cel0.innerHTML = i;
          // cel1.innerHTML = xi_plus1;
          // cel2.innerHTML = errorValue;
          
          
  
          console.log("Secant XiVALUE = ", xi_plus1);
          console.log("This is errorvalue = ", errorValue);
          console.log("This is fixvalueerror = ", fixerrorValue);
          xi_inmain=xi_plus1;
          i++;
      }
      this.setState({
        dataTable:tableArrData,
        result:xi_plus1
      })
  }

  EquationSecant = () =>{
    const formData = new FormData();
    formData.append("EqName",this.state.Eq);
    formData.append("EqType","OnePoint");
    formData.append("EqDiff","");
    const config = {
      headers: {
          "content-type": "multipart/form-data"
          }
      };
    axios.post('http://localhost:8080/add_equation.php',formData,config)
    // axios.post('http://localhost/NumericalProject/server/add_equation.php',formData,config)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
       throw err 
    })
  }

  showResult=()=>{
    const columns = [
      {
        title: 'No',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'X',
        dataIndex: 'xi_plus1',
        key: 'xi_plus1',
      },
      {
        title: 'Error',
        dataIndex: 'errorValue',
        key: 'errorValue',
      },
    ];
    if(this.state.result!==null)
    {
      return <div>
        <h5>This is Result of One-Point Iteration : {this.state.result}</h5><br/>
        <Table dataSource={this.state.dataTable} columns={columns} rowKey="Index" style={{marginLeft:"5%" , marginRight:"5%" , background:"lightblue" }} size="middle"/>
      </div>

    }
  }

  onChangeSwitch = (checked) => {
    console.log(checked)
    this.setState({
      SwitchOpen:checked
    })
  }

  showInput = () =>{
    if(this.state.SwitchOpen){
      return <div>
      <Input placeholder="Input Equations" style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Eq:e.target.value})}/>
      <Button onClick={this.EquationSecant} style={{marginBottom:"0.5%", backgroundColor:"lightblue"}}>Add Equation</Button>
    </div>
    }
    else{
      return <Cascader
      options={this.state.options}
      expandTrigger="hover"
      displayRender={this.displayRender}
      onChange={this.onChange}
      style={{width:"13em" , marginLeft:"7%" , marginRight:"5%" , marginBottom:"0.5%"}}
      />
    }
  }

    onChange = (value) => {
      console.log(value[0]);
      this.setState({
        Eq:value[0]
      })
    }
    
    // Just show the latest item.
    displayRender = (label) => {
      return label[label.length - 1];
    }

  render() {
    return (
      <div>
        <Header/>
          <br/>
          <p>
            <h1>Secant</h1>
            <h5>Select Function</h5>
            <h5>Open Input Manual : <Switch onChange={this.onChangeSwitch} style={{margin:"1%"}}/></h5>
            <div>
              {this.showInput()}
            </div>
          </p>
          <p>
          <span>Input X1</span>        
            <Input placeholder="Input X1" style={{width:"20em" , marginLeft:"1%" , marginRight:"5%" , marginBottom:"0.5%"}} onChange={e=>this.setState({Xinitial:e.target.value})}/>
            <br/>
            <span>Input X2</span>       
            <Input placeholder="Input X2" style={{width:"20em" , marginLeft:"1%" , marginRight:"5%" , marginTop:"0.5%"}} onChange={e=>this.setState({Xinitialminus1:e.target.value})}/>
          </p>
          <p>
            <Button onClick={this.getValue}>Submit</Button>
          </p>
          <br/>
          {this.showResult()}
        <Footer/>
      </div>
    )
  }

}

