import React from "react";
import "./App.css";
import { useState } from "react";

import contacts from "./contacts.json";

const firstFive = contacts.slice(0, 5);
let theRest = contacts.slice(5);

function App() {
  const [addContact, setAddContact] = useState(firstFive);
  const [remainingCelebs, setRemainingCelebs] = React.useState(theRest);

  function randomContact() {
    if (remainingCelebs.length > 0) {
      let randomNum = Math.floor(Math.random() * remainingCelebs.length);
      //This pulls a random celebrity from remainingCelebs
      let randomCeleb = remainingCelebs[randomNum];

      //add a new celeb to our contacts list
      setAddContact(addContact.concat(randomCeleb));

      //remove that celebrity from the non-used array
      let filteredArr = remainingCelebs.filter((celeb) => {
        return celeb.id !== randomCeleb.id;
      });

      //set the remaining celebs
      setRemainingCelebs(filteredArr);
    }
  }

  const sortByName = (x) => {
    const sortedNames = x.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
    return setAddContact([...sortedNames]);
  };

  const sortByPopularity = (x) => {
    const sortedPopular = x.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    return setAddContact([...sortedPopular]);
  };

  function removeContact(contactToRemove) {
    let filteredArr = addContact.filter(function (singleContact) {
      return contactToRemove !== singleContact;
    });
    setAddContact(filteredArr);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>IronContacts</h1>
      <button onClick={() => randomContact(addContact)}>
        Add Random Contact
      </button>
      <button onClick={() => sortByName(addContact)}>Sort A-Z</button>
      <button onClick={() => sortByPopularity(addContact)}>
        Sort by Popularity (Desc)
      </button>
      <table style={{ margin: "auto" }}>
        <th>
          <h2>Picture</h2>
        </th>
        <th>
          <h2>Name</h2>
        </th>
        <th>
          <h2>Popularity&nbsp;</h2>
        </th>
        <th>
          <h2>
            Won
            <br />
            Oscar&nbsp;
          </h2>
        </th>
        <th>
          <h2>
            Won
            <br />
            Emmy
          </h2>
        </th>
        <tbody>
          {addContact.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} width="100" alt="" />
                </td>
                <td>
                  <h3>{contact.name}</h3>
                </td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🌟"}</td>
                <td>
                  <button onClick={() => removeContact(contact)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
