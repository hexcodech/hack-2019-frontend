import * as React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { getBackURI } from "../utilities/helpers";

const Input = styled.input`
  display: block;
  border: 1px solid grey;
  border-radius: 4px;
  width: 50%;
  height: 3em;
  &:focus{
    box-shadow: 0 0 10px grey;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 2rem;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  background-color: #239bcf;
  border: 2px solid #145875;
  height: 2rem;
  border-radius: 4px;
  &:hover{
    cursor: pointer;
  }
`;

const client = new ApolloClient({uri: getBackURI()})

interface IState{
  curLoc?:string;
  curDate?:string;
  travelTime?:string;
  arrivalTime?:string
}
interface IProps{}
class Form extends React.Component<IProps,IState>{
  constructor(props:any){
    super(props);
    this.state={
      curLoc: "",
      curDate: "",
      travelTime: "",
      arrivalTime: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event:any){
    this.setState({[event.target.name] : event.target.value})
  }

  handleSubmit(event:any){
    let travelMinutes = +this.state.travelTime;
    let arrivalDate = new Date(this.state.curDate + " " + this.state.arrivalTime)
    
    //travel time in minutes
/*
    client.query({
      query: gql`
        {

        }
      `
    })*/
    event.preventDefault();
  }

  render(){
    return(
      <div style={{marginTop: "2rem"}}>
        <div>
          <Label htmlFor="curLoc">Current Location</Label>
          <Input
            type="text"
            name="curLoc"
            id="curLoc"
            value={this.state.curLoc}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="curDate">Arrival Date</Label>
          <Input
            type="date"
            value={this.state.curDate}
            name="curDate"
            id="curDate"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="arrivalTime">Arrival Time</Label>
          <Input
            type="time"
            value={this.state.arrivalTime}
            name="arrivalTime"
            id="arrivalTime"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="travelTime">Max travel time (min)</Label>
          <Input
            type="text"
            value={this.state.travelTime}
            name="travelTime"
            id="travelTime"
            onChange={this.handleInputChange}
            />
        </div>
        <Button type="submit" onClick={this.handleSubmit}>View Single</Button>
      </div>
    )
  }
}

export default Form;