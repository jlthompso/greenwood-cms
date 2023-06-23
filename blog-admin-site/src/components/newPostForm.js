import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      process.env.REACT_APP_DATABASE_SERVICE,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, date, body }) },
      );
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
          <TextField id='post-title' label='Title' onChange={event => setTitle(event.target.value)}/>
          <DateTimePicker label="Publish Date" onChange={event => setDate(new Date(event).toString())}/>
          <TextField id='post-author' label='Author' onChange={event => setAuthor(event.target.value)}/>
          <TextField id='post-body' label='Content' multiline rows={6} onChange={event => setBody(event.target.value)}/>
          <Button type='submit' variant='contained'>Publish</Button>
        </Stack>
      </Box>
    </div>
  );
}