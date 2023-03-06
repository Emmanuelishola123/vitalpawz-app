import { ICartSchema } from 'schemas/cart.schema';
import { IProductSchema } from 'schemas/product.schema';

export const addToCart = (cart: ICartSchema[], item: IProductSchema, quantity: number = 1) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex((x) => x.id === item.id);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + quantity,
    };
    return newCart;
  }

  // Add new item
  newCart.push({
    id: item.id,
    product: item,
    quantity: quantity,
  });

  return newCart;
};

export const setToCart = (cart: ICartSchema[], product_id: string, quantity: number) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex((x) => x.id === product_id);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: quantity,
    };
    return newCart;
  }

  return newCart;
};
