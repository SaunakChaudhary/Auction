import React, { useEffect, useState } from "react";
import NVPASLOGO from "../assets/nvpas.png";
import CVMLOGO from "../assets/cvm.png";
import { useNavigate } from 'react-router-dom';

const ListofPlayer = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const [playerData, setPlayerData] = useState([]);
    useEffect(() => {
        const fetchPlayerInfo = async () => {
            const response = await fetch('https://auction-gje0.onrender.com/api/players');
            const data = await response.json();
            setPlayerData(data);
        };
        fetchPlayerInfo();
    }, []);

    const getProxyImageUrl = (url) => {
        if (!url) return "";
        const fileId = url.split("id=")[1];
        return `https://auction-gje0.onrender.com/api/players/drive-image/${fileId}`;
    };
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

                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">List of Players</h2>
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
                <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-2xl overflow-x-auto">
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
        </div>
    )
}

export default ListofPlayer
