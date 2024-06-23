import React from 'react';

const messages = [
  { id: 1, name: 'Marc Elisée KOFFI', preview: 'Bonjour, Monsieur Koffi comment...', time: '15:30', unread: true },
  { id: 2, name: 'Elisa KORO', preview: 'J’ai un souci avec mon compte pouvez-vous m’aider à le régler ?', time: '08:30', unread: true, active: true },
  { id: 3, name: 'Armand KOUASSI', preview: 'J’ai un souci avec mon compte pouvez-vous m’aider à le régler ?', time: '08:30', unread: false },
  { id: 4, name: 'Daniel MELESS', preview: 'J’ai un souci avec mon compte pouvez-vous m’aider à le régler ?', time: '08:30', unread: false },
];

const MessageList: React.FC = () => {
  return (
    <div className="w-1/3 border-r border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Tous les Messages</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Rechercher ou démarrer une nouvelle discussion"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center p-2 rounded-md cursor-pointer ${message.active ? 'bg-green-100' : 'hover:bg-gray-100'}`}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">{message.name}</h3>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-xs text-gray-500">{message.preview}</p>
            </div>
            {message.unread && <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
