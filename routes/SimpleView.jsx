import React from 'react'
import { useEffect, useState } from 'react';
import { supabase } from '../src/client';
import { Container } from 'react-bootstrap';
import SimpleCard from '../components/SimpleCard';
import { DropdownButton, Dropdown, Form, FormControl, Button } from 'react-bootstrap';

export default function SimpleView() {
  const [sort, setSort] = useState("Upvotes");
  const [data, setData] = useState([])
  const [search, setSearch] = useState("");
  const [origData, setOrig] = useState([]);

  const getAll = async () => {
    const data_pre = await supabase.from("posts").select("*");
    setData(data_pre.data);
    setOrig(data_pre.data);
  }

  const parseDate = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - dateObj.getTime()) / 1000;

    if (diff < 60) {
      return `${Math.floor(diff)} seconds ago`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} minutes ago`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} hours ago`;
    } else if (diff < 604800) {
      return `${Math.floor(diff / 86400)} days ago`;
    } else {
      const options = { month: 'short', day: 'numeric' };
      return dateObj.toLocaleDateString('en-US', options);
    }
  }
  useEffect(() => {
    getAll();
  }, [])

  useEffect(() => {
    if (sort === "Upvotes") {
      const sortedData = [...data].sort((a, b) => (a.upvotes < b.upvotes) ? 1 : -1);
      setData(sortedData);
    }
    else if (sort === "Time Created") {
      const sortedData = [...data].sort((a, b) => (a.created_at < b.created_at) ? 1 : -1);
      setData(sortedData);
    }
  }, [sort])

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setData(origData);
    } else {
      const filteredData = data.filter((post) => {
        return post.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setData(filteredData);
    }
  }

  return (
    <Container className="SimpleView">
      <div className='view-options-container'>
        <div>
          <label for="dropdown-basic-button">Sort by: </label>
          <DropdownButton id="dropdown-basic-button" title={sort}>
            <Dropdown.Item onClick={() => setSort("Upvotes")}>Upvotes</Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("Time Created")}>Time Created</Dropdown.Item>
          </DropdownButton>
        </div>

        <Form inline>
          <FormControl onChange={handleSearch} type="text" placeholder="Search" className="mr-sm-2" style={{ width: '200px' }} />
        </Form>
      </div>

      <div className='simple-cards-container'>
        {data && data.map((post) =>
          <SimpleCard
            title={post.title}
            category={post.category}
            body={post.body}
            id={post.id}
            upvotes={post.upvotes}
            created_at={parseDate(post.created_at)}
          />
        )}
      </div>
    </Container>
  )
}
