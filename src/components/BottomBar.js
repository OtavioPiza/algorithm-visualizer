import React from 'react'
import '../styles/components/BottomBar.css'

/**
 * React component representing a BottomBar
 * 
 * @param {String} param class name
 * 
 * @returns {BottomBar} BottomBar
 */
const BottomBar = ({ className }) => (
  <footer className={ className === undefined ? 'BottomBar' : className }/>
)

export default BottomBar