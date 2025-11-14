import { HammerIcon, LayoutDashboard, LogOut, Menu, Plus, TrendingUp, User, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Teams = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('adminToken') != 'ncl@admin.comm') {
            return navigate('/admin/login');
        }
    }, []);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('teams');

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, navigate: '/admin/dashboard' },
        { id: 'teams', label: 'Teams', icon: Users, navigate: '/admin/teams' },
        { id: 'players', label: 'Players', icon: User, navigate: '/admin/players' },
        { id: 'auction-room', label: 'Auction Room', icon: HammerIcon, navigate: '/admin/auction-room/1' }
    ];
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const fileId = url.split("id=")[1];
        return `https://auction-gje0.onrender.com/api/players/drive-image/${fileId}`;
    };

    const [formData, setFormData] = useState({
        name: "",
        ownerName: "",
        email: "",
        password: "",
        purse: "",
        logo: "",
        captainName: "",
        iconPlayerName: "",
        CaptainPhoto: "",
        IconPlayerPhoto: "",
    });
    const [showModal, setShowModal] = useState(false);

    // Submit new team
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("https://auction-gje0.onrender.com/api/teams", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
            alert("Team created successfully!");
            setShowModal(false);
            setFormData({ name: "", ownerName: "", email: "", password: "", purse: "", logo: "", captainName: "", iconPlayerName: "", CaptainPhoto: "", IconPlayerPhoto: "" });
            setTeams((prev) => [data.team, ...prev]);
        } else {
            alert(data.message || "Error creating team");
        }
    };
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const res = await fetch("https://auction-gje0.onrender.com/api/teams");
            const data = await res.json();
            setTeams(data);
        };
        fetchTeams();
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

                    {activeSection === 'teams' && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Teams Management</h2>
                                    <p className="text-gray-500 text-sm">Create new teams and view existing ones.</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Team</span>
                                </button>
                            </div>

                            {/* Teams Table */}
                            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700 text-left uppercase text-xs font-semibold">
                                            <th className="px-6 py-3">Logo</th>
                                            <th className="px-6 py-3">Team Name</th>
                                            <th className="px-6 py-3">Owner</th>
                                            <th className="px-6 py-3">Captain</th>
                                            <th className="px-6 py-3">Icon Player</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Purse (Cr)</th>
                                            <th className="px-6 py-3">Remaining</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {teams.map((team) => (
                                            <tr key={team._id} className="hover:bg-gray-50" onClick={() => navigate("/admin/teams/" + team._id)}>
                                                <td className="px-6 py-3">
                                                    {team.logo ? (
                                                        <img
                                                            src={getProxyImageUrl(team.logo)} alt={team.name} className="w-10 h-10 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                            <Users className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-3 font-medium text-gray-800">{team.name}</td>
                                                <td className="px-6 py-3 text-gray-700">{team.ownerName}</td>
                                                <td className="px-6 py-3 text-gray-700">{team.captainName || 'N/A'}</td>
                                                <td className="px-6 py-3 text-gray-700">{team.iconPlayerName || 'N/A'}</td>
                                                <td className="px-6 py-3 text-gray-700">{team.email}</td>
                                                <td className="px-6 py-3 text-gray-700">₹{team.purse}</td>
                                                <td className="px-6 py-3 text-gray-700">₹{team.remainingPurse}</td>
                                                <td className="px-6 py-3">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${team.status === "active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {team.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Modal for Adding Team */}
                            {showModal && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                                    <div className="h-[90%] overflow-auto bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
                                        <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                                            <X className="w-5 h-5" />
                                        </button>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Team</h3>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Team Name</label>
                                                <input name="name" value={formData.name} onChange={handleChange}
                                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                                                <input name="ownerName" value={formData.ownerName} onChange={handleChange}
                                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                                <input type="password" name="password" value={formData.password} onChange={handleChange}
                                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Captain Name</label>
                                                <input name="captainName" value={formData.captainName} onChange={handleChange}
                                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Icon Player Name</label>
                                                <input name="iconPlayerName" value={formData.iconPlayerName} onChange={handleChange}
                                                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" required />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Purse (Cr)</label>
                                                    <input type="number" name="purse" value={formData.purse} onChange={handleChange}
                                                        className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" required />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                                                    <input name="logo" value={formData.logo} onChange={handleChange}
                                                        className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Captain Image URL</label>
                                                    <input name="CaptainPhoto" value={formData.CaptainPhoto} onChange={handleChange}
                                                        className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Icon Player Image URL</label>
                                                    <input name="IconPlayerPhoto" value={formData.IconPlayerPhoto} onChange={handleChange}
                                                        className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Create Team
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Teams
