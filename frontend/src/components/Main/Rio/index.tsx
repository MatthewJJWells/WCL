import React from 'react';
import './styles.css';
import {Character} from '../type'

const Rio: React.FC<{character: Character}>= ({character}) => {
  return(
    <div>
      <p className='rio-title'>Raider.io</p> 
      <p className='overall-score'>Overall Score: {character.mythic_plus_scores_by_season.map(data => (data.scores.all))}</p>
      <p className='bk-title'>Best Keys</p>
      <div className='best-keys'>
        {character.mythic_plus_best_runs.map(data => (<p key={data.dungeon}>{data.dungeon}: {data.mythic_level}</p>))}
      </div>
    </div>
  );
}
export default Rio;