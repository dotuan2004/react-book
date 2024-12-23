import { Client, Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

const Chat = () => {
    const [messages, setMessages] = useState<{ sender: string, content: string }[]>([]);
    const [message, setMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        // Tạo một kết nối SockJS và StompClient
        const socket = new SockJS('http://localhost:8000/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                // Đăng ký lắng nghe tin nhắn khi kết nối thành công
                client.subscribe('/topic/messages', (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log('Received message:', receivedMessage); // Log the message
                    
                    // Kiểm tra tin nhắn trước khi thêm vào state để tránh lặp
                    setMessages((prevMessages) => {
                        // Kiểm tra xem tin nhắn đã có trong danh sách chưa
                        if (!prevMessages.some((msg) => msg.content === receivedMessage.content && msg.sender === receivedMessage.sender)) {
                            return [...prevMessages, receivedMessage];
                        }
                        return prevMessages;
                    });
                });
            },
            onDisconnect: () => {
                console.log('Disconnected');
            },
            onStompError: (error) => {
                console.error('STOMP Error: ', error);
            }
        });

        // Kích hoạt client để kết nối WebSocket
        client.activate();
        setStompClient(client);

        // Cleanup khi component unmount
        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []); // Chạy 1 lần khi component mount

    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Nickname entered:", e.target.value);
        setNickname(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        console.log("Sending nickname:", nickname);
        console.log("Sending message:", message);
        if (stompClient && message.trim() && nickname.trim()) {
            const chatMessage = {
                sender: nickname, 
                content: message
            };

            // Gửi tin nhắn tới server qua WebSocket
            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify(chatMessage)
            });

            setMessage(''); // Xóa nội dung message sau khi gửi
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
                                {msg.sender ? msg.sender.charAt(0) : 'T'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{msg.sender}</div>
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
