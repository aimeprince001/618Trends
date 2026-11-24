import { useState } from "react";
import { ArrowUpRight, Mail, Send, TrendingUp, Globe2, ShieldCheck, Radio, Users, CheckCircle2, Newspaper } from "lucide-react";

const pageCopy = {
  about: {
    eyebrow: "OUR PURPOSE",
    title: "News that moves you.",
    subtitle: "A clear, curious and community-minded view of the stories shaping our world.",
  },
};

export default function SitePage({ page, onNavigate, stories, onStory }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const featured = stories.slice(1, 5);

  if (page === "trending") return <section className="site-page">
    <div className="page-hero"><span className="page-eyebrow"><TrendingUp size={15}/> WHAT PEOPLE ARE READING</span><h1>Trending <em>now.</em></h1><p>Topics gaining attention across the 618TRENDS newsroom. Select a story to open its briefing.</p></div>
    <div className="page-stat-row"><div><strong>01</strong><span>Top story</span></div><div><strong>08</strong><span>Preview articles</span></div><div><strong>06</strong><span>News sections</span></div></div>
    <div className="page-story-list">{stories.slice(0,8).map((story,i)=><button className="page-story-row" key={story.id} onClick={()=>onStory(story)}><span className="page-rank">{String(i+1).padStart(2,"0")}</span><span className="page-story-thumb" style={{backgroundImage:"url("+story.image+")"}}/><span className="page-story-copy"><small>{story.section} · {story.time}</small><strong>{story.title}</strong><span>{story.summary}</span></span><ArrowUpRight size={17}/></button>)}</div>
    <div className="page-cta"><div><strong>Explore every perspective</strong><p>Choose a section to browse more stories.</p></div><button onClick={()=>onNavigate("home")}>Browse news <ArrowUpRight size={15}/></button></div>
  </section>;

  if (page === "about") return <section className="site-page">
    <div className="page-hero about-hero"><span className="page-eyebrow"><Globe2 size={15}/> ABOUT 618TRENDS</span><h1>Stay informed.<br/><em>Stay connected.</em></h1><p>We believe good journalism does more than report what happened. It helps people understand why it matters and what comes next.</p><button className="page-primary" onClick={()=>onNavigate("home")}>Explore the newsroom <ArrowUpRight size={15}/></button></div>
    <div className="page-feature-grid"><article><span className="page-feature-icon"><Newspaper size={20}/></span><h3>Context over noise</h3><p>We aim to make complex developments easier to understand with concise summaries and useful background.</p></article><article><span className="page-feature-icon"><Users size={20}/></span><h3>People at the center</h3><p>Stories should reflect the communities affected by them and make room for diverse perspectives.</p></article><article><span className="page-feature-icon"><ShieldCheck size={20}/></span><h3>Responsible reporting</h3><p>Accuracy, source transparency and thoughtful corrections are essential to earning trust.</p></article></div>
    <div className="page-note"><Radio size={18}/><div><strong>618TRENDS preview</strong><p>This repository currently contains a frontend preview. A live newsroom requires connected reporting sources, editorial review and publishing infrastructure.</p></div></div>
  </section>;

  if (page === "contact") return <section className="site-page">
    <div className="page-hero"><span className="page-eyebrow"><Mail size={15}/> GET IN TOUCH</span><h1>Let's start a <em>conversation.</em></h1><p>Send a newsroom question, story tip or feedback about your reading experience.</p></div>
    <div className="page-contact-layout"><div className="contact-info"><h2>Reach the newsroom</h2><p>We welcome thoughtful feedback and story ideas. Please avoid sending private or sensitive information through this demo form.</p><div className="contact-detail"><Mail size={17}/><div><strong>Editorial enquiries</strong><span>Use the form to send a message</span></div></div><div className="contact-detail"><Radio size={17}/><div><strong>Story tips</strong><span>Include the location and public source if available</span></div></div></div>
      <form className="page-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Your name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/></label><label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Message<textarea required rows="5" value={message} onChange={e=>setMessage(e.target.value)} placeholder="How can we help?"/></label><button className="page-primary" type="submit"><Send size={15}/> Send message</button>{sent&&<p className="form-success"><CheckCircle2 size={16}/> Message captured in this demo. Connect a backend or email service to deliver it to the newsroom.</p>}</form></div>
  </section>;

  if (page === "newsletter") return <section className="site-page">
    <div className="newsletter-panel"><span className="page-eyebrow"><Mail size={15}/> THE 618TRENDS BRIEFING</span><div className="newsletter-icon"><Mail size={28}/></div><h1>A clearer view,<br/><em>in your inbox.</em></h1><p>Get a concise digest of important headlines and stories worth understanding.</p><form className="newsletter-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address"/><button type="submit" aria-label="Subscribe"><Send size={17}/></button></form>{sent?<div className="form-success"><CheckCircle2 size={16}/> Subscription recorded in this preview. Connect a mailing-list service to activate delivery.</div>:<small>No spam. Unsubscribe whenever you like. This preview does not send email.</small>}</div>
    <div className="newsletter-benefits"><div><strong>Daily essentials</strong><span>The headlines with context.</span></div><div><strong>Section highlights</strong><span>Sports, politics, culture and more.</span></div><div><strong>Reader first</strong><span>Useful information, not inbox clutter.</span></div></div>
  </section>;

  return <section className="site-page"><div className="page-hero"><span className="page-eyebrow">{pageCopy.about.eyebrow}</span><h1>{pageCopy.about.title}</h1><p>{pageCopy.about.subtitle}</p></div><div className="page-feature-grid">{featured.map(s=><article key={s.id}><span className="page-feature-icon"><Newspaper size={20}/></span><h3>{s.section}</h3><p>{s.summary}</p><button onClick={()=>onStory(s)}>Read story <ArrowUpRight size={14}/></button></article>)}</div></section>;
}
