import React from 'react';
import { Character } from '../type'
import './styles.css';

const PVP: React.FC<{character: Character}> = ({character}) => {
  const twos = character.twos;
  const threes = character.threes;
  const rbgs = character.rbgs;

  return (
    <div>
      <p className='pvp-title'>PVP Rating</p>
      <div className='raitings'>
        <div className='2v2'>
          <p>2v2 Rating: {twos.rating}</p>
          {twos.season_match_statistics && <p>Wins: {twos.season_match_statistics.won} Losses: {twos.season_match_statistics.lost}</p>}
        </div>
        <div className='3v3'>
          <p>3v3 Rating: {threes.rating}</p>
          {threes.season_match_statistics &&<p>Wins: {threes.season_match_statistics.won} Losses: {threes.season_match_statistics.lost}</p>}
        </div>
        <div className='rbg'>
          <p>RBGs Rating: {rbgs.rating}</p>
          {rbgs.season_match_statistics &&<p>Wins: {rbgs.season_match_statistics.won} Losses: {rbgs.season_match_statistics.lost}</p>}
        </div>
      </div>
    </div>
  );
};

export default PVP;