import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {} from './timerSlice';
import styles from './Timer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Timer() {
  

  return (
    <div>
      <div className="container">
        <div className="row">

        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <h2>Break Length</h2>
            </div>
            <div className="row">
              <FontAwesomeIcon icon={[fa, 'arrow-down']}></FontAwesomeIcon>
            </div>
          </div>
          <div className="col-6">

          </div>
        </div>
        <div className="row">

        </div>
        <div className="row">

        </div>
      </div>
    </div>
  );
}
