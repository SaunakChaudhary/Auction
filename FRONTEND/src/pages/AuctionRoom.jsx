import { HammerIcon, LayoutDashboard, LogOut, Menu, TrendingUp, User, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AuctionRoom = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('adminToken') != 'ncl@admin.comm') {
            return navigate('/admin/login');
        }
    }, []);
    const { id } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('auction-room');
    const [loading, setLoading] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [teamsList, setTeamsList] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [bidPrice, setBidPrice] = useState("");

    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const fileId = url.split("id=")[1];
        return `https://auction-gje0.onrender.com/api/players/drive-image/${fileId}`;
    };

    const [search, setSearch] = useState("");

    const fetchTeamsList = async () => {
        const res = await fetch("https://auction-gje0.onrender.com/api/teams");
        setTeamsList(await res.json());
    };

    const updateAuctionPlayer = async (playerId, price, teamId) => {
        console.log({ price, teamAssigned: teamId })
        const res = await fetch(`https://auction-gje0.onrender.com/api/players/auction/${playerId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price, teamAssigned: teamId }),
        });

        if (res.ok) {
            alert("Player updated!");
            fetchPlayers();
        } else {
            alert("Error updating player");
        }
    };

    const fetchPlayers = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://auction-gje0.onrender.com/api/players/player/${id}`
            );
            const data = await res.json();
            setCurrentPlayer(data.data);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching players:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchTeamsList();
        fetchPlayers();
        setLoading(false);
    }, [id]);

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, navigate: '/admin/dashboard' },
        { id: 'teams', label: 'Teams', icon: Users, navigate: '/admin/teams' },
        { id: 'players', label: 'Players', icon: User, navigate: '/admin/players' },
        { id: 'auction-room', label: 'Auction Room', icon: HammerIcon, navigate: '/admin/auction-room/1' }
    ];

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate('/admin/auction-room/' + search);
    }

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

                    {activeSection === "auction-room" && (
                        <div className="space-y-6">

                            {/* Header + Search */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800">Auction Room</h2>
                                <form onSubmit={handleSearch}>
                                    <input
                                        type="text"
                                        placeholder="Search players..."
                                        className="border border-gray-300 rounded-lg px-4 py-2"
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <input type="submit" value="Search" className='bg-green-600 rounded-lg px-4 py-2 font-semibold text-white ml-2' />
                                </form>
                            </div>

                            {/* LOADING */}
                            {loading || !currentPlayer ? (
                                <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
                            ) : (
                                <div className="bg-white rounded-2xl border shadow-lg p-6 flex flex-col lg:flex-row gap-6">

                                    {/* LEFT — Player Photo */}
                                    <div className="flex flex-col items-center w-full lg:w-1/3">
                                        <img
                                            src={getProxyImageUrl(currentPlayer.photo)}
                                            className="w-80 h-96 rounded-xl"
                                            alt=""
                                        />
                                        <p className="mt-3 text-gray-600 text-sm">Enrollment: {currentPlayer.enrollmentNumber}</p>
                                    </div>

                                    {/* RIGHT — Player Info */}
                                    <div className="flex-1 space-y-4">

                                        <h3 className="text-3xl font-bold text-gray-900">{currentPlayer.fullName}</h3>

                                        <div className="space-y-2 text-gray-700">
                                            <p><b>Type:</b> {currentPlayer.playerType}</p>
                                            <p><b>Department:</b> {currentPlayer.department}</p>
                                            <p><b>WhatsApp:</b> +91 {currentPlayer.whatsappNumber}</p>
                                            <p><b>Tournament:</b> {currentPlayer.tournamentPlayed}</p>
                                        </div>

                                        {/* Teams List */}
                                        <h4 className="text-lg font-semibold mt-6">Select Team</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {teamsList.map((team) => (
                                                <div
                                                    key={team._id}
                                                    onClick={() => setSelectedTeam(team._id)}
                                                    className={`border rounded-xl p-3 cursor-pointer flex flex-col items-center
                  ${selectedTeam === team._id ? "border-green-500 bg-green-50" : "border-gray-200"}
                `}
                                                >
                                                    <img
                                                        src={getProxyImageUrl(team.logo) || "https://via.placeholder.com/60"}
                                                        className="w-14 h-14 rounded-full object-cover mb-2"
                                                    />
                                                    <span className="text-sm font-medium text-gray-800">{team.name}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Price Input */}
                                        <div className="flex items-center gap-4 mt-6">
                                            <input
                                                type="number"
                                                placeholder="Enter Price"
                                                className="border border-gray-300 rounded-lg px-4 py-2 w-40"
                                                value={bidPrice}
                                                onChange={(e) => setBidPrice(e.target.value)}
                                            />
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                                                onClick={() =>
                                                    updateAuctionPlayer(currentPlayer._id, bidPrice, selectedTeam)
                                                }
                                            >
                                                Save Bid
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="flex justify-between mt-6">

                                <button
                                    disabled={parseInt(id) <= 1}
                                    onClick={() => { navigate('/admin/auction-room/' + (parseInt(id) - 1)); fetchPlayers(); }}
                                    className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                                >
                                    Previous Player
                                </button>

                                <button
                                    disabled={parseInt(id) >= 95}
                                    onClick={() => { navigate('/admin/auction-room/' + (parseInt(id) + 1)); fetchPlayers(); }}
                                    className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                                >
                                    Next Player
                                </button>

                            </div>

                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default AuctionRoom
