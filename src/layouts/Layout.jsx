import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

export const CartContext = createContext();

const Layout = ({ desserts }) => {
  const [cartItems, setCartItems] = useState({});

  const updateCart = (dessert, quantity) => {
    setCartItems((prev) => {
      if (quantity === 0) {
        const newCart = { ...prev };
        delete newCart[dessert.category];
        return newCart;
      }

      return {
        ...prev,
        [dessert.category]: {
          name: dessert.name,
          price: dessert.price,
          quantity: quantity,
          totalPrice: dessert.price * quantity,
          category: dessert.category,
          image: dessert.image, // Add this line
        },
      };
    });
  };

  const removeFromCart = (category) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[category];
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider
      value={{ cartItems, updateCart, removeFromCart, clearCart }}
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex flex-col gap-6 w-full">
          <ProductList desserts={desserts} />
        </div>
        <Cart />
      </div>
    </CartContext.Provider>
  );
};

Layout.propTypes = {
  desserts: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.shape({
        thumbnail: PropTypes.string,
        mobile: PropTypes.string,
        tablet: PropTypes.string,
        desktop: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default Layout;
