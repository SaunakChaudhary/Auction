import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  User,
  Upload,
  LogOut,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Plus,
  Play,
  HammerIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminToken') != 'ncl@admin.comm') {
      return navigate('/admin/login');
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, navigate: '/admin/dashboard' },
    { id: 'teams', label: 'Teams', icon: Users, navigate: '/admin/teams' },
    { id: 'players', label: 'Players', icon: User, navigate: '/admin/players' },
    { id: 'auction-room', label: 'Auction Room', icon: HammerIcon, navigate: '/admin/auction-room/1' }
  ];

  const getProxyImageUrl = (url) => {
    if (!url) return "";
    const fileId = url.split("id=")[1];
    return `https://auction-gje0.onrender.com/api/players/drive-image/${fileId}`;
  };

  const [teams, setTeams] = useState([]);
  const [dashboard, setdashobard] = useState([]);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      const res = await fetch("http://localhost:5000/api/teams");
      const data = await res.json();
      setTeams(data);
    };
    const fetchDashboard = async () => {
      const res = await fetch("http://localhost:5000/api/dashboard");
      const data = await res.json();
      setdashobard(data);
    };
    fetchDashboard();
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
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Teams Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
                  <div onClick={() => navigate("/admin/teams")} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Teams</p>
                      <h3 className="text-3xl font-bold text-gray-800 mt-2">{dashboard.totalTeams}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>All teams registered</span>
                  </div>
                </div>

                {/* Total Players Card */}
                <div onClick={() => navigate("/admin/players")} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Players</p>
                      <h3 className="text-3xl font-bold text-gray-800 mt-2">{dashboard.totalPlayers}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-blue-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>Available for auction</span>
                  </div>
                </div>

                <div onClick={() => navigate("/admin/sold-players")} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sold Players</p>
                      <h3 className="text-3xl font-bold text-gray-800 mt-2">{dashboard?.SoldPlayers?.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-purple-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>Successfully sold</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Remaining Purse</h3>
                <div className="space-y-4">
                  {dashboard.teams && dashboard.teams.map((team, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        {team.logo ? (
                          <img
                            src={getProxyImageUrl(team.logo)} alt={team.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <Users className="w-5 h-5" />
                          </div>
                        )}
                        <span className="font-medium text-gray-800">{team.name}</span>
                        <span className="font-medium text-sm text-gray-400 italic">Owner {team.ownerName}</span>
                      </div>
                      <div className="text-right">
                        Remaining Purse : <span className="font-bold text-gray-800">₹{team.remainingPurse}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div >
    </div >
  );
};

export default AdminDashboard;