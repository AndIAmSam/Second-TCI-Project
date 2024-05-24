import React, { createContext, useState } from 'react';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState([
    {
      id: 1,
      name: "Bitcoin",
      price: 45000,
      abbreviation: "BTC",
      icon: require("../assets/bitcoin.png"),
    },
    {
      id: 2,
      name: "Ethereum",
      price: 3000,
      abbreviation: "ETH",
      icon: require("../assets/ether.png"),
    },
    {
      id: 3,
      name: "Doge Coin",
      price: 150,
      abbreviation: "DOGE",
      icon: require("../assets/dogecoin.png"),
    },
    {
      id: 4,
      name: "Cardano",
      price: 150,
      abbreviation: "ADA",
      icon: require("../assets/cardano.webp"),
    },
    {
      id: 5,
      name: "Binance Coin",
      price: 150,
      abbreviation: "BNB",
      icon: require("../assets/binance.png"),
    },
    {
      id: 6,
      name: "Tether",
      price: 150,
      abbreviation: "USDT",
      icon: require("../assets/tether.png"),
    },
  ]);

  return (
    <CryptoContext.Provider value={{ cryptos, setCryptos }}>
      {children}
    </CryptoContext.Provider>
  );
};
