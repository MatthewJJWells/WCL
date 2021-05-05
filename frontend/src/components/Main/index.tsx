
/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useState} from 'react';
import './styles.css';
import {Character} from './type';
import apiCalls from './apiCalls';
import Rio from './Rio/index';
import PVP from './PVP/index';
import Logs from './Logs/index';
import Error from '../Error/index';

import {Formik} from 'formik';
import * as Yup from 'yup';

const Main: React.FC<{}> = () => {

	const [searchServer, setSearchServer] = useState('eu');
	const [character, setCharacter] = useState<Character>();

	const validationSchema = Yup.object().shape({
		searchRealm: Yup.string().min(3, 'Must be a minimum of 3 characters').required('Must enter a Realm'),
		searchName: Yup.string().min(3, 'Must be a minimum of 3 characters').required('Must enter a Name')
	});

	function handleChangeServer(e:{target:{value:string}}) {
		setSearchServer(e.target.value);
	}

	function handleReturn() {
		setCharacter(undefined);
	}

	return (  
		<div className='search-container'>
			<div className='search-box'>
				{!character && <Formik 
					initialValues={{searchName:'', searchRealm:''}} validationSchema={validationSchema} 
					onSubmit={(values,{setSubmitting, resetForm}) => {
						
						apiCalls({
							server: searchServer,
							realm: values.searchRealm,
							name: values.searchName
						})
							.then(data => setCharacter(data));
						setSubmitting(false);
						resetForm();
					}}>
					{({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
						<form className='submit-form' onSubmit={handleSubmit}>
							<p className='server-label'>Search for a Character: </p>
							<select className='server-form' id="servers" onChange={handleChangeServer}>
								<option className='option-eu' value='eu'>Europe</option>
								<option className='option-us' value='us'>United States</option>
							</select>
							<Error touched={touched.searchRealm} message={errors.searchRealm} />
							<input
								id='searchRealm'
								className={touched.searchRealm && errors.searchRealm ? 'has-error':undefined}
								form="text" 
								placeholder='Server name...' 
								onChange={handleChange}
								value={values.searchRealm}
								onBlur={handleBlur}>
							</input>
							
							<Error touched={touched.searchName} message={errors.searchName} />
							<input 
								id='searchName'
								className={touched.searchRealm && errors.searchRealm ? 'has-error':undefined} 
								form="text" 
								placeholder='Character name...' 
								value={values.searchName} 
								onChange={handleChange}
								onBlur={handleBlur}>
							</input>
							<button type='submit' className='button' disabled={isSubmitting}>Search</button>
						</form>
					)}</Formik>}

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
