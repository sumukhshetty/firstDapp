import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'


var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var peopleContractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}]
var peopleContractAddress = '0xf481264b6462c9af2f62e5d58ac8203ada1fdcc2'

var peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress)
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }
  componentWillMount() {
 var data=peopleContract.getPeople()
 this.setState({
   firstNames: String(data[0]).split(','),
   lastNames: String(data[1]).split(','),
   ages: String(data[2]).split(',')

 })
  }
  render() {
    var TableRows = []
    _.each(this.state.firstNames, (value, index) => {
      TableRows.push(
        <tr>
        <td>{this.state.firstNames[index]}</td>
        <td>{this.state.lastNames[index]}</td>
        <td>{this.state.ages[index]}</td>
        </tr>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to my first Dapp</h2>
        </div>
        <div className="App-content" >

      <table>
      <thead>
      <tr>
      <th> First Name {this.state.firstNames[0]} </th>
      <th> Last Name {this.state.lastNames[0]}</th>
      <th> Age {this.state.ages[0]}</th>
      </tr>
      </thead>
      <tbody>

      </tbody>
      </table>
      </div>
          </div>
    );
  }
}

export default App;
