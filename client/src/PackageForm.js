import React, { useState } from 'react';
import axios from 'axios';

function PackageForm({ onPackageAdded }) {
  const [formData, setFormData] = useState({
    amount: 0,
    dailyEarningPercentage: 10,
    description: 'hello how are you ',
    expiryMonths: 3,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/packages',
        formData
      );
      console.log(
        '🚀 ~ file: PackageForm.js:22 ~ handleSubmit ~ response:',
        response
      );
      onPackageAdded(response.data); // Notify parent component of the new package
      setFormData({
        amount: 0,
        dailyEarningPercentage: 0,
        description: '',
        expiryMonths: 0,
      });
    } catch (error) {
      console.error('Error adding package:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        />
      </label>
      {/* Repeat similar fields for other package properties */}
      <button type="submit">Add Package</button>
    </form>
  );
}

export default PackageForm;
