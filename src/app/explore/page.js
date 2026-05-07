"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const references = [
  "Arnett, J. J. (2000). Emerging adulthood. American Psychologist.",
  "Erikson, E. H. (1968). Identity: Youth and crisis.",
  "Levinson, D. J. (1986). A conception of adult development.",
  "Brooks, D. (2007). The Odyssey Years. The New York Times."
];

const layers = [
  {
    id: "stage",
    step: "STEP 01",
    title: "现 实 坐 标",
    desc: "此刻，你正置身于何种境地？",
    words: [
      { text: "还在读书，但开始怀疑选的方向", value: "study" },
      { text: "毕业前后，第一次面对真正的选择", value: "graduate" },
      { text: "走在别人认可的路上，却越走越沉默", value: "work" },
      { text: "工作几年，开始问「这真的是我要的吗」", value: "work" },
      { text: "经历一次结束或Gap，还没找到新落点", value: "after" }
    ],
  },
  {
    id: "state",
    step: "STEP 02",
    title: "内 心 情 绪",
    desc: "哪种感受，最常在深夜击中你？",
    words: [
      { text: "说不清哪里不对，但就是不对", value: "blur" },
      { text: "看着同龄人上岸，恐慌又抗拒", value: "lost" },
      { text: "觉得自己越来越不像自己", value: "lost" },
      { text: "想停下来，又不敢真的停下来", value: "stuck" },
      { text: "一种迟迟落不到实处的悬空感", value: "float" }
    ],
  },
  {
    id: "need",
    step: "STEP 03",
    title: "隐 秘 渴 望",
    desc: "抛开现实，你潜意识里最想做什么？",
    words: [
      { text: "找到一条真正属于自己的路", value: "direction" },
      { text: "有个人能帮我看清我自己", value: "mirror" },
      { text: "不那么孤单地走完这段夜路", value: "company" },
      { text: "拥有不管不顾重新开始的勇气", value: "direction" },
      { text: "彻底停下来，喘一口长长的气", value: "mirror" }
    ],
  },
];

export default function Explore() {
  const [selections, setSelections] = useState({ stage: null, state: null, need: null });
  const layerRefs = useRef([]);
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // 生成星星
  useEffect(() => {
    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: Math.random() * 95 + 2,
      left: Math.random() * 96 + 2,
      size: Math.random() * 2 + 0.6,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 6,
    }));
    setStars(newStars);
  }, []);

  // 鼠标跟随
  useEffect(() => {
    let raf;
    const handleMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleSelect = (layerIndex, layerId, wordObj) => {
    setSelections((prev) => ({ ...prev, [layerId]: wordObj }));
    
    setTimeout(() => {
      if (layerIndex < layers.length - 1) {
        layerRefs.current[layerIndex + 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }, 300);
  };

  const isWordsComplete = selections.stage && selections.state && selections.need;
  const staggerMargins = ["ml-0", "ml-6", "ml-2", "ml-8", "ml-4"];

  const resultUrl = isWordsComplete
    ? `/result?stage=${selections.stage.value}&state=${selections.state.value}&need=${selections.need.value}`
    : "/result";

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-6 relative overflow-x-hidden pb-40" style={{ fontFamily: "var(--font-zcool)", backgroundColor: "#0a0e1a" }}>
      
      {/* 鼠标跟随光晕 */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, rgba(232, 184, 112, 0.06) 0%, transparent 70%)`,
        }}
      />

      {/* 星空背景（fixed 覆盖整个视口）*/}
      {stars.map((star) => (
        <div
          key={star.id}
          className="fixed pointer-events-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "#f5e6c8",
            borderRadius: "50%",
            animation: `twinkleExp ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(245, 230, 200, 0.5)`,
            willChange: "opacity",
            zIndex: 0,
          }}
        />
      ))}

      {/* 雾气层 */}
      <div
        className="fixed pointer-events-none w-[200%] h-[40%]"
        style={{
          top: "30%",
          left: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(232, 184, 112, 0.08) 0%, transparent 40%), radial-gradient(ellipse at 70% 50%, rgba(168, 156, 200, 0.05) 0%, transparent 40%)",
          animation: "fogDriftExp 80s linear infinite",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* 顶部返回按钮 */}
      <div className="w-full max-w-2xl mt-6 mb-8 flex justify-between items-center relative z-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-[rgba(232,184,112,0.1)] border border-[rgba(248,228,177,0.3)] rounded-sm text-xs tracking-[0.1em] transition-all hover:bg-[rgba(248,228,177,0.15)] hover:scale-105"
          style={{ fontFamily: "var(--font-noto-serif)", color: "#f8e4b1", backdropFilter: "blur(8px)" }}
        >
          <span className="text-sm">←</span>
          <span>返回首页</span>
        </Link>

        <Link 
          href="/my" 
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.1em] transition-all opacity-60 hover:opacity-100"
          style={{ fontFamily: "var(--font-zcool)", color: "#f8e4b1" }}
        >
          <span>✦</span>
          <span>我 的 林 中</span>
        </Link>
      </div>

      {/* 标题区 */}
      <div className="w-full max-w-2xl text-center mb-16 border-b border-[rgba(248,228,177,0.15)] pb-10 relative z-10">
        <h1 className="text-3xl md:text-4xl tracking-[0.3em] mb-4" style={{ color: "#f8e4b1", textShadow: "0 0 20px rgba(248, 228, 177, 0.3)" }}>
          奥德赛坐标诊断
        </h1>
        <p className="text-sm md:text-base opacity-60 tracking-[0.1em] leading-relaxed" style={{ fontFamily: "var(--font-noto-serif)", color: "#f0e4c8" }}>
          请依次在三个维度中，拾取最贴合你当下的句子。
          <br className="hidden md:block"/> 
          选完后，寻找你的「同路人」。
        </p>
      </div>

      {/* 三层选择 */}
      <div className="w-full max-w-xl flex flex-col gap-16 md:gap-20 relative z-10">
        {layers.map((layer, index) => (
          <div key={layer.id} ref={(el) => (layerRefs.current[index] = el)} className="flex flex-col w-full scroll-mt-24">
            
            <div className="mb-6 flex flex-col items-start border-l-2 pl-4" style={{ borderColor: "rgba(248,228,177,0.3)" }}>
              <span className="text-[10px] tracking-[0.2em] opacity-50 mb-1" style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}>{layer.step}</span>
              <h3 className="text-lg md:text-xl tracking-[0.1em] mb-1" style={{ color: "#f8e4b1", opacity: 0.9 }}>{layer.title}</h3>
              <p className="text-xs md:text-sm tracking-[0.05em] opacity-50" style={{ fontFamily: "var(--font-noto-serif)", color: "#f0e4c8" }}>{layer.desc}</p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {layer.words.map((wordObj, wordIndex) => {
                const isSelected = selections[layer.id]?.text === wordObj.text;
                const hasSelectedInLayer = selections[layer.id] !== null;
                const marginClass = staggerMargins[wordIndex % staggerMargins.length];

                return (
                  <button
                    key={wordObj.text}
                    onClick={() => handleSelect(index, layer.id, wordObj)}
                    className={`group relative flex items-center gap-3 text-left px-4 py-3 transition-all duration-300 rounded-sm w-fit ${marginClass}`}
                    style={{
                      backgroundColor: isSelected ? "rgba(248,228,177,0.08)" : "transparent",
                    }}
                  >
                    <div className={`w-1.5 h-1.5 flex-shrink-0 rounded-full transition-all duration-300 border ${
                      isSelected ? "bg-[#f8e4b1] border-[#f8e4b1] shadow-[0_0_8px_rgba(248,228,177,0.8)]" : "border-[rgba(255,255,255,0.3)] group-hover:border-[#f8e4b1]"
                    }`}></div>

                    <span 
                      className="relative z-10 text-sm md:text-base tracking-[0.05em] transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-noto-serif)",
                        color: isSelected ? "#f8e4b1" : "#f0e4c8",
                        opacity: isSelected ? 1 : hasSelectedInLayer ? 0.3 : 0.8,
                        textShadow: isSelected ? "0 0 10px rgba(248,228,177,0.4)" : "none"
                      }}
                    >
                      {wordObj.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 底部学术引用 */}
      <div className="w-full max-w-2xl mt-24 pt-8 border-t border-[rgba(255,255,255,0.05)] opacity-30 text-center relative z-10">
        <p className="text-[9px] tracking-[0.2em] mb-3" style={{ fontFamily: "var(--font-noto-serif)", color: "#f8e4b1" }}>
          THEORETICAL FOUNDATION
        </p>
        <div className="space-y-1 text-[9px] md:text-[10px] leading-tight flex flex-col items-center" style={{ fontFamily: '"Times New Roman", Times, serif', color: "#f0e4c8" }}>
          {references.map((ref, idx) => (
            <p key={idx}>{ref}</p>
          ))}
        </div>
      </div>

      {/* 底部浮动按钮 */}
      <div className={`fixed bottom-0 left-0 w-full p-6 flex justify-center bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a] to-transparent transition-all duration-700 z-50 ${isWordsComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}`}>
        <Link href={resultUrl} className="group flex flex-col items-center bg-[rgba(31,42,63,0.9)] border border-[rgba(248,228,177,0.4)] hover:border-[rgba(248,228,177,0.8)] px-14 py-4 shadow-[0_-10px_30px_rgba(10,14,26,0.8)] transition-all duration-500 rounded-sm hover:scale-105" style={{ backdropFilter: "blur(8px)" }}>
          <span className="text-[10px] tracking-[0.3em] opacity-50 mb-1 group-hover:opacity-80 transition-all" style={{ fontFamily: "var(--font-noto-serif)", color: "#f8e4b1" }}>
            [ 已 拾 起 三 个 词 ]
          </span>
          <span className="text-lg md:text-xl tracking-[0.4em] transition-all opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(248,228,177,0.8)]" style={{ color: "#f8e4b1" }}>
            遇 见 同 路 人
          </span>
        </Link>
      </div>

      <style jsx global>{`
        @keyframes twinkleExp {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes fogDriftExp {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(0%); }
        }
      `}</style>

    </main>
  );
}
