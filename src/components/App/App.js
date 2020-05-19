import React, { Component, Fragment } from 'react';
import {Route, Switch} from 'react-router-dom';
import BuildPage from '../../routes/BuildPage/BuildPage';
import HomePage from '../../routes/HomePage/HomePage';
import LandingPage from '../../routes/LandingPage/LandingPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import ShareSetPage from '../../routes/ShareSetPage/ShareSetPage';
import ShareTeamPage from '../../routes/ShareTeamPage/ShareTeamPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import apiService from '../../services/apiService';
import jwtDecode from 'jwt-decode';
import showdownParse from '../../functions/parse';
import './App.css';




export default class App extends Component {
  state = {
    userFolders: [{
      "id": 2,
      "folder_name": "Infinite Showcase - OU",
      "user_id": 1,
      "date_created": "2020-05-17T17:55:49.995Z",
      "date_modified": null
  }],
    userTeams: [{
      "id": 1,
      "folder_name": "Infinite Showcase - OU",
      "user_id": 1,
      "user_name": "test", // you need to join this column to your current api in server
      "likes": 21, // you need to join this column to your current api in server
      "date_created": "2020-05-17T17:55:49.995Z",
      "date_modified": null,
      "team_name": "Darkrai's revenge",
      "folder_id": 2,
      "description": "A team using Mega Darkrai"
  }],
    userSets: [{
      "id": 2,
      "folder_name": "Infinite Showcase - OU",
      "user_id": 1,
      "user_name": "test", // you need to join this column
      "date_created": "2020-05-17T17:55:49.995Z",
      "date_modified": null,
      "team_name": "Darkrai's revenge",
      "folder_id": 2,
      "description": "A team using Mega Darkrai",
      "nickname": null,
      "species": "Darkrai",
      "gender": null,
      "item": "Darkraite",
      "ability": "Bad Dreams",
      "level": 100,
      "shiny": true,
      "happiness": 255,
      "nature": "Timid",
      "hp_ev": 0,
      "atk_ev": 0,
      "def_ev": 0,
      "spa_ev": 252,
      "spd_ev": 4,
      "spe_ev": 252,
      "hp_iv": 31,
      "atk_iv": 31,
      "def_iv": 31,
      "spa_iv": 31,
      "spd_iv": 31,
      "spe_iv": 31,
      "move_one": "Perdition's Pyre",
      "move_two": "Dark Void",
      "move_three": "Nasty Plot",
      "move_four": "Dark Pulse",
      "team_id": 1
  }],
    publicTeams: [],
    publicSets: [],
    //folders-user
    folderAddClicked: false,
    currentClickedFolder: {value: '', touched: false},
    newFolderName: {value: '', touched: false},
    //teams-user
    teamAddClicked: false,
    currentClickedTeam: {value: '', touched: false},
    newTeamName: {value: '', touched: false},
    newTeamImport: {value: '', touched: false},
    //sets-teams-user
    teamExpandToggle: true,
    setExpandToggle: true,
    newSetImport: {value: '', touched: false}
  };

  componentDidMount() {
    if (TokenService.getAuthToken()){
      //do an api call to the user folders, teams, sets
    } else {
      // do an api call to the public teams and sets
    }
  }

  // State Input Update Functions 

  // User Folders

  setNewFolderName = newFolderName => {
    this.setState({newFolderName: {value: newFolderName, touched: true}});
  };

  handleFolderAddClickExpand = () => {
    this.setState({folderAddClicked: !this.state.folderAddClicked})
  };

  handleCurrentFolderClicked = (name) => {
    this.setState({currentClickedFolder: {value: name, touched: true}})
  };

  // User Teams

  setNewTeamName = newTeamName => {
    this.setState({newTeamName: {value: newTeamName, touched: true}});
  };

  setNewTeamContents = newTeamImport => {
    this.setState({newTeamImport: {value: newTeamImport, touched: true}});
  }

  handleTeamAddClickExpand = () => {
    this.setState({teamAddClicked: !this.state.teamAddClicked})
  };

  handleCurrentTeamClicked = (name) => {
    this.setState({currentClickedTeam: {value: name, touched: true}})
  };

  // User Sets-Teams

  handleTeamToggle = () => {
    this.setState({teamExpandToggle: !this.state.teamExpandToggle})
  };

  handleSetToggle = () => {
    this.setState({setExpandToggle: !this.state.setExpandToggle})
  };

  setNewSetContents = newSetImport => {
    this.setState({newSetImport: {value: newSetImport, touched: true}});
  }

  // Validate State Functions

  // User Folders

  validateNewFolderName = () => {
    let folder_name = this.state.newFolderName.value;
  };

  // User Teams

  validateNewTeamName = () => {
    let team_name = this.state.newTeamName.value;
  };

  validateNewTeamImport = () => { // something to do later
    let team_import = this.state.newTeamImport.value;
    if(!showdownParse(team_import)){
      return `Make sure that it is formatted properly!`
    }

  };

  validateNewSetImport = () => { // something to do later
    let set_import = this.state.newSetImport.value;
    if(!showdownParse(set_import)){
      return `Make sure that it is formatted properly!`
    }

  };

  // Event Handlers/API Calls -> NOT MADE YET!

  handlePostNewFolder = () => {
    const folder_name = this.state.newFolderName.value;
    apiService.postUserFolder(jwtDecode(TokenService.getAuthToken()).id) // postUserFolder not made yet!
    // do the rest!
  }

  handlePostNewTeam = () => {
    const team_name = this.state.newTeamName.value;
    const contents = this.state.newTeamImport.value;
    const parsed = showdownParse(contents);
    apiService.postUserTeam(jwtDecode(TokenService.getAuthToken()).id) // postNewTeam not made yet!
    // do the rest!
  }

  handleUpdateTeam = (teamname, desc, id) => {
    const team_name = teamname;
    const description = desc;
    const team_id = Number(id)
    apiService.patchUpdateTeam() // patchTeam not made yet
  }

  handleDeleteTeam = (team_id, user_id) => { // deleteTeam not made yet

  }

  handleUpdateSet= (
      id,
      nickname,
      species,
      gender,
      item,
      ability,
      level,
      shiny,
      happiness,
      nature,
      hp_ev,
      atk_ev,
      def_ev,
      spa_ev,
      spd_ev,
      spe_ev,
      hp_iv,
      atk_iv,
      def_iv,
      spa_iv,
      spd_iv,
      spe_iv,
      move_one,
      move_two,
      move_three,
      move_four,
      team_id
  ) => {
    const set_body = {

    }
    apiService.patchUpdateSet() // patchSet not made yet
  }

  handleUpdateSetImport = () => {
    const contents = this.state.newSetImport.value;
    const parsed = showdownParse(contents);
    apiService.patchUpdateSet(jwtDecode(TokenService.getAuthToken()).id) // patchSet not made yet
    // do the rest!
  }

  handleDeleteSet = (team_id, user_id) => { // deleteSet not made yet

  }

  // RENDER
  
  render() {
    return (
      <UserContext.Provider value = {{
        // main database
        // userdata
        userFolders: this.state.userFolders,
        userTeams: this.state.userTeams,
        userSets: this.state.userSets,
        //public data
        publicTeams: this.state.publicTeams,
        publicSets: this.state.publicSets,
        //set states
        // folder set state
        folderAddClicked: this.state.folderAddClicked,
        currentClickedFolder: this.state.currentClickedFolder,
        newFolderName: this.state.newFolderName,
        // team set state
        teamAddClicked: this.state.teamAddClicked,
        currentClickedTeam: this.state.currentClickedTeam,
        newTeamName: this.state.newTeamName,
        newTeamImport: this.state.newTeamImport,
        teamExpandToggle: this.state.teamExpandToggle,
        // set Set state
        setExpandToggle: this.state.setExpandToggle,
        newSetImport: this.state.newSetImport,
        // functions
        // user folder functions
        setNewFolderName: this.setNewFolderName,
        handleFolderAddClickExpand: this.handleFolderAddClickExpand,
        handlePostNewFolder: this.handlePostNewFolder,
        validateNewFolderName: this.validateNewFolderName,
        handleCurrentFolderClicked: this.handleCurrentFolderClicked,
        // user team functions
        setNewTeamName: this.setNewTeamName,
        setNewTeamContents: this.setNewTeamContents,
        handleTeamAddClickExpand: this.handleTeamAddClickExpand,
        handlePostNewTeam: this.handlePostNewTeam,
        validateNewTeamName: this.validateNewTeamName,
        validateNewTeamImport: this.validateNewTeamImport,
        handleCurrentTeamClicked: this.handleCurrentTeamClicked,
        handleTeamToggle: this.handleTeamToggle,
        handleUpdateTeam: this.handleUpdateTeam,
        handleDeleteTeam: this.handleDeleteTeam,
        // user set functions
        handleSetToggle: this.handleSetToggle,
        handleDeleteSet: this.handleDeleteSet,
        handleUpdateSet: this.handleUpdateSet,
        setNewSetContents: this.setNewSetContents,
        validateNewSetImport: this.validateNewSetImport,
        handleUpdateSetImport: this.handleUpdateSetImport,
        
      }}>
        <Fragment>
          <main>
            <Switch>
              <Route
                exact path = {'/'}
                component = {HomePage}/>
              <Route
                exact path = {'/share/:team_id'}
                component = {ShareTeamPage}/>
              <Route
                exact path = {'/share/:team_id/:set_id'}
                component = {ShareSetPage}/>
              <PublicOnlyRoute
                path = {'/landing'}
                component = {LandingPage}/>
              <PrivateRoute
                path={'/build'}
                component={BuildPage}/>
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
        </Fragment>
      </UserContext.Provider>
    );
  };
};




