import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar({ Islogged = false }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="bg-blue-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-lg font-bold">Event App</p>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">

                    <button onClick={handleLogout} className="cursor-pointer hover:underline">Logout</button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center mt-4 space-y-2  p-4">
                    <button onClick={handleLogout} className="cursor-pointer hover:underline">Logout</button>
                </div>
            )}
        </nav>
    );
}