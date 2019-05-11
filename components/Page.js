import Header from './Header'
import Content from "./Content";
import React from "react";

const Page = props => (
   <div>
      <Header />
      <Content />
      {props.children}
   </div>
);

export default Page