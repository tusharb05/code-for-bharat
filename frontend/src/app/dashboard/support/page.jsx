"use client";
import { motion } from "framer-motion";
import { LifeBuoy, Mail, Phone, HelpCircle } from "lucide-react";
import { useState } from "react";

const supportTopics = [
  { title: "Account Issues", desc: "Help with login, signup, or account management." },
  { title: "Roadmap Problems", desc: "Issues with creating or following a roadmap." },
  { title: "Feature Requests", desc: "Suggest a new feature or improvement." },
  { title: "Bug Reports", desc: "Report a bug or unexpected behavior." },
];

const faqs = [
  { question: "How do I reset my password?", answer: "Go to settings, click 'Change Password', and follow the instructions." },
  { question: "How do I report a bug?", answer: "Use the contact form below or email support@codelens.com with details." },
  { question: "Can I request a new roadmap?", answer: "Yes! Use the feature request topic or the contact form to let us know your needs." },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const filteredTopics = supportTopics.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase()));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-4 bg-[#0a0a0f] text-white overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-8">
        <LifeBuoy className="text-blue-400" size={32} />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 text-transparent bg-clip-text">Support</h1>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-200 mb-2 flex items-center gap-2"><HelpCircle className="text-blue-400" /> Need Help?</h2>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search help topics..."
            className="w-full mb-4 px-4 py-2 rounded-lg border border-blue-900/40 bg-[#161b22] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-4 mb-2">
            {filteredTopics.length > 0 ? filteredTopics.map((topic, i) => (
              <div key={i} className="flex-1 min-w-[220px] bg-[#181f2b] rounded-lg p-4 border border-blue-900/20 mb-2">
                <div className="font-bold text-blue-300 mb-1 flex items-center gap-2"><HelpCircle size={18} /> {topic.title}</div>
                <div className="text-neutral-200 text-sm">{topic.desc}</div>
              </div>
            )) : <div className="text-neutral-400">No topics found.</div>}
          </div>
          <div className="flex gap-4 mb-2">
            <a href="mailto:support@codelens.com" className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"><Mail size={18} /> Email Support</a>
            <a href="tel:+1234567890" className="flex items-center gap-2 px-4 py-2 bg-blue-700/80 hover:bg-blue-800 text-white rounded-lg font-semibold transition-all"><Phone size={18} /> Call Us</a>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-blue-200 mb-4 flex items-center gap-2"><LifeBuoy className="text-blue-400" /> Frequently Asked Questions</h2>
        <div className="space-y-4 mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#181f2b] rounded-lg p-4 border border-blue-900/20">
              <div className="font-bold text-blue-300 mb-1 flex items-center gap-2"><HelpCircle size={18} /> {faq.question}</div>
              <div className="text-neutral-200 text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-blue-200 mb-4 flex items-center gap-2"><Mail className="text-blue-400" /> Contact Support</h2>
        {submitted ? (
          <div className="bg-green-700/20 border border-green-700 text-green-200 rounded-lg p-4">Thank you! Your message has been sent. We'll get back to you soon.</div>
        ) : (
          <form
            className="bg-[#181f2b] rounded-lg p-4 border border-blue-900/20 flex flex-col gap-4"
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
          >
            <input
              type="text"
              required
              placeholder="Your Name"
              className="px-4 py-2 rounded-lg border border-blue-900/40 bg-[#161b22] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={contact.name}
              onChange={e => setContact({ ...contact, name: e.target.value })}
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              className="px-4 py-2 rounded-lg border border-blue-900/40 bg-[#161b22] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
            />
            <textarea
              required
              placeholder="How can we help you?"
              className="px-4 py-2 rounded-lg border border-blue-900/40 bg-[#161b22] text-white placeholder-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[100px]"
              value={contact.message}
              onChange={e => setContact({ ...contact, message: e.target.value })}
            />
            <button type="submit" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-all">Send Message</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
} 