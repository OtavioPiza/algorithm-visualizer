import React from 'react'
import '../styles/components/BottomBar.css'

const BottomBar = ({ className }) => (
    <footer className={ className === undefined ? 'BottomBar' : className }/>
)

export default BottomBar