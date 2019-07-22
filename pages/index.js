import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../components/Page'
import PropTypes from 'prop-types'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  minWidth: 800,
}

class Index extends Component {
  static getInitialProps({store, isServer, pathname, query}) {
    store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
    return {custom: 'custom'}; // you can pass some custom props to component from here
  }

  render () {
    return (<div id='app' style={layoutStyle}>
      <Page />
      {/* FIXME: remove following. shows how to use */}
      <div>Prop from Redux {this.props.foo}</div>
      <div>Prop from getInitialProps {this.props.custom}</div>
    </div>);
  }
}

Index.propTypes = {
  foo: PropTypes.string.isRequired,
  custom: PropTypes.string.isRequired,
};

export default connect(state => state)(Index)
