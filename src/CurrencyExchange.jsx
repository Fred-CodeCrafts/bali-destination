import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.currencyfreaks.com/latest', {
          params: {
            apikey: 'daf5e71917614d3e89e4cc558cb764e4',
            symbols: 'AUD,CNY,INR,KRW,USD,IDR',
          },
        });
        console.log('API Response:', response.data); 
        setExchangeRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error); 
        setError('Failed to fetch exchange rates');
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertCurrencyToIDR = (currency) => {
    if (!exchangeRates) return null;
    const rate = exchangeRates[currency];
    const usdToIdrRate = exchangeRates['IDR'];
    console.log(`Converting 100 ${currency} at rate ${rate} and USD to IDR rate ${usdToIdrRate}`); 

    if (!rate || !usdToIdrRate) {
      setError('Required rate not available');
      return null;
    }

    return (100 / rate * usdToIdrRate).toFixed(2);
  };

  return (
    <div className="table-container mt-5">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {exchangeRates && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Currency</th>
                <th>Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100 Australian Dollar (AUD)</td>
                <td>{convertCurrencyToIDR('AUD')} IDR</td>
              </tr>
              <tr>
                <td>100 Chinese Yuan (CNY)</td>
                <td>{convertCurrencyToIDR('CNY')} IDR</td>
              </tr>
              <tr>
                <td>100 Indian Rupee (INR)</td>
                <td>{convertCurrencyToIDR('INR')} IDR</td>
              </tr>
              <tr>
                <td>100 South Korean Won (KRW)</td>
                <td>{convertCurrencyToIDR('KRW')} IDR</td>
              </tr>
              <tr>
                <td>100 United States Dollar (USD)</td>
                <td>{convertCurrencyToIDR('USD')} IDR</td>
              </tr>
              <tr className="centered-link-row">
                <td colSpan="2">
                  <center>
                    <a href="https://www.x-rates.com/table/?from=IDR&amount=1" target="_blank" rel="noopener noreferrer">
                      More Information
                    </a>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
