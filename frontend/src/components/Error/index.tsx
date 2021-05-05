import React from 'react';
import './style.css';

const Error = ({touched, message}:any) => {
	if (!touched) {
		return <div className='form-message invalid'>&nbsp;</div>;
	}
	if (message) {
		return <div className='form-message invalid'>{message}</div>;
	}
	return (
		<div className='form-message valid'>valid</div>
	);
};

export default Error;
