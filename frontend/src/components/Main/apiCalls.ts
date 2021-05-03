import { Character, PVPData, MatchStats, SearchDetails, RaiderioData} from './type';

export default async function apiCalls(searchDetails: SearchDetails): Promise<Character|undefined> {
	let characterData: Character|undefined;
	await fetchRaiderioData(searchDetails)
		.then(rioData => {
			if (rioData) {
				// @ts-ignore
				characterData = {...rioData};
			}
		});
	const token = await fetchAuthToken();
	const pvpData: PVPData = {
		twos: await urlFunction(searchDetails, token, '2v2'),
		threes: await urlFunction(searchDetails, token, '3v3'),
		rbgs: await urlFunction(searchDetails, token, 'rbg')
	};
	//@ts-ignore
	return characterData = {...characterData, ...pvpData};
}

async function fetchRaiderioData(searchDetails: SearchDetails): Promise<RaiderioData|undefined> {
	return fetch('https://raider.io/api/v1/characters/profile?region='+searchDetails.server+'&realm='+searchDetails.realm+'&name='+searchDetails.name+'&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%2Craid_progression')
		.then(response => response.json())
		.then(data => data)
		.catch(error => console.error(error));
}

async function fetchAuthToken():Promise<string>{
	return fetch('https://us.battle.net/oauth/token', {
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: 'Basic ' + process.env.REACT_APP_AUTH_KEY,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST'
	})
		.then(response => response.json())
		.then(data => data.access_token)
		.catch(error => console.error(error));
}

async function urlFunction(searchDetails: SearchDetails, token:string, pvpType:string): Promise<MatchStats> {
	const url = `https://${searchDetails.server}.api.blizzard.com/profile/wow/character/${searchDetails.realm}/${searchDetails.name}/pvp-bracket/${pvpType}?namespace=profile-${searchDetails.server}&locale=en_US&access_token=${token}`; 
	return fetch(url)
		.then(response => response.json())
		.catch(error => console.error(error));
}