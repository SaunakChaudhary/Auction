import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    Users,
    User,
    LogOut,
    Menu,
    X,
    TrendingUp,
    HammerIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SoldPlayers = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('adminToken') != 'ncl@admin.comm') {
            return navigate('/admin/login');
        }
    }, []);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [soldPlayers, setSoldPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, navigate: '/admin/dashboard' },
        { id: 'teams', label: 'Teams', icon: Users, navigate: '/admin/teams' },
        { id: 'players', label: 'Players', icon: User, navigate: '/admin/players' },
        { id: 'auction-room', label: 'Auction Room', icon: HammerIcon, navigate: '/admin/auction-room/1' },
        { id: 'sold-players', label: 'Sold Players', icon: User, navigate: '/admin/sold-players' }
    ];

    const [activeSection, setActiveSection] = useState("sold-players");

    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const id = url.split("id=")[1];
        return `https://auction-gje0.onrender.com/api/players/drive-image/${id}`;
    };

    const fetchSoldPlayers = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://auction-gje0.onrender.com/api/players/sold-players");
            const data = await res.json();
            setSoldPlayers(data.data || []);
        } catch (err) {
            console.error("Error loading sold players:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSoldPlayers();
    }, []);

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
            <div
                className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
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

                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.navigate)}
                                className={`
                                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${activeSection === item.id
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}

                    <button
                        onClick={() => { localStorage.setItem("adminToken", ""); navigate('/') }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
                            >
                                <Menu className="w-6 h-6 text-gray-600" />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800">Sold Players</h2>
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

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-6">

                    {loading ? (
                        <div className="text-center text-gray-500 text-xl py-20">Loading...</div>
                    ) : soldPlayers.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg py-20">
                            No players sold yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {soldPlayers.map((p) => (
                                <div
                                    key={p._id}
                                    className="bg-white rounded-xl border shadow p-4 flex flex-col items-center"
                                >
                                    <img
                                        src={getProxyImageUrl(p.photo)}
                                        alt=""
                                        className="w-40 h-48 object-cover rounded-lg"
                                    />

                                    <h3 className="mt-4 text-xl font-bold text-gray-800">{p.fullName}</h3>
                                    <p className="text-gray-600 text-sm">{p.playerType} – {p.department}</p>

                                    <div className="mt-3 flex items-center space-x-3">
                                        <img
                                            src={p.teamAssigned?.logo}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <p className="font-medium text-gray-800">{p.teamAssigned?.name}</p>
                                    </div>

                                    <p className="mt-3 text-green-600 font-bold text-lg">
                                        ₹ {p.price.toLocaleString()}
                                    </p>

                                </div>
                            ))}

                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default SoldPlayers;
