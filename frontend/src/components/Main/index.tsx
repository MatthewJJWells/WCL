/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useState} from 'react';
import './styles.css';
import {Character} from './type';
import apiCalls from './apiCalls';
import Rio from './Rio/index';
import PVP from './PVP/index';
import Logs from './Logs/index';

const Main: React.FC<{}> = () => {

	const [searchName, setSearchName] = useState(''); //'airling'
	const [searchRealm, setSearchRealm] = useState(''); //'tarren-mill'
	const [searchServer, setSearchServer] = useState('eu');
	const [character, setCharacter] = useState<Character>();

	function handleChangeName(e:{target:{value:string}}) {
		setSearchName(e.target.value);
	}

	function handleChangeRealm(e:{target:{value:string}}) {
		setSearchRealm(e.target.value);
	}

	function handleChangeServer(e:{target:{value:string}}) {
		setSearchServer(e.target.value);
	}

	function handleReturn() {
		setCharacter(undefined);
	}

	//  

	function handleSubmit (e:React.SyntheticEvent) {
		e.preventDefault();
		if (!searchName) return alert('No Name');
		apiCalls({
			server: searchServer,
			realm: searchRealm,
			name: searchName
		})
			.then(data => setCharacter(data));
		setSearchName('');
		setSearchRealm('');
	}

	return (
		<div className='search-container'>
			<div className='search-box'>
				{!character && <form className='submit-form' onSubmit={handleSubmit}>
					<p className='server-label'>Search for a Character: </p>
					<select className='server-form' id="servers" onChange={handleChangeServer}>
						<option className='option-eu' value='eu'>Europe</option>
						<option className='option-us' value='us'>United States</option>
					</select>
					<input className='realm-form' form="text" value={searchRealm} placeholder='Server name...' onChange={handleChangeRealm}></input>
					<input className='name-form' form="text" value={searchName} placeholder='Character name...' onChange={handleChangeName}></input>
					<button type='submit' className='button'>Search</button>
				</form>}
				{character &&  <div className='character-details'>
					<img className='image' src={character.thumbnail_url} alt='Character'/>
					<div className='all-charinfo'>
						<div className='character-info'>
							<p className={character.class}>{character.name}  -  {character.realm}  -  {character.class}</p>
						</div>
						<div className='guild-gear'>
							{character.guild && <p className='guild'>{'<'}{character.guild.name}{'>'}</p>}
							{character.gear && <p className='ilvl'>Item Level: {character.gear.item_level_equipped}</p>}
						</div>
					</div>
					<button className='back-button' onClick={handleReturn}>Back to Search</button>
				</div>}
			</div>
			{character && 
      <div className='character-data'>
      	<div className='data-box'>   
      		<Rio character={character}/>
      	</div>
      	<div className='data-box'>
      		<Logs character={character}/>
      	</div>
      	<div className='data-box'>
      		<PVP character={character}/> 
      	</div>
      </div>}
		</div>
	);
};
export default Main;
