'use client'

import { useEffect, useMemo, useState } from 'react'

const markets = [
  { key: 'local', label: 'Local Market', score: 92, status: 'Ready', reason: 'Your village and nearby markets already know this craft.', gap: 'Wider product range' },
  { key: 'online', label: 'Online Marketplace', score: 78, status: 'Ready', reason: 'Strong quality and pricing make this a good next step.', gap: 'Digital catalog' },
  { key: 'retail', label: 'Retail / Boutique', score: 65, status: 'Almost ready', reason: 'Boutiques value your finish, but need consistent supply.', gap: 'Packaging' },
  { key: 'wholesale', label: 'Wholesale', score: 54, status: 'Needs work', reason: 'Bulk buyers need higher monthly capacity.', gap: 'Capacity and pricing' },
  { key: 'export', label: 'Export', score: 32, status: 'Not yet', reason: 'Export needs stronger packaging and documentation.', gap: 'Export packaging' },
]

const products = [
  { name: 'Bamboo Basket', price: '₹850', type: 'Bamboo handicraft', image: '/bamboo-basket.png' },
  { name: 'Terracotta Diya Set', price: '₹450', type: 'Terracotta', image: '/terracotta-diyas.png' },
  { name: 'Handwoven Saree', price: '₹2,800', type: 'Handloom textile', image: '/handwoven-saree.png' },
  { name: 'Wooden Craft', price: '₹1,200', type: 'Wood craft', image: '/wooden-craft.png' },
]

const copy: Record<string, Record<string, string>> = {
  en: { hello: 'Namaste, Ramesh ji!', intro: 'Let us help your craft reach the right market.', add: 'Add product', markets: 'Find markets', ready: 'My readiness', progress: 'My progress', suggestion: 'AI suggestion', suggestionText: 'Online marketplaces may be a great next step for your Bamboo Basket. Complete your digital catalog before approaching larger buyers.', home: 'Home', products: 'My products', help: 'Help', profile: 'Profile', intelligence: 'Market intelligence', journey: 'Your journey', speakLabel: 'Speak and ask', voicePreview: 'I want to list my products online. What should I do next?', helpVoicePreview: 'AI: Online Marketplace may be a good option for you.' },
  hi: { hello: 'नमस्ते, रमेश जी!', intro: 'आपके सामान को सही बाज़ार तक पहुँचाने में हम आपकी मदद करेंगे।', add: 'सामान जोड़ें', markets: 'बाज़ार खोजें', ready: 'मेरी तैयारी', progress: 'मेरी प्रगति', suggestion: 'AI सुझाव', suggestionText: 'आपके Bamboo Basket के लिए Online Marketplace अच्छा अगला कदम हो सकता है। बड़े खरीदारों से पहले अपना डिजिटल कैटलॉग पूरा करें।', home: 'होम', products: 'मेरे सामान', help: 'मदद', profile: 'प्रोफ़ाइल', intelligence: 'बाज़ार तैयारी', journey: 'आपकी यात्रा', speakLabel: 'बोलकर बताएं', voicePreview: 'मैं अपने सामान को ऑनलाइन बेचने के लिए क्या करूं?', helpVoicePreview: 'AI: Online Marketplace आपके लिए अच्छा विकल्प हो सकता है।' },
  te: { hello: 'నమస్కారం, రమేష్ గారు!', intro: 'మీ కళను సరైన మార్కెట్‌కు చేర్చడంలో మేము సహాయం చేస్తాము.', add: 'ఉత్పత్తి చేర్చండి', markets: 'మార్కెట్లు కనుగొనండి', ready: 'నా సిద్ధత', progress: 'నా పురోగతి', suggestion: 'AI సూచన', suggestionText: 'మీ Bamboo Basket కోసం Online Marketplace మంచి తదుపరి అడుగు కావచ్చు. పెద్ద కొనుగోలుదారులను సంప్రదించే ముందు మీ డిజిటల్ కాటలాగ్ పూర్తి చేయండి.', home: 'హోమ్', products: 'నా ఉత్పత్తులు', help: 'సహాయం', profile: 'ప్రొఫైల్', intelligence: 'మార్కెట్ సిద్ధత', journey: 'మీ ప్రయాణం', speakLabel: 'మాట్లాడి అడగండి', voicePreview: 'నా ఉత్పత్తులను ఆన్‌లైన్‌లో అమ్మడానికి తర్వాత ఏమి చేయాలి?', helpVoicePreview: 'AI: మీకు Online Marketplace మంచి ఎంపిక కావచ్చు.' },
}

const labels: Record<string, { buyers: string; seeAll: string; heroTag: string; heroText: string; heroButton: string; productsEyebrow: string; productsReady: string; why: string; updated: string; findBuyer: string; progressTitle: string; helpTitle: string }> = {
  en: { buyers: 'Buyers', seeAll: 'See all', heroTag: 'AI MARKET INTELLIGENCE', heroText: 'We look at your craft, capacity, location and digital readiness — then explain what to do next.', heroButton: 'Get AI insights', productsEyebrow: 'MY PRODUCTS', productsReady: 'Readiness', why: 'Why this market?', updated: 'Updated just now', findBuyer: 'Find your next buyer', progressTitle: 'My progress', helpTitle: 'We are here to help' },
  hi: { buyers: 'खरीदार', seeAll: 'सभी देखें', heroTag: 'AI बाज़ार जानकारी', heroText: 'हम आपकी कला, क्षमता, स्थान और डिजिटल तैयारी देखकर अगला सही कदम बताते हैं।', heroButton: 'AI जानकारी देखें', productsEyebrow: 'मेरे सामान', productsReady: 'तैयारी', why: 'यह बाज़ार क्यों?', updated: 'अभी अपडेट किया गया', findBuyer: 'अपना अगला खरीदार खोजें', progressTitle: 'मेरी प्रगति', helpTitle: 'हम आपकी मदद के लिए हैं' },
  te: { buyers: 'కొనుగోలుదారులు', seeAll: 'అన్నీ చూడండి', heroTag: 'AI మార్కెట్ సమాచారం', heroText: 'మీ కళ, సామర్థ్యం, స్థానం మరియు డిజిటల్ సిద్ధతను చూసి తదుపరి అడుగు చెబుతాము.', heroButton: 'AI సూచనలు చూడండి', productsEyebrow: 'నా ఉత్పత్తులు', productsReady: 'సిద్ధత', why: 'ఈ మార్కెట్ ఎందుకు?', updated: 'ఇప్పుడే నవీకరించబడింది', findBuyer: 'మీ తదుపరి కొనుగోలుదారుని కనుగొనండి', progressTitle: 'నా పురోగతి', helpTitle: 'మేము సహాయం కోసం ఉన్నాము' },
}

function ProgressBar({ value, tone = 'terracotta' }: { value: number; tone?: 'terracotta' | 'green' | 'mustard' }) {
  return <div className="progress-track" aria-label={`${value}%`}><span className={`progress-fill ${tone}`} style={{ width: `${value}%` }} /></div>
}

function VoiceButton({ onSpeak, label }: { onSpeak: () => void; label: string }) {
  const [listening, setListening] = useState(false)
  return <button className={`voice-btn ${listening ? 'listening' : ''}`} onClick={() => { setListening(true); onSpeak(); setTimeout(() => setListening(false), 2200) }} aria-label={label}><span className="mic">🎤</span>{label}</button>
}

export default function Page() {
  const [language, setLanguage] = useState<string | null>(null)
  const [page, setPage] = useState('home')
  const [showLanguage, setShowLanguage] = useState(true)

  useEffect(() => {
    const saved = window.localStorage.getItem('craftbridge-language')
    if (saved && copy[saved]) { setLanguage(saved); setShowLanguage(false) }
  }, [])

  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [showBuyer, setShowBuyer] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [toast, setToast] = useState('')
  const [roadmap, setRoadmap] = useState([false, false, true, false])
  const t = copy[language ?? 'en'] ?? copy.en
  const l = labels[language ?? 'en'] ?? labels.en

  const chooseLanguage = (next: string) => {
    setLanguage(next)
    window.localStorage.setItem('craftbridge-language', next)
    setShowLanguage(false)
  }

  const notify = (message: string) => { setToast(message); setTimeout(() => setToast(''), 2600) }
  const startAnalysis = () => {
    setShowAnalysis(true)
    setAnalysisStep(0)
    const timer = setInterval(() => setAnalysisStep((current) => {
      if (current >= 5) { clearInterval(timer); return 5 }
      return current + 1
    }), 700)
  }
  const score = useMemo(() => markets.find((item) => item.key === 'online')!, [])

  if (showLanguage) {
    return <main className={`language-page lang-${language ?? 'en'}`}><div className="language-art">🌾</div><div className="language-card"><div className="brand-mark">craft<span>bridge</span><small>AI</small></div><h1>Select language</h1><p>Choose once. You can change it anytime from profile.</p><div className="lang-grid"><button onClick={() => chooseLanguage('en')}>English</button><button onClick={() => chooseLanguage('hi')}>हिंदी</button><button onClick={() => chooseLanguage('te')}>తెలుగు</button></div></div></main>
  }

  return <div className={`app-shell lang-${language ?? 'en'}`}>
    <header className="topbar"><button className="brand" onClick={() => setPage('home')}><span className="brand-symbol">✦</span><span>craft<span>bridge</span><small>AI</small></span></button><div className="top-actions"><button className="pill-btn" onClick={() => setShowProfile(true)}>{t.profile}</button></div></header>
    <main className="content">
      {page === 'home' && <Home t={t} l={l} onNavigate={setPage} onAnalysis={startAnalysis} onVoice={() => notify(t.voicePreview)} />}
      {page === 'products' && <Products t={t} l={l} onAdd={startAnalysis} onNavigate={setPage} />}
      {page === 'intelligence' && <Intelligence score={score} l={l} onNavigate={setPage} roadmap={roadmap} setRoadmap={setRoadmap} />}
      {page === 'buyers' && <Buyers l={l} onContact={() => setShowBuyer(true)} />}
      {page === 'progress' && <ProgressView l={l} />}
      {page === 'help' && <Help l={l} t={t} onVoice={() => notify(t.helpVoicePreview)} />}
    </main>
    <nav className="bottom-nav">{[['home','⌂',t.home], ['products','▣',t.products], ['intelligence','◎',t.intelligence], ['buyers','♧',l.buyers], ['progress','↗',t.progress]].map(([key, icon, label]) => <button key={key} className={page === key ? 'active' : ''} onClick={() => setPage(key as string)}><span>{icon}</span><small>{label}</small></button>)}</nav>
    {showAnalysis && <AnalysisModal step={analysisStep} onClose={() => { setShowAnalysis(false); setPage('intelligence') }} />}
    {showBuyer && <BuyerModal onClose={() => setShowBuyer(false)} onDone={() => { setShowBuyer(false); notify('Message sent to Dastkar Emporium') }} />}
    {showProfile && <ProfileModal onClose={() => setShowProfile(false)} onSave={() => { setShowProfile(false); notify('Profile updated') }} />}
    {toast && <div className="toast">✓ {toast}</div>}
  </div>
}

function Home({ t, l, onNavigate, onAnalysis, onVoice }: any) { return <div className="page-stack"><section className="welcome"><div><p className="eyebrow">CRAFTBRIDGE AI · {t.journey}</p><h1>{t.hello}</h1><p>{t.intro}</p></div><VoiceButton onSpeak={onVoice} label={t.speakLabel} /></section></div> }
function Products({ t, l }: any) { return <div className="page-stack"><PageTitle eyebrow={l.productsEyebrow} title={t.products} /></div> }
function PageTitle({ eyebrow, title, action }: any) { return <div className="page-title"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{action}</div> }
function Intelligence({ l }: any) { return <div className="page-stack"><PageTitle eyebrow={l.heroTag} title={l.productsReady} /></div> }
function Buyers({ l }: any) { return <div className="page-stack"><PageTitle eyebrow="BUYER DISCOVERY" title={l.findBuyer} /></div> }
function ProgressView({ l }: any) { return <div className="page-stack"><PageTitle eyebrow="MY PROGRESS" title={l.progressTitle} action={<span className="month-pill">August 2026</span>} /></div> }
function Help({ l, onVoice }: any) { return <div className="page-stack"><PageTitle eyebrow="HELP & VOICE" title={l.helpTitle} /><VoiceButton onSpeak={onVoice} label="🎤" /></div> }
function AnalysisModal({ step, onClose }: any) { const steps = ['Product', 'Artisan profile', 'Production capacity', 'Location', 'Digital readiness', 'Finding suitable markets']; return <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={onClose}>×</button><h3>Analyzing your profile</h3><p>{steps[step]}</p></div></div> }
function BuyerModal({ onClose, onDone }: any) { return <div className="modal-backdrop"><div className="small-modal"><button className="modal-close" onClick={onClose}>×</button><button onClick={onDone}>Send message</button></div></div> }
function ProfileModal({ onClose, onSave }: any) { return <div className="modal-backdrop"><div className="small-modal"><button className="modal-close" onClick={onClose}>×</button><button onClick={onSave}>Save profile</button></div></div> }
