import PropTypes from 'prop-types';
import React from 'react';

const Spinner = function Spinner({ className }) {
  return (
    <div className={className}>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
