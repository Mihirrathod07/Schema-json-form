import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Form } from '@rjsf/material-ui';
import { styled } from '@mui/material/styles';
import schema from './component/Schema.json';
import validator from '@rjsf/validator-ajv6';

const theme = createTheme();

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
}));

const FormContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
}));

const Title = styled('h1')(({ theme }) => ({
  marginBottom: '20px',
  color: theme.palette.primary.main,
}));

const SubmitButton = styled('button')(({ theme }) => ({
  marginTop: '20px',
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function App() {
  const onSubmit = ({ formData }) => {
    console.log("Form data submitted: ", formData);
  };

  // Custom validation function
  const validate = (formData, errors) => {
    if (formData.age && (formData.age < 0 || formData.age > 120)) {
      errors.age.addError("Age must be between 0 and 120.");
    }
    if (formData.password && formData.password.length < 3) {
      errors.password.addError("Password must be at least 3 characters long.");
    }
    if (formData.telephone && formData.telephone.length < 10) {
      errors.telephone.addError("Telephone must be at least 10 digits long.");
    }
    return errors;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <FormContainer>
          <Title>Registration Form</Title>
          <Form 
            schema={schema} 
            validator={validator}
            validate={validate}
            onSubmit={onSubmit} 
            uiSchema={{
              "ui:submitButtonOptions": {
                "submitText": "Submit",
                "norender": false,
                "props": {
                  "className": SubmitButton
                }
              }
            }}
          />
        </FormContainer>
      </Root>
    </ThemeProvider>
  );
}

export default App;
