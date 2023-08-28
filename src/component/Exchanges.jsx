import React, { useState, useEffect } from 'react';
import { server } from '../index';
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getExchanges = async () => {
        try {
            const { data } = await axios.get(`${server}/exchanges`);
            setExchanges(data);
            setLoading(false);
      
        } catch (error) {
            setError(true);
            setLoading(false);            
        }
    };
    getExchanges();
  }, []);

  if(error) return <ErrorComponent message={"Error while fetching exchanges"} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
            {exchanges.map(i => {
              return (
                <ExchangesCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangesCard = ({ name, image, rank, url }) => {
  return (
    <a href={url} target={'blank'}>
      <VStack
        w={'52'}
        shadow={'lg'}
        p={'8'}
        borderRadius={'lg'}
        transition={"all 0.3s"}
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
