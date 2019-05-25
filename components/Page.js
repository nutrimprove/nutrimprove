import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import React from 'react'

const Page = props => (
  <div>
    <Header />
    <Content />
    {props.children}
  </div>
)

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Page
