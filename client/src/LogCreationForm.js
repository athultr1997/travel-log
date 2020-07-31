import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLog } from './API';

const LogCreationForm = ({ location, onClose }) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {      
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const log = await createLog(data);
      console.log(log);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form className="creation-form" onSubmit={handleSubmit(onSubmit)}>
      {
        error ? (
          <h3 className="error">
            {error}
          </h3>
        ) : null
      }
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register}/>
      <label htmlFor="description">Description</label>
      <textarea name="description" ref={register}/>
      <label htmlFor="rating">Rating</label>
      <input name="rating" ref={register}/>
      <label htmlFor="image">Image URL</label>
      <input name="image" ref={register}/>
      <label htmlFor="dateVisited">Date Visited</label>
      <input name="dateVisited" type="date" required ref={register}/>
      <button disabled={loading} >{ loading ? 'Loading...' : 'Create'}</button>
    </form>
  );
};

export default LogCreationForm;
