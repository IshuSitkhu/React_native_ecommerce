import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isWishlisted = prevWishlist.find(
        (item) => item.id === product.id
      );

      if (isWishlisted) {
        // Remove from wishlist
        return prevWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      // Add to wishlist
      return [...prevWishlist, product];
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}