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
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="groupName">Group Name</Label>
          <Input
            type="date"
            value={this.state.groupName}
            name="groupName"
            id="groupName"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="info">Group Info</Label>
          <Input
            type="time"
            value={this.state.info}
            name="info"
            id="info"
            onChange={this.handleInputChange}
          />
        </div>
        <Button type="submit" onClick={this.handleSubmit}>View Results</Button>
      </div>
    )
  }
}

export default connect()(CreateGroup);