import React, {
  Fragment,
  useContext,
  useState,
  FunctionComponent,
} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faUpload,
  faCheckCircle,
  faSave,
  faShareSquare,
  faDownload,
  faTrashAlt,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../Input';
import TextArea from '../TextArea';
import Image from '../Image';
import Button from '../Button';
import LoadingSets from '../Loaders/LoadingSets';
import GeneralContext from '../../contexts/GeneralContext';
import showdownGenerate from '../../utils/generate';
import showdownParse from '../../utils/parse';
import legality from '../../utils/legality';
import {
  validateNewSetImport,
  validateSpecies,
  validateNickname,
  validateItem,
  validateAbility,
  validateShiny,
  validateGender,
  validateLevel,
  validateNature,
  validateHappiness,
  validateEvs,
  validateIvs,
  validateMoves,
} from '../../utils/validations';
import { useClipboard } from '../../utils/customHooks';
import styles from './Set-Edit.module.scss';
import { PokemonSet } from '../../@types';

type SetEditProps = {
  /** Pokemon Set */
  set: PokemonSet;
};

const SetEdit: FunctionComponent<SetEditProps> = ({ set }) => {
  const {
    newSetImport,
    setNewSetImport,
    handleUpdateSetImport,
    handleUpdateSet,
    handleDeleteSet,
  } = useContext(GeneralContext);

  const [nickname, setNickname] = useState({
    value: set?.nickname || '',
    touched: false,
  });
  const [species, setSpecies] = useState({
    value: set?.species || 'Pikachu',
    touched: false,
  });
  const [gender, setGender] = useState({
    value: set?.gender || '',
    touched: false,
  });
  const [shiny, setShiny] = useState({
    value: set?.shiny || false,
    touched: false,
  });
  const [item, setItem] = useState({ value: set?.item || '', touched: false });
  const [ability, setAbility] = useState({
    value: set?.ability || '',
    touched: false,
  });
  const [level, setLevel] = useState({
    value: set?.level || 100,
    touched: false,
  });
  const [happiness, setHappiness] = useState({
    value: set?.happiness || 255,
    touched: false,
  });
  const [nature, setNature] = useState({
    value: set?.nature || '',
    touched: false,
  });
  const [hpEv, setHpEv] = useState({ value: set?.hp_ev || 0, touched: false });
  const [atkEv, setAtkEv] = useState({
    value: set?.atk_ev || 0,
    touched: false,
  });
  const [defEv, setDefEv] = useState({
    value: set?.def_ev || 0,
    touched: false,
  });
  const [spAEv, setSpAEv] = useState({
    value: set?.spa_ev || 0,
    touched: false,
  });
  const [spDEv, setSpDEv] = useState({
    value: set?.spd_ev || 0,
    touched: false,
  });
  const [speEv, setSpeEv] = useState({
    value: set?.spe_ev || 0,
    touched: false,
  });
  const [hpIv, setHpIv] = useState({ value: set?.hp_iv || 31, touched: false });
  const [atkIv, setAtkIv] = useState({
    value: set?.atk_iv || 31,
    touched: false,
  });
  const [defIv, setDefIv] = useState({
    value: set?.def_iv || 31,
    touched: false,
  });
  const [spAIv, setSpAIv] = useState({
    value: set?.spa_iv || 31,
    touched: false,
  });
  const [spDIv, setSpDIv] = useState({
    value: set?.spd_iv || 31,
    touched: false,
  });
  const [speIv, setSpeIv] = useState({
    value: set?.spe_iv || 31,
    touched: false,
  });
  const [moveOne, setMoveOne] = useState({
    value: set?.move_one || 'Tackle',
    touched: false,
  });
  const [moveTwo, setMoveTwo] = useState({
    value: set?.move_two || '',
    touched: false,
  });
  const [moveThree, setMoveThree] = useState({
    value: set?.move_three || '',
    touched: false,
  });
  const [moveFour, setMoveFour] = useState({
    value: set?.move_four || '',
    touched: false,
  });
  const [expandToggle, setExpandToggle] = useState(true);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { copySuccess, textArea, setCopySuccess, copyCodeToClipboard } =
    useClipboard();

  const setFields = (setImport: string) => {
    const parse = showdownParse(setImport)[0];

    setNickname({ value: parse.nickname || '', touched: false });
    setSpecies({ value: parse.species || 'Pikachu', touched: false });
    setGender({ value: parse.gender || '', touched: false });
    setShiny({ value: parse.shiny || false, touched: false });
    setItem({ value: parse.item || '', touched: false });
    setAbility({ value: parse.ability || '', touched: false });
    setLevel({ value: parse.level || 100, touched: false });
    setHappiness({ value: parse.happiness || 255, touched: false });
    setNature({ value: parse.nature || '', touched: false });
    setHpEv({ value: parse.hp_ev || 0, touched: false });
    setAtkEv({ value: parse.atk_ev || 0, touched: false });
    setDefEv({ value: parse.def_ev || 0, touched: false });
    setSpAEv({ value: parse.spa_ev || 0, touched: false });
    setSpDEv({ value: parse.spd_ev || 0, touched: false });
    setSpeEv({ value: parse.spe_ev || 0, touched: false });
    setHpIv({ value: parse.hp_iv || 31, touched: false });
    setAtkIv({ value: parse.atk_iv || 31, touched: false });
    setDefIv({ value: parse.def_iv || 31, touched: false });
    setSpAIv({ value: parse.spa_iv || 31, touched: false });
    setSpDIv({ value: parse.spd_iv || 31, touched: false });
    setSpeIv({ value: parse.spe_iv || 31, touched: false });
    setMoveOne({ value: parse.move_one || 'Tackle', touched: false });
    setMoveTwo({ value: parse.move_two || '', touched: false });
    setMoveThree({ value: parse.move_three || '', touched: false });
    setMoveFour({ value: parse.move_four || '', touched: false });
    setDeleteClicked(false);
  };

  const renderExpandedSet = () => {
    return (
      <div className={styles['pokemon']}>
        <Button onClickCallback={() => setExpandToggle(!expandToggle)}>
          Compress Set <FontAwesomeIcon icon={faCompressArrowsAlt} />
        </Button>
        <form>
          <div className={styles['pokemon-import']}>
            <label htmlFor="pokemon-import">
              Import Pokemon Set: <FontAwesomeIcon icon={faUpload} />
            </label>
            {newSetImport.value !== '' && (
              <p className="error-validate shake-horizontal">
                {validateNewSetImport(newSetImport)}
              </p>
            )}
            <TextArea
              textAreaHasError={false}
              placeholder="Import a Pokemon Showdown Set Here And It Will Re-populate The Field:"
              name="pokemon-import"
              id={`pokemon-import-${set?.id}`}
              value={newSetImport.value}
              onChangeCallback={(e) =>
                setNewSetImport({ value: e.target.value, touched: true })
              }
            />
            <Button
              type="submit"
              disabled={!!validateNewSetImport(newSetImport)}
              onClickCallback={(e) => {
                e.preventDefault();
                handleUpdateSetImport(Number(set?.id));
                setFields(newSetImport.value);
              }}
            >
              Submit <FontAwesomeIcon icon={faCheckCircle} />
            </Button>
          </div>
        </form>
        <form>
          <div className={styles['pokemon-intro']}>
            <div className={styles['name-sprite']}>
              <div className={styles['names']}>
                <Input
                  inputHasError
                  isError={species.touched}
                  htmlFor={'pokemon-name'}
                  label={'Species: '}
                  inputClass={styles['pokemon-name']}
                  validationCallback={() => validateSpecies(species)}
                  onChangeCallback={(e) =>
                    setSpecies({ value: e.target.value, touched: true })
                  }
                  placeholder="e.g. Pikachu"
                  value={species.value}
                  type="text"
                  name="pokemon-name"
                  id={`pokemon-name-${set?.id}`}
                />
                <Input
                  inputHasError
                  isError={species.touched}
                  htmlFor={'pokemon-nickname'}
                  label={'Nickname: (optional)'}
                  inputClass={styles['pokemon-name']}
                  validationCallback={() => validateNickname(nickname)}
                  onChangeCallback={(e) =>
                    setNickname({ value: e.target.value, touched: true })
                  }
                  placeholder={species.value}
                  value={nickname.value}
                  type="text"
                  name="pokemon-nickname"
                  id={`pokemon-nickname-${set?.id}`}
                />
                <Input
                  inputHasError
                  htmlFor={'pokemon-gender'}
                  label={'Gender: '}
                  inputClass={styles['pokemon-gender']}
                  validationCallback={() => validateGender(gender, species)}
                  onChangeCallback={(e) =>
                    setGender({ value: e.target.value, touched: true })
                  }
                  placeholder="F, M, or N"
                  value={gender.value}
                  type="text"
                  name="pokemon-gender"
                  id={`pokemon-gender-${set?.id}`}
                />
                <Input
                  inputHasError
                  isError={species.touched}
                  htmlFor={'shiny'}
                  label={'Shiny:'}
                  validationCallback={() => validateShiny(shiny)}
                  onChangeCallback={(e) =>
                    setShiny({ value: e.currentTarget.checked, touched: true })
                  }
                  type="checkbox"
                  id="shiny-2"
                  name="shiny"
                  checked={shiny.value}
                  value={shiny.value.toString()}
                />
              </div>
              <div className={styles['sprites']}>
                <Image
                  imageClass={styles['sprite-img']}
                  src={legality.returnIconSprite(species.value, shiny.value)}
                  alt={species.value}
                />
                <div className={styles['type-icons']}>
                  {legality
                    .returnTypeIcon(legality.returnType(species.value))
                    .map((type: string, i: number) => {
                      return (
                        <Image
                          imageClass={styles['type-img']}
                          src={`${type}`}
                          key={i}
                          alt={`${i + 1}`}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles['details']}>
            <div className={styles['first-details']}>
              <Input
                inputHasError
                isError={species.touched}
                htmlFor={'pokemon-level'}
                label={'Level: '}
                inputClass={styles['pokemon-level']}
                validationCallback={() => validateLevel(level)}
                onChangeCallback={(e) =>
                  setLevel({ value: Number(e.target.value), touched: true })
                }
                placeholder="100"
                value={level.value}
                type="text"
                name="pokemon-level"
                id={`pokemon-level-${set?.id}`}
              />
              <Input
                inputHasError
                htmlFor={'pokemon-item'}
                label={'Item: (optional)'}
                inputClass={styles['pokemon-item']}
                validationCallback={() => validateItem(item)}
                onChangeCallback={(e) =>
                  setItem({ value: e.target.value, touched: true })
                }
                placeholder="e.g. Leftovers"
                value={item.value}
                type="text"
                name="pokemon-item"
                id={`pokemon-item-${set?.id}`}
              />
              <Input
                inputHasError
                htmlFor={'pokemon-ability'}
                label={'Ability: (optional)'}
                inputClass={styles['pokemon-ability']}
                validationCallback={() => validateAbility(ability)}
                onChangeCallback={(e) =>
                  setAbility({ value: e.target.value, touched: true })
                }
                placeholder="e.g. Static"
                value={ability.value}
                type="text"
                name="pokemon-ability"
                id={`pokemon-ability-${set?.id}`}
              />
              <Input
                inputHasError
                htmlFor={'pokemon-nature'}
                label={'Nature: (optional)'}
                inputClass={styles['pokemon-nature']}
                validationCallback={() => validateNature(nature)}
                onChangeCallback={(e) =>
                  setNature({ value: e.target.value, touched: true })
                }
                placeholder="e.g. Adamant"
                value={nature.value}
                type="text"
                name="pokemon-nature"
                id={`pokemon-nature-${set?.id}`}
              />
              <Input
                inputHasError
                isError={happiness.touched}
                htmlFor={'pokemon-happiness'}
                label={'Happiness:'}
                inputClass={styles['pokemon-happiness']}
                validationCallback={() => validateHappiness(happiness)}
                onChangeCallback={(e) =>
                  setHappiness({ value: Number(e.target.value), touched: true })
                }
                placeholder="255"
                value={happiness.value}
                type="number"
                name="pokemon-happiness"
                min="0"
                max="255"
                id={`pokemon-happiness-${set?.id}`}
              />
            </div>
            <div className={styles['stats']}>
              <div className={styles['evs']}>
                {
                  <p className="error-validate shake-horizontal">
                    {validateEvs(hpEv, atkEv, defEv, spAEv, spDEv, speEv)}
                  </p>
                }
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-ev-hp'}
                  label={'HP EV:'}
                  inputClass={styles['pokemon-ev']}
                  onChangeCallback={(e) =>
                    setHpEv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="0"
                  value={Number(hpEv.value)}
                  type="number"
                  name="pokemon-ev-hp"
                  min="0"
                  max="252"
                  id={`pokemon-ev-hp-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-ev-atk'}
                  label={'Atk EV:'}
                  inputClass={styles['pokemon-ev']}
                  onChangeCallback={(e) =>
                    setAtkEv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="0"
                  value={Number(atkEv.value)}
                  type="number"
                  name="pokemon-ev-atk"
                  min="0"
                  max="252"
                  id={`pokemon-ev-atk-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-ev-def'}
                  label={'Def EV:'}
                  inputClass={styles['pokemon-ev']}
                  onChangeCallback={(e) =>
                    setDefEv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="0"
                  value={Number(defEv.value)}
                  type="number"
                  name="pokemon-ev-def"
                  min="0"
                  max="252"
                  id={`pokemon-ev-def-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-ev-spa'}
                  label={'SpA EV:'}
                  inputClass={styles['pokemon-ev']}
                  onChangeCallback={(e) =>
                    setSpAEv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="0"
                  value={Number(spAEv.value)}
                  type="number"
                  name="pokemon-ev-spa"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spa-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-ev-spd'}
                  label={'SpD EV:'}
                  inputClass={styles['pokemon-ev']}
                  onChangeCallback={(e) =>
                    setSpDEv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="0"
                  value={Number(spDEv.value)}
                  type="number"
                  name="pokemon-ev-spd"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spd-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-ev-spe'}
                  label={'SpE EV:'}
                  inputClass={styles['pokemon-ev']}
                  onChangeCallback={(e) =>
                    setSpeEv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="0"
                  value={Number(speEv.value)}
                  type="number"
                  name="pokemon-ev-spe"
                  min="0"
                  max="252"
                  id={`pokemon-ev-spe-${set?.id}`}
                />
              </div>
              <div className={styles['ivs']}>
                {
                  <p className="error-validate shake-horizontal">
                    {validateIvs(hpIv, atkIv, defIv, spAIv, spDIv, speIv)}
                  </p>
                }
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-iv-hp'}
                  label={'HP IV:'}
                  inputClass={styles['pokemon-iv']}
                  onChangeCallback={(e) =>
                    setHpIv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="31"
                  value={Number(hpIv.value)}
                  type="number"
                  name="pokemon-iv-hp"
                  min="0"
                  max="31"
                  id={`pokemon-iv-hp-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-iv-atk'}
                  label={'Atk IV:'}
                  inputClass={styles['pokemon-iv']}
                  onChangeCallback={(e) =>
                    setAtkIv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="31"
                  value={Number(atkIv.value)}
                  type="number"
                  name="pokemon-iv-atk"
                  min="0"
                  max="31"
                  id={`pokemon-iv-atk-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-iv-def'}
                  label={'Def IV:'}
                  inputClass={styles['pokemon-iv']}
                  onChangeCallback={(e) =>
                    setDefIv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="31"
                  value={Number(defIv.value)}
                  type="number"
                  name="pokemon-iv-def"
                  min="0"
                  max="31"
                  id={`pokemon-iv-def-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-iv-spa'}
                  label={'SpA IV:'}
                  inputClass={styles['pokemon-iv']}
                  onChangeCallback={(e) =>
                    setSpAIv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="31"
                  value={Number(spAIv.value)}
                  type="number"
                  name="pokemon-iv-spa"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spa-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-iv-spd'}
                  label={'SpD IV:'}
                  inputClass={styles['pokemon-iv']}
                  onChangeCallback={(e) =>
                    setSpDIv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="31"
                  value={Number(spDIv.value)}
                  type="number"
                  name="pokemon-iv-spd"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spd-${set?.id}`}
                />
                <Input
                  containerClass={styles['stat']}
                  inputHasError={false}
                  htmlFor={'pokemon-iv-spe'}
                  label={'Spe IV:'}
                  inputClass={styles['pokemon-iv']}
                  onChangeCallback={(e) =>
                    setSpeIv({ value: Number(e.target.value), touched: true })
                  }
                  placeholder="31"
                  value={Number(speIv.value)}
                  type="number"
                  name="pokemon-iv-spe"
                  min="0"
                  max="31"
                  id={`pokemon-iv-spe-${set?.id}`}
                />
              </div>
            </div>
            <div className={styles['moves']}>
              <Input
                containerClass={styles['label-as-row']}
                inputHasError={false}
                htmlFor={'pokemon-moves'}
                label={'Moves:'}
                inputClass={styles['pokemon-move']}
                placeholder="Tackle"
                value={moveOne.value}
                onChangeCallback={(e) =>
                  setMoveOne({ value: e.target.value, touched: true })
                }
                type="text"
                name="pokemon-move"
                id={`pokemon-${set?.id}-move-1`}
              />
              <Input
                inputHasError={false}
                inputClass={styles['pokemon-move']}
                value={moveTwo.value}
                onChangeCallback={(e) =>
                  setMoveTwo({ value: e.target.value, touched: true })
                }
                type="text"
                name="pokemon-move"
                id={`pokemon-${set?.id}-move-2`}
              />
              <Input
                inputHasError={false}
                inputClass={styles['pokemon-move']}
                value={moveThree.value}
                onChangeCallback={(e) =>
                  setMoveThree({ value: e.target.value, touched: true })
                }
                type="text"
                name="pokemon-move"
                id={`pokemon-${set?.id}-move-3`}
              />
              <Input
                inputHasError={false}
                inputClass={styles['pokemon-move']}
                value={moveFour.value}
                onChangeCallback={(e) =>
                  setMoveFour({ value: e.target.value, touched: true })
                }
                type="text"
                name="pokemon-move"
                id={`pokemon-${set?.id}-move-4`}
              />
            </div>
            <Button
              type="submit"
              disabled={
                !!validateSpecies(species) ||
                !!validateGender(gender, species) ||
                !!validateLevel(level) ||
                !!validateHappiness(happiness) ||
                !!validateEvs(hpEv, atkEv, defEv, spAEv, spDEv, speEv) ||
                !!validateIvs(hpIv, atkIv, defIv, spAIv, spDIv, speIv) ||
                !!validateMoves(moveOne, moveTwo, moveThree, moveFour)
              }
              onClickCallback={(e) => {
                e.preventDefault();
                handleUpdateSet(
                  set?.id,
                  nickname.value,
                  species.value,
                  gender.value,
                  shiny.value,
                  item.value,
                  ability.value,
                  level.value,
                  happiness.value,
                  nature.value,
                  hpEv.value,
                  atkEv.value,
                  defEv.value,
                  spAEv.value,
                  spDEv.value,
                  speEv.value,
                  hpIv.value,
                  atkIv.value,
                  defIv.value,
                  spAIv.value,
                  spDIv.value,
                  speIv.value,
                  moveOne.value,
                  moveTwo.value,
                  moveThree.value,
                  moveFour.value
                );
              }}
            >
              Save Set Details <FontAwesomeIcon icon={faSave} />
            </Button>
          </div>
        </form>

        <div className={styles['export-pokemon']}>
          {copySuccess && (
            <div className={styles['copied']}>Copied to Clipboard!!</div>
          )}
          <div>
            <Button
              onClickCallback={() => {
                copyCodeToClipboard();
                setTimeout(() => setCopySuccess(false), 3000);
              }}
            >
              Copy Text
            </Button>
            <Link
              to={{
                pathname: `/share/${set?.team_id}/${set?.id}`,
                state: { singleSet: set },
              }}
              target="_blank"
            >
              Share This Set! <FontAwesomeIcon icon={faShareSquare} />
            </Link>
            <Input
              inputHasError={false}
              type="text"
              readOnly
              value={`poketeams.now.sh/${set?.team_id}/${set?.id}`}
            />
          </div>
          <TextArea
            containerClass={styles['export-pokemon']}
            textAreaHasError
            htmlFor="export-pokemon"
            label="Export Pokemon: "
            labelIcon={<FontAwesomeIcon icon={faDownload} />}
            ref={textArea}
            readOnly
            name="export-pokemon"
            id="export-pokemon-2"
            value={showdownGenerate([set])}
          />
        </div>
        <div>
          <Button
            onClickCallback={() => {
              setDeleteClicked(!deleteClicked);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete Set!
          </Button>
          {deleteClicked && renderDeleteExpand()}
        </div>
      </div>
    );
  };

  const renderUnexpandedSet = () => {
    const types = legality
      .returnTypeIcon(legality.returnType(set?.species || ''))
      .map((type: string, i: number) => {
        return (
          <Image
            imageClass={styles['icon']}
            key={i}
            src={`${type}`}
            alt={`${i + 1}`}
          />
        );
      });
    const imgIcon = (
      <Image
        imageClass={styles['icon']}
        src={legality.returnIconSprite(set?.species || '', set?.shiny || false)}
        alt={set?.species || ''}
      />
    );

    return (
      <Fragment>
        <div className={styles['pokemon']}>
          <div
            className={styles['closed']}
            onClick={() => setExpandToggle(!expandToggle)}
          >
            <div className={styles['inside']}>
              {
                imgIcon.props.src ? (
                  imgIcon
                ) : (
                  <LoadingSets />
                ) /* this isn't quite ready yet*/
              }
            </div>
            <div className={styles['inside']}>
              <span>{set?.species || ''}</span>
            </div>
            <div className={styles['inside']}>
              {types ? types : <LoadingSets /> /* this isn't quite ready yet*/}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const renderDeleteExpand = () => {
    return (
      <div>
        <p>Are You Sure You'd Like to Delete this Set?</p>
        <Button
          onClickCallback={() => {
            handleDeleteSet(set?.team_id || NaN, set?.id || NaN);
            setDeleteClicked(!deleteClicked);
          }}
        >
          Yes <FontAwesomeIcon icon={faThumbsUp} />
        </Button>
        <Button onClickCallback={() => setDeleteClicked(!deleteClicked)}>
          No <FontAwesomeIcon icon={faThumbsDown} />
        </Button>
      </div>
    );
  };

  return (
    <Fragment>
      {expandToggle ? renderUnexpandedSet() : renderExpandedSet()}
    </Fragment>
  );
};

export default SetEdit;
