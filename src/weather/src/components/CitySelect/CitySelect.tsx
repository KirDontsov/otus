import { useState, useEffect, useMemo, useCallback, useRef, useLayoutEffect, FC, memo, ChangeEvent } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import classNames from 'classnames';

import type { Maybe } from '../../context';
import './city-select.scss';

const citiesApiRoot = 'https://public.opendatasoft.com/api/records/1.0/search';

interface CityFields {
  name: string;
}

interface CityRecord {
  fields: CityFields;
  recordid: string;
}

interface IdAndName {
  id: string;
  name: string;
}

interface CitySelectProps {
  availableCitiesPerPage?: number;
  onSelect?: (city: string) => void;
}

interface CitiesApiParams {
  start: number;
}

interface CitiesApiData {
  nhits: number;
  parameters: CitiesApiParams;
  records: CityRecord[];
}

const defaultAvailableCitiesData: CitiesApiData = { nhits: 0, parameters: { start: 0 }, records: [] };

export const CitySelect: FC<CitySelectProps> = memo(({ availableCitiesPerPage = 10, onSelect }) => {
  const [enteredCity, setEnteredCity] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<Maybe<string>>(null);
  const [availableCitiesCurrentOffset, setAvailableCitiesCurrentOffset] = useState(0);
  const [availableCitiesData, setAvailableCitiesData] = useState(defaultAvailableCitiesData);

  const getCities = useCallback(
    async (search: string, offset = 0) => {
      try {
        const { data } = await axios.get(citiesApiRoot, {
          params: {
            dataset: 'geonames-all-cities-with-a-population-1000',
            q: search,
            rows: availableCitiesPerPage,
            sort: 'name',
            start: offset,
            lang: 'ru',
          },
        });

        setAvailableCitiesData(data);
      } catch (e) {
        // @ts-ignore
        throw new Error(e.message);
      }
    },
    [availableCitiesPerPage],
  );

  const availableCities: IdAndName[] = useMemo(
    () =>
      (availableCitiesData as CitiesApiData).records.map((record: CityRecord) => ({
        name: record.fields.name,
        id: record.recordid,
      })),
    [availableCitiesData],
  );

  const availableCitiesCount: number = useMemo(
    () => (availableCitiesData as CitiesApiData).nhits,
    [availableCitiesData],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetCities = useCallback(debounce(getCities, 1000), [getCities]);

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredCity((e.target as HTMLInputElement).value);
    setSelectedCityId(null);
  };

  useEffect(() => {
    setAvailableCitiesCurrentOffset(0);
    setAvailableCitiesData(defaultAvailableCitiesData);
    debouncedGetCities(enteredCity);
  }, [debouncedGetCities, enteredCity]);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    getCities(enteredCity).then();
  }, [availableCitiesPerPage, enteredCity, getCities]);

  const handleSelect = (cityData: IdAndName) => {
    if (cityData.id) {
      setSelectedCityId(cityData?.id);
      onSelect?.(cityData.name);
    }
  };

  const { forwardDisabled, backwardDisabled, currentPage, totalPages } = useMemo(
    () => ({
      forwardDisabled: availableCitiesCount - availableCitiesCurrentOffset <= availableCitiesPerPage,
      backwardDisabled: availableCitiesCurrentOffset - availableCitiesPerPage < 0,
      currentPage: Math.floor(availableCitiesCurrentOffset / availableCitiesPerPage),
      totalPages: Math.floor(availableCitiesCount / availableCitiesPerPage),
    }),
    [availableCitiesCount, availableCitiesCurrentOffset, availableCitiesPerPage],
  );

  const handlePageForward = useCallback(async () => {
    if (forwardDisabled) {
      return;
    }

    const newOffset = availableCitiesCurrentOffset + availableCitiesPerPage;

    setAvailableCitiesCurrentOffset(availableCitiesCurrentOffset + availableCitiesPerPage);
    await getCities(enteredCity, newOffset);
  }, [availableCitiesCurrentOffset, availableCitiesPerPage, enteredCity, forwardDisabled, getCities]);

  const handlePageBackward = useCallback(async () => {
    if (backwardDisabled) {
      return;
    }

    const newOffset = availableCitiesCurrentOffset - availableCitiesPerPage;

    setAvailableCitiesCurrentOffset(availableCitiesCurrentOffset - availableCitiesPerPage);
    await getCities(enteredCity, newOffset);
  }, [availableCitiesCurrentOffset, availableCitiesPerPage, backwardDisabled, enteredCity, getCities]);

  return (
    <div className="CitySelector">
      <input className="CitySelector__input" value={enteredCity} onInput={handleInput} placeholder="Поиск города" />
      <div className="container">
        <div>
          {availableCities.map((city: IdAndName) => (
            <div
              role="presentation"
              className={classNames([
                'CitySelector__option',
                { CitySelector__option_selected: city.id === selectedCityId },
              ])}
              onClick={() => handleSelect(city)}
              key={city.id}
            >
              {city.name}
            </div>
          ))}
        </div>
        <div className="CitySelector__pagination">
          <button
            type="submit"
            className={classNames([
              'CitySelector__listArrow',
              'CitySelector__listArrow_left',
              { CitySelector__listArrow_disabled: backwardDisabled },
            ])}
            onClick={handlePageBackward}
          >
            {'<<'}
          </button>
          <div className="CitySelector__pageIndicator">{`${currentPage}/${totalPages}`}</div>
          <button
            type="submit"
            className={classNames([
              'CitySelector__listArrow',
              'CitySelector__listArrow_right',
              { CitySelector__listArrow_disabled: forwardDisabled },
            ])}
            onClick={handlePageForward}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
});
