import React, { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, styled, Select, MenuItem } from '@mui/material';
import { DataContext } from '../../context/DataProvider'; 
import { createNewEntry } from '../../service/api';
import { statesCities } from '../constant.js';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
});



const initialFormData = {
  streetAddress: '',
  country: 'Select',
  state: 'Select',
  city: 'Select',
  zipCode: '',
};

const initialErrors = {
  streetAddress: '',
  country: '',
  state: '',
  city: '',
  zipCode: '',
};

const Main = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
 
  const { account } = useContext(DataContext);

  const validateFormData = () => {
    let isValid = true;
    const newErrors = {};
  
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street Address is required';
      isValid = false;
    }
  
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip Code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = 'Zip Code must be a 6-digit number';
      isValid = false;
    }
  
    if (formData.country === 'Select') {
      newErrors.country = 'Please select a Country';
      alert('Please select a Country');
      isValid = false;
    }
    
    if (formData.state === 'Select') {
      newErrors.state = 'Please select a state';
      alert('Please select a state');
      isValid = false;
    }
    
  
    if (!formData.city.trim() || formData.city === 'Select') {
      newErrors.city = 'Please select a city';
      alert('Please select a city');
      isValid = false;
    } else {
      const citiesInState = statesCities[formData.state];
      if (!citiesInState.includes(formData.city)) {
        newErrors.city = `City does not belong to ${formData.state}`;
        isValid = false;
      }
    }
  
    setErrors(newErrors);
    return isValid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      try {
        const response = await createNewEntry({ ...formData, username: account });
        console.log('New entry created:', response.data);
        setFormData(initialFormData);
        alert("New Entry is Successfully Saved..")
        setErrors(initialErrors);
      } catch (error) {
        console.error('Error creating new entry:', error);
        alert('Error creating new entry');
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert('An error occurred while creating the address.');
        }
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'state') {
    const selectedState = value;
    const selectedCity = selectedState === 'Select' ? 'Select' : statesCities[selectedState][0];
    setFormData({ ...formData, state: selectedState, city: selectedCity });
    setErrors({ ...errors, state: '' });
  } else {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }
};

  return (
    <Box mt={4}>
      <Typography variant="h4" align="center" gutterBottom>
        New Entry
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="Street Address"
          variant="outlined"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          error={Boolean(errors.streetAddress)}
          helperText={errors.streetAddress}
        />
        <label style={{fontSize : '14px', marginLeft : '10px'}}>Country</label>
        <Select
            label="Country"
            variant="outlined"
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={Boolean(errors.country)}
            helperText={errors.country}
            
          >
          <MenuItem value="Select">Select</MenuItem>
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="United State">United State</MenuItem>
        </Select>
         
        <label style={{fontSize : '14px', marginLeft : '10px'}}>State</label>
        <Select
          label="State"
          variant="outlined"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={Boolean(errors.state)}
          helperText={errors.state}
        >
        <MenuItem value="Select">Select</MenuItem>
            {formData.country === 'India' ?
              ['Maharashtra', 'Gujarat', 'Punjab', 'Rajasthan'].map(state => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              )) :
              formData.country === 'United State' ?
                ['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Connecticut'].map(state => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                )) :
                null
            }
        </Select>

        <label style={{fontSize : '14px', marginLeft : '10px'}}>City</label>
        <Select
            label="City"
            variant="outlined"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={Boolean(errors.city)}
            helperText={errors.city}
          >
            {statesCities[formData.state].map(city => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>

        <TextField
          label="Zip Code"
          variant="outlined"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          error={Boolean(errors.zipCode)}
          helperText={errors.zipCode}
        />
        <Box display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button type="button" variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </StyledForm>
    </Box>
  );
};

export default Main;
