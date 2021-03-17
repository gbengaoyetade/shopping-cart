import { currenciesMap } from '../../constants';

const Currency = ({ currency }) => {
  return (
    <span dangerouslySetInnerHTML={{ __html: currenciesMap[currency] }}></span>
  );
};

export default Currency;
