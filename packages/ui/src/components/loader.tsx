/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import React from 'react';
import './loader.css';

export default function Loader() {
  return (
    <div className='loading' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
