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
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TeamPlayers = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('adminToken') != 'ncl@admin.comm') {
            return navigate('/admin/login');
        }
    }, []);
    const { teamId } = useParams(); // ✅ GET TEAM ID FROM URL

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, navigate: "/admin/dashboard" },
        { id: "teams", label: "Teams", icon: Users, navigate: "/admin/teams" },
        { id: "players", label: "Players", icon: User, navigate: "/admin/players" },
        { id: "auction-room", label: "Auction Room", icon: HammerIcon, navigate: "/admin/auction-room/1" },
        { id: "sold-players", label: "Sold Players", icon: User, navigate: "/admin/sold-players" },
    ];

    const [activeSection, setActiveSection] = useState("teams");

    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const id = url.split("id=")[1];
        return `https://auction-gje0.onrender.com/api/players/drive-image/${id}`;
    };

    const fetchTeam = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://auction-gje0.onrender.com/api/teams`);
            const data = await res.json();
            const team = data.find((t) => t._id === teamId);
            console.log(team);
            setTeam(team || null);
        } catch (error) {
            console.error("Error fetching team:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, [teamId]);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
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
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}

                    <button
                        onClick={() => { localStorage.setItem("adminToken", ""); navigate('/') }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                        transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <h2 className="text-2xl font-bold text-gray-800">Team Players</h2>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="text-center text-gray-500 text-xl py-20">Loading...</div>
                    ) : !team ? (
                        <div className="text-center text-gray-600 text-xl">Team not found.</div>
                    ) : (
                        <>
                            {/* Team Header */}
                            <div className="flex items-center space-x-4 mb-6">
                                <img
                                    src={getProxyImageUrl(team.logo)}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">{team.name}</h3>
                                    <p className="text-gray-600 text-sm">Owner: {team.ownerName}</p>
                                    <p className="text-green-700 font-medium">
                                        Remaining Purse: ₹ {team.remainingPurse.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Players List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {team.players.length === 0 ? (
                                    <p className="text-gray-600 text-lg col-span-full">No players in this team.</p>
                                ) : (
                                    team.players.map((player) => (
                                        <div
                                            key={player._id}
                                            className="bg-white p-4 rounded-xl shadow border flex flex-col items-center"
                                        >
                                            <img
                                                src={getProxyImageUrl(player.photo)}
                                                className="w-40 h-48 object-cover rounded-lg"
                                            />

                                            <h4 className="mt-3 text-lg font-bold text-gray-800">
                                                {player.fullName}
                                            </h4>
                                            <p className="text-gray-600 text-sm">{player.playerType}</p>
                                            <p className="text-gray-500 text-sm">{player.department}</p>

                                            <p className="mt-3 text-green-700 font-bold">
                                                Price: ₹ {player.price.toLocaleString()}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TeamPlayers;
