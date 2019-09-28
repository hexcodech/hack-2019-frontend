import * as React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { getBackURI } from "../utilities/helpers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import ReactHeader from "./ReactHeader";

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
  margin-bottom: 1em;
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

interface IState{
  name?:string;
  groupName?:string;
  info?:string;
}
interface IProps{
  dispatch: ThunkDispatch<void, void, AnyAction>;
}
class CreateGroup extends React.Component<IProps,IState>{
  constructor(props:any){
    super(props);
    this.state={
      name: "",
      groupName: "",
      info: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event:any){
    this.setState({[event.target.name] : event.target.value})
  }

  handleSubmit(event:any){
    this.props.dispatch(push("/groupInfo/hello"));
  
    event.preventDefault();
  }

  render(){
    return(
      <div style={{marginTop: "2rem"}}>
      <ReactHeader />
        <div>
          <Input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <Label htmlFor="name">Name</Label>
        </div>
        <div>
          <Input
            type="date"
            value={this.state.groupName}
            name="groupName"
            id="groupName"
            onChange={this.handleInputChange}
          />
          <Label htmlFor="groupName">Group Name</Label>
        </div>
        <div>
          <Input
            type="time"
            value={this.state.info}
            name="info"
            id="info"
            onChange={this.handleInputChange}
          />
          <Label htmlFor="info">Group Info</Label>
        </div>
        <Button type="submit" onClick={this.handleSubmit}>View Results</Button>
      </div>
    )
  }
}

export default connect()(CreateGroup);