"use client";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Moon, Sun, Bell, BellOff, Lock, Trash2 } from "lucide-react";
import { useState, useRef } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: "Arjun Sharma", email: "arjun@example.com", avatar: "https://ui-avatars.com/api/?name=Arjun+Sharma" });
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [saved, setSaved] = useState(false);
  const fileInput = useRef();
  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };
  const handleSave = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen p-4 bg-[#0a0a0f] text-white overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="text-blue-400" size={32} />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">Settings</h1>
      </div>
      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Section */}
        <div className="bg-[#161b22] rounded-xl border border-blue-900/40 p-6 shadow-md flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <img src={profile.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-blue-700 object-cover" />
            <button type="button" onClick={() => fileInput.current.click()} className="text-xs text-blue-400 hover:underline">Change Avatar</button>
            <input type="file" accept="image/*" ref={fileInput} onChange={handleAvatarChange} className="hidden" />
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <input name="name" value={profile.name} onChange={handleProfileChange} className="flex-1 px-4 py-2 rounded-lg border border-blue-900/40 bg-[#181f2b] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Full Name" />
              <input name="email" value={profile.email} onChange={handleProfileChange} className="flex-1 px-4 py-2 rounded-lg border border-blue-900/40 bg-[#181f2b] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Email Address" />
            </div>
          </div>
        </div>
        {/* Password Section */}
        <div className="bg-[#161b22] rounded-xl border border-blue-900/40 p-6 shadow-md">
          <h2 className="text-xl font-semibold text-blue-200 mb-4 flex items-center gap-2"><Lock className="text-blue-400" /> Change Password</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="password" value={password.current} onChange={e => setPassword({ ...password, current: e.target.value })} className="flex-1 px-4 py-2 rounded-lg border border-blue-900/40 bg-[#181f2b] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Current Password" />
            <input type="password" value={password.new} onChange={e => setPassword({ ...password, new: e.target.value })} className="flex-1 px-4 py-2 rounded-lg border border-blue-900/40 bg-[#181f2b] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="New Password" />
            <input type="password" value={password.confirm} onChange={e => setPassword({ ...password, confirm: e.target.value })} className="flex-1 px-4 py-2 rounded-lg border border-blue-900/40 bg-[#181f2b] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Confirm New Password" />
          </div>
        </div>
        {/* Save Button */}
        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-all">{saved ? "Saved!" : "Save Changes"}</button>
        </div>
      </form>
    </motion.div>
  );
} 