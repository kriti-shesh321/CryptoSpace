import { io } from 'socket.io-client';

export const socket =
    io(
        'http://localhost:8000',
        {
            auth: {
                token: localStorage.getItem('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNmJmNjBjNy1hMTJhLTQxYzUtYjA2Ny0wNzNlYTM0MzgzOTUiLCJpYXQiOjE3ODA2NTA4NDcsImV4cCI6MTc4MTI1NTY0N30.KDB2vZR-UkQXEWvHK5eUqeXa4i5gZimKtn39SPpmC4g",
            },
        }
    );