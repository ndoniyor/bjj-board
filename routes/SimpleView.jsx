import React from 'react'
import { useEffect, useState } from 'react';
import { supabase } from '../src/client';
import {Container} from 'react-bootstrap';
import SimpleCard from '../components/SimpleCard';

export default function SimpleView() {
  const [data,setData] = useState([])
  const getAll = async () => {
    const data_pre = await supabase.from("posts").select("*");
    setData(data_pre.data);
  }

  useEffect(()=>{
    getAll();
  },[])

  return (
    <Container className="SimpleView">
      {data && data.map((post)=>
        <SimpleCard 
          title={post.title}
          category={post.category}
          body={post.body}
          id={post.id}
        />
      )}
    </Container>
  )
}
