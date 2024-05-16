import './App.css';
import Form from '@rjsf/core';
import schema from './component/Schema.json';
import validator from '@rjsf/validator-ajv6';

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
    <div className="App">
      <h1>Registration Form</h1>
      <Form 
        schema={schema} 
        validator={validator}
        validate={validate}
        onSubmit={onSubmit} 
      />
    </div>
  );
}

export default App;
