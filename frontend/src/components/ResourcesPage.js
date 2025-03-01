import React, { useEffect } from 'react';
import $ from 'jquery'; // Import jQuery
import '../App.css';

const ResourcesPage = () => {
  useEffect(() => {
    $("td:contains('↑')").addClass("up-arrow");
    $("td:contains('↓')").addClass("down-arrow");
  }, []); // Run only once after component mounts

  return (
    <div className="resources-page">
      <h1>Resources Page</h1>
      <p>This is the resources page of the Guild Management AI application.</p>
      <table border="1">
        <thead>
          <tr>
            <th>Resource</th>
            <th>Amount</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Iron</td>
            <td>50</td>
            <td>+0.5 ↑</td>
          </tr>
          <tr>
            <td>Gold</td>
            <td>30</td>
            <td>-1.2 ↓</td>
          </tr>
          <tr>
            <td>Diamond</td>
            <td>10</td>
            <td>+2.0 ↑</td>
          </tr>
          <tr>
            <td>Coal</td>
            <td>75</td>
            <td>-0.3 ↓</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesPage;
