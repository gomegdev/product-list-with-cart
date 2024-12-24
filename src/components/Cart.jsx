import { useContext, useState } from 'react';
import { CartContext } from '../layouts/Layout';
import { Dialog, DialogContent } from './ui/dialog';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const cartItemsArray = Object.values(cartItems);
  const totalAmount = cartItemsArray.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const handleRemoveItem = (category) => {
    removeFromCart(category);
  };

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  const handleStartNewOrder = () => {
    setIsOrderConfirmed(false);
    clearCart();
  };

  return (
    <div>
      <div className="bg-white p-6 w-full lg:w-[350px] shadow-sm rounded-lg mb-8">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-primaryClr">
            Your Cart ({cartItemsArray.length})
          </h2>

          {cartItemsArray.length === 0 ? (
            <div className="flex flex-col gap-8 justify-center items-center">
              <img
                src="/src/assets/images/illustration-empty-cart.svg"
                alt="empty cart icon"
                className="w-30 h-30"
              />
              <p className="text-rose500 font-semibold text-sm">
                Your added items will appear here.
              </p>
            </div>
          ) : (
            <>
              {cartItemsArray.map((item) => (
                <div
                  key={item.name}
                  className="mb-2 border-b border-rose100 flex justify-between items-center"
                >
                  <div>
                    <p className="text-rose900 font-semibold">{item.name}</p>
                    <div className="flex gap-3 mt-2">
                      <p>
                        <span className="text-primaryClr font-semibold">
                          {item.quantity}x
                        </span>
                      </p>
                      <p className="flex gap-2 items-center pb-4">
                        <span className="text-rose400 text-sm font-medium">
                          @{item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-rose500 font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.category)}
                    className="h-fit hover:bg-rose50 transition-colors rounded-full"
                  >
                    <img
                      src="/src/assets/images/icon-remove-item.svg"
                      alt="remove item from cart icon"
                      className="size-5 p-1 rounded-full border hover:border-rose300 transition-all"
                    />
                  </button>
                </div>
              ))}

              {/* total order */}
              <div className="mt-6">
                <p className="flex justify-between">
                  Order Total{' '}
                  <span className="font-bold text-xl">
                    ${totalAmount.toFixed(2)}
                  </span>
                </p>

                {/* Confirm Order */}
                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex justify-center py-3 w-full rounded-sm gap-2 bg-rose50">
                    <img
                      src="/src/assets/images/icon-carbon-neutral.svg"
                      alt=""
                    />
                    <p className="text-sm">
                      This is a <strong>carbon-neutral</strong> delivery.
                    </p>
                  </div>
                  <button
                    onClick={handleConfirmOrder}
                    className="bg-primaryClr py-3 text-white rounded-full disabled:opacity-50"
                    disabled={cartItemsArray.length === 0}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <Dialog open={isOrderConfirmed} onOpenChange={setIsOrderConfirmed}>
        <DialogContent className="bg-white p-6 w-full lg:w-[500px] rounded-lg font-redHatText">
          <div className="flex flex-col items-center gap-4 lg:p-5">
            <div className="flex flex-col items-start w-full">
              <img
                src="/src/assets/images/icon-order-confirmed.svg"
                className="w-10 h-10 mb-4"
              />
              <h2 className="text-5xl font-bold text-rose900">
                Order Confirmed
              </h2>
              <p className="text-rose400 mt-1 text-[18px] lg:text-base">
                We hope you enjoy your food!
              </p>
            </div>

            {/* Order Items */}

            <div className="w-full mt-4 space-y-3 bg-rose50 p-4">
              {cartItemsArray.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center border-b border-rose100"
                >
                  <div className="pb-4">
                    <div className="flex gap-4 justify-center items-center">
                      <div>
                        <img
                          src={item.image?.thumbnail}
                          alt={item.name}
                          className="w-12 h-12 rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="text-rose900 font-semibold">
                          {item.name}
                        </h3>
                        <div className="flex gap-2 items-center">
                          <span className="text-primaryClr font-semibold">
                            {item.quantity}x
                          </span>
                          <span className="text-rose400 text-sm font-medium">
                            @${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-rose900 font-medium">
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}

              {/* Order Total */}
              <div className="w-full pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-rose500 font-medium">Order Total</span>
                  <span className="text-xl font-bold text-rose900">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Start New Order Button */}
            <button
              onClick={handleStartNewOrder}
              className="w-full mt-4 bg-primaryClr text-white py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Start New Order
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
