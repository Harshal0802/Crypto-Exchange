import React from 'react';
import { VStack, Image, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CoinCard = ({ name, image, symbol, price, id ,currencySymbol="₹"}) => {
  return (
    <Link to={`/coins/${id}`}>
      <VStack
        w={'52'}
        shadow={'lg'}
        p={'4'}
        borderRadius={'lg'}
        transition={'all 0.3s'}
        m={'4'}
        css={{
          '&:hover': {
            transfrom: 'scale(1.1)',
          },
        }}
      >
        <Image
          src={image}
          w={'10'}
          h={'10'}
          objectFit={'contain'}
          alt={'Exchange'}
        />
        <Heading size={'md'} noOfLines={1}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price?`${currencySymbol}${price}`:"NA"}</Text>
      </VStack>
    </Link>
  );
};

export default CoinCard;
