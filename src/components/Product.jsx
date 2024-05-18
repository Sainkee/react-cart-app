import { useReducer } from "react";

// Product data array
const Products = [
  { id: 1, name: "Product-1", price: 100, quantity: 3 },
  { id: 2, name: "Product-2", price: 200, quantity: 0 },
  { id: 3, name: "Product-3", price: 300, quantity: 0 },
];
const fun = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREMENT":
      return state.map((item) =>
        item.id === action.payload && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    default:
      return state;
  }
};

const ProductsList = () => {
  const [state, dispatch] = useReducer(fun, Products);

  const totalCartValue = () => {
    return state
      .filter((item) => item.quantity > 0)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // ProductCard component for individual product display
  const ProductCard = ({ product }) => {
    return (
      <div className="border  p-4 flex justify-between rounded-lg shadow-md bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-xl">Price: ${product.price}</p>
        <span className="text-2xl bg-slate-700 rounded-full px-4 flex gap-4 font-bold">
          <span
            onClick={() => dispatch({ type: "DECREMENT", payload: product.id })}
          >
            -
          </span>
          <span>{product.quantity}</span>
          <span
            onClick={() => dispatch({ type: "INCREMENT", payload: product.id })}
          >
            +
          </span>
        </span>
      </div>
    );
  };

  // CartCard component for individual cart item display
  const CartCard = ({ price, count, name }) => {
    return (
      <div className="border  p-4 flex justify-between  rounded-lg shadow-md bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">{name}</h2>

        <span className="text-2xl bg-slate-700 rounded-full px-4 flex gap-4 font-bold">
          <span>{count}</span>
          <span>*</span>
          <span>{price}</span>
        </span>
      </div>
    );
  };

  // ProductsList component to display all products and cart

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 ">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Products Section */}
        <div className="md:w-1/2 border border-green-700 bg-green-600/50 p-5 rounded-md border-dashed  grid grid-cols-1 gap-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
          <div className="flex flex-col gap-2 ">
            {state.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="md:w-1/2 border border-green-700 bg-yellow-400/50 p-5 rounded-md border-dashed  grid grid-cols-1 gap-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Cart</h1>
          <div className="flex flex-col justify-between gap-2 ">
            <div>
              {state
                .filter((product) => product.quantity > 0)
                .map((product) => (
                  <CartCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    count={product.quantity}
                  />
                ))}
            </div>
            <div className="flex text-4xl justify-between rounded-lg shadow-md bg-green-600 text-white p-4">
              <span className="">Total</span>
              <span>$ {totalCartValue(state)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
