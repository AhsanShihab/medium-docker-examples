import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);
  const [isError, setIsError] = useState(false);
  const [contactList, setContactList] = useState([]);

  // function for fetching contact list from server
  const fetchContacts = () => {
    setIsFetchingContacts(true);
    return fetch("api/contacts")
      .then((response) => response.json())
      .then((data) => setContactList(data))
      .then(() => setIsFetchingContacts(false))
      .catch((err) => {
        console.log("there was an error while fetching contacts", err);
        setIsError(true);
        setIsFetchingContacts(false);
      });
  };

  const addContact = async () => {
    // sending the data to server
    const response = await fetch("api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });

    // checking if the response is 201 (created) or not
    if (response.status !== 201) {
      alert("Contact could not be added");
      return;
    }

    // resetting the form
    setName("");
    setEmail("");
    setPhone("");

    // fetching updated list
    await fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="App">
      <p>
        <em>(Made with React, FastAPI and MySQL in Docker!)</em>
      </p>
      <h1>Contact Book</h1>
      <h3>Add New</h3>
      <div>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="text"
          name="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          placeholder="Phone"
          onChange={(event) => setPhone(event.target.value)}
        />
        <button onClick={() => addContact()}>Add</button>
      </div>

      <h3>Contacts</h3>

      {isFetchingContacts ? (
        <p>
          <em>Fetching contacts ...</em>
        </p>
      ) : isError ? (
        <p>There was an error while fetching contacts</p>
      ) : contactList.length === 0 ? (
        <p>
          <em>You have no contacts yet</em>
        </p>
      ) : (
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>

          {contactList.map((contact) => (
            <tr>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default App;
