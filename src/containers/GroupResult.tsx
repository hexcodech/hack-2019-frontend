import * as React from "react";
import styled from "styled-components";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { getBackURI } from "../utilities/helpers";
import ReactHeader from "../components/ReactHeader";

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
        <ReactHeader />
        {this.state.data.map((data, index) => <p key={index}>{data.test1} : {data.test2}</p>)}
        </div>
    )
  }
}

export default CreateGroup;