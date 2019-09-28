import * as React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import {connect} from "react-redux";
import { gql } from "apollo-boost";
import { getBackURI } from "../utilities/helpers";
import { push } from "connected-react-router";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

const Input = styled.input `
  display: block;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #3F3F3F;
  text-indent: 10px; 
  font-size: 1.5em;
  width: 50%;
  height: 2em;

`;

const Label = styled.label `
  display: block;
  font-size: 1.5rem;
  padding-top: 1.8em;
`;

const Button = styled.button `
  margin-top: 0.5rem;
  font-size: 1rem;
  background-color: #34ace0;
  color: #ffff;
  border: none;
  padding: 1.2rem;
  border-radius: 4px;
  &:hover{
    cursor: pointer;
    background-color: #277FA8;
  }
  &:active{
    background-color: #227093;
  }
`;

const client = new ApolloClient({uri: getBackURI()})

interface IState {
    curLoc?: string;
    curDate?: string;
    travelTime?: string;
    arrivalTime?: string
}
interface IProps{
  selected:string;
  dispatch: ThunkDispatch<void, void, AnyAction>;
}
class Form extends React.Component<IProps, IState> {
    constructor(props : any) {
        super(props);
        this.state = {
            curLoc: "",
            curDate: "",
            travelTime: "",
            arrivalTime: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event : any) {
        this.setState({[event.target.name]: event.target.value})
    }

  handleSubmit(event:any){
    // travel time in seconds
    let travelMinutes = +this.state.travelTime * 60;
    let arrivalDate = new Date(this.state.curDate + " " + this.state.arrivalTime)

    this.props.dispatch(push("/groupInfo"));
  
    event.preventDefault();
  }

  render() {
    return (
      <div style={
        {marginTop: "2rem"}
      }>
        <div>
          <Label htmlFor="curLoc">Current Location</Label>
          <Input type="text" name="curLoc" id="curLoc"
            value={
              this.state.curLoc
            }
            onChange={
              this.handleInputChange
            }/>
        </div>
          <div>
            <Label htmlFor="curDate">Arrival Date</Label>
            <Input type="date"
              value={
                this.state.curDate
              }
              name="curDate"
              id="curDate"
              onChange={
                this.handleInputChange
              }/>
          </div>
          <div>
            <Label htmlFor="arrivalTime">Arrival Time</Label>
            <Input type="time"
              value={
                this.state.arrivalTime
              }
              name="arrivalTime"
              id="arrivalTime"
              onChange={
                this.handleInputChange
              }/>
          </div>
          <div>
            <Label htmlFor="travelTime">Max travel time (min)</Label>
            <Input type="text"
              value={
                this.state.travelTime
              }
              name="travelTime"
              id="travelTime"
              onChange={
                this.handleInputChange
              }/>
          </div>
          <Button
            type="submit"
            onClick={this.handleSubmit}
          >View Single</Button>
          <Button
            type="submit"
            style={{marginLeft: "1rem"}}
            onClick={this.handleSubmit}
          >View Single</Button>
      </div>
    )
  }
}

export default connect()(Form);
