import { currenciesMap } from '../../constants';

const Cart = ({ setCurrency }) => {
  const renderOptions = () => {
    return Object.keys(currenciesMap).map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ));
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
      <header>YOUR CART</header>
      <form>
        <select onChange={handleChange} name='currency'>
          {renderOptions()}
        </select>
      </form>
    </>
  );
};

export default Cart;
