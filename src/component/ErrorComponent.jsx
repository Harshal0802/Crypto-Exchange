import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <Alert
      status="error"
      position={'fixed'}
      bottom={'4'}
      left={'50%'}
      transfrom={'translateX(-50%)'}
      w={'container.lg'}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default ErrorComponent;
