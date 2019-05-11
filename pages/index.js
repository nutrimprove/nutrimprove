import Layout from '../components/Layout';
import NavBar from "../components/NavBar";
import React, { Component } from "react";

const layoutStyle = {
   margin: 20,
   padding: 20,
   border: '1px solid #DDD',
   minWidth: 800,
};

class Index extends Component {
   render() {
      return (
         <div id='main' style={layoutStyle}>
            <Layout/>
            <NavBar />
         </div>
      );
   };
}

export default Index;
