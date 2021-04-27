import React from 'react';
import { Character } from '../type';
import './styles.css';

const PVP: React.FC<{character: Character}> = ({character}) => {
	const twos = character.twos;
	const threes = character.threes;
	const rbgs = character.rbgs;

	return (
		<div className='pvp-overall'>
			<p className='pvp-title'>PVP Rating</p>
			<div className='ratings'>
				<div className='twos'>
					<p className='twos-rating'>2v2 Rating: {twos.rating}</p>
					{twos.season_match_statistics && <p className='2v2-w/l'>Wins: {twos.season_match_statistics.won} Losses: {twos.season_match_statistics.lost}</p>}
				</div>
				<div className='threes'>
					<p className='threes-rating'>3v3 Rating: {threes.rating}</p>
					{threes.season_match_statistics &&<p className='3v3-w/l'>Wins: {threes.season_match_statistics.won} Losses: {threes.season_match_statistics.lost}</p>}
				</div>
				<div className='rbgs'>
					<p className='rbg-rating'>RBGs Rating: {rbgs.rating}</p>
					{rbgs.season_match_statistics &&<p  className='rbg-w/l'>Wins: {rbgs.season_match_statistics.won} Losses: {rbgs.season_match_statistics.lost}</p>}
				</div>
			</div>
		</div>
	);
};

export default PVP;