import React, { useState, useEffect } from 'react';
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import { server } from '../index';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');

  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const changePage = page => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    getExchanges();
  }, [currency, page]);

  if (error) return <ErrorComponent message={'Error while fetching coins'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={'6'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map((i, index) => {
              return (
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  symbol={i.symbol}
                  price={i.current_price}
                  url={i.url}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={'full'} overflowX={'auto'} p={'4'}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={'blackAlpha.900'}
                color={'white'}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coin;
