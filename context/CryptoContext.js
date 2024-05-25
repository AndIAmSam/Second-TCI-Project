import React, { createContext, useState, useEffect } from 'react';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState([]);
 
  const [marketIndexes, setMarketIndexes] = useState([]);

  useEffect(() => {
    fetchCryptoData();
    fetchMarketIndexes();
  }, []);

  const fetchCryptoData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin,cardano,binancecoin,tether,ripple,litecoin,chainlink,stellar,eos,monero&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      const data = await response.json();
      setCryptos(data.map(crypto => ({
        id: crypto.id,
        name: crypto.name,
        price: crypto.current_price,
        abbreviation: crypto.symbol.toUpperCase(),
        icon: crypto.image,
        change24h: crypto.price_change_percentage_24h,
        marketCap: crypto.market_cap,
        volume: crypto.total_volume,
        allTimeHigh: crypto.ath,
        allTimeLow: crypto.atl,
      })));
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };



  const fetchMarketIndexes = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/indices');
      const data = await response.json();
      setMarketIndexes(data);
    } catch (error) {
      console.error('Error fetching market indexes:', error);
    }
  };

  return (
    <CryptoContext.Provider value={cryptos}>
      {children}
    </CryptoContext.Provider>
  );
};
