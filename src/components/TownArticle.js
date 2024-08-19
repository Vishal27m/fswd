import React, { useState } from 'react';
import './TownArticle.css';

const TownArticle = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [article, setArticle] = useState({
    title: 'Annur',
    description: `Annur is a town Panchayat and Taluk headquarters of Annur Taluk of the Coimbatore district. It is a suburb of Coimbatore located northeast about 30 kilometers (19 miles) from the center of the city. The nearest airport is Coimbatore International Airport, which is about 27 kilometers (17 miles) away from Annur. The nearest railway station is Mettupalayam, which is about 21 kilometers (13 miles) away. Other cities/towns near Annur are Mettupalayam, which is 21 kilometers (13 miles) away in the west, Avanashi, which is 18 kilometers (11 miles) away in the east, and Punjai Puliampatti, which is about 18 kilometers (11 miles) in the north. Annur has a police station in the Karumathampatti subdivision.`,
    etymology: `The name Annur is believed to have been derived from "Vanniyur," later transformed to Anniyur and now to Annur. The myth behind the name says that, over 1000 years ago, when a small hunter hit a stone under a "Vanni" tree, it started bleeding. He was astonished and called the village people to look after this issue. Later they found a "Suyambu" Lord Shiva Idol there and built the Manneeswarar temple.`,
    economy: `Bildon steel is manufactured from Annur. This famous steel is being exported to different parts of India and abroad. There are a large number of textile mills situated in the Annur region. Pioneers in setting up textile mills in the Annur region were the KG Group founded by K Govindaswamy Naidu also known as KG. There are several educational institutions operational under KG group in Annur.`,
    geography: `Annur is located at 11.23°N 77.13°E. It has an average elevation of 338 meters (1108 feet). Annur is well connected by roads including the National Highway 209 (New NH948) (Coimbatore to Bangalore highway) and the State Highway 80 SH80 Avanashi to Mettupalayam passes through Annur.`,
    demographics: `According to the 2011 census taken by the Government of India, Annur had a population of 20,079, of which males constitute 9,971 and females constitute 10,108, giving it a lower sex ratio than the national average. Annur has a literacy rate of 80.93%, which is above the national average of 77.70%, as well as the state average of 80.09%.`,
    trivia: `The Gandhi Museum of Coimbatore is located in Sokkampalayam village in Annur. During the Indian independence movement, Mahatma Gandhi visited the village at the request of Bettaiyan, a resident of the village, and delivered a speech emphasizing the need for grassroots-level participation in the national movement, following which several villagers pledged their allegiance to the movement.`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Add your save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Revert changes if needed
    setIsEditing(false);
  };

  return (
    <div className="town-article-container">
      <div className="town-content">
        <div className="article-text">
          <h1 className="town-title">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={article.title}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              article.title
            )}
          </h1>
          <p>
            {isEditing ? (
              <textarea
                name="description"
                value={article.description}
                onChange={handleChange}
                className="edit-textarea"
              />
            ) : (
              article.description
            )}
          </p>

          <h2>Etymology</h2>
          <p>
            {isEditing ? (
              <textarea
                name="etymology"
                value={article.etymology}
                onChange={handleChange}
                className="edit-textarea"
              />
            ) : (
              article.etymology
            )}
          </p>

          <h2>Economy</h2>
          <p>
            {isEditing ? (
              <textarea
                name="economy"
                value={article.economy}
                onChange={handleChange}
                className="edit-textarea"
              />
            ) : (
              article.economy
            )}
          </p>

          <h2>Geography</h2>
          <p>
            {isEditing ? (
              <textarea
                name="geography"
                value={article.geography}
                onChange={handleChange}
                className="edit-textarea"
              />
            ) : (
              article.geography
            )}
          </p>

          <h2>Demographics</h2>
          <p>
            {isEditing ? (
              <textarea
                name="demographics"
                value={article.demographics}
                onChange={handleChange}
                className="edit-textarea"
              />
            ) : (
              article.demographics
            )}
          </p>

          <h2>Trivia</h2>
          <p>
            {isEditing ? (
              <textarea
                name="trivia"
                value={article.trivia}
                onChange={handleChange}
                className="edit-textarea"
              />
            ) : (
              article.trivia
            )}
          </p>
        </div>

        <div className="map-container">
          <iframe
            title="Annur Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15550.014606850088!2d77.13!3d11.23!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8ff4b9430ec7f%3A0x7d03bc29a01576f2!2sAnnur%2C%20Tamil%20Nadu%20641253%2C%20India!5e0!3m2!1sen!2sus!4v1691837208000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>

          <div className="additional-info">
            <h3>Annur Overview</h3>
            <table>
              <tbody>
                <tr>
                  <td>Country</td>
                  <td>India</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>Tamil Nadu</td>
                </tr>
                <tr>
                  <td>Region</td>
                  <td>Kongu Nadu</td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>Coimbatore</td>
                </tr>
                <tr>
                  <td>Metro</td>
                  <td>Coimbatore</td>
                </tr>
                <tr>
                  <td>Elevation</td>
                  <td>338 m (1,109 ft)</td>
                </tr>
                <tr>
                  <td>Population (2011)</td>
                  <td>20,079</td>
                </tr>
                <tr>
                  <td>Languages</td>
                  <td>Tamil</td>
                </tr>
                <tr>
                  <td>Time zone</td>
                  <td>UTC+5:30 (IST)</td>
                </tr>
                <tr>
                  <td>PIN</td>
                  <td>641653</td>
                </tr>
                <tr>
                  <td>Telephone code</td>
                  <td>+91-4254</td>
                </tr>
                <tr>
                  <td>Vehicle registration</td>
                  <td>TN 40</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="images-section">
            <img src="/Annur 1.png" alt="Annur View 1" className="town-image" />
            <img src="/Annur 2.png" alt="Annur View 2" className="town-image" />
            <img src="/Annur 3.png" alt="Annur View 3" className="town-image" />
          </div>
        </div>
      </div>

      <div className="buttons-container">
        {!isEditing ? (
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        ) : (
          <>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TownArticle;
