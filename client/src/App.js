// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageForm from './PackageForm';

function App() {
  const [packages, setPackages] = useState([]);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/packages');
        setPackages(response.data);
      } catch (error) {
        // Handle the error, e.g., display an error message or log it
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleWithdrawal = (packageId) => {
    // Perform a withdrawal for a package
    // axios
    //   .put(`/api/packages/${packageId}/withdraw`, { withdrawalAmount })
    //   .then((response) => {
    //     const updatedPackages = packages.map((pkg) =>
    //       pkg._id === packageId ? response.data : pkg
    //     );
    //     setPackages(updatedPackages);
    //   });
  };

  const handlePackageAdded = (newPackage) => {
    // Add the new package to the existing list
    setPackages([...packages, newPackage]);
  };

  return (
    <div>
      <h1>Package Subscription App</h1>

      <PackageForm onPackageAdded={handlePackageAdded} />

      <div>
        <h2>Packages</h2>
        <ul>
          {packages.map((pkg) => (
            <li key={pkg._id}>
              <h3>{pkg.description}</h3>
              <p>Amount: ${pkg.amount}</p>
              <p>Daily Earning: {pkg.dailyEarningPercentage}%</p>
              <p>Withdrawal Amount: ${pkg.withdrawalAmount || 0}</p>
              <button onClick={() => handleWithdrawal(pkg._id)}>
                Withdraw
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
