import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, styled, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate} from 'react-router-dom';
import { getAddressById, updateRecord } from '../../service/api';
import { statesCities } from '../constant.js'; // Importing statesCities from main.jsx

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
    state: '',
    country: '',
    city: '',
    zipCode: '',
  };

const UpdateRecord = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    streetAddress: '',
    country:'',
    city: '',
    zipCode: '',
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const recordData = await getAddressById(id);
        setFormData(recordData); // Set the fetched record data as initial form data
      } catch (error) {
        console.error('Error fetching record:', error);
      }
    };
    fetchRecord();
  }, [id]);

  //By including id in the dependency array, we're telling to React that if the id variable changes, the effect should run again.

  const validateFormData = () => {
    let isValid = true;
    const newErrors = {};

    // Validate street address
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street Address is required';
      isValid = false;
    }
     
     // Validate state
     if (formData.country === 'Select') {
      newErrors.country = 'Please select a Country';
      alert('Please select a Country');
      isValid = false;
    }
    
    if (formData.state === 'Select') {
      newErrors.state = 'Please select a State';
      alert('Please select a state');
      isValid = false;
    }

    if (formData.city === 'Select') {
      newErrors.city = 'Please select a City';
      alert('Please select a City');
      isValid = false;
    }


    // Validate zip code
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip Code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = 'Zip Code must be a 6-digit number';
      isValid = false;
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.city.trim())) {
      newErrors.city = 'City cannot contain numbers';
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
        await updateRecord(id, formData);
        alert('Data is Successfully Updated..')
        navigate('/allrecords');
      } catch (error) {
        console.error('Error updating record:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box mt={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Record
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
       
        >
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
        >
          {statesCities[formData.state]?.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
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
        <Button type="submit" variant="contained" color="success">
          Update
        </Button>
        <Button type="button" variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </StyledForm>
    </Box>
  );
};

export default UpdateRecord;
