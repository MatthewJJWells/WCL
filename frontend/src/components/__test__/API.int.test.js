// import { render } from '@testing-library/react';
// import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
// import Main from '../Main/index';
// import * as raiderMocks from './mocks.RaiderAPI';
// import { fetchRaiderioData } from '../Main/apiCalls';


let container = null;
beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

// Case 1: Test that correct input returns correct data from fetchRaiderioData
it('correctly returns data from fetchRaiderioData', async () => {
	// const raiderdata = await fetchRaiderioData()


});
// Case 2: All the data returned is wrong - how does the site handle the errors? (should display an error page or alert)
// Case 3: The blizzard api returns the wrong data.
// Case 4: The raider api returns the wrong data
// Case 5: The authentication fails and the auth token is not returned
// Case 6: The authentication token in use has expired - does it send a request for a new token and then send the search query?
// Case 7: The user enters an invalid name as a search query
// Case 8: The user enters an invalid server as a search query