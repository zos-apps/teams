import React, { useState } from 'react';

interface Channel {
  id: string;
  name: string;
  team: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
}

const Teams: React.FC = () => {
  const [channels] = useState<Channel[]>([
    { id: '1', name: 'General', team: 'Engineering' },
    { id: '2', name: 'Frontend', team: 'Engineering' },
    { id: '3', name: 'Backend', team: 'Engineering' },
    { id: '4', name: 'General', team: 'Design' },
  ]);
  const [selectedChannel, setSelectedChannel] = useState('1');
  const [messages] = useState<Message[]>([
    { id: '1', sender: 'Alice', content: 'Hey team! 👋', time: '10:30 AM' },
    { id: '2', sender: 'Bob', content: 'Good morning everyone!', time: '10:32 AM' },
    { id: '3', sender: 'Charlie', content: 'Ready for the standup?', time: '10:35 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'activity' | 'chat' | 'teams' | 'calendar'>('teams');

  return (
    <div className="h-full flex bg-white">
      {/* App Bar */}
      <div className="w-16 bg-[#464775] flex flex-col items-center py-4 gap-4">
        {[
          { id: 'activity', icon: '🔔' },
          { id: 'chat', icon: '💬' },
          { id: 'teams', icon: '👥' },
          { id: 'calendar', icon: '📅' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-12 h-12 rounded flex items-center justify-center text-xl ${
              activeTab === item.id ? 'bg-[#5b5d9e]' : 'hover:bg-[#5b5d9e]'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Teams List */}
      <div className="w-64 border-r bg-gray-50">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 bg-gray-100 rounded text-sm"
          />
        </div>
        <div className="p-2">
          <div className="text-xs font-semibold text-gray-500 px-2 py-1">TEAMS</div>
          {['Engineering', 'Design'].map(team => (
            <div key={team} className="mb-2">
              <div className="px-2 py-1 font-medium text-sm">{team}</div>
              {channels.filter(c => c.team === team).map(channel => (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`px-4 py-1.5 text-sm cursor-pointer rounded ${
                    selectedChannel === channel.id ? 'bg-[#e5e5f7] text-[#464775]' : 'hover:bg-gray-100'
                  }`}
                >
                  # {channel.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b flex items-center px-4 gap-4">
          <span className="font-semibold">
            # {channels.find(c => c.id === selectedChannel)?.name}
          </span>
          <div className="flex-1" />
          <button className="px-3 py-1 bg-[#464775] text-white rounded text-sm">📹 Meet</button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {messages.map(msg => (
            <div key={msg.id} className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-[#464775] rounded-full flex items-center justify-center text-white">
                {msg.sender[0]}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{msg.sender}</span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <div className="text-sm">{msg.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Teams;
