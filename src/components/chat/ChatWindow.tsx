"use client";
import React, { useState } from 'react';
import MessageInput from './MessageInput';

interface Message {
  id: number;
  text?: string;
  time: string;
  sender: 'me' | 'other';
  type: 'text' | 'file' | 'audio' | 'like';
  fileUrl?: string;
  audioUrl?: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Oh salut! Tout parfaitement. Je vais vérifier et je vous répondrai bientôt', time: '04:45', sender: 'other', type: 'text' },
    { id: 2, text: 'Oh salut! Tout parfaitement. Je vais vérifier et je vous répondrai bientôt', time: '04:45', sender: 'me', type: 'text' },
    { id: 3, text: 'Oh salut! Tout parfaitement. Je vais vérifier et je vous répondrai bientôt', time: '04:45', sender: 'other', type: 'text' },
    { id: 4, text: 'Oh salut! Tout parfaitement. Je vais vérifier et je vous répondrai bientôt', time: '08:30', sender: 'me', type: 'text' },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      type: 'text'
    };
    setMessages([...messages, newMessage]);
  };

  const handleAttachFile = (fileUrl: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      fileUrl: fileUrl,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      type: 'file'
    };
    setMessages([...messages, newMessage]);
  };

  const handleRecordVoice = (audioUrl: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      audioUrl: audioUrl,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      type: 'audio'
    };
    setMessages([...messages, newMessage]);
  };

  const handleSendLike = () => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: "👍",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      type: 'like'
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
            <div>
              <h3 className="text-lg font-semibold">Ines KAMBIRE</h3>
              <span className="text-sm text-gray-500">Aujourd'hui | 08:30</span>
            </div>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">Fermer la discussion</button>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-2 rounded-lg ${message.sender === 'me' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}>
                {message.type === 'text' && <p>{message.text}</p>}
                {message.type === 'file' && <iframe src={message.fileUrl}></iframe>}
                {message.type === 'audio' && <audio controls src={message.audioUrl}></audio>}
                {message.type === 'like' && <p>{message.text}</p>}
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} onAttachFile={handleAttachFile} onRecordVoice={handleRecordVoice} onSendLike={handleSendLike} />
    </div>
  );
};

export default ChatWindow;

