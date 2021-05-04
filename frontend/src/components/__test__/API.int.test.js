import { fetchRaiderioData } from '../Main/apiCalls';
import * as mockData from './mocks.RaiderAPI.json';

require('jest-fetch-mock').enableMocks();

//Case 1: Test whether data shows up in conmponent defined by search parameters
it('First api test', () => {
	fetch.mockOnce(JSON.stringify(mockData));
	fetchRaiderioData({
		server:'eu',
		realm:'tarren-mill',
		name:'airling'
	})
		.then(res => {
			expect(res).toEqual(mockData);
		})
		.catch(error => console.error(error));
});

// Case 2: All the data returned is wrong - how does the site handle the errors? (should display an error page or alert)
// Case 3: The blizzard api returns the wrong data.
// Case 4: The raider api returns the wrong data
// Case 5: The authentication fails and the auth token is not returned
// Case 6: The authentication token in use has expired - does it send a request for a new token and then send the search query?
// Case 7: The user enters an invalid name as a search query
// Case 8: The user enters an invalid server as a search query