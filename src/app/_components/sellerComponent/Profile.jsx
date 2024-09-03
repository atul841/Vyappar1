// import { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const Profile = ({ sellerId }) => {
//   const [profileData, setProfileData] = useState(null);
//   const [editMode, setEditMode] = useState({});
//   const [formData, setFormData] = useState({
//     shopName: '',
//     category: '',
//     description: '',
//     contactEmail: '',
//     contactPhone: '',
//     address: '',
//     ownerName: '',
//     ownerEmail: '',
//     ownerPhone: '',
//     operatingHours: {
//       monday: '',
//       tuesday: '',
//       wednesday: '',
//       thursday: '',
//       friday: '',
//       saturday: '',
//       sunday: ''
//     },
//     location: { latitude: '', longitude: '' },
//     logo: '',
//     documents: []
//   });

// useEffect(() => {
//   if (typeof window !== "undefined" && 'geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setFormData((prevData) => ({
//           ...prevData,
//           location: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           },
//         }));
//       },
//       (error) => console.error(error),
//       { enableHighAccuracy: true }
//     );
//   }
// }, []);


//   useEffect(() => {
//     // Simulate fetching data
//     const mockProfileData = {
//       shopName: 'Sample Shop',
//       category: 'Electronics',
//       description: 'A great place to buy electronics',
//       contactEmail: 'shop@example.com',
//       contactPhone: '123-456-7890',
//       address: '123 Market St',
//       ownerName: 'John Doe',
//       ownerEmail: 'owner@example.com',
//       ownerPhone: '987-654-3210',
//       operatingHours: {
//         monday: '09:00 am - 09:00 pm',
//         tuesday: '09:00 am - 09:00 pm',
//         wednesday: '09:00 am - 09:00 pm',
//         thursday: '09:00 am - 09:00 pm',
//         friday: '09:00 am - 09:00 pm',
//         saturday: '10:00 am - 04:00 pm',
//         sunday: 'Closed'
//       },
//       location: { latitude: '40.7128', longitude: '-74.0060' },
//       logo: 'https://via.placeholder.com/150',
//       documents: ['doc1.pdf', 'doc2.pdf']
//     };

//     setProfileData(mockProfileData);
//     setFormData(mockProfileData);
//   }, [sellerId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleOperatingHoursChange = (day, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       operatingHours: { ...prevData.operatingHours, [day]: value },
//     }));
//   };

//   const handleLocationChange = (key, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       location: { ...prevData.location, [key]: value },
//     }));
//   };

//   const handleEditClick = (field) => {
//     setEditMode((prev) => ({ ...prev, [field]: true }));
//   };

//   const handleCancelClick = (field) => {
//     setEditMode((prev) => ({ ...prev, [field]: false }));
//     // Reset field value to original profile data
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: profileData[field],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate updating data
//     setProfileData(formData);
//     setEditMode({});
//   };

//   function LocationMarker() {
//     const map = useMapEvents({
//       click(e) {
//         setFormData((prevData) => ({
//           ...prevData,
//           location: {
//             latitude: e.latlng.lat,
//             longitude: e.latlng.lng,
//           }
//         }));
//       }
//     });

//     return formData.location.latitude !== '' ? (
//       <Marker position={[formData.location.latitude, formData.location.longitude]} />
//     ) : null;
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
//         {profileData && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {Object.keys(profileData).map((key) => {
//               if (key === 'operatingHours' || key === 'location' || key === 'documents') return null;
//               return (
//                 <div key={key} className="flex items-center space-x-4 mb-4">
//                   <div className="flex-1">
//                     {!editMode[key] ? (
//                       <p className="text-gray-700 mb-4">
//                         <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {profileData[key]}
//                       </p>
//                     ) : (
//                       <input
//                         type={key === 'contactEmail' || key === 'ownerEmail' ? 'email' : 'text'}
//                         name={key}
//                         value={formData[key] || ''}
//                         onChange={handleInputChange}
//                         placeholder={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
//                         className="w-full p-3 border border-gray-300 rounded-lg"
//                       />
//                     )}
//                   </div>
//                   {!editMode[key] ? (
//                     <button
//                       type="button"
//                       onClick={() => handleEditClick(key)}
//                       className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
//                     >
//                       Edit
//                     </button>
//                   ) : (
//                     <>
//                       <button
//                         type="submit"
//                         className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
//                       >
//                         Save
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => handleCancelClick(key)}
//                         className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   )}
//                 </div>
//               );
//             })}

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Operating Hours</h4>
//               <div className="space-y-2">
//                 {Object.keys(formData.operatingHours).map((day) => (
//                   <div key={day} className="flex items-center space-x-4 mb-2">
//                     <div className="flex-1">
//                       {!editMode[day] ? (
//                         <p className="text-gray-700 mb-4">
//                           <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {formData.operatingHours[day]}
//                         </p>
//                       ) : (
//                         <input
//                           type="text"
//                           value={formData.operatingHours[day]}
//                           onChange={(e) => handleOperatingHoursChange(day, e.target.value)}
//                           placeholder={`${day.charAt(0).toUpperCase() + day.slice(1)} Hours`}
//                           className="w-full p-3 border border-gray-300 rounded-lg"
//                         />
//                       )}
//                     </div>
//                     {!editMode[day] ? (
//                       <button
//                         type="button"
//                         onClick={() => handleEditClick(day)}
//                         className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
//                       >
//                         Edit
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           type="submit"
//                           className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
//                         >
//                           Save
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => handleCancelClick(day)}
//                           className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
//               <input
//                 type="number"
//                 name="latitude"
//                 value={formData.location.latitude || ''}
//                 onChange={(e) => handleLocationChange('latitude', e.target.value)}
//                 placeholder="Latitude"
//                 className="w-full p-3 border border-gray-300 rounded-lg mb-2"
//               />
//               <input
//                 type="number"
//                 name="longitude"
//                 value={formData.location.longitude || ''}
//                 onChange={(e) => handleLocationChange('longitude', e.target.value)}
//                 placeholder="Longitude"
//                 className="w-full p-3 border border-gray-300 rounded-lg mb-2"
//               />
//             </div>

//             <div className="h-64 mb-4">
//               <MapContainer
//                 center={[formData.location.latitude || 0, formData.location.longitude || 0]}
//                 zoom={13}
//                 style={{ height: '100%', width: '100%' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <LocationMarker />
//               </MapContainer>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Logo</h4>
//               <input
//                 type="text"
//                 name="logo"
//                 value={formData.logo || ''}
//                 onChange={handleInputChange}
//                 placeholder="Logo URL"
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//               />
//               {formData.logo && <img src={formData.logo} alt="Logo" className="mt-2 h-20 w-20 rounded-full" />}
//             </div>

//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-800 mb-2">Documents</h4>
//               <p>{formData.documents.join(', ')}</p>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;






























import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Profile = ({ sellerId }) => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    operatingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    location: { latitude: '', longitude: '' },
    logo: '',
    documents: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Simulate fetching data
        const mockProfileData = {
          shopName: 'Sample Shop',
          category: 'Electronics',
          description: 'A great place to buy electronics',
          contactEmail: 'shop@example.com',
          contactPhone: '123-456-7890',
          address: '123 Market St',
          ownerName: 'John Doe',
          ownerEmail: 'owner@example.com',
          ownerPhone: '987-654-3210',
          operatingHours: {
            monday: '09:00 am - 09:00 pm',
            tuesday: '09:00 am - 09:00 pm',
            wednesday: '09:00 am - 09:00 pm',
            thursday: '09:00 am - 09:00 pm',
            friday: '09:00 am - 09:00 pm',
            saturday: '10:00 am - 04:00 pm',
            sunday: 'Closed'
          },
          location: { latitude: '40.7128', longitude: '-74.0060' },
          logo: 'https://via.placeholder.com/150',
          documents: ['doc1.pdf', 'doc2.pdf']
        };

        setProfileData(mockProfileData);
        setFormData(mockProfileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [sellerId]);

  useEffect(() => {
    if (typeof window !== "undefined" && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOperatingHoursChange = (day, value) => {
    setFormData((prevData) => ({
      ...prevData,
      operatingHours: { ...prevData.operatingHours, [day]: value },
    }));
  };

  const handleLocationChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      location: { ...prevData.location, [key]: value },
    }));
  };

  const handleEditClick = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
  };

  const handleCancelClick = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    // Reset field value to original profile data
    setFormData((prevData) => ({
      ...prevData,
      [field]: profileData[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate updating data
      setProfileData(formData);
      setEditMode({});
    } catch (error) {
      console.error('Error updating profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setFormData((prevData) => ({
          ...prevData,
          location: {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          }
        }));
      }
    });

    return formData.location.latitude !== '' ? (
      <Marker position={[formData.location.latitude, formData.location.longitude]} />
    ) : null;
  }

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
        {profileData && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(profileData).map((key) => {
              if (key === 'operatingHours' || key === 'location' || key === 'documents') return null;
              return (
                <div key={key} className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    {!editMode[key] ? (
                      <p className="text-gray-700 mb-4">
                        <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {profileData[key]}
                      </p>
                    ) : (
                      <input
                        type={key === 'contactEmail' || key === 'ownerEmail' ? 'email' : 'text'}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        placeholder={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    )}
                  </div>
                  {!editMode[key] ? (
                    <button
                      type="button"
                      onClick={() => handleEditClick(key)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancelClick(key)}
                        className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              );
            })}

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Operating Hours</h4>
              <div className="space-y-2">
                {Object.keys(formData.operatingHours).map((day) => (
                  <div key={day} className="flex items-center space-x-4 mb-2">
                    <div className="flex-1">
                      {!editMode[day] ? (
                        <p className="text-gray-700 mb-4">
                          <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {formData.operatingHours[day]}
                        </p>
                      ) : (
                        <input
                          type="text"
                          value={formData.operatingHours[day]}
                          onChange={(e) => handleOperatingHoursChange(day, e.target.value)}
                          placeholder={`${day.charAt(0).toUpperCase() + day.slice(1)} Hours`}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                      )}
                    </div>
                    {!editMode[day] ? (
                      <button
                        type="button"
                        onClick={() => handleEditClick(day)}
                        className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancelClick(day)}
                          className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
              <MapContainer center={[parseFloat(formData.location.latitude) || 51.505, parseFloat(formData.location.longitude) || -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
            </div>
            
            {/* Include other necessary fields such as logo, documents, etc. */}
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
