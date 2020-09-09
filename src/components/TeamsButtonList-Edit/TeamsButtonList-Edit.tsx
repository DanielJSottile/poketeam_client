import React, { Fragment, useContext } from 'react';
import GeneralContext from '../../contexts/GeneralContext';
import TeamButton from '../TeamButton/TeamButton';
import './TeamsButtonList-Edit.css';

export interface PokemonTeam {
  team_name: string;
  id: number;
  folder_id: number;
}

const TeamsButtonListEdit = (props: any) => {
  const GenCon = useContext(GeneralContext);

  const renderExpanded = () => {
    const {
      newTeamName,
      newTeamImport,
      setNewTeamName,
      setNewTeamContents,
      handlePostNewTeam,
      desc,
      validateDesc,
      setDesc,
      validateNewTeamName,
      validateNewTeamImport,
      validateCurrentFolderClicked,
    } = GenCon;

    return (
      <form>
        <div className="team-name">
          <label htmlFor="foldername">Team Name:</label>
          {
            <p className="error-validate shake-horizontal">
              {validateNewTeamName()}
            </p>
          }
          <input
            placeholder="e.g. My Cool Team"
            type="text"
            name="teamname"
            id="teamname"
            value={newTeamName.value}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
        </div>
        <div className="team-import">
          <label htmlFor="title-content">Description:</label>
          {<p className="error-validate shake-horizontal">{validateDesc()}</p>}
          <textarea
            placeholder="e.g. description"
            name="title-content"
            id="title-content"
            value={desc.value}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="team-import">
          <label htmlFor="team-import">Import Team Set:</label>
          {newTeamImport.value !== '' && (
            <p className="error-validate shake-horizontal">
              {validateNewTeamImport()}
            </p>
          )}
          <textarea
            placeholder="Optionally Import a proper Pokemon Showdown Team Here And It Will Fill Out Your Whole Team!"
            name="team-import"
            id="team-import-1"
            value={newTeamImport.value}
            onChange={(e) => setNewTeamContents(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="submit"
          disabled={
            validateNewTeamName() ||
            validateNewTeamImport() ||
            validateDesc() ||
            validateCurrentFolderClicked()
          }
          onClick={(e) => {
            e.preventDefault();
            handlePostNewTeam();
          }}
        >
          Submit <i className="far fa-check-circle"></i>
        </button>
      </form>
    );
  };

  const {
    userTeams,
    teamAddClicked,
    currentClickedTeam,
    currentClickedFolder,
    handleTeamAddClickExpand,
  } = GenCon;

  const TeamList = userTeams
    .filter(
      (team: PokemonTeam) => team.folder_id === Number(currentClickedFolder.id)
    )
    .map((team: PokemonTeam, i: number) => (
      <TeamButton key={i} id={team.id} team_name={team.team_name} />
    ));

  return (
    <Fragment>
      <section className="folders-list">
        <h3>Teams:</h3>
        <div>
          {currentClickedFolder.value && TeamList.length > 0 ? (
            TeamList
          ) : !currentClickedFolder.value ? (
            <h3>Create or Click On a Folder to Get Started!</h3>
          ) : (
            <h3>This Folder is Empty! Make New Teams Below!</h3>
          )}
        </div>
        <div>
          {currentClickedFolder.value && (
            <button onClick={() => handleTeamAddClickExpand()}>
              New Team <i className="far fa-plus-square"></i>
            </button>
          )}

          {teamAddClicked ? renderExpanded() : null}
        </div>
        <div>
          {currentClickedFolder.value && (
            <span>{`Current Team: ${currentClickedTeam.value}`}</span>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default TeamsButtonListEdit;
