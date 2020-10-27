import React, { Fragment } from 'react';
import TeamPublicShare from '../Team-Public-Share/Team-Public-Share';
import PokeballLoader from '../Loaders/PokeballLoader/PokeballLoader';
import LoadingBlack from '../Loaders/LoadingBlack/LoadingBlack';
import './TeamList-PublicShare.scss';

// Interfaces

export interface PokemonTeam {
  team_name: string;
  id: number;
  folder_id: number;
}

// Component

const TeamListPublicShare = (props: any) => {
  // Set Common Definitions/Props

  // TODO: This probably needs work

  const { teams, sets } = props;
  let TeamList = [];

  if (teams) {
    TeamList = teams?.map((team: PokemonTeam, i: number) => {
      let teamSets = [];

      teamSets = sets?.filter((set: any) => {
        return set.team_name === team.team_name;
      });

      return (
        <TeamPublicShare
          key={i}
          id={`${team.team_name}`}
          team={team}
          sets={teamSets}
        />
      );
    });
  }

  // Final Render

  return (
    <Fragment>
      {TeamList ? (
        TeamList
      ) : (
        <div className="pokeball-div">
          <PokeballLoader />
          <LoadingBlack />
          <h3 className="hint">(Hint: There May Be No Teams)</h3>
        </div>
      )}
    </Fragment>
  );
};

export default TeamListPublicShare;
