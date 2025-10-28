import React from 'react';
import { Box } from '@mui/material';
import { CustomInput } from '../../components/Elements';
import adminConstants from '../../constants/adminConstants';

const AddOrEditAdminInformationForm = ({ values, handleChange, handleBlur, touched, errors, dataCompanyMaster, isEditMode }) => {
  // Mendapatkan data user dari localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  
  // Conditional rendering berdasarkan role
  const isSuperAdmin = user?.role === 'Superadmin';
  
  return (
    <Box component="form">
      <Box sx={{ display: 'flex', gap: 2 }}>
        <CustomInput 
          label={adminConstants.firstNameLabel}
          type="text"
          name="first_name"
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.first_name && Boolean(errors.first_name)}
          helperText={touched.first_name && errors.first_name}
          fullWidth
        />
        <CustomInput 
          label={adminConstants.lastNameLabel}
          type="text"
          name="last_name"
          value={values.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.last_name && Boolean(errors.last_name)}
          helperText={touched.last_name && errors.last_name}
          fullWidth
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <CustomInput 
          label={adminConstants.usernameLabel}
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
          fullWidth
        />
        <CustomInput 
          label={adminConstants.emailLabel}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          fullWidth
        />
      </Box>
      
      {/* Tampilkan password field hanya jika bukan edit mode */}
      {!isEditMode && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CustomInput
            label={adminConstants.passwordLabel}
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
          />
          <CustomInput
            label={adminConstants.confirmPasswordLabel}
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            fullWidth
          />
        </Box>
      )}
      
      {/* Conditional rendering untuk Superadmin */}
      {isSuperAdmin && (
        <Box>
          <CustomInput
            label={adminConstants.companyNameLabel}
            type="select"
            name="id_company"
            value={values.id_company}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.id_company && Boolean(errors.id_company)}
            helperText={touched.id_company && errors.id_company}
            fullWidth
            options={dataCompanyMaster?.map((company) => ({
              value: company.id_company,
              label: company.company_name,
              key: company.id_company,
            }))}
          />
        </Box>
      )}
    </Box>
  );
};

export default AddOrEditAdminInformationForm;
