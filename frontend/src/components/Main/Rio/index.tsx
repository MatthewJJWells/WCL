import React from 'react';
import './styles.css';
import {Character} from '../type';

const Rio: React.FC<{character: Character}>= ({character}) => {
	return(
		<div className='rio-box'>
			<div className='overall-all'>
				<p className='rio-title'>Raider.io</p> 
				{character.mythic_plus_scores_by_season && <p className='overall-score'>Overall Score: {character.mythic_plus_scores_by_season.map(data => (data.scores.all))}</p>}
			</div>
			<div className='bk-all'>
				<p className='bk-title'>Best Keys</p>
				{character.mythic_plus_scores_by_season && <div className='best-keys'>
					{character.mythic_plus_best_runs.map(data => (
						<div key={data.dungeon} className='dungeon'>
							<p className='individual-dun'>{data.dungeon}:   </p>
							<p className='individual-lvl'>{data.mythic_level}</p>
						</div>
					))}
				</div>}
				<div className='rio-link'>
					<a href={character.profile_url}>Raider.io Page</a>
				</div>
			</div>
		</div>
	);
};
export default Rio;