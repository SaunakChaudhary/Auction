import React, { useEffect, useState } from "react";
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
    Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeamsOverview = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);


    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const id = url.split("id=")[1];
        return `https://auction-gje0.onrender.com/api/players/drive-image/${id}`;
    };

    const loadAllData = async () => {
        try {
            setLoading(true);

            const [teamRes, playerRes] = await Promise.all([
                fetch("https://auction-gje0.onrender.com/api/teams"),
                fetch("https://auction-gje0.onrender.com/api/players")
            ]);

            const teamData = await teamRes.json();
            const playerData = await playerRes.json();

            setTeams(teamData);
            setPlayers(playerData);

        } catch (err) {
            console.error("Error loading overview:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Left Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="./nvpas.png"
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
                                Auction Season 4 - Team Overview
                            </p>
                        </div>

                        {/* Right Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="./cvm.png"
                                alt="CVM Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-600 text-xl mt-4 font-semibold">Loading Teams Data...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* ======================== ALL TEAMS ========================= */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                                {teams.map((team) => {
                                    return (
                                        <div key={team._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                                            {/* Team Header */}
                                            <div className="bg-blue-800 p-6 text-white">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={getProxyImageUrl(team.logo)}
                                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                                        alt={`${team.name} logo`}
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-white">{team.name}</h3>
                                                        <p className="text-blue-200 text-sm">{team.ownerName}</p>
                                                        <div className="mt-2 bg-blue-700 rounded-md p-2">
                                                            <p className="text-sm font-semibold text-center text-white">
                                                                Remaining Purse: ₹{team.remainingPurse?.toLocaleString() || '0'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Captain & Icon Player Section */}
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="grid grid-cols-2 gap-3">
                                                    {/* Captain */}
                                                    <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <Crown className="w-4 h-4 text-yellow-600" />
                                                            <h4 className="text-gray-700 font-bold text-xs uppercase tracking-wide">Captain</h4>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={getProxyImageUrl(team.CaptainPhoto)}
                                                                className="w-12 h-16 rounded-md object-cover border border-yellow-500 shadow-sm"
                                                                alt={team.captainName}
                                                            />
                                                            <div>
                                                                <h5 className="text-gray-900 font-bold text-sm">{team.captainName}</h5>
                                                                <p className="text-gray-500 text-xs">Leader</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Icon Player */}
                                                    <div className="bg-pink-50 rounded-md p-3 border border-pink-100">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <Star className="w-4 h-4 text-pink-600" />
                                                            <h4 className="text-gray-700 font-bold text-xs uppercase tracking-wide">Icon Player</h4>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={getProxyImageUrl(team.IconPlayerPhoto)}
                                                                className="w-12 h-16 rounded-md object-cover border border-pink-500 shadow-sm"
                                                                alt={team.iconPlayerName}
                                                            />
                                                            <div>
                                                                <h5 className="text-gray-900 font-bold text-sm">{team.iconPlayerName}</h5>
                                                                <p className="text-gray-500 text-xs">Star Player</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Team Players */}
                                            <div className="p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-gray-800 font-semibold text-lg flex items-center">
                                                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                                                        Squad Players
                                                    </h4>
                                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">
                                                        {team.players.length} Players
                                                    </span>
                                                </div>

                                                {team.players.length === 0 ? (
                                                    <div className="text-center py-6">
                                                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                                        <p className="text-gray-500 text-sm">No players assigned</p>
                                                        <p className="text-gray-400 text-xs mt-1">Auction in progress</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                                        {team.players.map((player) => (
                                                            <div
                                                                key={player._id}
                                                                className="bg-gray-50 rounded-md p-3 border border-gray-100 hover:bg-gray-100 transition-all duration-200"
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <img
                                                                        src={getProxyImageUrl(player.photo)}
                                                                        className="w-12 h-16 rounded-md object-cover border border-gray-300 shadow-sm"
                                                                        alt={player.fullName}
                                                                    />
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-center justify-between">
                                                                            <h5 className="text-gray-900 font-semibold text-sm">
                                                                                {player.fullName}
                                                                            </h5>
                                                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                                                                                ₹{player.price?.toLocaleString() || '0'}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-gray-600 text-xs mt-1">
                                                                            {player.playerType} • {player.department}
                                                                        </p>
                                                                        <div className="flex items-center space-x-1 mt-1">
                                                                            {player._id === team.captainId && (
                                                                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs flex items-center">
                                                                                    <Crown className="w-3 h-3 mr-1" />
                                                                                    Captain
                                                                                </span>
                                                                            )}
                                                                            {player._id === team.iconPlayerId && (
                                                                                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs flex items-center">
                                                                                    <Star className="w-3 h-3 mr-1" />
                                                                                    Icon
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">League Statistics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-center bg-blue-50 rounded-lg p-4 border border-blue-100">
                                        <div className="text-2xl font-bold text-blue-800">{teams.length}</div>
                                        <div className="text-blue-600 text-sm font-medium">Total Teams</div>
                                    </div>
                                    <div onClick={()=> navigate("/player-info/1")} className="text-center bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800">
                                            {players.length}
                                        </div>
                                        <div className="text-gray-600 text-sm font-medium">Total Players</div>
                                    </div>
                                    <div className="text-center bg-green-50 rounded-lg p-4 border border-green-100">
                                        <div className="text-2xl font-bold text-green-800">
                                            ₹{teams.reduce((sum, team) => sum + team.remainingPurse, 0).toLocaleString()}
                                        </div>
                                        <div className="text-green-600 text-sm font-medium">Total Remaining Purse</div>
                                    </div>
                                    <div className="text-center bg-pink-50 rounded-lg p-4 border border-pink-100">
                                        <div className="text-2xl font-bold text-pink-800">
                                            {players.filter(p => !p.teamAssigned).length}
                                        </div>
                                        <div className="text-pink-600 text-sm font-medium">Unsold Players</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TeamsOverview;