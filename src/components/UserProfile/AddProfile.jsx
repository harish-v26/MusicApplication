import React, { useContext, useState } from 'react'
import { AuthUserContext } from '../../context/AuthContextApi'
import toast from 'react-hot-toast';
import Languages from "./JSON/languages.json"
import Cities from "./JSON/cities.json"
import Countries from "./JSON/countries.json"
import States from "./JSON/states.json"
import { doc, setDoc } from 'firebase/firestore';
import { __DB } from '../../backend/firebase_config';
import { useLocation, useNavigate } from 'react-router-dom';

const AddProfile = () => {
  let {authUser} = useContext(AuthUserContext);
  let navigate = useNavigate();
  let location = useLocation();

  let [userDetails, setUserDetails]=useState({
    username:location?.state?.username,
    contactNumber:location?.state?.contactNumber,
    gender:location?.state?.gender,
    dob:location?.state?.dob,
    age:location?.state?.age,
    lang:location?.state?.lang,
    country:location?.state?.country,
    state:location?.state?.state,
    city:location?.state?.city,
    address:location?.state?.address,
    role:"user"
  });

  //! Destructuring the userDetails

  let {username,contactNumber,gender,dob,age,lang,country,state,city,address}=userDetails;

  let handleInputChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setUserDetails({...userDetails, [name]:value});
  };

  let handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      //! Extracting 4 properties from the authUser
      let {displayName, photoURL, email, uid}=authUser;

      //! Create an object to send inside the database
      //! Payload object
      //! In the programming language, the actual object is payload

      let payload = {
        ...userDetails,
        displayName,
        photoURL,
        email,
        uid
      };

      //! Step-1: create a document reference inside the database (Cloud Firestore)

      let user_profile_collection = doc(__DB, "user_details",uid);

      //! Step-2: Set or store the data inside the database
      await setDoc(user_profile_collection, payload);
      navigate("/user/profile");
      toast.success("User details has been updated successfully");
    } catch (error) {
      toast.error(error.code.slice(5));
      console.log(error);
    }

  };
  console.log(userDetails);

  return (
    <section className='w-[100%] h-[calc(100vh-70px)] flex justify-center items-center pt-[70px] text-white'>
      <div className='w-[80%] bg-gray-700 flex flex-col justify-center p-2 rounded'>
        <header className='w-full h-[90px] bg-gray-900 rounded-lg flex flex-col gap-2 justify-center items-center'>
          <h1 className='text-white text-3xl font-bold'>Add User Details</h1>
        </header>
        <form onSubmit={handleSubmit}> 
          <main className="w-[100%] flex flex-col">
            <aside className="w-full">
              <article className="flex gap-3 py-2 px-6">
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label htmlFor="username" className='text-lg py-1 font-semibold'>Name</label>
                  <input name='username' 
                    id='username' 
                    type="text"  
                    onChange={handleInputChange}
                    value={username} 
                    className="border w-[230px] h-[30px] border-gray-600 rounded text-gray-300 px-3"
                  />
                </div>
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label htmlFor="contactNumber" className="text-lg font-semibold py-1">Contact</label>
                  <input name='contactNumber' 
                    id='contactNumber'  
                    type="tel" 
                    onChange={handleInputChange} 
                    value={contactNumber} 
                    className="border w-[230px] h-[30px] border-gray-600 rounded text-gray-300 px-3"
                  />
                </div>
                <div className=" w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label htmlFor="gender" className="text-lg font-semibold py-1">Gender</label>
                  <div className="border w-[230px] flex justify-evenly  h-[30px] border-gray-600 rounded text-gray-300 px-3">
                      <input type="radio" name="gender" value="Male" onChange={handleInputChange} checked={gender === "Male"}/>Male
                      <input type="radio" name="gender" value="Female" onChange={handleInputChange} checked={gender === "Female"}/> Female
                      <input type="radio" name="gender" value="Others" onChange={handleInputChange} checked ={gender === "Others"}/> Others
                  </div>
                </div>
              </article>
              <article className="flex gap-3 py-2 px-6">
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label htmlFor="dob" className='font-semibold text-lg py-1'>DOB</label>
                  <input 
                    name='dob' 
                    id='dob' 
                    type="date" 
                    className='border w-[230px] h-[30px] border-gray-600 rounded text-gray-300 px-3' 
                    onChange={handleInputChange}
                    value={dob}
                  />
                </div>
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label htmlFor="age" className='text-lg py-1 font-semibold'>Age</label>
                  <input 
                      name='age' 
                      id='age' 
                      type="number" 
                      className="border w-[230px] h-[30px] border-gray-600 rounded text-gray-300 px-3"
                      onChange={handleInputChange} 
                      value={age}
                  />
                </div>
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label className='text-lg py-1 font-semibold' htmlFor="lang">Language</label>
                  <input 
                    name='lang' 
                    id='lang' 
                    type="text" 
                    className="border w-[180px] h-[30px] border-gray-600 rounded text-gray-300 px-3" 
                    list='langList' 
                    onChange={handleInputChange} 
                    value={lang}
                  />
                  <datalist id='langList'>
                    {
                      Languages.map((language,index)=>{
                        return <option key={index}>{language}</option>
                      })
                    }
                  </datalist>
                </div>
              </article>
              <article className="flex gap-3 py-2 px-6">
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label htmlFor="country" className='text-lg font-semibold py-1'>Country</label>
                    <input 
                      name='country' 
                      id='country' 
                      type="text" 
                      className='border w-[230px] h-[30px] border-gray-600 rounded text-gray-300 px-3' 
                      list='countryList' 
                      onChange={handleInputChange}
                      value={country}
                    />
                    <datalist id='countryList'>
                      {
                        Countries.map((country,index)=>{
                          return <option key={index}>{country}</option>
                        })
                      }
                    </datalist>
                </div>
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                <label htmlFor="state" className='text-lg font-semibold py-1'>State</label>
                  <input 
                    name='state' 
                    id='state' type="text" 
                    className='border w-[230px] h-[30px] border-gray-600 rounded text-gray-300 px-3' 
                    list='stateList' 
                    onChange={handleInputChange} 
                    value={state}
                  />
                  <datalist id='stateList'>
                    {
                      States.map((state,index)=>{
                        return <option key={index}>{state}</option>
                      })
                    }
                  </datalist>
                </div>
                <div className="w-[300px] flex items-center gap-2 bg-gray-800 p-4 rounded">
                <label className='text-lg font-semibold py-1' htmlFor="city">City</label>
                    <input 
                      name='city' 
                      id='city' 
                      type="text" 
                      className="border w-[230px] h-[30px] border-gray-600 rounded text-gray-300 px-3" 
                      list='cityList' 
                      onChange={handleInputChange} 
                      value={city}
                    />
                    <datalist id='cityList'>
                      {
                        Cities.map((city,index)=>{
                          return <option key={index}>{city}</option>
                        })
                      }
                    </datalist>
                </div>
              </article>
              <article className="flex py-2 px-6">
                <div className="flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <label className='text-lg font-semibold py-1' htmlFor="address">Address</label>
                  <textarea 
                    className="border w-[810px] h-[60px] border-gray-600 rounded text-gray-300 px-3" 
                    name="address" 
                    id="address" 
                    onChange={handleInputChange} 
                    value={address}
                  >
                  </textarea>
                </div>
              </article>
              <article className="flex justify-center py-2 px-6">
                <button className='w-[200px] border bg-blue-600 text-lg rounded-lg cursor-pointer font-semibold hover:bg-blue-700'>
                  Add User
                </button>
              </article>
            </aside>
          </main>
        </form>
        </div>
    </section>
  )
};

export default AddProfile;