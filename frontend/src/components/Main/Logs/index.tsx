import React from 'react';
import './styles.css';
import { Character } from '../type';

const Logs: React.FC<{character: Character}>= ({character}) => {
  
  return (
    <div className='logs-overall'>
      <p className='raidprog-title'>Raid Progression</p>
      {character.raid_progression && <p className='prog'>{character.raid_progression['castle-nathria'].summary}</p>}
    </div>
  );
};
export default Logs;