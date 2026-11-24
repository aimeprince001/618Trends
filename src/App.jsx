import { useMemo, useState } from "react";
import SitePage from "./Pages.jsx";
import {
  Search, Menu, Bell, Settings, Bookmark, BookmarkCheck, ChevronDown,
  ArrowUpRight, Clock3, TrendingUp, X, Share2, Globe2, Check,
  SlidersHorizontal, Newspaper, Radio, Flame, CircleUserRound
} from "lucide-react";

const stories = [
  {id:1, category:"Top story", section:"World", title:"The stories shaping the world, right now", summary:"A closer look at the major developments moving communities, leaders and markets today.", author:"618TRENDS Desk", time:"8 min ago", image:"https://images.unsplash.com/photo-1529106234-1d4b5f9b7b4a?auto=format&fit=crop&w=1200&q=85", tag:"Today's briefing", featured:true},
  {id:2, category:"Sports", section:"Sports", title:"The big match preview: what to watch before kickoff", summary:"Form, tactics and the key players expected to make the difference in a high-stakes contest.", author:"Sports Desk", time:"14 min ago", image:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80", tag:"Matchday"},
  {id:3, category:"Politics", section:"Politics", title:"Policy, people and the decisions affecting everyday life", summary:"Our guide to the latest public debate and what the next steps could mean for citizens.", author:"Politics Desk", time:"22 min ago", image:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80", tag:"Explainer"},
  {id:4, category:"Entertainment", section:"Entertainment", title:"On screen and on stage: the culture conversation", summary:"The releases, performances and creative voices getting people talking this week.", author:"Culture Desk", time:"31 min ago", image:"https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80", tag:"Culture"},
  {id:5, category:"Social", section:"Social", title:"Community voices are bringing a new idea to life", summary:"Meet the people building practical solutions and creating meaningful change close to home.", author:"Community Desk", time:"46 min ago", image:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80", tag:"People"},
  {id:6, category:"Technology", section:"Technology", title:"The technology trends worth understanding—not just scrolling past", summary:"A clear, accessible look at innovations changing how we work, learn and connect.", author:"Tech Desk", time:"1 hr ago", image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80", tag:"Future"},
  {id:7, category:"Business", section:"Business", title:"Markets, work and the ideas driving tomorrow's economy", summary:"The business stories behind the numbers, with context that helps make sense of the change.", author:"Business Desk", time:"1 hr ago", image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80", tag:"Insight"},
  {id:8, category:"World", section:"World", title:"Across borders: a fresh perspective on global headlines", summary:"Important international updates and the human stories behind them.", author:"World Desk", time:"2 hr ago", image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80", tag:"Global"}
];
const sections = ["For you","World","Politics","Sports","Entertainment","Social","Technology","Business"];
const defaultPrefs = {all:true,World:true,Politics:true,Sports:true,Entertainment:true,Social:true,Technology:true,Business:true};

function App(){
  const [section,setSection] = useState("For you");
  const [page,setPage] = useState("home");
  const [search,setSearch] = useState("");
  const [saved,setSaved] = useState([]);
  const [showSaved,setShowSaved] = useState(false);
  const [settings,setSettings] = useState(false);
  const [notifications,setNotifications] = useState(false);
  const [prefs,setPrefs] = useState(()=>{try{return {...defaultPrefs,...JSON.parse(localStorage.getItem("618trends-notifications")||"{}")}}catch{return defaultPrefs}});
  const [language,setLanguage] = useState("English");
  const [reading,setReading] = useState("Comfortable");
  const [activeStory,setActiveStory] = useState(null);
  const [mobileNav,setMobileNav] = useState(false);
  const [toast,setToast] = useState("");

  const filtered = useMemo(()=>stories.filter(s=>{
    const sectionMatch=section==="For you" || s.section===section || s.category===section;
    const savedMatch=!showSaved || saved.includes(s.id);
    const q=search.trim().toLowerCase();
    const searchMatch=!q || (s.title+" "+s.summary+" "+s.section+" "+s.tag).toLowerCase().includes(q);
    return sectionMatch&&savedMatch&&searchMatch;
  }),[section,search,showSaved,saved]);

  function toggleSave(id){
    setSaved(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
    setToast(saved.includes(id)?"Removed from saved stories":"Story saved for later");
    setTimeout(()=>setToast(""),2200);
  }
  function updatePrefs(next){
    setPrefs(next);
    localStorage.setItem("618trends-notifications",JSON.stringify(next));
  }
  function shareStory(story){
    if(navigator.share) navigator.share({title:story.title,text:story.summary,url:window.location.href}).catch(()=>{});
    else {navigator.clipboard?.writeText(story.title+" — "+window.location.href);setToast("Headline copied");setTimeout(()=>setToast(""),2000);}
  }

  return <div className={"app "+(reading==="Compact"?"compact":"")}>
    <header className="topbar">
      <button className="icon-btn mobile-menu" aria-label="Open navigation" onClick={()=>setMobileNav(!mobileNav)}><Menu size={20}/></button>
      <a className="brand" href="#" onClick={e=>{e.preventDefault();setPage("home");setSection("For you");setShowSaved(false)}}><span className="brand-mark">6</span><span>618<span className="brand-light">TRENDS</span><small>NEWS THAT MOVES YOU</small></span></a>
      <div className="top-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search stories, topics, people..." /><kbd>⌘ K</kbd></div>
      <div className="top-actions">
        <button className={"icon-btn "+(showSaved?"active":"")} title="Saved stories" onClick={()=>{setShowSaved(!showSaved);setSection("For you")}}>{showSaved?<BookmarkCheck size={19}/>:<Bookmark size={19}/>}</button>
        <button className={"icon-btn "+(notifications?"active":"")} title="Notifications" onClick={()=>setNotifications(!notifications)}><Bell size={19}/><i className="notification-dot"/></button>
        <button className="avatar" title="Open settings" onClick={()=>setSettings(true)}>AP</button>
      </div>
    </header>

    <div className="ticker"><span className="ticker-label"><Radio size={13}/> LIVE BRIEFING</span><span className="ticker-text">Your daily perspective starts here <b>•</b> Explore the stories behind the headlines <b>•</b> Stay curious, stay informed</span><span className="ticker-time">TUESDAY, NOV 24</span></div>

    <div className="layout">
      <aside className={"sidebar "+(mobileNav?"open":"")}>
        <div className="side-heading">YOUR NEWS</div>
        <nav>{sections.map((s,i)=><button key={s} className={"nav-item "+(section===s&&!showSaved?"selected":"")} onClick={()=>{setSection(s);setShowSaved(false);setMobileNav(false)}}>{i===0?<Newspaper size={18}/>:<span className="nav-dot" style={{background:["#e9a63b","#7d8cff","#38b5d7","#e36c8e","#4cb99a","#a58be8","#d28b56"][i-1]}}/>}<span>{s}</span>{s==="For you"&&<span className="nav-count">NEW</span>}</button>)}</nav>
        <div className="side-divider"/>
        <button className={"nav-item "+(showSaved?"selected":"")} onClick={()=>{setShowSaved(true);setSection("For you");setMobileNav(false)}}><Bookmark size={18}/><span>Saved stories</span><span className="nav-count">{saved.length}</span></button>
        <div className="sidebar-card"><div className="sidebar-card-icon"><Bell size={17}/></div><strong>Your news, your way.</strong><p>Choose the topics you care about and get notified when they matter.</p><button onClick={()=>setSettings(true)}>Personalize feed <ArrowUpRight size={14}/></button></div>
        <div className="side-page-links"><button onClick={()=>{setPage("trending");setMobileNav(false)}}><TrendingUp size={15}/> Trending</button><button onClick={()=>{setPage("about");setMobileNav(false)}}><Newspaper size={15}/> About 618TRENDS</button><button onClick={()=>{setPage("contact");setMobileNav(false)}}><CircleUserRound size={15}/> Contact</button><button onClick={()=>{setPage("newsletter");setMobileNav(false)}}><Bell size={15}/> Newsletter</button></div><div className="sidebar-footer"><span>© 2026 618TRENDS</span><span>Independent perspective.</span></div>
      </aside>

      <main className="content">
        {page==="home" ? <>
        <div className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> TUESDAY EDITION <span className="eyebrow-line"/></div><h1>{showSaved?"Your saved stories":section==="For you"?"Stay ahead of the story.":section+" / The latest"}</h1><p className="welcome-sub">{showSaved?"Stories you’ve bookmarked to read later.":"The news that matters, with context that makes it clearer."}</p></div><button className="settings-shortcut" onClick={()=>setSettings(true)}><SlidersHorizontal size={16}/> Customize <ChevronDown size={14}/></button></div>

        {!showSaved&&!search&&section==="For you"&&<section className="hero-grid">
          <article className="hero-story" onClick={()=>setActiveStory(stories[0])} style={{backgroundImage:"linear-gradient(90deg,rgba(9,13,22,.92) 0%,rgba(9,13,22,.58) 52%,rgba(9,13,22,.06) 100%),url("+stories[0].image+")"}}>
            <div className="hero-content"><span className="live-label"><span/> EDITOR'S PICK</span><h2>{stories[0].title}</h2><p>{stories[0].summary}</p><div className="story-meta hero-meta"><span>618TRENDS Desk</span><span><Clock3 size={13}/> {stories[0].time}</span></div><button className="read-btn">Read the briefing <ArrowUpRight size={16}/></button></div>
            <span className="hero-number">01 <i>/ 08</i></span>
          </article>
          <div className="hero-side"><div className="section-title"><span>THE PULSE</span><span className="pulse-dot"/></div>{stories.slice(1,4).map((s,i)=><article className="pulse-item" key={s.id} onClick={()=>setActiveStory(s)}><span className="pulse-index">0{i+2}</span><div><span className="category-label">{s.section}</span><h3>{s.title}</h3><span className="small-time">{s.time}</span></div></article>)}<button className="view-all" onClick={()=>setSection("World")}>Explore all headlines <ArrowUpRight size={15}/></button></div>
        </section>}

        <div className="trending-row"><div className="section-title"><TrendingUp size={16}/><span>Trending topics</span></div><div className="topic-chips">{["#WorldUpdate","#Matchday","#CultureNow","#Community"].map((t,i)=><button key={t} onClick={()=>{setSearch(t.slice(1));setShowSaved(false)}}>{t}</button>)}</div></div>

        <div className="feed-heading"><div><span className="section-title">{showSaved?"BOOKMARKS":search?"SEARCH RESULTS":section==="For you"?"LATEST STORIES":section.toUpperCase()+" NEWS"}</span><span className="feed-count">{filtered.length} stories</span></div><button className="sort-btn" onClick={()=>setSection("For you")}>Latest <ChevronDown size={14}/></button></div>
        {filtered.length===0?<div className="empty-state"><Bookmark size={28}/><h3>{showSaved?"No saved stories yet":"No stories found"}</h3><p>{showSaved?"Tap the bookmark icon on any story to keep it here.":"Try another search or choose a different section."}</p><button onClick={()=>{setSearch("");setShowSaved(false);setSection("For you")}}>Back to top stories</button></div>:<div className="story-grid">{filtered.map((s,i)=><article className="story-card" key={s.id}><div className="card-image" style={{backgroundImage:"url("+s.image+")"}} onClick={()=>setActiveStory(s)}><span className="image-tag">{s.tag}</span><button className="save-btn" aria-label="Save story" onClick={e=>{e.stopPropagation();toggleSave(s.id)}}>{saved.includes(s.id)?<BookmarkCheck size={17}/>:<Bookmark size={17}/>}</button></div><div className="card-body"><span className="category-label">{s.section}</span><h3 onClick={()=>setActiveStory(s)}>{s.title}</h3><p>{s.summary}</p><div className="card-bottom"><span>{s.author}</span><span><Clock3 size={12}/> {s.time}</span></div></div></article>)}</div>}
        <div className="sample-note"><span className="note-icon">i</span> <span>Preview edition: sample headlines and timestamps. Connect a trusted news source to publish live updates.</span></div>
        <footer className="main-footer"><span>618TRENDS <b>•</b> News that moves you.</span><span>Curious minds. Clear perspectives.</span></footer>
        </> : <SitePage page={page} onNavigate={setPage} stories={stories} onStory={setActiveStory}/> }
      </main>
    </div>

    {notifications&&<div className="popover notifications-pop"><div className="popover-head"><strong>Notifications</strong><button className="icon-btn" onClick={()=>setNotifications(false)}><X size={16}/></button></div><div className="notification-row"><span className="notif-symbol"><Bell size={16}/></span><div><strong>You're all caught up</strong><p>New alerts will appear here.</p></div></div><button className="popover-link" onClick={()=>{setNotifications(false);setSettings(true)}}>Manage notification settings <ArrowUpRight size={14}/></button></div>}
    {settings&&<div className="overlay" onClick={()=>setSettings(false)}><section className="settings-panel" onClick={e=>e.stopPropagation()}><div className="panel-header"><div><span className="eyebrow">YOUR EXPERIENCE</span><h2>Settings</h2></div><button className="icon-btn" onClick={()=>setSettings(false)}><X size={20}/></button></div><div className="settings-scroll"><div className="settings-block"><div className="setting-title"><div><strong><Bell size={16}/> Notifications</strong><p>Choose which topics can send you alerts.</p></div><label className="switch"><input type="checkbox" checked={prefs.all} onChange={e=>updatePrefs({...prefs,all:e.target.checked,...Object.fromEntries(Object.keys(defaultPrefs).filter(k=>k!=="all").map(k=>[k,e.target.checked]))})}/><span/></label></div><div className="all-alerts"><span><Flame size={15}/> Notify me about all news</span><span className="muted">{prefs.all?"ON":"OFF"}</span></div><div className="preference-list">{Object.keys(defaultPrefs).filter(k=>k!=="all").map(k=><label key={k}><span>{k}</span><input type="checkbox" checked={!!prefs[k]} onChange={e=>updatePrefs({...prefs,[k]:e.target.checked,all:false})}/></label>)}</div></div><div className="settings-block"><div className="setting-title"><div><strong><Globe2 size={16}/> Language</strong><p>Choose your preferred reading language.</p></div></div><select value={language} onChange={e=>setLanguage(e.target.value)}><option>English</option><option>Kinyarwanda</option><option>French</option><option>Swahili</option></select><p className="hint">Language selection is saved for this session in this preview. Full article translation requires a translation service.</p></div><div className="settings-block"><div className="setting-title"><div><strong><SlidersHorizontal size={16}/> Reading experience</strong><p>Adjust the density of your news feed.</p></div></div><div className="segmented"><button className={reading==="Comfortable"?"chosen":""} onClick={()=>setReading("Comfortable")}>Comfortable</button><button className={reading==="Compact"?"chosen":""} onClick={()=>setReading("Compact")}>Compact</button></div></div><div className="settings-block account-block"><CircleUserRound size={19}/><div><strong>Guest reader</strong><p>Sign in and registration can be connected to your backend.</p></div></div></div><div className="panel-footer"><button className="save-settings" onClick={()=>{setSettings(false);setToast("Settings applied");setTimeout(()=>setToast(""),2000)}}><Check size={16}/> Done</button></div></section></div>}
    {activeStory&&<div className="overlay story-overlay" onClick={()=>setActiveStory(null)}><article className="story-modal" onClick={e=>e.stopPropagation()}><button className="modal-close icon-btn" onClick={()=>setActiveStory(null)}><X size={20}/></button><div className="modal-image" style={{backgroundImage:"url("+activeStory.image+")"}}/><div className="modal-content"><span className="category-label">{activeStory.section} / {activeStory.tag}</span><h2>{activeStory.title}</h2><div className="story-meta"><span>{activeStory.author}</span><span><Clock3 size={13}/> {activeStory.time}</span></div><p className="modal-summary">{activeStory.summary}</p><p>This preview article is designed to show how 618TRENDS will present clear, contextual reporting. Connect your newsroom or a verified news API to replace this sample with a complete article, source attribution and updated reporting.</p><div className="modal-actions"><button className="read-btn" onClick={()=>toggleSave(activeStory.id)}>{saved.includes(activeStory.id)?<BookmarkCheck size={16}/>:<Bookmark size={16}/>} {saved.includes(activeStory.id)?"Saved":"Save story"}</button><button className="share-btn" onClick={()=>shareStory(activeStory)}><Share2 size={16}/> Share</button></div></div></article></div>}
    {toast&&<div className="toast"><Check size={15}/>{toast}</div>}
  </div>;
}
export default App;
