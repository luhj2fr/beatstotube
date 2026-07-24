const { useState, useEffect } = React;
const { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Container, 
  Grid, 
  IconButton, 
  Paper,
  Box,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Tooltip
} = MaterialUI;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [files, setFiles] = useState({ media: null, audio: null });
  const [metadata, setMetadata] = useState({ 
    title: '', 
    description: '', 
    tags: '',
    privacy: 'public',
    notify: true 
  });
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Default Beat Preset', title: '[PROD BY MDOTTY] Title', description: 'Produced by MDotty\n\nInstagram: @prodbymdottyy2\n\nContact: [Email]\n\n#typebeat #prodbymdotty' }
  ]);
  const [showToast, setShowToast] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: '', description: '' });

  const [userProfile, setUserProfile] = useState({ 
    name: 'MDotty', 
    picture: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' 
  });

// New way for Vercel (Next.js)
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const REDIRECT_URI = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const handleGoogleLogin = () => {
    // In a real app, you'd redirect to Google OAuth here:
    // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/youtube.upload`;
    // window.location.href = authUrl;
    setIsLoggedIn(true);
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) setFiles(prev => ({ ...prev, [type]: file }));
  };

  const applyTemplate = (template) => {
    setMetadata({
      ...metadata,
      title: template.title,
      description: template.description
    });
    setShowToast(true);
  };

  const handleCreateTemplate = () => {
    if (newTemplate.name && newTemplate.description) {
      const id = templates.length + 1;
      setTemplates([...templates, { ...newTemplate, id, title: `[PROD BY MDOTTY] ${newTemplate.name}` }]);
      setNewTemplate({ name: '', description: '' });
      setShowCreateModal(false);
      setShowToast(true);
    }
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-red-500/30 overflow-hidden relative">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <Card className="max-w-md w-full bg-[#0f0f0f] text-white border border-white/5 shadow-[0_0_100px_rgba(220,38,38,0.1)] relative z-10 rounded-[40px] overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 animate-gradient-x"></div>
          <CardContent className="flex flex-col items-center py-16 px-10">
            {/* Animated Logo Container */}
            <div className="relative mb-10 group">
              <div className="absolute -inset-4 bg-red-600/20 rounded-full blur-xl group-hover:bg-red-600/40 transition duration-1000"></div>
              <div className="w-48 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 px-6">
                 <img src="https://static.vecteezy.com/system/resources/previews/018/930/572/original/youtube-logo-youtube-icon-transparent-free-png.png" className="w-full h-auto object-contain" alt="YouTube" />
              </div>
            </div>

            <Typography variant="h3" className="font-black mb-1 tracking-tighter text-white text-center">BEATSTOTUBE</Typography>
            <Typography className="text-slate-400 text-center mb-12 leading-relaxed text-sm font-medium">
              Transform your beats into professional YouTube videos instantly.
            </Typography>

            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-white text-black hover:bg-slate-100 h-16 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-4 transition-all active:scale-95 shadow-xl shadow-white/5 mb-4 group"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
              Login with Google
            </button>

            <div className="flex items-center gap-3 opacity-30 mt-4">
              <span className="h-px w-8 bg-white"></span>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white">By prodbymdotty</p>
              <span className="h-px w-8 bg-white"></span>
            </div>
          </CardContent>
        </Card>

        <style>{`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-screen bg-red-600/5 blur-[120px]"></div>
      </div>

      {/* Modern Header */}
      <nav className="sticky top-0 z-50 bg-[#050505]/60 backdrop-blur-2xl border-b border-white-[0.05] py-5 px-10 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('upload')}>
          <div className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-6">
            <img src="https://static.vecteezy.com/system/resources/previews/018/930/572/original/youtube-logo-youtube-icon-transparent-free-png.png" className="w-6 h-auto object-contain" alt="YouTube Logo" />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase relative">
            BEATSTOTUBE
            <span className="absolute -top-1 -right-4 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          </span>
        </div>

        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`px-10 py-2.5 rounded-[14px] text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'upload' ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'text-slate-400 hover:text-white'}`}
          >
            Studio
          </button>
          <button 
            onClick={() => setActiveTab('presets')}
            className={`px-10 py-2.5 rounded-[14px] text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === 'presets' ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'text-slate-400 hover:text-white'}`}
          >
            Presets
          </button>
        </div>

        <div className="flex items-center gap-5">
           <div className="sm:flex flex-col items-end hidden">
             <span className="text-sm font-bold text-white">{userProfile.name}</span>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-colors overflow-hidden">
              <img src={userProfile.picture} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="User" />
           </div>
        </div>
      </nav>

      <Container maxWidth="lg" className="pt-16 relative">
        {activeTab === 'upload' ? (
          <Grid container spacing={6}>
            {/* Left Col: Uploads */}
            <Grid item xs={12} md={7}>
               <div className="space-y-10">
                  <header>
                    <Typography variant="h4" className="font-black tracking-tighter mb-2">CREATE VIDEO</Typography>
                    <Typography className="text-slate-500 font-medium">Upload your assets to begin the transformation.</Typography>
                  </header>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="group relative block aspect-square bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[40px] hover:border-red-600 transition-all cursor-pointer overflow-hidden p-8">
                       <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload('media', e)} />
                       <div className="h-full flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-image text-3xl text-slate-500 group-hover:text-red-600 transition-colors"></i>
                          </div>
                          <Typography className="font-bold text-lg">Image Background</Typography>
                          <Typography className="text-xs text-slate-500 mt-2">Static visual art</Typography>
                          {files.media && files.media.type.startsWith('image') && (
                            <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center backdrop-blur-sm border-2 border-red-600 rounded-[40px]">
                               <Typography className="font-black uppercase tracking-tighter text-red-500">Image Attached</Typography>
                            </div>
                          )}
                       </div>
                    </label>

                    <label className="group relative block aspect-square bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[40px] hover:border-red-600 transition-all cursor-pointer overflow-hidden p-8">
                       <input type="file" hidden accept="video/mp4" onChange={(e) => handleFileUpload('media', e)} />
                       <div className="h-full flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-[24px] bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-film text-3xl text-slate-500 group-hover:text-red-600 transition-colors"></i>
                          </div>
                          <Typography className="font-bold text-lg">Video Background</Typography>
                          <Typography className="text-xs text-slate-500 mt-2">Looping MP4 visuals</Typography>
                          {files.media && files.media.type.startsWith('video') && (
                            <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center backdrop-blur-sm border-2 border-red-600 rounded-[40px]">
                               <Typography className="font-black uppercase tracking-tighter text-red-500">Video Attached</Typography>
                            </div>
                          )}
                       </div>
                    </label>
                  </div>

                  <label className="group relative block bg-white/[0.02] border-2 border-dashed border-white/5 rounded-[40px] hover:border-red-600 transition-all cursor-pointer overflow-hidden p-10 mt-10">
                    <input type="file" hidden accept="audio/mp3,audio/wav" onChange={(e) => handleFileUpload('audio', e)} />
                    <div className="flex items-center gap-8">
                       <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform shadow-red-600/20">
                          <i className="fa-solid fa-microphone-lines text-white text-3xl"></i>
                       </div>
                       <div className="flex-1">
                          <Typography className="font-black text-2xl tracking-tight mb-1">
                             {files.audio ? files.audio.name : "Choose Beat File"}
                          </Typography>
                          <Typography className="text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-none">
                             WAV or MP3 (Max 500MB)
                          </Typography>
                       </div>
                       {files.audio && <i className="fa-solid fa-circle-check text-green-500 text-2xl"></i>}
                    </div>
                  </label>
               </div>
            </Grid>

            {/* Right Col: Meta */}
            <Grid item xs={12} md={5}>
               <div className="bg-[#0f0f0f] border border-white/5 rounded-[48px] p-10 sticky top-32 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i className="fa-brands fa-youtube text-[120px]"></i>
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-10">
                       <Typography className="font-black text-xl tracking-tighter">YOUTUBE STUDIO</Typography>
                       <Select 
                          className="bg-white/5 rounded-2xl text-[10px] font-black text-slate-400 border border-white/10 px-4 py-2"
                          displayEmpty
                          variant="standard"
                          disableUnderline
                          onChange={(e) => applyTemplate(e.target.value)}
                       >
                          <MenuItem value="" disabled className="text-[10px] font-black uppercase">Load Preset</MenuItem>
                          {templates.map(t => (
                            <MenuItem key={t.id} value={t} className="text-xs font-bold">{t.name}</MenuItem>
                          ))}
                       </Select>
                    </div>

                    <div className="space-y-8">
                       <div>
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 mb-2 block">Video Title</label>
                          <input 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold text-white focus:outline-none focus:border-red-600 transition-colors"
                            placeholder="Enter catchy title..."
                            value={metadata.title}
                            onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                          />
                       </div>

                       <div>
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 mb-2 block">Description</label>
                          <textarea 
                            rows={6}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-medium text-white focus:outline-none focus:border-red-600 transition-colors leading-relaxed placeholder:text-slate-700 resize-none"
                            placeholder="Add credits, links, and contact info..."
                            value={metadata.description}
                            onChange={(e) => setMetadata({...metadata, description: e.target.value})}
                          />
                       </div>

                       <div className="flex gap-4">
                          <button 
                            onClick={() => setMetadata({...metadata, privacy: metadata.privacy === 'public' ? 'private' : 'public'})}
                            className={`flex-1 border rounded-2xl p-5 text-center cursor-pointer transition-all ${metadata.privacy === 'public' ? 'bg-red-600/10 border-red-600/30' : 'bg-white/5 border-white/5'}`}
                          >
                             <Typography className={`text-[10px] font-black uppercase mb-1 underline ${metadata.privacy === 'public' ? 'text-red-500' : 'text-slate-600'}`}>Privacy</Typography>
                             <Typography className="font-bold text-xs uppercase tracking-widest">{metadata.privacy}</Typography>
                          </button>
                          <button 
                            onClick={() => setMetadata({...metadata, notify: !metadata.notify})}
                            className={`flex-1 border rounded-2xl p-5 text-center cursor-pointer transition-all ${metadata.notify ? 'bg-red-600/10 border-red-600/30' : 'bg-white/5 border-white/5'}`}
                          >
                             <Typography className={`text-[10px] font-black uppercase mb-1 underline ${metadata.notify ? 'text-red-500' : 'text-slate-600'}`}>Notify</Typography>
                             <Typography className="font-bold text-xs uppercase tracking-widest">{metadata.notify ? 'Enabled' : 'Disabled'}</Typography>
                          </button>
                       </div>

                       <button 
                         className={`w-full h-20 rounded-3xl text-white font-black text-xs tracking-[0.2em] uppercase transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 ${
                           (files.media && files.audio) ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20 cursor-pointer' : 'bg-slate-800 opacity-50 cursor-not-allowed'
                         }`}
                         disabled={!files.media || !files.audio}
                       >
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                          Initiate Upload
                       </button>
                    </div>
                  </div>
               </div>
            </Grid>
          </Grid>
        ) : (
          /* Presets Logic */
          <div className="max-w-3xl mx-auto pt-10 animate-fade-in">
             <div className="flex justify-between items-end mb-12">
               <div>
                  <Typography variant="h3" className="font-black tracking-tighter mb-2">MY PRESETS</Typography>
                  <Typography className="text-slate-500 font-medium italic">Save your credit descriptions once, use them forever.</Typography>
               </div>
               <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-white text-black h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 active:scale-95 shadow-xl transition-all"
               >
                  + Create New
               </button>
             </div>

             {showCreateModal && (
               <div className="mb-12 bg-[#0f0f0f] border border-red-600/30 p-8 rounded-[32px] animate-fade-in shadow-2xl">
                  <Typography className="font-black text-xl mb-6 tracking-tight">NEW PRESET</Typography>
                  <div className="space-y-6">
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:outline-none focus:border-red-600"
                      placeholder="Preset Name (e.g. Chill Beat)"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    />
                    <textarea 
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium text-white focus:outline-none focus:border-red-600 resize-none"
                      placeholder="Default Description Content..."
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                    />
                    <div className="flex gap-4">
                      <button 
                        onClick={handleCreateTemplate}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                      >
                        Save Preset
                      </button>
                      <button 
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white h-12 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
               </div>
             )}

             <div className="space-y-6">
                {templates.map(template => (
                  <div key={template.id} className="bg-[#0f0f0f] border border-white/5 p-10 rounded-[48px] group hover:border-red-600/30 transition-all flex justify-between items-start cursor-default shadow-xl relative overflow-hidden">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                        <Typography className="font-black text-2xl tracking-tight">{template.name}</Typography>
                      </div>

                      <div className="bg-white/5 border border-white/[0.05] p-6 rounded-3xl font-mono text-xs text-slate-400 whitespace-pre-wrap leading-relaxed italic shadow-inner">
                         "{template.description}"
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 ml-10">
                       <button 
                        onClick={() => {
                          setNewTemplate({ name: template.name, description: template.description });
                          setShowCreateModal(true);
                          handleDeleteTemplate(template.id);
                        }}
                        className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-slate-500 hover:text-white"
                       >
                          <i className="fa-solid fa-pen"></i>
                       </button>
                       <button 
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-red-600/20 transition-all text-slate-500 hover:text-red-500"
                       >
                          <i className="fa-solid fa-trash"></i>
                       </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </Container>

      {/* Footer Branding */}
      <footer className="mt-40 border-t border-white/5 py-20 bg-black/40 backdrop-blur-md">
         <Container maxWidth="lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center">
                      <i className="fa-solid fa-bolt text-red-600 text-3xl"></i>
                   </div>
                   <div>
                      <Typography className="font-black text-2xl tracking-tighter">BEATSTOTUBE</Typography>
                      <Typography className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">
                        Made by <span className="text-white">prodbymdotty</span>
                      </Typography>
                   </div>
                </div>

                <div className="flex items-center gap-12">
                   <a href="https://www.instagram.com/prodbymdottyy2/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all">
                        <i className="fa-brands fa-instagram text-slate-500 group-hover:text-white"></i>
                      </div>
                      <span className="text-xs font-black tracking-widest text-slate-500 group-hover:text-white uppercase transition-colors">prodbymdottyy2</span>
                   </a>
                   <div className="hidden md:block h-10 w-px bg-white/10"></div>
                   <div className="flex flex-col items-end">
                      <Typography className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Current Version</Typography>
                      <Typography className="text-sm font-bold text-white">V1.0.4-BETA</Typography>
                   </div>
                </div>
            </div>
         </Container>
      </footer>

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <div className="bg-red-600 text-white px-10 py-5 rounded-[20px] font-black text-[10px] tracking-widest uppercase shadow-2xl flex items-center gap-4">
           <i className="fa-solid fa-check-double text-lg"></i>
           Preset Successfully Applied
        </div>
      </Snackbar>
    </div>
  );
};

window.App = App;