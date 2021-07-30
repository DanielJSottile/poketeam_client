import React, { useContext, useState, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faFolderPlus,
  faShareSquare,
  faDownload,
  faEdit,
  faTrashAlt,
  faClipboard,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import Folder from '../Folder/Folder';
import Input from '../Input/Input';
import TextArea from '../TextArea';
import Button from '../Button';
import LazyLoader from '../Loaders/LazyLoader';
import DeleteExpand from '../DeleteExpand';
import GeneralContext from '../../contexts/GeneralContext';
import showdownFolderGenerate from '../../utils/generateFolder';
import {
  validateNewFolderImport,
  validateNewFolderName,
} from '../../utils/validations';
import { useClipboard } from '../../utils/customHooks';
import styles from './FoldersList.module.scss';
import { PokemonFolder } from '../../@types';

const FoldersList: FunctionComponent = () => {
  const {
    userFolders,
    userTeams,
    userSets,
    folderAddClicked,
    currentClickedFolder,
    setFolderAddClicked,
    newFolderName,
    newFolderImport,
    setNewFolderImport,
    handlePostNewFolder,
    setNewFolderName,
    handleEditFolder,
    setCurrentClickedFolder,
    handleDeleteFolder,
  } = useContext(GeneralContext);

  const [editClicked, setEditClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { copySuccess, textArea, copyCodeToClipboard } = useClipboard();

  const handleEditExpand = () => {
    setDeleteClicked(false);
    setEditClicked(!editClicked);
  };

  const handleDeleteExpand = () => {
    setEditClicked(false);
    setDeleteClicked(!deleteClicked);
  };

  const deleteSuccess = () => toast.success('Folder Deleted!');

  /* --------------------- */

  /* Set Up Common Definitions to be 
  Used in Different views */

  const folderList = userFolders.map((folder: PokemonFolder, i) => {
    return <Folder key={i} id={folder.id} folder_name={folder.folder_name} />;
  });

  const folderTeams = userTeams.filter(
    (team) => team.folder_id === Number(currentClickedFolder.id)
  );

  const input = folderTeams.map((team) => {
    const teamSets = userSets.filter((set) => set.team_id === team.id);
    const teamName: string = team.team_name;
    return { [teamName]: teamSets };
  });

  const renderExpanded = (): JSX.Element => {
    return (
      <form>
        <div>
          <Input
            inputHasError
            htmlFor="foldername"
            label="Folder Name:"
            validationCallback={() => validateNewFolderName(newFolderName)}
            placeholder="e.g. Good Teams"
            type="text"
            name="foldername"
            id="foldername"
            value={newFolderName.value}
            onChangeCallback={(e) =>
              setNewFolderName({ value: e.target.value, touched: true })
            }
          />
          <TextArea
            containerClass={styles['folder-import']}
            textAreaHasError
            isError={!!newFolderImport.value.length}
            validationCallback={() => validateNewFolderImport(newFolderImport)}
            htmlFor="folder-import"
            label="Import Showdown Folder:"
            placeholder="Optionally Import a proper Pokemon Showdown Folder Here And It Will Fill Out The Entire Folder!"
            name="folder-import"
            id="team-import-1"
            value={newFolderImport.value}
            onChangeCallback={(e) =>
              setNewFolderImport({ value: e.target.value, touched: true })
            }
          />
        </div>
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={
            !!validateNewFolderName(newFolderName) ||
            (!!validateNewFolderImport(newFolderImport) &&
              !!newFolderImport.value)
          }
          onClickCallback={(e) => {
            e.preventDefault();
            handlePostNewFolder();
          }}
        >
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </form>
    );
  };

  const renderEditExpand = (): JSX.Element => {
    return (
      <form>
        <Input
          inputHasError
          htmlFor="foldername"
          label="Edit Folder Name:"
          validationCallback={() => validateNewFolderName(newFolderName)}
          placeholder="e.g. Good Teams"
          type="text"
          name="foldername"
          id="foldername"
          value={newFolderName.value}
          onChangeCallback={(e) =>
            setNewFolderName({ value: e.target.value, touched: true })
          }
        />
        <Button
          type="submit"
          buttonClass={styles['submit']}
          disabled={!!validateNewFolderName(newFolderName)}
          onClickCallback={(e) => {
            e.preventDefault();
            handleEditFolder();
            handleEditExpand();
            setCurrentClickedFolder({
              value: newFolderName.value,
              id: currentClickedFolder.id,
              touched: true,
            });
            setNewFolderName({ value: '', touched: false });
          }}
        >
          Submit <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </form>
    );
  };

  return (
    <>
      <section className={styles['folders-list']}>
        <h3>Folders:</h3>
        <span>{`Current Folder: ${currentClickedFolder.value}`}</span>
        <div className={styles['folders']}>
          {folderList.length > 0 ? (
            folderList
          ) : (
            <LazyLoader
              containerClass={styles['pokeball-div']}
              messageClass={styles['hint']}
              message={'(Hint: There May Be No Folders! Click Below to Start!)'}
            />
          )}
        </div>
        <div>
          <Button
            onClickCallback={() => setFolderAddClicked(!folderAddClicked)}
            buttonClass={styles['add-folder-button']}
          >
            {folderAddClicked ? (
              <span>
                Cancel <FontAwesomeIcon icon={faBan} />
              </span>
            ) : (
              <span>
                New Folder <FontAwesomeIcon icon={faFolderPlus} />
              </span>
            )}
          </Button>
          {folderAddClicked && renderExpanded()}
        </div>
        <div>
          {currentClickedFolder.value && (
            <div>
              <div className={styles['export-folder']}>
                <div>
                  <div className={styles['buttons']}>
                    <div className={styles['inner-buttons']}>
                      <label
                        htmlFor="export-folder"
                        className={styles['label']}
                      >
                        Export Folder: <FontAwesomeIcon icon={faDownload} />
                      </label>
                      <Button
                        onClickCallback={() => {
                          copyCodeToClipboard();
                          copySuccess();
                        }}
                        buttonClass={styles['copy-text-button']}
                      >
                        Copy Text <FontAwesomeIcon icon={faClipboard} />
                      </Button>
                    </div>
                    <div className={styles['inner-buttons']}>
                      <Link
                        className={styles['share-link']}
                        to={{
                          pathname: `/share/user/folder/${currentClickedFolder.id}`,
                          state: {
                            folders: userFolders,
                            teams: userTeams,
                            sets: userSets,
                            input: input,
                          },
                        }}
                        target="_blank"
                      >
                        Share This Folder!{' '}
                        <FontAwesomeIcon icon={faShareSquare} />
                      </Link>

                      <Input
                        inputHasError={false}
                        inputClass={styles['share-input']}
                        disabled
                        type="text"
                        readOnly
                        value={`poketeams.now.sh/share/user/folder/${currentClickedFolder.id}`}
                      />
                    </div>
                  </div>
                </div>

                <TextArea
                  textAreaHasError={false}
                  ref={textArea}
                  disabled
                  readOnly
                  name="export-folder"
                  id={`export-folder-${currentClickedFolder.id}`}
                  value={showdownFolderGenerate(
                    currentClickedFolder.value,
                    input
                  )}
                />
              </div>
              <Button
                onClickCallback={() => handleEditExpand()}
                buttonClass={styles['edit']}
              >
                {editClicked ? (
                  <span>
                    Cancel <FontAwesomeIcon icon={faBan} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </span>
                )}
              </Button>
              <Button
                onClickCallback={() => handleDeleteExpand()}
                buttonClass={styles['delete']}
              >
                {deleteClicked ? (
                  <span>
                    Cancel <FontAwesomeIcon icon={faBan} />
                  </span>
                ) : (
                  <span>
                    Delete <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                )}
              </Button>
            </div>
          )}
        </div>
        <div>
          {editClicked && renderEditExpand()}
          {deleteClicked && (
            <DeleteExpand
              message={"Are You Sure You'd Like to Delete this Folder?"}
              yesCallback={() => {
                handleDeleteFolder();
                handleDeleteExpand();
                deleteSuccess();
              }}
              noCallback={() => handleDeleteExpand()}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default FoldersList;
