import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function NewPostForm() {
  const _id = useParams()["*"];
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      (await fetch(`${process.env.REACT_APP_DATABASE_SERVICE}/${_id}`)).json().then(response => {
        setTitle(response.title);
        setAuthor(response.author);
        setDate(response.date);
        setBody(response.body);
      });
    };

    if (_id) fetchPost();
  }, [_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_id) {
      fetch(
        `${process.env.REACT_APP_DATABASE_SERVICE}/${_id}`,
        {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, author, date, body }) },
      ).then(navigate('/'));
    } else {
      fetch(
        process.env.REACT_APP_DATABASE_SERVICE,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, author, date, body }) },
      ).then(navigate('/'));
    }
    
  };

  return (
    <div className='App'>
      <Box
        component='form'
        method='post'
        onSubmit={handleSubmit}
        sx={{ width: '25%' }}
        noValidate
        autoComplete='off'
      >
        <Stack spacing={2}>
          <TextField
            id='post-title'
            label='Title'
            onChange={event => setTitle(event.target.value)}
            value={title}
          />
          <DateTimePicker
            label="Publish Date"
            onChange={event => setDate(new Date(event).toString())}
            value={dayjs(date)}
          />
          <TextField
            id='post-author'
            label='Author'
            onChange={event => setAuthor(event.target.value)}
            value={author}
          />
          <TextField
            id='post-body'
            label='Content'
            multiline
            rows={6}
            onChange={event => setBody(event.target.value)}
            value={body}
          />
          <Button type='submit' variant='contained'>{_id ? 'Save' : 'Publish'}</Button>
          <Button variant='outlined' onClick={() => navigate(-1)}>Cancel</Button>
        </Stack>
      </Box>
    </div>
  );
}