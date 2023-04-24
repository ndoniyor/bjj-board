import React from "react";
import DetailCard from "../components/DetailCard";
import { supabase } from "../src/client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function DetailView() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const getPost = async () => {
    const data_pre = await supabase
      .from("posts")
      .select("*")
      .eq("id", parseInt(id))
      .single();
    setData(data_pre.data);
  };

  useEffect(() => {
    getPost();
    console.log(data)
    
  }, []);

  return (
    <div className="DetailView">
      <DetailCard
        id={data.id}
        title={data.title}
        link={data.link}
        category={data.category}
        skills={data.skills}
        upvotes={data.upvotes}
        timestamp={data.created_at}
        body={data.body}
      />
    </div>
  );
}
