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
  data: Info[]
}
interface IProps{
}
interface Info{
    test1:string;
    test2:string;
}
class CreateGroup extends React.Component<IProps,IState>{
  constructor(props:any){
    super(props);
    this.state={
      data: [{test1: "hello", test2: "hh"}, {test1: "new", test2: "hhhhh"}]
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event:any){
  }

  handleSubmit(event:any){
  
    event.preventDefault();
  }

  render(){
    return(
      <div style={{marginTop: "2rem"}}>
        {this.state.data.map((data, index) => <p key={index}>{data.test1} : {data.test2}</p>)}
        </div>
    )
  }
}

export default CreateGroup;