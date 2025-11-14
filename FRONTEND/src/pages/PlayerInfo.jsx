import React, { useEffect, useState } from "react";
import NVPASLOGO from "../assets/nvpas.png";
import CVMLOGO from "../assets/cvm.png";
import {
    LayoutDashboard,
    Users,
    User,
    LogOut,
    Menu,
    X,
    TrendingUp,
    HammerIcon,
    Crown,
    Star,
    Award,
    Trophy,
    Shield,
    ArrowLeft,
    Calendar,
    MapPin,
    Target,
    Activity,
    Badge,
    DollarSign
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PlayerInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [player, setPlayer] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const id = url.split("id=")[1];
        return `https://auction-gje0.onrender.com/api/players/drive-image/${id}`;
    };

    const loadPlayerData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://auction-gje0.onrender.com/api/players/player/${id}`);
            const playerData = await response.json();

            if (!response.ok) {
                throw new Error(playerData.message || 'Failed to fetch player data');
            }

            setPlayer(playerData.data);

            // Also load teams to get team information if player is assigned
            const teamsResponse = await fetch("https://auction-gje0.onrender.com/api/teams");
            const teamsData = await teamsResponse.json();
            setTeams(teamsData);

        } catch (err) {
            console.error("Error loading player data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadPlayerData();
        }
    }, [id]);

    const getPlayerTeam = () => {
        if (!player || !player.teamAssigned) return null;
        return teams.find(team => team._id === player.teamAssigned);
    };

    const playerTeam = getPlayerTeam();
    const [search, setSearch] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate('/player-info/' + search);
    }

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-50">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white border-b border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex-shrink-0">
                                <img src={NVPASLOGO} alt="NVPAS Logo" className="h-20 w-auto object-contain" />
                            </div>
                            <div className="flex-1 text-center">
                                <h2 className="text-2xl font-bold text-gray-800">NVPAS Premier League</h2>
                                <p className="text-gray-600 text-lg mt-1">Auction Season 4 - Player Profile</p>
                            </div>
                            <div className="flex-shrink-0">
                                <img src={CVMLOGO} alt="CVM Logo" className="h-20 w-auto object-contain" />
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-600 text-xl mt-4 font-semibold">Loading Player Data...</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen bg-gray-50">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white border-b border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex-shrink-0">
                                <img src={NVPASLOGO} alt="NVPAS Logo" className="h-20 w-auto object-contain" />
                            </div>
                            <div className="flex-1 text-center">
                                <h2 className="text-2xl font-bold text-gray-800">NVPAS Premier League</h2>
                                <p className="text-gray-600 text-lg mt-1">Auction Season 4 - Player Profile</p>
                            </div>
                            <div className="flex-shrink-0">
                                <img src={CVMLOGO} alt="CVM Logo" className="h-20 w-auto object-contain" />
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <User className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Player Not Found</h3>
                                <p className="text-gray-600 mb-4">{error}</p>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (!player) {
        return (
            <div className="flex h-screen bg-gray-50">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white border-b border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex-shrink-0">
                                <img src={NVPASLOGO} alt="NVPAS Logo" className="h-20 w-auto object-contain" />
                            </div>
                            <div className="flex-1 text-center">
                                <h2 className="text-2xl font-bold text-gray-800">NVPAS Premier League</h2>
                                <p className="text-gray-600 text-lg mt-1">Auction Season 4 - Player Profile</p>
                            </div>
                            <div className="flex-shrink-0">
                                <img src={CVMLOGO} alt="CVM Logo" className="h-20 w-auto object-contain" />
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Player Data</h3>
                                <p className="text-gray-600 mb-4">Unable to load player information</p>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Left Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src={NVPASLOGO}
                                alt="NVPAS Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </div>

                        {/* Center Title */}
                        <div className="flex-1 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                NVPAS Premier League
                            </h2>
                            <p className="text-gray-600 text-lg mt-1">
                                Auction Season 4 - Player Profile
                            </p>
                        </div>

                        {/* Right Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src={CVMLOGO}
                                alt="CVM Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {/* Back Button */}

                    {/* Player Profile Card */}
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            {/* Top Row - Search Bar (Full width on mobile) */}
                            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                                <form onSubmit={handleSearch} className="flex-1">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <input
                                            type="text"
                                            placeholder="Search players by entering player no."
                                            className="border border-gray-300 rounded-lg px-4 py-2 flex-1 w-full sm:w-auto"
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <input
                                            type="submit"
                                            value="Search"
                                            className='bg-green-600 rounded-lg px-4 py-2 font-semibold text-white sm:ml-2 w-full sm:w-auto hover:bg-green-700 transition-colors cursor-pointer'
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Bottom Row - Navigation Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
                                {/* Back Button */}
                                <button
                                    onClick={() => navigate('/')}
                                    className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm flex-1 sm:flex-none order-2 sm:order-1"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Teams
                                </button>

                                {/* List of Players Button - Center on mobile */}
                                <button
                                    onClick={() => navigate('/players-list')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg border border-blue-700 hover:bg-blue-700 transition-colors flex items-center justify-center shadow-sm flex-1 sm:flex-none order-1 sm:order-2"
                                >
                                    <Users className="w-4 h-4 mr-2" />
                                    List of Players
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            {/* Player Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                                    {/* Player Photo */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={getProxyImageUrl(player.photo)}
                                            className="w-48 h-60 rounded-xl object-cover border-4 border-white shadow-2xl"
                                            alt={player.fullName}
                                        />
                                    </div>

                                    {/* Player Basic Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h1 className="text-2xl font-bold mb-2">#{player.PlayerNo}</h1>
                                        <h1 className="text-4xl font-bold mb-2">{player.fullName}</h1>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                                            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                                                <Badge className="w-5 h-5 mr-2" />
                                                <span className="font-semibold">{player.playerType}</span>
                                            </div>
                                            <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                                                <MapPin className="w-5 h-5 mr-2" />
                                                <span className="font-semibold">{player.department}</span>
                                            </div>
                                            {playerTeam && (
                                                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                                                    <Shield className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">{playerTeam.name}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Price and Status */}
                                        <div className="flex flex-wrap justify-center md:justify-start gap-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-yellow-300">
                                                    ₹{player.price?.toLocaleString() || '0'}
                                                </div>
                                                <div className="text-blue-100 text-sm">Auction Price</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold">
                                                    {playerTeam ? 'SOLD' : 'UNSOLD'}
                                                </div>
                                                <div className="text-blue-100 text-sm">Status</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Information */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column - Personal Info */}
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                                            Personal Information
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <User className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">Full Name</span>
                                                </div>
                                                <p className="text-gray-800 font-medium">{player.fullName}</p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <Target className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">Player Type</span>
                                                </div>
                                                <p className="text-gray-800 font-medium">{player.playerType}</p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <MapPin className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">Department</span>
                                                </div>
                                                <p className="text-gray-800 font-medium">{player.department}</p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <span className="font-semibold">Base Price</span>
                                                </div>
                                                <p className="text-gray-800 font-medium">₹{player.basePrice?.toLocaleString() || '0'}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <span className="font-semibold">Tournament Played</span>
                                                </div>
                                                <p className="text-gray-800 font-medium">{player.tournamentPlayed}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Team & Additional Info */}
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                                            Team Information
                                        </h3>

                                        {playerTeam ? (
                                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <img
                                                        src={getProxyImageUrl(playerTeam.logo)}
                                                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
                                                        alt={playerTeam.name}
                                                    />
                                                    <div>
                                                        <h4 className="text-xl font-bold text-gray-800">{playerTeam.name}</h4>
                                                        <p className="text-gray-600">Owned by {playerTeam.ownerName}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="text-center bg-white rounded-lg p-3 border border-blue-100">
                                                        <div className="text-blue-600 font-bold">
                                                            ₹{playerTeam.remainingPurse?.toLocaleString() || '0'}
                                                        </div>
                                                        <div className="text-gray-600">Remaining Purse</div>
                                                    </div>
                                                    <div className="text-center bg-white rounded-lg p-3 border border-blue-100">
                                                        <div className="text-blue-600 font-bold">
                                                            {playerTeam.players?.length || 0}
                                                        </div>
                                                        <div className="text-gray-600">Team Players</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                                                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                                <h4 className="text-xl font-bold text-gray-700 mb-2">Not Assigned to Any Team</h4>
                                                <p className="text-gray-600">This player is currently available in the auction pool</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">

                            <button
                                disabled={parseInt(id) <= 1}
                                onClick={() => { navigate('/player-info/' + (parseInt(id) - 1)); fetchPlayers(); }}
                                className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                            >
                                Previous Player
                            </button>

                            <button
                                disabled={parseInt(id) >= 95}
                                onClick={() => { navigate('/player-info/' + (parseInt(id) + 1)); fetchPlayers(); }}
                                className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                            >
                                Next Player
                            </button>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PlayerInfo;