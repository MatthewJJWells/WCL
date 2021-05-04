import { fetchRaiderioData } from '../Main/apiCalls';

require('jest-fetch-mock').enableMocks();

//Case 1: Test whether data shows up in conmponent defined by search parameters
it('', async () => {
	const mockedRaider = await fetch.mockResponse(() => fetchRaiderioData()
		.then(res => ({ body: res})));
	console.log(mockedRaider);
	// expect (mockedRaider).toEqual()
});

// Case 2: All the data returned is wrong - how does the site handle the errors? (should display an error page or alert)
// Case 3: The blizzard api returns the wrong data.
// Case 4: The raider api returns the wrong data
// Case 5: The authentication fails and the auth token is not returned
// Case 6: The authentication token in use has expired - does it send a request for a new token and then send the search query?
// Case 7: The user enters an invalid name as a search query
// Case 8: The user enters an invalid server as a search query