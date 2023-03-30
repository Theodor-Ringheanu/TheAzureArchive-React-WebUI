import React, { useState, useEffect } from "react";
import "../../Styles/App.css"
import Navbar from "../../Components/Navbar.js";
import axios from "axios";
import Footer from "../../Components/Footer.js";

const AdminPage = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7080/api/EmailsSubscribed")
      .then((response) => {
        setEmails(response.data.value);
      })
      .catch(() => {
        alert('Failed to fetch articles!');
      });
  }, []);

  const handleEdit = (emailId) => {
    setEmails((prevEmails) => {
      const updatedEmails = prevEmails.map((email) => {
        if (email.idEmail === emailId) {
          return { ...email, isEditable: true };
        } else {
          return { ...email, isEditable: false };
        }
      });
      return updatedEmails;
    });
  };

  const handleSave = (emailId, updatedEmail) => {
    axios
      .put(`https://localhost:7080/api/EmailsSubscribed/${emailId}`, updatedEmail)
      .then(() => {
        setEmails((prevEmails) => {
          const updatedEmails = prevEmails.map((email) => {
            if (email.idEmail === emailId) {
              return { ...email, ...updatedEmail, isEditable: false };
            }
            return email;
          });
          return updatedEmails;
        });
      })
      .catch(() => {
        alert('Failed to update email!');
      });
  };

  return (
    <div>

      <Navbar />

      <div className="app">
        <h1 style={{ padding: "5%" }
        }>Emails</h1>
      </div>

      <div className="app">
        <table style={{ color: 'white' }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.idEmail}>
                <td>
                  <input
                    type="text"
                    value={email.email}
                    onChange={(event) => {
                      const updatedEmails = [...emails];
                      const index = updatedEmails.findIndex((e) => e.idEmail === email.idEmail);
                      const updatedEmail = { ...updatedEmails[index], email: event.target.value };
                      updatedEmails[index] = updatedEmail;
                      setEmails(updatedEmails);
                    }}
                  />
                  <input
                    type="checkbox"
                    checked={email.isSubscribed}
                    onChange={(event) => {
                      const updatedEmails = [...emails];
                      const index = updatedEmails.findIndex((e) => e.idEmail === email.idEmail);
                      const updatedEmail = { ...updatedEmails[index], isSubscribed: event.target.checked };
                      updatedEmails[index] = updatedEmail;
                      setEmails(updatedEmails);
                    }}
                  />
                  <input
                    type="text"
                    value={email.dateAdded}
                    onChange={(event) => {
                      const updatedEmails = [...emails];
                      const index = updatedEmails.findIndex((e) => e.idEmail === email.idEmail);
                      const updatedEmail = { ...updatedEmails[index], dateAdded: event.target.value };
                      updatedEmails[index] = updatedEmail;
                      setEmails(updatedEmails);
                    }}
                  />
                </td>
                <td>
                  {email.isEditable ? (
                    <>
                      <button
                        onClick={() => {
                          handleSave(email.idEmail, email);
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEmails((prevEmails) => {
                            const updatedEmails = prevEmails.map((email) => {
                              return { ...email, isEditable: false };
                            });
                            return updatedEmails;
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleEdit(email.idEmail);
                      }}
                    >
                      Edit
                    </button>

                  )}
                  <button
                    onClick={() => {
                      axios
                        .delete(`https://localhost:7080/api/EmailsSubscribed/${email.idEmail}`)
                        .then(() => {
                          setEmails((prevEmails) =>
                            prevEmails.filter((e) => e.idEmail !== email.idEmail)
                          );
                        })
                        .catch(() => {
                          alert('Failed to delete email!');
                        });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Footer />

    </div >
  );
};

export default AdminPage;
