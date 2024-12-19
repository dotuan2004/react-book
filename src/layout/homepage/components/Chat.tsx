import { Client, Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { List, ListItem, Avatar, ListItemText, Typography, TextField, Button } from '@mui/material';

const Chat = () => {
    const [messages, setMessages] = useState<{ sender: string, content: string }[]>([]);
    const [message, setMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8000/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe('/topic/messages', (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log('Received message:', receivedMessage); // Log the message
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
            onDisconnect: () => {
                console.log('Disconnected');
            },
            onStompError: (error) => {
                console.error('STOMP Error: ', error);
            }
        });
        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, []);


    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (stompClient && message.trim() && nickname.trim()) {
            const chatMessage = {
                sender: nickname,  // sử dụng nickname thay vì nikname
                content: message
            };

            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify(chatMessage)
            });

            setMessage('');
        } else {
            alert("Please enter a nickname and message!");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '5px', maxHeight: '400px', overflowY: 'auto' }}>
                <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                    {messages.map((msg, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ backgroundColor: '#ccc', borderRadius: '50%', padding: '10px', marginRight: '10px', width: '40px', height: '40px', textAlign: 'center' }}>
                                {msg.sender ? msg.sender.charAt(0) : 'N'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{msg.sender || 'Unknown'}</div>
                                <div style={{ fontSize: '14px' }}>{msg.content}</div>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                <input
                    type="text"
                    value={nickname}
                    onChange={handleNickNameChange}
                    placeholder="Enter your nickname"
                    style={{ padding: '10px', flexGrow: 1, marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type your message"
                    style={{ padding: '10px', flexGrow: 2, marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={sendMessage}
                    disabled={!message.trim() || !nickname.trim()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
