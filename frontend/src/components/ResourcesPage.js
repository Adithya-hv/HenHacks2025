import React, { useEffect, useState } from "react";
import $ from "jquery";
import "../App.css";

import ironImage from "../img/iron.png";
import goldImage from "../img/gold.png";
import bronzeImage from "../img/bronze.png";
import coalImage from "../img/coal.png";
import cowImage from "../img/cow.png";
import logImage from "../img/log.png";
import wheatImage from "../img/wheat.jpg";
import coinImage from "../img/coin.png";

const ResourcesPage = () => {
  const [resources, setResources] = useState({
    coin: { amount: 50, price: 10 },
    iron: { amount: 50, price: 10 },
    bronze: { amount: 30, price: 15 },
    gold: { amount: 10, price: 50 },
    coal: { amount: 75, price: 5 },
    cow: { amount: 20, price: 20 },
    log: { amount: 40, price: 8 },
    wheat: { amount: 60, price: 3 },
  });

  const handleChange = (e, resource, field) => {
    setResources({
      ...resources,
      [resource]: {
        ...resources[resource],
        [field]: parseFloat(e.target.value),
      },
    });
  };

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
            <th>Price</th>
            <th>Equivalent Gold</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={coinImage} alt="Coins" width="50" height="55" />
            </td>
            <td>
              <input
                type="number"
                value={resources.coin.amount}
                onChange={(e) => handleChange(e, "coin", "amount")}
              />
            </td>
            <td>{resources.coin.price}</td>
            <td>{resources.coin.amount * resources.coin.price}</td>
            <td>+0.5 ↑</td>
          </tr>
          <tr>
            <td>
              <img src={ironImage} alt="Iron" width="50" height="55" />
            </td>
            <td>
              <input
                type="number"
                value={resources.iron.amount}
                onChange={(e) => handleChange(e, "iron", "amount")}
              />
            </td>
            <td>{resources.iron.price}</td>
            <td>{resources.iron.amount * resources.iron.price}</td>
            <td>+0.5 ↑</td>
          </tr>
          <tr>
            <td>
              <img src={bronzeImage} alt="Bronze" width="50" height="50" />
            </td>
            <td>
              <input
                type="number"
                value={resources.bronze.amount}
                onChange={(e) => handleChange(e, "bronze", "amount")}
              />
            </td>
            <td>{resources.bronze.price}</td>
            <td>{resources.bronze.amount * resources.bronze.price}</td>
            <td>-1.2 ↓</td>
          </tr>
          <tr>
            <td>
              <img src={goldImage} alt="Gold" width="45" height="45" />
            </td>
            <td>
              <input
                type="number"
                value={resources.gold.amount}
                onChange={(e) => handleChange(e, "gold", "amount")}
              />
            </td>
            <td>{resources.gold.price}</td>
            <td>{resources.gold.amount * resources.gold.price}</td>
            <td>+2.0 ↑</td>
          </tr>
          <tr>
            <td>
              <img src={coalImage} alt="Coal" width="50" height="50" />
            </td>
            <td>
              <input
                type="number"
                value={resources.coal.amount}
                onChange={(e) => handleChange(e, "coal", "amount")}
              />
            </td>
            <td>{resources.coal.price}</td>
            <td>{resources.coal.amount * resources.coal.price}</td>
            <td>-0.3 ↓</td>
          </tr>
          <tr>
            <td>
              <img src={cowImage} alt="Cow" width="50" height="50" />
            </td>
            <td>
              <input
                type="number"
                value={resources.cow.amount}
                onChange={(e) => handleChange(e, "cow", "amount")}
              />
            </td>
            <td>{resources.cow.price}</td>
            <td>{resources.cow.amount * resources.cow.price}</td>
            <td>+1.0 ↑</td>
          </tr>
          <tr>
            <td>
              <img src={logImage} alt="Log" width="50" height="50" />
            </td>
            <td>
              <input
                type="number"
                value={resources.log.amount}
                onChange={(e) => handleChange(e, "log", "amount")}
              />
            </td>
            <td>{resources.log.price}</td>
            <td>{resources.log.amount * resources.log.price}</td>
            <td>-0.5 ↓</td>
          </tr>
          <tr>
            <td>
              <img src={wheatImage} alt="Wheat" width="50" height="50" />
            </td>
            <td>
              <input
                type="number"
                value={resources.wheat.amount}
                onChange={(e) => handleChange(e, "wheat", "amount")}
              />
            </td>
            <td>{resources.wheat.price}</td>
            <td>{resources.wheat.amount * resources.wheat.price}</td>
            <td>+0.8 ↑</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResourcesPage;
