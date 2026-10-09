import { useState } from 'react';
import { 
  Shield, Bot, Ticket, Layers, AlertTriangle, CheckCircle2, Search,
  TrendingUp, Users, Cpu, FileText, ArrowRight, MessageSquare, Send,
  Sparkles, Filter, RefreshCw, BarChart3, Clock, Zap, User, Lock,
  ChevronRight, ExternalLink, ThumbsUp, ThumbsDown, Copy, Check, LifeBuoy,
  HelpCircle, AlertCircle, Eye, CornerDownRight, Activity, Bell, Sun, Moon,
  Building, Database, Server, Wifi, Smartphone, HardDrive, Key, Mail,
  LogOut, Play, Settings
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, AreaChart, Area
} from 'recharts';

const INITIAL_KNOWLEDGE_BASE = [
  {
    id: 'kb-101',
    title: 'VPN Client Troubleshooting & Password Reset Guide',
    category: 'Network',
    tags: ['VPN', 'Authentication', 'Remote Access', 'MFA'],
    author: 'Network Ops Team',
    updatedAt: '2026-03-15',
    content: 'If your corporate GlobalProtect/AnyConnect VPN fails with an "Authentication Failed" error: 1) Verify active internet connection. 2) Ensure Duo/Okta MFA push is approved on your device. 3) Clear local cache at ~/.cisco/vpn or restart the client service. 4) Verify active Active Directory password isn\'t expired.'
  },
  {
    id: 'kb-102',
    title: 'Phishing Email Reporting & Security Isolation Protocol',
    category: 'Security',
    tags: ['Security', 'Phishing', 'Email', 'Threats'],
    author: 'InfoSec SOC',
    updatedAt: '2026-02-28',
    content: 'Do NOT click links or open attachments in suspicious emails asking for credentials or gift cards. Use the "Report Phishing" button in Outlook immediately. If clicked, disconnect ethernet/wifi and alert SecOps.'
  },
  {
    id: 'kb-103',
    title: 'SSO Login Failures & Identity Management Self-Service',
    category: 'Access',
    tags: ['Access', 'Password', 'SSO', 'Okta'],
    author: 'Identity Team',
    updatedAt: '2026-01-10',
    content: 'Locked out of identity portal? Use identity.company.internal/reset to perform self-service password recovery via SMS or authenticator app. Accounts auto-lock after 5 invalid attempts.'
  },
  {
    id: 'kb-104',
    title: 'Database Access Request & Credentials Provisioning',
    category: 'Database',
    tags: ['Database', 'PostgreSQL', 'Access', 'Cloud'],
    author: 'Database Infrastructure',
    updatedAt: '2026-03-01',
    content: 'Request database read/write permissions via ServiceNow approval matrix. Ensure your IP is whitelisted on the internal Bastion host before connecting via PgAdmin or CLI.'
  }
];

const INITIAL_TICKETS = [
  {
    id: 'TICK-9021',
    title: 'VPN authentication failed',
    description: 'I am working from home and suddenly my company VPN stopped connecting. It says authentication failed and I have an important meeting in 30 minutes.',
    category: 'Network',
    subcategory: 'VPN Authentication',
    priority: 'Critical',
    sentiment: 'Frustrated',
    assignedTeam: 'Network Support',
    status: 'In Progress',
    createdBy: 'employee@ticketai.demo',
    createdByName: 'Sarah Jenkins',
    aiConfidence: 0.96,
    possibleCause: 'Expired LDAP Auth Token or VPN Concentrator MFA Timeout',
    suggestedResponse: 'Hello Sarah,\n\nWe understand you are experiencing a VPN authentication failure. Please approve the MFA prompt on your authenticator device or perform a VPN client service restart.\n\nIf the issue persists, our Network Support team will re-sync your Directory token.\n\nBest regards,\nIT Service Desk',
    createdAt: '2026-03-20 09:15:00',
    similarCount: 3,
    steps: [
      'Verify corporate credentials in Identity Portal',
      'Check Duo/Okta MFA notification on smartphone',
      'Restart Cisco/GlobalProtect VPN client service',
      'Flush DNS using `ipconfig /flushdns` in terminal'
    ]
  },
  {
    id: 'TICK-9022',
    title: 'Unable to connect to corporate VPN from home',
    description: 'VPN login isn\'t working and authentication keeps failing on remote laptop.',
    category: 'Network',
    subcategory: 'VPN Authentication',
    priority: 'High',
    sentiment: 'Concerned',
    assignedTeam: 'Network Support',
    status: 'Open',
    createdBy: 'alex@ticketai.demo',
    createdByName: 'Alex Rivera',
    aiConfidence: 0.94,
    possibleCause: 'VPN Gateway Overload / Auth Service Latency',
    createdAt: '2026-03-20 09:22:00',
    similarCount: 3,
    steps: ['Check network adapter settings', 'Verify MFA response', 'Try secondary gateway US-East-2']
  },
  {
    id: 'TICK-9023',
    title: 'Suspicious email with urgent transfer request',
    description: 'I received an email asking me to click a link and enter my company password to access HR documents.',
    category: 'Security',
    subcategory: 'Phishing Attempt',
    priority: 'Critical',
    sentiment: 'Urgent',
    assignedTeam: 'Security Operations',
    status: 'Assigned',
    createdBy: 'michael@ticketai.demo',
    createdByName: 'Michael Scott',
    aiConfidence: 0.99,
    possibleCause: 'Targeted Credential Harvesting / Phishing Attack',
    createdAt: '2026-03-20 08:45:00',
    similarCount: 0,
    steps: ['Quarantine incoming message domain', 'Audit user access logs', 'Trigger password reset if link was visited']
  },
  {
    id: 'TICK-9024',
    title: 'Laptop extremely slow during video calls',
    description: 'My MacBook Fan goes crazy and Teams freezes whenever I share my screen.',
    category: 'Hardware',
    subcategory: 'Performance / Thermal Throttling',
    priority: 'Medium',
    sentiment: 'Neutral',
    assignedTeam: 'Hardware Support',
    status: 'Resolved',
    createdBy: 'dwight@ticketai.demo',
    createdByName: 'Dwight Schrute',
    aiConfidence: 0.88,
    possibleCause: 'High CPU Memory Usage / Video Hardware Acceleration Bug',
    createdAt: '2026-03-19 14:10:00',
    similarCount: 1,
    steps: ['Disable GPU acceleration in Teams', 'Close background Chrome instances', 'Reset NVRAM/SMC']
  },
  {
    id: 'TICK-9025',
    title: 'Cannot access production Postgres DB server',
    description: 'Connection timed out when trying to connect to prod-db-01.us-east.aws via VPN.',
    category: 'Database',
    subcategory: 'Connectivity / Firewall',
    priority: 'High',
    sentiment: 'Urgent',
    assignedTeam: 'Database Team',
    status: 'Escalated',
    createdBy: 'jim@ticketai.demo',
    createdByName: 'Jim Halpert',
    aiConfidence: 0.91,
    possibleCause: 'Database Bastion Security Group or IP Whitelist Miss',
    createdAt: '2026-03-20 07:30:00',
    similarCount: 2,
    steps: ['Check AWS Security Group rules', 'Verify Bastion host tunnel', 'Review DB connection limits']
  }
];

const AI_STEPS = [
  'Reading ticket content...',
  'Understanding issue intent & context...',
  'Classifying category & subcategory...',
  'Analyzing impact & predicting priority...',
  'Detecting user sentiment & urgency tone...',
  'Checking vector index for similar duplicate tickets...',
  'Searching semantic Knowledge Base articles...',
  'Generating root-cause analysis & resolution steps...',
  'Routing to optimal IT Support Engineering team...'
];

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    email: 'employee@ticketai.demo',
    name: 'Sarah Jenkins',
    role: 'EMPLOYEE' // EMPLOYEE, AGENT, ADMIN
  });

  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [knowledgeBase, setKnowledgeBase] = useState(INITIAL_KNOWLEDGE_BASE);
  const [activeTab, setActiveTab] = useState('landing'); // landing, dashboard, create-ticket, ticket-detail, kb, analytics, admin
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  // Form State for Ticket Creation
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    urgency: 'Medium',
    attachment: null
  });

  // AI Pipeline State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);

  // Ask AI Chatbot State inside Ticket Detail
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatThinking, setIsChatThinking] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Major Incident Alert', msg: 'Multiple VPN tickets detected in 15 min window', unread: true, time: '10m ago' },
    { id: 2, title: 'Ticket Escalated', msg: 'TICK-9025 elevated to Database Lead', unread: true, time: '1h ago' }
  ]);
  const [showNotifs, setShowNotifs] = useState(false);

  // Major Incident Detection Logic
  const networkTicketsLast15 = tickets.filter(t => t.category === 'Network').length;
  const isMajorIncidentDetected = networkTicketsLast15 >= 3;

  const switchRole = (role) => {
    let name = 'Sarah Jenkins';
    let email = 'employee@ticketai.demo';
    if (role === 'AGENT') {
      name = 'Alex Agent';
      email = 'agent@ticketai.demo';
    } else if (role === 'ADMIN') {
      name = 'Admin Director';
      email = 'admin@ticketai.demo';
    }
    setCurrentUser({ role, name, email });
  };

  const runAIAnalysis = (title, description) => {
    const text = (title + ' ' + description).toLowerCase();
    
    let category = 'Software';
    let subcategory = 'General Support';
    let priority = 'Medium';
    let sentiment = 'Neutral';
    let assignedTeam = 'Software Support';
    let confidence = 0.92;
    let possibleCause = 'Standard application exception or system configuration error.';
    let steps = [
      'Clear client local application cache',
      'Verify account permission scope',
      'Restart the impacted service'
    ];
    let suggestedResponse = `Hello,\n\nWe have received your ticket regarding standard software assistance. Our software engineering team will inspect the system logs.\n\nThank you,\nIT Support Copilot`;

    // Category / ML Rules
    if (text.includes('vpn') || text.includes('connect') || text.includes('wifi') || text.includes('network') || text.includes('internet')) {
      category = 'Network';
      subcategory = 'VPN & Connectivity';
      assignedTeam = 'Network Support';
      possibleCause = 'RADIUS / LDAP authentication handshake timeout or VPN gateway congestion.';
      steps = [
        'Verify active internet connectivity on host machine',
        'Check Okta/Duo MFA push notifications',
        'Restart VPN client client service daemon',
        'Reconnect via secondary regional VPN server'
      ];
      suggestedResponse = `Hello,\n\nOur AI diagnostic indicates a potential VPN authentication or token expiration issue. Please restart your VPN client and approve any multi-factor prompts.\n\nRegards,\nNetwork Operations`;
    } else if (text.includes('email') || text.includes('phishing') || text.includes('virus') || text.includes('password') || text.includes('hack')) {
      category = 'Security';
      subcategory = 'Identity & Threat Response';
      assignedTeam = 'Security Operations';
      possibleCause = 'Suspicious external email vector or account lockout rule triggered.';
      steps = [
        'Do not interact with links or attachments',
        'Isolate host workstation if payload was executed',
        'Trigger force credential rotation'
      ];
      suggestedResponse = `Hello,\n\nThank you for alerting SecOps. We have quarantined the suspicious email domain and logged your ticket for rapid threat review.\n\nRegards,\nSecurity Team`;
    } else if (text.includes('database') || text.includes('postgres') || text.includes('sql') || text.includes('db')) {
      category = 'Database';
      subcategory = 'DB Connections / Access';
      assignedTeam = 'Database Team';
      possibleCause = 'Bastion security group rule misconfiguration or database connection pool exhaustion.';
      steps = [
        'Check database bastion host health',
        'Verify target port 5432 ingress rules',
        'Review database connection limits'
      ];
    } else if (text.includes('laptop') || text.includes('screen') || text.includes('monitor') || text.includes('keyboard') || text.includes('printer')) {
      category = 'Hardware';
      subcategory = 'Peripheral / Device Failure';
      assignedTeam = 'Hardware Support';
      possibleCause = 'Hardware driver conflict or thermal throttling.';
      steps = [
        'Perform hard device power cycle',
        'Update peripheral firmware drivers',
        'Inspect physical cabling connections'
      ];
    }

    // Sentiment Rules
    if (text.includes('urgent') || text.includes('meeting in') || text.includes('down') || text.includes('cannot work') || text.includes('immediately')) {
      priority = 'Critical';
      sentiment = 'Frustrated';
    } else if (text.includes('slow') || text.includes('help') || text.includes('not working')) {
      priority = 'High';
      sentiment = 'Concerned';
    } else {
      priority = 'Medium';
      sentiment = 'Neutral';
    }

    // Similar tickets finding (mock cosine similarity)
    const similarTickets = tickets.filter(t => t.category === category || t.title.toLowerCase().includes(category.toLowerCase())).map(t => ({
      id: t.id,
      title: t.title,
      similarity: (Math.random() * 0.2 + 0.78).toFixed(2)
    }));

    // KB Article Matching
    const matchedKb = knowledgeBase.filter(k => k.category === category || k.tags.some(tag => text.includes(tag.toLowerCase())));

    return {
      category,
      subcategory,
      priority,
      sentiment,
      assignedTeam,
      confidence: (Math.random() * 0.08 + 0.91).toFixed(2),
      possibleCause,
      steps,
      suggestedResponse,
      similarTickets,
      matchedKb
    };
  };

  const handleAnalyzeTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.title || !ticketForm.description) return;

    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < AI_STEPS.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        const analysis = runAIAnalysis(ticketForm.title, ticketForm.description);
        setAiAnalysisResult(analysis);
        setIsAnalyzing(false);
      }
    }, 400);
  };

  const finalizeCreateTicket = () => {
    if (!aiAnalysisResult) return;
    const newId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicketObj = {
      id: newId,
      title: ticketForm.title,
      description: ticketForm.description,
      category: aiAnalysisResult.category,
      subcategory: aiAnalysisResult.subcategory,
      priority: aiAnalysisResult.priority,
      sentiment: aiAnalysisResult.sentiment,
      assignedTeam: aiAnalysisResult.assignedTeam,
      status: 'Open',
      createdBy: currentUser.email,
      createdByName: currentUser.name,
      aiConfidence: parseFloat(aiAnalysisResult.confidence),
      possibleCause: aiAnalysisResult.possibleCause,
      suggestedResponse: aiAnalysisResult.suggestedResponse,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      similarCount: aiAnalysisResult.similarTickets.length,
      steps: aiAnalysisResult.steps
    };

    setTickets([newTicketObj, ...tickets]);
    setSelectedTicket(newTicketObj);
    setTicketForm({ title: '', description: '', urgency: 'Medium', attachment: null });
    setAiAnalysisResult(null);
    setActiveTab('ticket-detail');
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedTicket) return;

    const userMsg = { sender: 'user', text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    const currentQuery = chatInput;
    setChatInput('');
    setIsChatThinking(true);

    setTimeout(() => {
      let reply = `Based on ticket context [${selectedTicket.id} - ${selectedTicket.category}], recommended action: verify corporate identity credentials and reset local daemon context.`;
      
      const q = currentQuery.toLowerCase();
      if (q.includes('why') || q.includes('cause')) {
        reply = `The AI detected root cause for ${selectedTicket.id}: "${selectedTicket.possibleCause}". This usually happens due to token expirations or auth protocol mismatches.`;
      } else if (q.includes('mfa') || q.includes('token')) {
        reply = `To inspect MFA tokens: Open Okta/Duo app on mobile device, swipe down to refresh push prompts, or request an offline passcode if traveling.`;
      } else if (q.includes('escalate')) {
        reply = `You can escalate this ticket directly to ${selectedTicket.assignedTeam} lead by clicking the 'Escalate Ticket' button in the copilot control bar.`;
      }

      const aiMsg = { sender: 'ai', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setChatMessages(prev => [...prev, aiMsg]);
      setIsChatThinking(false);
    }, 800);
  };

  const categoryData = Object.entries(
    tickets.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const priorityData = [
    { name: 'Critical', value: tickets.filter(t => t.priority === 'Critical').length, color: '#ef4444' },
    { name: 'High', value: tickets.filter(t => t.priority === 'High').length, color: '#f97316' },
    { name: 'Medium', value: tickets.filter(t => t.priority === 'Medium').length, color: '#eab308' },
    { name: 'Low', value: tickets.filter(t => t.priority === 'Low').length, color: '#22c55e' },
  ];

  const teamData = Object.entries(
    tickets.reduce((acc, t) => {
      acc[t.assignedTeam] = (acc[t.assignedTeam] || 0) + 1;
      return acc;
    }, {})
  ).map(([team, count]) => ({ team, count }));

  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans transition-colors duration-200 flex flex-col`}>
      
      {}
      <header className={`sticky top-0 z-40 border-b ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-md px-4 lg:px-8 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-6">
          <button onClick={() => setActiveTab('landing')} className="flex items-center space-x-3 text-left focus:outline-none group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">TicketAI</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Copilot</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Understand. Classify. Resolve.</p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Layers },
              { id: 'create-ticket', label: 'New Ticket', icon: Zap },
              { id: 'kb', label: 'Knowledge Intelligence', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === nav.id
                      ? darkMode ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      : darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Multi-Role RBAC Switcher Dropdown */}
          <div className="relative flex items-center bg-slate-800/60 p-1 rounded-lg border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium px-2 hidden sm:inline">Role:</span>
            {['EMPLOYEE', 'AGENT', 'ADMIN'].map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-all ${
                  currentUser.role === r
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border ${darkMode ? 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900' : 'border-slate-200 text-slate-600 hover:text-slate-900 bg-white'}`}
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className={`p-2 rounded-lg border relative ${darkMode ? 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900' : 'border-slate-200 text-slate-600 hover:text-slate-900 bg-white'}`}
            >
              <Bell className="w-4 h-4" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              )}
            </button>

            {showNotifs && (
              <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl border p-3 z-50 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'}`}>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="font-semibold text-xs uppercase tracking-wider text-slate-400">System Intelligence Alerts</span>
                  <button onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))} className="text-[11px] text-indigo-400 hover:underline">Mark read</button>
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-2.5 rounded-lg text-xs border ${n.unread ? 'bg-indigo-950/40 border-indigo-800/50' : 'bg-slate-800/30 border-slate-800'}`}>
                      <div className="font-semibold text-indigo-300">{n.title}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{n.msg}</div>
                      <div className="text-[10px] text-slate-500 mt-1 text-right">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400">{currentUser.role}</div>
            </div>
          </div>

        </div>
      </header>

      {}
      {isMajorIncidentDetected && (
        <div className="bg-gradient-to-r from-amber-950 via-red-950 to-amber-950 border-b border-amber-600/40 text-amber-200 px-4 py-2.5 text-xs flex items-center justify-between shadow-inner">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded-full bg-amber-500/20 text-amber-400 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wide mr-2">POSSIBLE MAJOR INCIDENT DETECTED:</span>
              <span>3+ High-density Network & VPN tickets detected within 15 minutes. High probability of corporate gateway outage.</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('analytics')}
            className="px-3 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-medium transition-colors"
          >
            Inspect Intelligence
          </button>
        </div>
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">

        {}
        {activeTab === 'landing' && (
          <div className="space-y-16 py-6">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto pt-8">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation IT Service Copilot</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-1000">
                Turn Every IT Ticket into an <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Intelligent Actionable Resolution</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                TicketAI understands natural language, predicts root causes, matches historical duplicates, and generates instant agent copilot responses automatically.
              </p>
              
              <div className="flex items-center justify-center space-x-4 pt-2">
                <button
                  onClick={() => setActiveTab('create-ticket')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>Submit an IT Ticket</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 text-indigo-400" />
                  <span>Interactive Live Demo</span>
                </button>
              </div>
            </div>

            {/* Platform Capabilities Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              {[
                { title: 'AI Categorization & Routing', desc: 'Zero human sorting required. Automatically tags Network, Security, Hardware, DB, and routes to team leads.', icon: Zap, color: 'text-indigo-400' },
                { title: 'Vector Duplicate Detection', desc: 'Calculates cosine similarity on vector embeddings to identify recurring user incidents across the enterprise.', icon: Layers, color: 'text-purple-400' },
                { title: 'Major Incident Intelligence', desc: 'Surfaces cluster outages in real-time when ticket velocity surges for specific categories or subcomponents.', icon: AlertTriangle, color: 'text-amber-400' },
                { title: 'Resolution Copilot', desc: 'Generates step-by-step diagnostic workflows and professional email responses for rapid agent triage.', icon: Bot, color: 'text-pink-400' },
                { title: 'Sentiment & Urgency Engine', desc: 'Measures user frustration level to auto-escalate critical business-stoppage issues instantly.', icon: Activity, color: 'text-emerald-400' },
                { title: 'Knowledge Intelligence', desc: 'Queries enterprise KB articles to attach self-service solutions directly to incoming tickets.', icon: FileText, color: 'text-blue-400' },
              ].map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                    <div className={`p-3 rounded-xl bg-slate-800/50 w-fit ${cap.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-200 text-base">{cap.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{cap.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Top Stat KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Total Tickets', val: tickets.length, sub: 'Across system', color: 'border-indigo-500/30' },
                { label: 'Open / Pending', val: tickets.filter(t => t.status !== 'Resolved').length, sub: 'Requires action', color: 'border-amber-500/30' },
                { label: 'Critical Urgency', val: tickets.filter(t => t.priority === 'Critical').length, sub: 'Immediate priority', color: 'border-red-500/30' },
                { label: 'AI Resolution Rate', val: '94.2%', sub: 'Auto-assisted', color: 'border-emerald-500/30' },
                { label: 'Avg Triage Speed', val: '1.2s', sub: 'Real-time AI', color: 'border-purple-500/30' },
              ].map((kpi, idx) => (
                <div key={idx} className={`p-4 rounded-xl bg-slate-900/80 border ${kpi.color} space-y-1`}>
                  <div className="text-xs font-semibold text-slate-400">{kpi.label}</div>
                  <div className="text-2xl font-bold text-slate-1000">{kpi.val}</div>
                  <div className="text-[10px] text-slate-500">{kpi.sub}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions & AI Recommendation Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 border border-indigo-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Copilot Recommendation</span>
                </div>
                <p className="text-slate-200 font-medium text-sm">
                  {isMajorIncidentDetected 
                    ? 'Recommended: Group 3 active VPN tickets under a single Major Incident ticket for Network Support.'
                    : 'System operating smoothly. 0 SLA breaches detected in the last 24 hours.'}
                </p>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab('create-ticket')}
                  className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Create Ticket</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
                >
                  View Analytics
                </button>
              </div>
            </div>

            {/* Ticket Management Table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-slate-200">System IT Tickets</h2>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search ticket ID, title, issue..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="p-3.5">Ticket ID</th>
                      <th className="p-3.5">Issue Summary</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Priority</th>
                      <th className="p-3.5">Sentiment</th>
                      <th className="p-3.5">Assigned Team</th>
                      <th className="p-3.5">Confidence</th>
                      <th className="p-3.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {tickets
                      .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((t) => (
                        <tr key={t.id} className="hover:bg-slate-800/40 transition-colors group">
                          <td className="p-3.5 font-mono font-bold text-indigo-400">{t.id}</td>
                          <td className="p-3.5 max-w-xs">
                            <div className="font-semibold text-slate-200 truncate">{t.title}</div>
                            <div className="text-[11px] text-slate-500 truncate">{t.description}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                              {t.category}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              t.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              t.priority === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {t.priority}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-400 font-medium">{t.sentiment}</span>
                          </td>
                          <td className="p-3.5 font-medium text-slate-300">{t.assignedTeam}</td>
                          <td className="p-3.5">
                            <div className="flex items-center space-x-1 font-mono text-emerald-400">
                              <span>{(t.aiConfidence * 100).toFixed(0)}%</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => {
                                setSelectedTicket(t);
                                setActiveTab('ticket-detail');
                              }}
                              className="px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center space-x-1"
                            >
                              <span>Inspect</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'create-ticket' && (
          <div className="max-w-3xl mx-auto space-y-6 py-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-1000">Submit IT Support Request</h2>
              <p className="text-slate-400 text-xs">
                Describe your technical problem in natural language. Our AI engine will analyze, classify, and suggest immediate self-service fixes.
              </p>
            </div>

            {/* Ticket Submission Form */}
            <form onSubmit={handleAnalyzeTicketSubmit} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Ticket Title / Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., VPN authentication failed or Production Postgres timeout"
                  value={ticketForm.title}
                  onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Detailed Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide full context: error messages, timing, application names, or urgency requirements..."
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Urgency Level</label>
                  <select
                    value={ticketForm.urgency}
                    onChange={(e) => setTicketForm({ ...ticketForm, urgency: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="Low">Low - General Question</option>
                    <option value="Medium">Medium - Normal Workflow Impact</option>
                    <option value="High">High - Impairing Work</option>
                    <option value="Critical">Critical - Full Work Stoppage</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Category Tag</label>
                  <input
                    type="text"
                    disabled
                    value="Auto-Detected by AI Copilot"
                    className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl px-3 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze with AI Copilot</span>
              </button>
            </form>

            {}
            {isAnalyzing && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-4 shadow-2xl animate-fade-in">
                <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <Bot className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-200">AI Ticket Processing Pipeline</h3>
                    <p className="text-[11px] text-slate-400">Executing classification model and root-cause transformer...</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {AI_STEPS.map((stepText, idx) => {
                    const isDone = idx < currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    return (
                      <div key={idx} className={`flex items-center space-x-3 text-xs p-2 rounded-lg transition-colors ${
                        isCurrent ? 'bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-semibold' :
                        isDone ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                        )}
                        <span>{stepText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Result Review Card */}
            {aiAnalysisResult && !isAnalyzing && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-6 shadow-2xl animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-base text-slate-1000">AI Analysis & Classification Ready</h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {(parseFloat(aiAnalysisResult.confidence) * 100).toFixed(0)}% Confidence
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Category</span>
                    <div className="font-bold text-indigo-300">{aiAnalysisResult.category}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Priority</span>
                    <div className="font-bold text-red-400">{aiAnalysisResult.priority}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Sentiment</span>
                    <div className="font-bold text-amber-400">{aiAnalysisResult.sentiment}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Routed Team</span>
                    <div className="font-bold text-purple-300">{aiAnalysisResult.assignedTeam}</div>
                  </div>
                </div>

                {/* Root Cause & Steps */}
                <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-bold text-slate-200">Likely Root Cause</div>
                  <p className="text-xs text-slate-400">{aiAnalysisResult.possibleCause}</p>

                  <div className="text-xs font-bold text-slate-200 pt-2">Recommended Step-By-Step Fixes</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {aiAnalysisResult.steps.map((st, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center font-bold">{i+1}</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={finalizeCreateTicket}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    Confirm & Submit Ticket
                  </button>
                  <button
                    onClick={() => setAiAnalysisResult(null)}
                    className="px-4 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium"
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {}
        {activeTab === 'ticket-detail' && selectedTicket && (
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Main Ticket Details & Copilot Actions */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Ticket Header Banner */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-mono font-bold text-indigo-400">{selectedTicket.id}</span>
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      selectedTicket.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {selectedTicket.priority} Priority
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-medium">
                      {selectedTicket.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                <h1 className="text-xl font-bold text-slate-1000">{selectedTicket.title}</h1>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  "{selectedTicket.description}"
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <div><strong className="text-slate-300">Submitted By:</strong> {selectedTicket.createdByName} ({selectedTicket.createdBy})</div>
                  <div><strong className="text-slate-300">Category:</strong> {selectedTicket.category}</div>
                  <div><strong className="text-slate-300">Routed Team:</strong> {selectedTicket.assignedTeam}</div>
                </div>
              </div>

              {/* AI Copilot Intelligence Panel */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/40 border border-indigo-500/30 space-y-5">
                <div className="flex items-center justify-between border-b border-indigo-800/40 pb-3">
                  <div className="flex items-center space-x-2 text-indigo-300">
                    <Bot className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-bold text-base">AI Resolution Copilot Diagnostic</h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Confidence: {(selectedTicket.aiConfidence * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-indigo-300 uppercase tracking-wider text-[10px]">Predicted Root Cause</span>
                    <p className="text-slate-200 mt-1 text-sm font-medium">{selectedTicket.possibleCause}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-indigo-300 uppercase tracking-wider text-[10px]">Step-By-Step Troubleshooting Protocol</span>
                    <div className="space-y-2 mt-2">
                      {selectedTicket.steps?.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                          <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-slate-300 text-xs">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Auto-Generated Response Draft */}
                  {selectedTicket.suggestedResponse && (
                    <div className="pt-2">
                      <span className="font-semibold text-indigo-300 uppercase tracking-wider text-[10px]">Suggested Agent Response Draft</span>
                      <div className="mt-1.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-sans text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                        {selectedTicket.suggestedResponse}
                      </div>
                    </div>
                  )}
                </div>

                {/* Copilot Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: 'Resolved' } : t));
                      setSelectedTicket({ ...selectedTicket, status: 'Resolved' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Issue Resolved</span>
                  </button>

                  <button
                    onClick={() => {
                      setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: 'Escalated', priority: 'Critical' } : t));
                      setSelectedTicket({ ...selectedTicket, status: 'Escalated', priority: 'Critical' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Escalate to Tier 2</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col: Ask AI Copilot Chatbot Panel */}
            <div className="space-y-6">
              
              {/* Ask AI Contextual Chat */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col h-[520px]">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="font-bold text-sm text-slate-200">Contextual Ask AI Copilot</h3>
                </div>

                {/* Messages Box */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-slate-300">
                    👋 Hi! I am your IT Support Copilot. Ask me questions about ticket <strong className="text-indigo-400">{selectedTicket.id}</strong> (e.g., "Why did this happen?", "How do I clear local cache?").
                  </div>

                  {chatMessages.map((m, idx) => (
                    <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-xl ${
                        m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
                      }`}>
                        <p className="leading-relaxed">{m.text}</p>
                        <div className="text-[9px] opacity-70 mt-1 text-right">{m.time}</div>
                      </div>
                    </div>
                  ))}

                  {isChatThinking && (
                    <div className="flex items-center space-x-2 text-slate-500 text-xs italic">
                      <Bot className="w-3.5 h-3.5 animate-spin" />
                      <span>Copilot querying local knowledge base...</span>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendChatMessage} className="pt-3 border-t border-slate-800 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Ask copilot about this issue..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  <button type="submit" className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Similar Duplicate Tickets Widget */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-slate-300 font-bold text-xs">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Duplicate & Similar Tickets</span>
                </div>
                <div className="space-y-2 text-xs">
                  {tickets.filter(t => t.id !== selectedTicket.id && t.category === selectedTicket.category).slice(0, 2).map((st) => (
                    <div key={st.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-indigo-400 font-bold">{st.id}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">92% Match</span>
                      </div>
                      <p className="text-slate-300 font-medium truncate">{st.title}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {}
        {activeTab === 'kb' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-1000">Enterprise Knowledge Intelligence</h2>
              <p className="text-slate-400 text-xs">Explore standard operating procedures, fix protocols, and threat advisories.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {knowledgeBase.map((article) => (
                <div key={article.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase">{article.category}</span>
                    <span className="text-[10px] text-slate-500">Updated: {article.updatedAt}</span>
                  </div>
                  <h3 className="font-bold text-slate-1000 text-base">{article.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{article.content}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-1000">System Analytics & Incident Metrics</h2>
              <p className="text-slate-400 text-xs">Real-time breakdown calculated directly from backend dataset metrics.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Category Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">Tickets by Category</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Priority Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">Tickets by Priority Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priorityData}>
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                      <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 bg-slate-950">
        TicketAI — Intelligent IT Support Copilot & Enterprise Incident Resolution System
      </footer>
    </div>
  );
}