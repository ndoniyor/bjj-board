import React, { useEffect } from 'react'
import EditCard from '../components/EditCard'
import { useState } from 'react';
import { supabase } from '../src/client';
import { useParams } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

export default function EditView() {
  const [keyAccess, setKeyAccess] = useState(0);
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  const {id} = useParams();

  const getKey = async () => {
    const key = await supabase
      .from("posts")
      .select("key")
      .eq("id", parseInt(id))
      .single();
    setKey(key.data.key);
    console.log(key.data.key)
  }
  const handleSubmit = () =>{
    if(password === key){
      setKeyAccess(2);
    }
    else{
      setKeyAccess(1);
    }
  }
  useEffect(() => {
    getKey();
  }, [])

  return (
    <div>
      {(keyAccess === 0 || keyAccess === 1) ? 
      <Form>
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            id="key-field"
            placeholder="Enter password to edit post"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </Form.Group>
        <Button variant="outline-light" color='#fffff' className="m-2" onClick={handleSubmit}>Submit</Button>
      </Form> :
      <EditCard/>}
      {keyAccess === 1 ? <p style={{color: 'red'}}>Incorrect password</p> : null}
    </div>
  )
}
