import type { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';

import { CitySelect } from '../../components/CitySelect';
import { AppContext } from '../../context';
import '../../styles/index.scss';

// Реализовать компонент фильтра и поиска городов.
// Данные по городам сохранять в браузерном хранилище.
// Добавить страницу погоды по конкретному городу.
// При переходе на нее должен меняться url, показываться информация на несколько дней вперед.

export const AppPage: FC = () => {
  const handleSelectCity = useContextSelector(AppContext, (ctx) => ctx.handlers.selectCity);
  const favourites = useContextSelector(AppContext, (ctx) => ctx.state.favourites);
  return (
    <>
      <div className="sidebar">
        <h1>OTUS Weather App</h1>
        <div className="sidebar__select">
          <CitySelect onSelect={handleSelectCity} />
        </div>
      </div>
      <div id="detail" className="detail">
        <Outlet />
        <div>
          <h2>Избранные города</h2>
          <div className="detail__favourites">
            {favourites.map((item) => (
              <Link className="detail__favourites item" to={`cities/${item}`} key={item}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
