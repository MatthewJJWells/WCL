import { Character, PVPData, RaiderioData} from './type';

interface SearchDetails {
  server: string;
  realm: string;
  name: string;
}

export default async function apiCalls(searchDetails: SearchDetails): Promise<Character|undefined> {
	let characterData: Character|undefined;
	await fetchRaiderioData(searchDetails)
		.then(rioData => {
			if (rioData) {
				// @ts-ignore
				characterData = {...rioData};
			}
		});
	await fetchPVPData(searchDetails)
		.then(PVPData => {
			if (PVPData) {
				//@ts-ignore
				characterData = {...characterData, ...PVPData};
			}
		});
	console.log(characterData);
	return characterData;
}

async function fetchRaiderioData(searchDetails: SearchDetails): Promise<RaiderioData|undefined> {
	let charData;
	await fetch('https://raider.io/api/v1/characters/profile?region='+searchDetails.server+'&realm='+searchDetails.realm+'&name='+searchDetails.name+'&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%2Craid_progression')
		.then(response => response.json())
		.then(data => charData = data);
	return charData;
}

async function fetchPVPData(searchDetails: SearchDetails): Promise<PVPData|undefined> {
	let token;
	await fetch('https://us.battle.net/oauth/token', {
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: 'Basic ' + process.env.REACT_APP_AUTH_KEY,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		method: 'POST'
	})
		.then(response => response.json())
		.then(data => token = data.access_token);
	let twosData;
	const urlTwos = 'https://'+searchDetails.server+'.api.blizzard.com/profile/wow/character/'+searchDetails.realm+'/'+searchDetails.name+'/pvp-bracket/2v2?namespace=profile-'+searchDetails.server+'&locale=en_US&access_token='+token;  
	await fetch(urlTwos)
		.then(response => response.json())
		.then(data => twosData = data);
	let threesData;
	const urlThrees = 'https://'+searchDetails.server+'.api.blizzard.com/profile/wow/character/'+searchDetails.realm+'/'+searchDetails.name+'/pvp-bracket/3v3?namespace=profile-'+searchDetails.server+'&locale=en_US&access_token='+token;  
	await fetch(urlThrees)
		.then(response => response.json())
		.then(data => threesData = data);
	let rbgData;
	const urlRbg = 'https://'+searchDetails.server+'.api.blizzard.com/profile/wow/character/'+searchDetails.realm+'/'+searchDetails.name+'/pvp-bracket/rbg?namespace=profile-'+searchDetails.server+'&locale=en_US&access_token='+token;  
	await fetch(urlRbg)
		.then(response => response.json())
		.then(data => rbgData = data);
	const pvpData = {
		twos: twosData,
		threes: threesData,
		rbgs: rbgData
	};
	//@ts-ignore
	return pvpData;
}
