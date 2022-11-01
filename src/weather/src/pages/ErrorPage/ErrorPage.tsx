import { useRouteError } from 'react-router-dom';
import './error-page.scss';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Упс!</h1>
      <p>К сожалению, произошла непредвиденная ошибка.</p>
      <p>
        <i>
          {
            // @ts-ignore error: unknown
            error?.statusText || error?.message
          }
        </i>
      </p>
    </div>
  );
};
