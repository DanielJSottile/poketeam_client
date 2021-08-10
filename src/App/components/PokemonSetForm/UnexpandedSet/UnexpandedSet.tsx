import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from '../../Image';
import legality from '../../../utils/legality';
import { PokemonSet } from '../../../@types';
import styles from './UnexpandedSet.module.scss';

type UnexpandedSetProps = {
  set: PokemonSet;
  handleSetModal: () => void;
};

const UnexpandedSet: FunctionComponent<UnexpandedSetProps> = ({
  set,
  handleSetModal,
}): JSX.Element => {
  const types = legality
    .returnTypeIcon(legality.returnType(set?.species || ''))
    .map((type: string, i: number) => {
      return (
        <Image
          imageClass={styles['type-img']}
          key={i}
          src={`${type}`}
          alt={`${i + 1}`}
        />
      );
    });

  const findSpeciesGender = (set: PokemonSet) => {
    if (!set.gender) {
      return legality.returnGenderStatus(set.species);
    }

    return set.gender;
  };

  const renderGender = (set: PokemonSet) => {
    if (findSpeciesGender(set) === false) {
      return (
        <span>
          <FontAwesomeIcon icon={faMars} className={styles['male']} /> /{' '}
          <FontAwesomeIcon icon={faVenus} className={styles['female']} />
        </span>
      );
    }

    if (findSpeciesGender(set) === 'F') {
      return (
        <span>
          <FontAwesomeIcon icon={faVenus} className={styles['female']} />
        </span>
      );
    }

    if (findSpeciesGender(set) === 'M') {
      return (
        <span>
          <FontAwesomeIcon icon={faMars} className={styles['male']} />
        </span>
      );
    }

    return null;
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={styles['pokemon']}
        onClick={() => handleSetModal()}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            handleSetModal();
          }
        }}
      >
        <div className={styles['closed']}>
          <div className={styles['inside']}>
            <Image
              imageClass={styles['icon']}
              src={legality.returnIconSprite(set.species, set.shiny)}
              alt={set.species}
            />
          </div>
          <div className={styles['inside']}>
            <span className={styles['italic']}>{set.nickname || ''}</span>
            <span>
              {set.species || ''}{' '}
              {set.shiny && (
                <FontAwesomeIcon icon={faStar} className={styles['shiny']} />
              )}
            </span>
            <span>
              Lv. {set.level} {renderGender(set)}
            </span>
          </div>
          <div className={styles['inside']}>{types}</div>
        </div>
      </div>
    </>
  );
};

export default UnexpandedSet;
