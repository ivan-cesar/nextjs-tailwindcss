"use client";
import React, { useState, useRef } from 'react';
import { FaSmile, FaPlus, FaMicrophone, FaThumbsUp } from 'react-icons/fa';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onAttachFile: (fileUrl: string) => void;
  onRecordVoice: (audioUrl: string) => void;
  onSendLike: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onAttachFile, onRecordVoice, onSendLike }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleAttachFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        onAttachFile(fileUrl);
      }
    };
    fileInput.click();
  };

  const handleRecordVoice = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          mediaRecorder.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            onRecordVoice(audioUrl);
            audioChunksRef.current = [];
          };

          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch(error => {
          console.error("Erreur lors de l'accès au microphone", error);
        });
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const onEmojiClick = (event: EmojiClickData) => {
    setInputMessage(prevInput => prevInput + event.emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4 border-t border-gray-200">
      <div className="flex items-center w-full mb-4 relative">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-green-500 p-2">
          <FaSmile size={24} />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-10 left-0">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tapez votre message ici ..."
          className="flex-1 mx-2 p-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleAttachFile} className="text-green-500 p-2">
          <FaPlus size={24} />
        </button>
        <button onClick={handleRecordVoice} className="text-green-500 p-2">
          <FaMicrophone size={24} />
          {isRecording && <span>Recording...</span>}
        </button>
        <button onClick={onSendLike} className="text-green-500 p-2">
          <FaThumbsUp size={24} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
