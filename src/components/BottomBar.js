import React from 'react'
import '../styles/BottomBar.css'

const BottomBar = ({ className }) => (
    <footer className={ className === undefined ? 'BottomBar' : className }/>
)

export default BottomBar