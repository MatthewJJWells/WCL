export interface RaiderioData {
  name: string;
  thumbnail_url: string;
  class: string;
  realm: string;
  region: string;
  guild: {name: string};
  gear: {item_level_equipped: number};
  profile_url: string;
  statusCode: string;
  mythic_plus_scores_by_season: [{scores: {all: number}}];
  mythic_plus_best_runs: [{
    dungeon: string;
    mythic_level: number;
  }];
  raid_progression: {'castle-nathria': {summary: string}};
}

export interface PVPData {
  twos: {
    rating: number;
    season_match_statistics: {
      won: number;
      lost: number;
    };
  };
  threes: {
    rating: number;
    season_match_statistics: {
      won: number;
      lost: number;
    };
  };
  rbgs: {
    rating: number;
    season_match_statistics: {
      won: number;
      lost: number;
    };
  };
}

export type Character = RaiderioData & PVPData;