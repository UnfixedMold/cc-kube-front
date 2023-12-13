import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

const BACKEND_URL = "http://172.28.247.61:30423"

function App() {

    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleClick = async () => {

      const res = await fetch(`${BACKEND_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: inputValue
      });

      const data = await res.text();

      setItems([...items, data])
      setInputValue("")
    };
  
    return (
      <div className="App">
        <Stack spacing={2} direction="column">
          <Stack spacing={2} direction="row">
            <TextField 
                id="outlined-basic" 
                variant="outlined" 
                size="small" 
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button 
              variant="contained" 
              onClick={handleClick} // Handle button click
            >
              Send
            </Button>
          </Stack>
          <List>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>{item}</ListItem>
                {index < items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Stack>
      </div>
    );
}

export default App;
