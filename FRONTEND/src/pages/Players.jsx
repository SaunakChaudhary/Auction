import { HammerIcon, LayoutDashboard, LogOut, Menu, TrendingUp, User, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Players = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('adminToken') != 'ncl@admin.comm') {
            return navigate('/admin/login');
        }
    }, []);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('players');
    const [searchTerm, setSearchTerm] = useState('');

    const [playerData, setPlayerData] = useState([]);
    useEffect(() => {
        const fetchPlayerInfo = async () => {
            const response = await fetch('http://localhost:5000/api/players');
            const data = await response.json();
            setPlayerData(data);
        };
        fetchPlayerInfo();
    }, []);

    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const fileId = url.split("id=")[1];
        return `http://localhost:5000/api/players/drive-image/${fileId}`;
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, navigate: '/admin/dashboard' },
        { id: 'teams', label: 'Teams', icon: Users, navigate: '/admin/teams' },
        { id: 'players', label: 'Players', icon: User, navigate: '/admin/players' },
        { id: 'auction-room', label: 'Auction Room', icon: HammerIcon, navigate: '/admin/auction-room/1' }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white shadow-xl transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Cricket Auction</h1>
                            <p className="text-sm text-gray-500">Admin Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => { navigate(item.navigate) }}
                                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeSection === item.id
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                    <button
                        onClick={() => { localStorage.setItem("adminToken", ""); navigate('/') }}
                        className='w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
                            >
                                <Menu className="w-6 h-6 text-gray-600" />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800 capitalize">
                                {activeSection.replace('-', ' ')}
                            </h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="font-medium text-gray-800">Admin User</p>
                                <p className="text-sm text-gray-500">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">AU</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6">

                    {activeSection === 'players' && (
                        <div className="space-y-8">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Players Management</h2>
                                    <p className="text-gray-500 text-sm">
                                        View all players and upload Excel sheet to import new players.
                                    </p>
                                </div>

                                {/* 🔍 Search Bar */}
                                <div className="w-full sm:w-72">
                                    <input
                                        type="text"
                                        placeholder="Search by name, department, or team..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Table Section */}
                            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700 text-left uppercase text-xs font-semibold">
                                            <th className="px-6 py-3">Player No.</th>
                                            <th className="px-6 py-3">Photo</th>
                                            <th className="px-6 py-3">Name</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3">Department</th>
                                            <th className="px-6 py-3">Whatsapp Number</th>
                                            <th className="px-6 py-3">Team</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {playerData
                                            .filter((player) => {
                                                const term = searchTerm.toLowerCase();
                                                return (
                                                    player.fullName.toLowerCase().includes(term) ||
                                                    player.department.toLowerCase().includes(term) ||
                                                    player.PlayerNo.toLowerCase().includes(term)
                                                );
                                            })
                                            .map((player, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="px-6 py-4 text-gray-700">{player.PlayerNo}</td>
                                                    <td className="px-6 py-4">
                                                        <img
                                                            src={getProxyImageUrl(player.photo)}
                                                            alt={player.fullName}
                                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gray-800">
                                                        {player.fullName}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700">{player.playerType}</td>
                                                    <td className="px-6 py-4 text-gray-700">{player.department}</td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        +91 {player.whatsappNumber}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {player.teamAssigned ? player.teamAssigned.name : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    )
}

export default Players
