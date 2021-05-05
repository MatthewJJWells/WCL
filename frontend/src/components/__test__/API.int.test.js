import { fetchRaiderioData, urlFunction } from '../Main/apiCalls';
import * as mockCharacterData from './mocks.RaiderAPI.json';
import * as mockRealmError from './mockRealmError.json';
import * as mockNameError from './mockNameError.json';
import * as mockGameData from './mocks.BlizzardAPI.json';

require('jest-fetch-mock').enableMocks();

//Case 1: Test whether data shows up in conmponent defined by search parameters
describe('fetchRaideriodata tests', () => {
	it('Provided the correct data, the function returns a character object', () => {
		fetch.mockOnce(JSON.stringify(mockCharacterData));
		fetchRaiderioData({
			server:'eu',
			realm:'tarren-mill',
			name:'airling'
		})
			.then(res => {
				expect(res).toEqual(mockCharacterData);
			})
			.catch(error => console.error(error));
	});

	it('Provided an incorrect realm or name, returns an error response object', () => {
		fetch.mockOnce(JSON.stringify(mockRealmError));
		fetchRaiderioData({
			server:'eu',
			realm:'wrongrealmname',
			name:'airling'
		})
			.then(res => {
				expect(res.message).toContain('Failed to find realm');
			})
			.catch(error => console.error(error));
		fetch.mockOnce(JSON.stringify(mockNameError));
		fetchRaiderioData({
			server:'eu',
			realm:'tarren-mill',
			name:'invalidname'
		})
			.then(res => {
				expect(res.message).toBe('Could not find requested character');
			})
			.catch(error => console.error(error));
	});

	it('Creates the right url provided the searchDetails parameter', () => {
		fetch.mockOnce(JSON.stringify(mockCharacterData));
		fetchRaiderioData({
			server: 'eu',
			realm: 'tarren-mill',
			name: 'airling'
		});
		expect(fetch).toHaveBeenCalledWith('https://raider.io/api/v1/characters/profile?region=eu&realm=tarren-mill&name=airling&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%2Craid_progression');
	});

	it ('Creates the right url provided the searchDetails, token and pvpType parameters', () => {
		fetch.mockOnce(JSON.stringify(mockGameData));
		urlFunction({server: 'eu', realm: 'tarren-mill', name: 'airling'}, 'fliggleflop', '2v2');
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('https://eu.api.blizzard.com/profile/wow/character/tarren-mill/airling/pvp-bracket/2v2?namespace=profile-eu&locale=en_US&access_token=fliggleflop');
	});
});

// Case 2: All the data returned is wrong - how does the site handle the errors? (should display an error page or alert)
// Case 3: The blizzard api returns the wrong data.
// Case 4: The raider api returns the wrong data
// Case 5: The authentication fails and the auth token is not returned
// Case 6: The authentication token in use has expired - does it send a request for a new token and then send the search query?
// Case 7: The user enters an invalid name as a search query
// Case 8: The user enters an invalid server as a search query