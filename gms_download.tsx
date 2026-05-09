import { useState } from "react";

const BLUE = "#133BAC";
const YELLOW = "#FFFBA8";

const files = [
  {
    name: "src/App.js",
    lang: "js",
    content: `import { useState, useEffect } from "react";

const BLUE = "#133BAC";
const YELLOW = "#FFFBA8";
const YELLOW_DARK = "#E6E07A";

const CATEGORIES = ["전체", "은행", "증권", "보험", "금융위원회", "핀테크"];

const CAT_COLORS = {
  "은행":      { bg: "#E6F1FB", text: "#0C447C", dot: "#378ADD" },
  "증권":      { bg: "#FAEEDA", text: "#633806", dot: "#EF9F27" },
  "보험":      { bg: "#EAF3DE", text: "#27500A", dot: "#639922" },
  "금융위원회":{ bg: "#EEEDFE", text: "#3C3489", dot: "#7F77DD" },
  "핀테크":   { bg: "#FAECE7", text: "#712B13", dot: "#D85A30" },
};
const EMOJIS = { "은행":"🏦","증권":"📈","보험":"🛡️","금융위원회":"⚖️","핀테크":"💡" };

const MOCK_NEWS = [
  { id:1, category:"은행",      title:"한국은행, 기준금리 동결…추가 인하 시그널 주목",        summary:"한국은행 금통위가 기준금리를 3.5%로 동결했습니다. 이주열 총재는 하반기 경기 둔화 우려를 언급하며 추가 인하 가능성을 열어뒀습니다.",              source:"연합뉴스",   time:"07:12", date:"2026-05-09", url:"https://www.yna.co.kr",      img:"https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&q=80" },
  { id:2, category:"증권",      title:"코스피 2,680 돌파…외국인 순매수 3거래일 연속",          summary:"외국인 투자자가 삼성전자·SK하이닉스를 중심으로 순매수를 이어가며 코스피가 2,680선을 돌파했습니다. 반도체 업종 강세가 지수를 견인했습니다.",     source:"한국경제",   time:"07:35", date:"2026-05-09", url:"https://www.hankyung.com",   img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80" },
  { id:3, category:"보험",      title:"생보사 IFRS17 도입 후 첫 성적표…순이익 32% 급증",     summary:"IFRS17 도입 첫 해 주요 생명보험사의 순이익이 평균 32% 증가했습니다. 계약서비스마진(CSM) 효과가 실적 개선을 이끌었다는 분석입니다.",              source:"매일경제",   time:"07:50", date:"2026-05-08", url:"https://www.mk.co.kr",       img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80" },
  { id:4, category:"금융위원회",title:"금융위, 가계대출 DSR 규제 강화 방안 발표 예고",        summary:"금융위원회가 이달 내 가계대출 총부채원리금상환비율(DSR) 규제를 추가 강화하는 방안을 발표할 예정입니다. 2금융권 적용 기준이 핵심입니다.",          source:"조선비즈",   time:"08:05", date:"2026-05-08", url:"https://biz.chosun.com",     img:"https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&q=80" },
  { id:5, category:"핀테크",    title:"카카오페이, 日 페이페이와 QR 결제 연동 본격화",        summary:"카카오페이가 일본 최대 간편결제 페이페이와 QR코드 결제 연동을 공식 개시했습니다. 방일 한국인 관광객 대상 편의성이 크게 높아질 전망입니다.",        source:"디지털타임스",time:"08:20", date:"2026-05-07", url:"https://www.dt.co.kr",       img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" },
  { id:6, category:"은행",      title:"5대 은행 예금 금리 줄줄이 인하…수신 경쟁 소강",        summary:"KB·신한·하나·우리·NH농협은행이 주요 정기예금 금리를 일제히 내렸습니다. 시장금리 하락과 대출 수요 감소가 맞물린 결과로 분석됩니다.",              source:"뉴시스",     time:"08:45", date:"2026-05-07", url:"https://www.newsis.com",     img:"https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&q=80" },
];

const today = new Date().toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"long"});

function NewsCard({ news, bookmarked, onBookmark }) {
  const col = CAT_COLORS[news.category] || {};
  return (
    <div style={{background:"#fff",border:"1.5px solid #EFEFEF",borderRadius:18,overflow:"hidden",display:"flex",flexDirection:"column",transition:"transform 0.15s,box-shadow 0.15s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(19,59,172,0.10)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
      <div style={{position:"relative",height:140,overflow:"hidden"}}>
        <img src={news.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",top:10,left:10,background:col.bg,color:col.text,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,display:"flex",alignItems:"center",gap:4}}>
          {EMOJIS[news.category]} {news.category}
        </div>
        <button onClick={()=>onBookmark(news.id)}
          style={{position:"absolute",top:8,right:10,background:bookmarked?YELLOW:"rgba(255,255,255,0.88)",border:"none",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:15,transition:"background 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.10)"}}
          aria-label={bookmarked?"북마크 해제":"북마크"}>
          {bookmarked?"★":"☆"}
        </button>
      </div>
      <div style={{padding:"13px 15px 15px",display:"flex",flexDirection:"column",gap:5,flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:11,color:"#999"}}>{news.source}</span>
          <span style={{fontSize:11,color:"#ddd"}}>·</span>
          <span style={{fontSize:11,color:"#999"}}>{news.time}</span>
        </div>
        <p style={{margin:0,fontSize:13.5,fontWeight:700,color:"#111827",lineHeight:1.45,letterSpacing:"-0.2px"}}>{news.title}</p>
        <p style={{margin:0,fontSize:12.5,color:"#555",lineHeight:1.6,flex:1}}>{news.summary}</p>
        <a href={news.url} target="_blank" rel="noopener noreferrer"
          style={{marginTop:4,fontSize:12,color:BLUE,display:"flex",alignItems:"center",gap:4,textDecoration:"none",fontWeight:600}}>
          기사 원문 보기 →
        </a>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("전체");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [scraped, setScraped] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(()=>{
    if(!loading)return;
    const id=setInterval(()=>setDots(d=>d.length>=3?"":d+"."),400);
    return()=>clearInterval(id);
  },[loading]);

  const handleScrape = async () => {
    if(loading)return;
    setLoading(true);setNews([]);setScraped(false);
    await new Promise(r=>setTimeout(r,2200));
    setNews(MOCK_NEWS);setLoading(false);setScraped(true);
  };

  const toggleBookmark = id => {
    setBookmarks(prev=>{const n=new Set(prev);n.has(id)?n.delete(id):n.add(id);return n;});
  };

  const filtered = showBookmarks
    ? MOCK_NEWS.filter(n=>bookmarks.has(n.id))
    : tab==="전체" ? news : news.filter(n=>n.category===tab);

  return (
    <div style={{fontFamily:"'Apple SD Gothic Neo','Pretendard',sans-serif",background:"#F5F7FF",minHeight:"100vh",paddingBottom:40}}>
      <div style={{background:BLUE,padding:"24px 24px 0",position:"relative"}}>
        <button onClick={()=>setShowBookmarks(v=>!v)}
          style={{position:"absolute",top:22,right:20,background:showBookmarks?YELLOW:"rgba(255,255,255,0.15)",border:"none",borderRadius:22,padding:"8px 16px",color:showBookmarks?"#133BAC":"#fff",fontSize:12.5,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5,transition:"background 0.2s"}}>
          ★ 저장함
          {bookmarks.size>0&&<span style={{background:YELLOW,color:BLUE,borderRadius:"50%",width:17,height:17,fontSize:10.5,display:"inline-flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{bookmarks.size}</span>}
        </button>
        <div style={{textAlign:"center",paddingRight:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:5}}>
            <span style={{fontSize:28,lineHeight:1}}>☀️</span>
            <span style={{fontSize:26,fontWeight:900,color:YELLOW,letterSpacing:"0.5px",fontFamily:"'Georgia','Times New Roman',serif",fontStyle:"italic",textShadow:"2px 2px 0px rgba(0,0,0,0.15)"}}>Good Morning Sunshine</span>
          </div>
          <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,0.70)",letterSpacing:"0.2px"}}>{today}</p>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:18,marginBottom:scraped?18:0}}>
          <button onClick={handleScrape} disabled={loading}
            style={{background:YELLOW,border:"none",borderRadius:26,padding:"11px 32px",color:BLUE,fontSize:13.5,fontWeight:800,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:8,opacity:loading?0.85:1,letterSpacing:"-0.2px",transition:"transform 0.1s,box-shadow 0.1s",boxShadow:"0 3px 0 "+YELLOW_DARK}}
            onMouseDown={e=>{e.currentTarget.style.transform="scale(0.97) translateY(2px)";e.currentTarget.style.boxShadow="none";}}
            onMouseUp={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 3px 0 "+YELLOW_DARK;}}>
            {loading?<><span style={{display:"inline-block",animation:"spin 1s linear infinite"}}>⟳</span> 수집 중{dots}</>:<><span>🔍</span> 오늘 뉴스 스크랩</>}
          </button>
        </div>
        {!showBookmarks&&scraped&&(
          <div style={{display:"flex",justifyContent:"center",borderTop:"1.5px solid rgba(255,255,255,0.18)",paddingTop:4,overflowX:"auto"}}>
            {CATEGORIES.map(c=>{
              const count=c==="전체"?news.length:news.filter(n=>n.category===c).length;
              const active=tab===c;
              return(
                <button key={c} onClick={()=>setTab(c)}
                  style={{flex:"1 0 auto",background:"transparent",border:"none",borderBottom:active?"3px solid "+YELLOW:"3px solid transparent",padding:"10px 8px 8px",color:active?YELLOW:"rgba(255,255,255,0.65)",fontSize:12.5,fontWeight:active?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"color 0.15s,border-color 0.15s",whiteSpace:"nowrap",minWidth:60}}>
                  <span>{c}</span>
                  {count>0&&<span style={{fontSize:10,opacity:0.8}}>{count}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"24px 18px 0"}}>
        {showBookmarks&&(()=>{
          const saved=MOCK_NEWS.filter(n=>bookmarks.has(n.id));
          const byDate=saved.reduce((acc,n)=>{(acc[n.date]=acc[n.date]||[]).push(n);return acc;},{});
          const dates=Object.keys(byDate).sort((a,b)=>b.localeCompare(a));
          const fmtDate=d=>new Date(d).toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"short"});
          return(
            <>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
                <span style={{fontSize:17}}>★</span>
                <span style={{fontSize:15,fontWeight:700,color:"#111827"}}>저장한 기사</span>
                <span style={{fontSize:13,color:"#999"}}>{bookmarks.size}개</span>
              </div>
              {bookmarks.size===0
                ?<div style={{textAlign:"center",padding:"60px 0",color:"#ccc"}}><div style={{fontSize:36,marginBottom:12}}>☆</div><p style={{margin:0,fontSize:14}}>아직 저장한 기사가 없어요</p></div>
                :dates.map(date=>(
                  <div key={date} style={{marginBottom:32}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                      <span style={{background:BLUE,color:YELLOW,fontSize:11.5,fontWeight:700,padding:"4px 12px",borderRadius:20}}>{fmtDate(date)}</span>
                      <span style={{fontSize:12,color:"#aaa"}}>{byDate[date].length}개</span>
                    </div>
                    <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:8}}>
                      {byDate[date].map(n=>(
                        <div key={n.id} style={{minWidth:240,maxWidth:240,flex:"0 0 auto"}}>
                          <NewsCard news={n} bookmarked={bookmarks.has(n.id)} onBookmark={toggleBookmark}/>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
            </>
          );
        })()}

        {!showBookmarks&&loading&&(
          <div style={{textAlign:"center",padding:"70px 0"}}>
            <div style={{fontSize:42,marginBottom:14,animation:"bounce 0.7s ease-in-out infinite alternate"}}>📰</div>
            <p style={{margin:0,fontSize:14,color:"#444"}}>금융 뉴스를 긁어오는 중이에요{dots}</p>
            <p style={{margin:"6px 0 0",fontSize:12,color:"#aaa"}}>은행 · 증권 · 보험 · 금융위원회 · 핀테크</p>
          </div>
        )}

        {!showBookmarks&&!loading&&news.length===0&&(
          <div style={{textAlign:"center",padding:"80px 0"}}>
            <div style={{fontSize:52,marginBottom:16}}>🌅</div>
            <p style={{margin:0,fontSize:15,fontWeight:700,color:"#111827"}}>오늘의 금융 뉴스를 불러와볼까요?</p>
            <p style={{margin:"8px 0 0",fontSize:13,color:"#888"}}>상단의 오늘 뉴스 스크랩 버튼을 눌러주세요</p>
          </div>
        )}

        {!showBookmarks&&!loading&&filtered.length>0&&(
          <>
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginBottom:14}}>
              <span style={{fontSize:12.5,color:"#999"}}>총 <strong style={{color:BLUE}}>{filtered.length}</strong>개의 기사</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:16}}>
              {filtered.map(n=><NewsCard key={n.id} news={n} bookmarked={bookmarks.has(n.id)} onBookmark={toggleBookmark}/>)}
            </div>
          </>
        )}

        {!showBookmarks&&!loading&&scraped&&filtered.length===0&&news.length>0&&(
          <div style={{textAlign:"center",padding:"60px 0",color:"#ccc"}}>
            <div style={{fontSize:32,marginBottom:10}}>🔎</div>
            <p style={{margin:0,fontSize:14}}>해당 카테고리의 기사가 없어요</p>
          </div>
        )}
      </div>
      <style>{\`
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes bounce{from{transform:translateY(0);}to{transform:translateY(-10px);}}
      \`}</style>
    </div>
  );
}
`
  },
  {
    name: "src/index.js",
    lang: "js",
    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
`
  },
  {
    name: "src/index.css",
    lang: "css",
    content: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #F5F7FF; }
`
  },
  {
    name: "public/index.html",
    lang: "html",
    content: `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#133BAC" />
    <title>굿모닝선샤인</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`
  },
  {
    name: "package.json",
    lang: "json",
    content: `{
  "name": "goodmorning-sunshine",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
`
  },
  {
    name: ".gitignore",
    lang: "text",
    content: `node_modules/
build/
.env
.env.local
.DS_Store
`
  },
  {
    name: "README.md",
    lang: "markdown",
    content: `# ☀️ 굿모닝선샤인

금융권 종사자를 위한 데일리 뉴스 스크랩 웹앱입니다.

## 실행 방법

\`\`\`bash
npm install
npm start
\`\`\`

## 배포 (Vercel)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## 카테고리
은행 · 증권 · 보험 · 금융위원회 · 핀테크
`
  }
];

function download(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename.replace(/\//g, "_");
  a.click(); URL.revokeObjectURL(url);
}

function downloadAll() {
  files.forEach((f, i) => setTimeout(() => download(f.name, f.content), i * 200));
}

const LANG_COLOR = { js:"#F7DF1E", css:"#264DE4", html:"#E44D26", json:"#8BC34A", markdown:"#083FA1", text:"#888" };
const LANG_LABEL = { js:"JS", css:"CSS", html:"HTML", json:"JSON", markdown:"MD", text:"TXT" };

export default function DownloadPage() {
  const [copied, setCopied] = useState(null);

  const copyContent = (idx, content) => {
    navigator.clipboard.writeText(content);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div style={{ fontFamily:"'Apple SD Gothic Neo','Pretendard',sans-serif", background:"#F5F7FF", minHeight:"100vh", padding:"28px 20px 40px" }}>
      {/* 헤더 */}
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <span style={{ fontSize:26 }}>☀️</span>
          <span style={{ fontSize:20, fontWeight:900, color:BLUE, fontFamily:"Georgia,serif", fontStyle:"italic" }}>Good Morning Sunshine</span>
        </div>
        <p style={{ fontSize:13, color:"#666", marginBottom:24 }}>Vercel 배포용 프로젝트 파일 — 파일을 개별 다운로드하거나 전체를 한번에 받으세요.</p>

        {/* 전체 다운로드 버튼 */}
        <button onClick={downloadAll}
          style={{ background:BLUE, color:YELLOW, border:"none", borderRadius:22, padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8, marginBottom:28, boxShadow:"0 3px 0 #0a2580" }}
          onMouseDown={e=>e.currentTarget.style.transform="translateY(2px)"}
          onMouseUp={e=>e.currentTarget.style.transform="translateY(0)"}>
          ⬇︎ 전체 파일 다운로드 ({files.length}개)
        </button>

        {/* 폴더 구조 안내 */}
        <div style={{ background:"#1e1e2e", borderRadius:14, padding:"16px 20px", marginBottom:28, fontSize:12.5, color:"#cdd6f4", lineHeight:2, fontFamily:"monospace" }}>
          <div style={{ color:"#89dceb", marginBottom:4, fontSize:12 }}>📁 프로젝트 구조</div>
          {`goodmorning-sunshine/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
└── README.md`.split("\n").map((l,i)=><div key={i}>{l}</div>)}
        </div>

        {/* 파일 카드 목록 */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {files.map((f, i) => (
            <div key={i} style={{ background:"#fff", border:"1.5px solid #E8EAFA", borderRadius:14, overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid #F0F2FF" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ background: LANG_COLOR[f.lang] + "22", color: LANG_COLOR[f.lang], fontSize:10.5, fontWeight:700, padding:"2px 8px", borderRadius:8, border:`1px solid ${LANG_COLOR[f.lang]}44` }}>
                    {LANG_LABEL[f.lang]}
                  </span>
                  <span style={{ fontSize:13.5, fontWeight:600, color:"#1A1A2E", fontFamily:"monospace" }}>{f.name}</span>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => copyContent(i, f.content)}
                    style={{ background: copied===i ? "#E6F4EA" : "#F5F7FF", border:"1px solid #dde", borderRadius:8, padding:"5px 12px", fontSize:12, color: copied===i ? "#27500A" : "#555", cursor:"pointer", fontWeight:500 }}>
                    {copied===i ? "✓ 복사됨" : "복사"}
                  </button>
                  <button onClick={() => download(f.name, f.content)}
                    style={{ background:BLUE, border:"none", borderRadius:8, padding:"5px 14px", fontSize:12, color:YELLOW, cursor:"pointer", fontWeight:600 }}>
                    ⬇︎ 저장
                  </button>
                </div>
              </div>
              <pre style={{ margin:0, padding:"14px 16px", fontSize:11.5, lineHeight:1.7, color:"#334", overflowX:"auto", background:"#FAFBFF", maxHeight:160, fontFamily:"monospace" }}>
                {f.content.slice(0, 400)}{f.content.length > 400 ? "\n..." : ""}
              </pre>
            </div>
          ))}
        </div>

        {/* 배포 단계 안내 */}
        <div style={{ marginTop:32, background:"#fff", border:"1.5px solid #E8EAFA", borderRadius:14, padding:"20px 22px" }}>
          <p style={{ margin:"0 0 14px", fontWeight:700, color:BLUE, fontSize:14 }}>🚀 배포 순서</p>
          {[
            ["1", "위 파일들을 폴더 구조에 맞게 배치"],
            ["2", "npm install  →  npm start 로 로컬 확인"],
            ["3", "GitHub 레포 생성 후 push"],
            ["4", "vercel.com 에서 레포 연결 → Deploy"],
          ].map(([n, t]) => (
            <div key={n} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
              <span style={{ background:BLUE, color:YELLOW, borderRadius:"50%", width:22, height:22, fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{n}</span>
              <span style={{ fontSize:13, color:"#333", lineHeight:1.6 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
