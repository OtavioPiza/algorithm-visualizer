import React from 'react';
import '../styles/components/Bar.css';
import bar from '../styles/components/icons/bar-gray.svg';
import analyzedBar from '../styles/components/icons/bar-analyzed-orange.svg';
import selectedBar from '../styles/components/icons/bar-selected-blue.svg';
import sortedBar from '../styles/components/icons/bar-sorted-green.svg';
import lockedBar from '../styles/components/icons/bar-light.svg';

/**
 * React component representing a bar from an arrays
 *
 * @param {
 *  className:      overwrites the default className
 *  id:             provides the id of the bar (use position in array)
 *  size:           sets the size of the bar
 *  selected:       informs wheter the bar is selected by the unsorted
 *  sorted:         informs wheter the bar is on a sorted (1) unsorted (0) or reversed (-1) array
 *  eventHandler:   provides a handler for an onClick event
 * } param0
 * @returns a button that represents a bar in an array
 */
const Bar = ({className, id, size, status, simplified, eventHandler}) => {
  /**
     * Selects a background for the bar depending on its state
     */
  const background =
        status === 1 ? `url(${selectedBar})` :
           status === 2 ? `url(${analyzedBar})` :
            status === 3 ? `url(${sortedBar})` :
              status === 4 ? `url(${lockedBar})` :
                `url(${bar})`;

  /**
     * Determines the style of the bar depending on its state
     */
  const style = {
    margin: `${simplified ? '0' : '1%'}`,
    padding: '0',
    border: '0',
    width: '10%',
    height: size + '%',

    backgroundImage: background,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${simplified ? '500% 500%' : '100% 100%'}`,
    backgroundPosition: 'center',
  };

  // == HTML ====================================================================================================== //

  return (
    <button className={ className === undefined ? 'Bar' : className } id={ id }
      style={ style } onClick={ () => eventHandler(id) }>
    </button>
  );
};

export default Bar;
