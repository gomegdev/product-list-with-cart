import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../layouts/Layout';
import PropTypes from 'prop-types';

const ProductList = ({ desserts }) => {
  const { updateCart, cartItems } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      // Remove items that are no longer in cart
      Object.keys(newSelected).forEach((category) => {
        if (!cartItems[category]) {
          delete newSelected[category];
        }
      });
      return newSelected;
    });
  }, [cartItems]);

  const incrementItem = (dessert) => {
    const currentQuantity = selectedItems[dessert.category]?.quantity || 0;
    const newQuantity = currentQuantity + 1;
    setSelectedItems((prev) => ({
      ...prev,
      [dessert.category]: {
        ...prev[dessert.category],
        quantity: newQuantity,
        isAdding: true,
      },
    }));
    updateCart(dessert, newQuantity);
  };

  const decrementItem = (dessert) => {
    if (
      !selectedItems[dessert.category] ||
      selectedItems[dessert.category].quantity < 1
    )
      return;
    const newQuantity = selectedItems[dessert.category].quantity - 1;
    setSelectedItems((prev) => ({
      ...prev,
      [dessert.category]: {
        ...prev[dessert.category],
        quantity: newQuantity,
        isAdding: newQuantity > 0,
      },
    }));
    updateCart(dessert, newQuantity);
  };

  const getImageSource = (image) => {
    if (windowWidth < 768) return image.mobile;
    if (windowWidth < 1024) return image.tablet;
    return image.desktop;
  };

  return (
    <>
      <h1 className="text-4xl text-rose900 font-bold mb-6">Desserts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {desserts.map((dessert) => (
          <li key={dessert.category}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center relative">
                <img
                  src={getImageSource(dessert.image)}
                  alt={dessert.name}
                  className={`rounded-lg shadow-sm ${
                    selectedItems[dessert.category]?.isAdding
                      ? 'border-2 border-primaryClr'
                      : 'border-2 border-transparent'
                  }`}
                />

                {!selectedItems[dessert.category]?.isAdding ? (
                  <button
                    className="flex gap-2 w-44 items-center bg-white text-rose900 
                    rounded-full border border-primaryClr 
                    px-6 py-2 font-semibold absolute -bottom-5"
                    onClick={() => incrementItem(dessert)}
                  >
                    <span>
                      <img
                        src="/images/icon-add-to-cart.svg"
                        alt="Add to cart icon"
                      />
                    </span>
                    Add to Cart
                  </button>
                ) : (
                  <div className="rounded-full border-1 bg-primaryClr w-44 py-2 px-6 absolute -bottom-5 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <button
                        className="border border-white rounded-full py-2 px-1"
                        onClick={() => decrementItem(dessert)}
                      >
                        <img
                          src="/images/icon-decrement-quantity.svg"
                          alt="icon decrement quantity"
                        />
                      </button>
                      <span className="text-white">
                        {selectedItems[dessert.category]?.quantity || 0}
                      </span>
                      <button
                        className="border border-white rounded-full py-1 px-1"
                        onClick={() => incrementItem(dessert)}
                      >
                        <img
                          src=" /images/icon-increment-quantity.svg"
                          alt="icon increment quantity"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1 mt-4">
                <p className="text-sm text-rose500">{dessert.category}</p>
                <p className="text-rose900 font-semibold">{dessert.name}</p>
                <p className="text-primaryClr font-semibold">
                  ${dessert.price.toFixed(2)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

ProductList.propTypes = {
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

export default ProductList;
