"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const terms = {
  emerging: { cn: "成年初显期", en: "Emerging Adulthood", discipline: "心理学", source: "Jeffrey Arnett · 2000", definition: "心理学家 Jeffrey Arnett 提出的发展阶段概念，特指 18 至 29 岁这段处于青春期与成年期之间的过渡时期。", translation: "你不再是孩子，但也还没成为社会期待的「成年人」。这段时间，你在反复试错、寻找身份、感到不稳定——这不是你做错了什么，而是这个阶段本身的特征。" },
  quarterLife: { cn: "四分之一人生危机", en: "Quarter-life Crisis", discipline: "社会学", source: "Robbins & Wilner · 2001", definition: "20 至 30 岁之间常见的存在性焦虑：对人生方向的迷失、对自我价值的怀疑、对同龄人比较的疲惫。", translation: "当你深夜失眠，问自己「我到底想要什么」，又在白天看到朋友圈的成就感到刺痛——你不是矫情，你正经历一场被命名过的、普遍的危机。" },
  liminality: { cn: "阈限状态", en: "Liminality", discipline: "人类学", source: "Victor Turner · 1969", definition: "源自拉丁语 limen（门槛）。指仪式中介于「旧身份」和「新身份」之间的过渡阶段。", translation: "像站在一扇门上——门内的房间已经离开，门外的房间还没进入。这种「悬浮」的感觉是真实的，也是必经的。" },
  heroJourney: { cn: "英雄之旅", en: "The Hero's Journey", discipline: "神话学", source: "Joseph Campbell · 1949", definition: "约瑟夫·坎贝尔在《千面英雄》中提出的叙事原型：召唤 → 出发 → 试炼 → 顿悟 → 归来。", translation: "从《奥德赛》到《指环王》——所有英雄都要经历「被迫离开熟悉的世界，在未知中成长，再带着新的自己回来」。" },
  moratorium: { cn: "身份延缓期", en: "Identity Moratorium", discipline: "发展心理学", source: "Erik Erikson · 1968", definition: "埃里克森身份发展理论中的关键阶段：个体正在主动探索身份选项，但尚未做出承诺。", translation: "你还没决定成为谁，这是被允许的。社会其实给了你一段「先不用回答」的时间。" },
  liquidModernity: { cn: "流动的现代性", en: "Liquid Modernity", discipline: "社会学", source: "Zygmunt Bauman · 2000", definition: "鲍曼提出的概念：当代社会从「稳固」转向「流动」——工作、关系、身份都不再固定。", translation: "你的迷茫，不只是个人问题——是整个时代在变得液态。" },
};

function TermLink({ termKey, children, onClick }) {
  return (
    <button onClick={() => onClick(termKey)} className="inline-block transition-all duration-300 cursor-pointer hover:scale-110 group">
      <span className="border-b border-dotted pb-1 transition-all" style={{ color: "#f8e4b1", borderColor: "rgba(248,228,177,0.5)", textShadow: "0 0 12px rgba(248, 228, 177, 0.3)" }}>
        {children}
      </span>
    </button>
  );
}

function TermCard({ term, onClose }) {
  if (!term) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 backdrop-blur-md" style={{ backgroundColor: "rgba(10, 14, 26, 0.85)", animation: "fadeIn 0.4s ease-out" }} onClick={onClose}>
      <div className="relative max-w-lg w-full p-10 md:p-14 rounded-sm border max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "#1a2332", borderColor: "rgba(232, 184, 112, 0.3)", boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(232, 184, 112, 0.1)", animation: "scaleIn 0.4s ease-out" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-5 text-2xl opacity-50 hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}>×</button>
        <div className="text-center mb-6 text-sm" style={{ color: "#c54545", fontFamily: "var(--font-fell)" }}>◆</div>
        <p className="text-center text-[10px] tracking-[0.4em] opacity-60 mb-3" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870" }}>{term.discipline}</p>
        <p className="text-center text-sm md:text-base italic opacity-70 tracking-wider mb-2" style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}>{term.en}</p>
        <h3 className="text-center text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-zcool)", letterSpacing: "0.3em", color: "#f0e4c8" }}>{term.cn}</h3>
        <p className="text-center text-xs italic opacity-50 mb-10 tracking-wider" style={{ fontFamily: "var(--font-fell)", color: "#c5a878" }}>— {term.source} —</p>
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.4em] opacity-60 mb-3" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870" }}>学 术 定 义</p>
          <p className="text-sm md:text-base opacity-80 leading-loose" style={{ fontFamily: "var(--font-noto-serif)", letterSpacing: "0.05em", lineHeight: "2", color: "#f0e4c8" }}>{term.definition}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.4em] opacity-60 mb-3" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870" }}>你 可 能 的 体 验</p>
          <p className="text-sm md:text-base opacity-95 leading-loose" style={{ fontFamily: "var(--font-noto-serif)", letterSpacing: "0.05em", lineHeight: "2", color: "#fff5e0" }}>{term.translation}</p>
        </div>
        <div className="text-center mt-8 text-sm opacity-50" style={{ color: "#c54545", fontFamily: "var(--font-fell)" }}>◆</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTerm, setActiveTerm] = useState(null);
  const [stars1, setStars1] = useState([]);
  const [stars2, setStars2] = useState([]);
  const [stars3, setStars3] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const gen = (count) => Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: Math.random() * 85 + 3,
      left: Math.random() * 96 + 2,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 6,
      depth: Math.random() * 0.6 + 0.2, // 视差深度
    }));
    setStars1(gen(80));
    setStars2(gen(40));
    setStars3(gen(50));
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

  // 滚动跟踪
  // 滚动入场动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-fade");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

useEffect(() => {
    let raf;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const openTerm = (key) => setActiveTerm(terms[key]);
  const closeTerm = () => setActiveTerm(null);

  // 鼠标视差偏移（中心 50%, 范围 -10 ~ 10px）
  const parallaxX = (mousePos.x - 50) * 0.2;
  const parallaxY = (mousePos.y - 50) * 0.2;

  // 星空层（带视差）
  const StarField = ({ stars, intensity = 1 }) => (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute pointer-events-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "#f5e6c8",
            borderRadius: "50%",
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(245, 230, 200, 0.6)`,
            willChange: "opacity, transform",
            transform: `translate3d(${parallaxX * star.depth * intensity}px, ${parallaxY * star.depth * intensity}px, 0)`,
            transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        />
      ))}
    </>
  );

  // 雾气层（流动）
  const FogLayer = ({ topPercent = 30, opacity = 0.08, duration = 60, reverse = false }) => (
    <div
      className="absolute pointer-events-none w-[200%] h-[40%]"
      style={{
        top: `${topPercent}%`,
        left: 0,
        background: `radial-gradient(ellipse at 30% 50%, rgba(232, 184, 112, ${opacity}) 0%, transparent 40%), radial-gradient(ellipse at 70% 50%, rgba(168, 156, 200, ${opacity * 0.7}) 0%, transparent 40%)`,
        animation: `fogDrift ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
        filter: "blur(40px)",
      }}
    />
  );

  return (
    <main style={{ fontFamily: "var(--font-zcool)", backgroundColor: "#0a0e1a", overflow: "hidden hidden", position: "relative" }}>
      {/* 鼠标跟随光晕（全局）*/}
      <div
        className="fixed inset-0 pointer-events-none z-[5] transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, rgba(232, 184, 112, 0.06) 0%, transparent 70%)`,
        }}
      />

      {/* 右上角"我的林中" */}
      <Link
        href="/my"
        className="fixed top-6 right-6 z-40 flex items-center gap-1.5 px-3 py-2 rounded-sm transition-all hover:scale-105"
        style={{
          fontFamily: "var(--font-zcool)",
          color: "#f0e4c8",
          backgroundColor: "rgba(232, 184, 112, 0.1)",
          border: "1px solid rgba(232, 184, 112, 0.3)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          backdropFilter: "blur(8px)",
        }}
      >
        <span>✦</span>
        <span>我 的 林 中</span>
      </Link>

      {/* ===== 第一屏：星空月亮 ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden" style={{ backgroundColor: "#0a0e1a" }}>
        {/* 雾气层 */}
        <FogLayer topPercent={20} opacity={0.1} duration={80} />
        <FogLayer topPercent={55} opacity={0.06} duration={100} reverse />

        <StarField stars={stars1} />

        {/* 流星（多颗、错峰）*/}
        <div className="absolute pointer-events-none" style={{ top: "15%", left: "5%", width: "120px", height: "1px", background: "linear-gradient(90deg, transparent, #f5e6c8, transparent)", animation: "shootingStar 8s ease-out infinite", animationDelay: "2s" }} />
        <div className="absolute pointer-events-none" style={{ top: "30%", left: "0%", width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, #f5e6c8, transparent)", animation: "shootingStar 12s ease-out infinite", animationDelay: "7s" }} />

        {/* 月亮（左上角，轻微浮动）*/}
       <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ animation: "moonFloatGentle 6s ease-in-out infinite" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: "550px", height: "550px", background: "radial-gradient(circle, rgba(245, 230, 200, 0.2) 0%, transparent 60%)", animation: "moonGlow 5s ease-in-out infinite" }} />
          <div className="relative rounded-full" style={{ width: "260px", height: "260px", background: `radial-gradient(circle at 35% 35%, #f8ecd0 0%, #e8d4a0 40%, #c8b078 90%)`, boxShadow: `0 0 80px rgba(245, 230, 200, 0.4), 0 0 200px rgba(245, 230, 200, 0.2), inset -35px -35px 70px rgba(80, 60, 30, 0.4), inset 20px 20px 40px rgba(255, 245, 215, 0.2)` }}>
            <div className="absolute rounded-full" style={{ top: "30%", left: "25%", width: "22px", height: "22px", backgroundColor: "rgba(80, 60, 30, 0.25)" }} />
            <div className="absolute rounded-full" style={{ top: "55%", left: "45%", width: "16px", height: "16px", backgroundColor: "rgba(80, 60, 30, 0.2)" }} />
            <div className="absolute rounded-full" style={{ top: "20%", left: "60%", width: "14px", height: "14px", backgroundColor: "rgba(80, 60, 30, 0.3)" }} />
            <div className="absolute rounded-full" style={{ top: "70%", left: "30%", width: "20px", height: "20px", backgroundColor: "rgba(80, 60, 30, 0.22)" }} />
            <div className="absolute rounded-full" style={{ top: "65%", left: "65%", width: "12px", height: "12px", backgroundColor: "rgba(80, 60, 30, 0.28)" }} />
          </div>
        </div>

      {/* 顶部小标 */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center" style={{ animation: "fadeInDown 1.5s ease-out 0.3s both" }}>
          <p className="text-[10px] tracking-[0.6em] italic" style={{ fontFamily: "var(--font-fell)", color: "#e8b870", opacity: 0.7 }}>
            — A LETTER TO THE LOST —
          </p>
        </div>

        {/* 中央主标题 + 诗句 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 px-6 max-w-3xl w-full pointer-events-none">
          {/* 大标题 Odyssey */}
          <div style={{ animation: "fadeInUp 2s ease-out 0.5s both" }}>
            <h1
              className="text-8xl md:text-[10rem] mb-8"
              style={{
                fontFamily: "var(--font-fell)",
                letterSpacing: "0.15em",
                fontWeight: 400,
                color: "#f0e4c8",
                textShadow: "0 4px 40px rgba(248, 228, 177, 0.4), 0 0 80px rgba(248, 228, 177, 0.2)",
                lineHeight: 1,
              }}
            >
              Odyssey
            </h1>
          </div>

          {/* 装饰分隔 */}
          <div className="flex items-center gap-4 mb-8 opacity-60 justify-center" style={{ animation: "fadeInUp 1.5s ease-out 1.2s both" }}>
            <div className="w-20 h-px" style={{ backgroundColor: "#e8b870" }}></div>
            <span className="text-sm" style={{ color: "#c54545", fontFamily: "var(--font-fell)" }}>◆</span>
            <div className="w-20 h-px" style={{ backgroundColor: "#e8b870" }}></div>
          </div>

          {/* 诗句 */}
          <div style={{ animation: "fadeInUp 1.5s ease-out 1.6s both" }}>
            <p className="text-base md:text-xl italic mb-4 leading-relaxed" style={{ fontFamily: "var(--font-fell)", color: "#e8b870", letterSpacing: "0.05em", opacity: 0.9 }}>
              Tell me, O Muse, of that man of many devices,
              <br />
              who wandered far and wide.
            </p>
            <p className="text-xs md:text-sm tracking-[0.3em] italic" style={{ fontFamily: "var(--font-fell)", color: "#c5a878", opacity: 0.6 }}>
              — Homer, Odyssey, Book I
            </p>
          </div>
        </div>


      </section>

      {/* ===== 第二屏：学理开篇 ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden" style={{ backgroundColor: "#0a0e1a" }}>
        <FogLayer topPercent={10} opacity={0.08} duration={90} />
        <FogLayer topPercent={60} opacity={0.05} duration={110} reverse />
        <StarField stars={stars2} intensity={0.7} />

        {/* 右上角小月亮（带视差）*/}
        <div
          className="absolute top-12 right-12 pointer-events-none"
          style={{
            transform: `translate(${parallaxX * 0.8}px, ${parallaxY * 0.8}px)`,
            transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
            animation: "moonFloat2 8s ease-in-out infinite",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: "200px", height: "200px", background: "radial-gradient(circle, rgba(245, 230, 200, 0.1) 0%, transparent 60%)" }} />
          <div className="relative rounded-full" style={{ width: "60px", height: "60px", background: `radial-gradient(circle at 35% 35%, #f8ecd0 0%, #e8d4a0 40%, #c8b078 90%)`, boxShadow: `0 0 30px rgba(245, 230, 200, 0.3), inset -10px -10px 20px rgba(80, 60, 30, 0.4)`, opacity: 0.7 }} />
        </div>

        {/* 飘动的小光点 */}
        <div className="absolute pointer-events-none" style={{ top: "20%", left: "15%", animation: "floatOrb 12s ease-in-out infinite" }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#e8b870", boxShadow: "0 0 12px rgba(232, 184, 112, 0.8)", opacity: 0.6 }}></div>
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: "25%", left: "10%", animation: "floatOrb 16s ease-in-out infinite", animationDelay: "3s" }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#a8c5e8", boxShadow: "0 0 10px rgba(168, 197, 232, 0.7)", opacity: 0.5 }}></div>
        </div>
        <div className="absolute pointer-events-none" style={{ top: "60%", right: "20%", animation: "floatOrb 14s ease-in-out infinite", animationDelay: "5s" }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#c54545", boxShadow: "0 0 12px rgba(197, 69, 69, 0.6)", opacity: 0.4 }}></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-12 opacity-40">
            <div className="w-12 h-px" style={{ backgroundColor: "#e8b870" }}></div>
            <div className="text-sm" style={{ color: "#c54545", fontFamily: "var(--font-fell)" }}>◆</div>
            <div className="w-12 h-px" style={{ backgroundColor: "#e8b870" }}></div>
          </div>

<article className="space-y-8 text-center" style={{ fontFamily: "var(--font-noto-serif)", letterSpacing: "0.08em", lineHeight: "2.2" }}>
            <p className="scroll-fade text-xl md:text-2xl opacity-95" style={{ fontFamily: "var(--font-zcool)", letterSpacing: "0.2em", color: "#f0e4c8", animation: "textGlow 5s ease-in-out infinite" }}>
              20 多岁的迷茫，不是你的问题。
            </p>
            <p className="scroll-fade text-base md:text-lg opacity-75" style={{ color: "#f0e4c8", transitionDelay: "0.2s" }}>
              在不同学科里，它有许多名字——
            </p>
            <p className="scroll-fade text-[10px] md:text-xs opacity-50 tracking-[0.3em]" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870", transitionDelay: "0.3s" }}>
              （ 点击词语，查看解释 ）
            </p>

            <div className="scroll-fade grid grid-cols-2 gap-x-3 gap-y-5 text-sm md:text-base opacity-90 py-4 max-w-sm mx-auto" style={{ fontFamily: "var(--font-noto-serif)", transitionDelay: "0.4s" }}>
              <div className="flex flex-col items-center py-2">
                <span className="text-[10px] tracking-[0.2em] opacity-50 mb-2" style={{ fontFamily: "var(--font-zcool)", color: "#c5a878" }}>· 心 理 学 ·</span>
                <TermLink termKey="emerging" onClick={openTerm}>成年初显期</TermLink>
              </div>
              <div className="flex flex-col items-center py-2">
                <span className="text-[10px] tracking-[0.2em] opacity-50 mb-2" style={{ fontFamily: "var(--font-zcool)", color: "#c5a878" }}>· 社 会 学 ·</span>
                <TermLink termKey="quarterLife" onClick={openTerm}>四分之一人生危机</TermLink>
              </div>
              <div className="flex flex-col items-center py-2">
                <span className="text-[10px] tracking-[0.2em] opacity-50 mb-2" style={{ fontFamily: "var(--font-zcool)", color: "#c5a878" }}>· 人 类 学 ·</span>
                <TermLink termKey="liminality" onClick={openTerm}>阈限状态</TermLink>
              </div>
              <div className="flex flex-col items-center py-2">
                <span className="text-[10px] tracking-[0.2em] opacity-50 mb-2" style={{ fontFamily: "var(--font-zcool)", color: "#c5a878" }}>· 神 话 学 ·</span>
                <TermLink termKey="heroJourney" onClick={openTerm}>英雄之旅</TermLink>
              </div>
              <div className="flex flex-col items-center py-2">
                <span className="text-[10px] tracking-[0.2em] opacity-50 mb-2" style={{ fontFamily: "var(--font-zcool)", color: "#c5a878" }}>· 发 展 心 理 学 ·</span>
                <TermLink termKey="moratorium" onClick={openTerm}>身份延缓期</TermLink>
              </div>
              <div className="flex flex-col items-center py-2">
                <span className="text-[10px] tracking-[0.2em] opacity-50 mb-2" style={{ fontFamily: "var(--font-zcool)", color: "#c5a878" }}>· 社 会 学 ·</span>
                <TermLink termKey="liquidModernity" onClick={openTerm}>流动的现代性</TermLink>
              </div>
            </div>

            <p className="scroll-fade text-base md:text-lg opacity-75 pt-4" style={{ color: "#f0e4c8", transitionDelay: "0.5s" }}>
              它们指向同一件事——
            </p>
            <p className="scroll-fade text-lg md:text-xl leading-loose inline-block" style={{ color: "#f8e4b1", animation: "textGlow 4s ease-in-out infinite", transitionDelay: "0.6s" }}>
              脱去旧壳，长出新壳，<br />注定是一段失重的过程。
            </p>
          </article>


          <div className="flex items-center justify-center gap-3 mt-12 opacity-40">
            <div className="w-12 h-px" style={{ backgroundColor: "#e8b870" }}></div>
            <div className="text-sm" style={{ color: "#c54545", fontFamily: "var(--font-fell)" }}>◆</div>
            <div className="w-12 h-px" style={{ backgroundColor: "#e8b870" }}></div>
          </div>
        </div>
      </section>

      {/* ===== 第三屏：行动入口 ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden" style={{ backgroundColor: "#0a0e1a" }}>
        <FogLayer topPercent={20} opacity={0.1} duration={70} />
        <FogLayer topPercent={50} opacity={0.07} duration={95} reverse />
        <StarField stars={stars3} intensity={0.8} />

        {/* 多个灯笼 */}
        <div className="absolute top-20 left-12 pointer-events-none" style={{ animation: "lanternSway 4s ease-in-out infinite", transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`, transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: "120px", height: "120px", background: "radial-gradient(circle, rgba(232, 184, 112, 0.3) 0%, transparent 60%)", animation: "lanternPulse 3s ease-in-out infinite" }} />
          <div className="relative" style={{ width: "30px", height: "40px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3" style={{ backgroundColor: "rgba(90, 64, 48, 0.6)" }}></div>
            <div className="absolute top-3 left-0 right-0 bottom-0 rounded-sm" style={{ background: "radial-gradient(circle at 50% 40%, #f8ecd0 0%, #e8b870 60%, rgba(232, 184, 112, 0.4) 100%)", boxShadow: "0 0 20px rgba(232, 184, 112, 0.6)" }}></div>
          </div>
        </div>

        <div className="absolute bottom-32 right-16 pointer-events-none" style={{ animation: "lanternSway 5s ease-in-out infinite", animationDelay: "1s", transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)`, transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: "100px", height: "100px", background: "radial-gradient(circle, rgba(232, 184, 112, 0.25) 0%, transparent 60%)", animation: "lanternPulse 4s ease-in-out infinite" }} />
          <div className="relative" style={{ width: "24px", height: "32px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2" style={{ backgroundColor: "rgba(90, 64, 48, 0.6)" }}></div>
            <div className="absolute top-2 left-0 right-0 bottom-0 rounded-sm" style={{ background: "radial-gradient(circle at 50% 40%, #f8ecd0 0%, #e8b870 60%, rgba(232, 184, 112, 0.4) 100%)", boxShadow: "0 0 16px rgba(232, 184, 112, 0.5)" }}></div>
          </div>
        </div>

        {/* 第三盏小灯 */}
        <div className="absolute top-1/3 right-24 pointer-events-none" style={{ animation: "lanternSway 6s ease-in-out infinite", animationDelay: "2s" }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: "80px", height: "80px", background: "radial-gradient(circle, rgba(232, 184, 112, 0.2) 0%, transparent 60%)" }} />
          <div className="relative" style={{ width: "18px", height: "24px" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2" style={{ backgroundColor: "rgba(90, 64, 48, 0.6)" }}></div>
            <div className="absolute top-2 left-0 right-0 bottom-0 rounded-sm" style={{ background: "radial-gradient(circle at 50% 40%, #f8ecd0 0%, #e8b870 60%, rgba(232, 184, 112, 0.4) 100%)", boxShadow: "0 0 12px rgba(232, 184, 112, 0.5)" }}></div>
          </div>
        </div>

<div className="relative z-10 w-full max-w-xl text-center">
          <p className="scroll-fade text-xl md:text-2xl mb-8 tracking-[0.3em]" style={{ color: "#f8e4b1", fontFamily: "var(--font-zcool)", animation: "textGlow 4s ease-in-out infinite" }}>
            这片林子里，有一面镜子。
          </p>

          <div className="scroll-fade space-y-4 text-sm md:text-base opacity-75 mb-12" style={{ fontFamily: "var(--font-noto-serif)", letterSpacing: "0.15em", lineHeight: "2.2", color: "#f0e4c8", transitionDelay: "0.2s" }}>
            <p>它帮你把模糊的迷茫，翻译成准确的心理坐标。</p>
            <p>然后为你亮起一盏灯，<br />照见一位和你走过相似夜路的同路人。</p>
          </div>

          <Link
            href="/explore"
            className="scroll-fade group relative inline-flex flex-col items-center justify-center px-12 py-8 border transition-all duration-700 cursor-pointer rounded-sm hover:scale-110"
            style={{
              borderColor: "rgba(248,228,177,0.4)",
              backgroundColor: "rgba(248,228,177,0.04)",
              animation: "buttonPulse 3s ease-in-out infinite",
              backdropFilter: "blur(4px)",
              transitionDelay: "0.4s",
            }}
          >
            <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(248, 228, 177, 0.15) 0%, transparent 70%)" }}></div>
            
            <div className="text-[10px] tracking-[0.5em] opacity-60 group-hover:opacity-100 mb-3 transition-all italic relative z-10" style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}>
              [ enter the woods ]
            </div>
            <span className="block text-2xl md:text-3xl tracking-[0.4em] relative z-10" style={{ fontFamily: "var(--font-zcool)", color: "#f8e4b1", textShadow: "0 0 16px rgba(248, 228, 177, 0.4)" }}>
              走 进 林 中
            </span>
          </Link>

          <Link
            href="/result"
            className="scroll-fade block mt-8 text-xs tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity"
            style={{ fontFamily: "var(--font-zcool)", color: "#e8b870", transitionDelay: "0.6s" }}
          >
            ✦ 或，随便来一封信
          </Link>
        </div>

      </section>

      <TermCard term={activeTerm} onClose={closeTerm} />

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 0.7; transform: translate(-50%, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      
        @keyframes moonFloatGentle {
          0%, 100% { transform: translate(-50%, -50%); }
          25% { transform: translate(-48%, -54%); }
          50% { transform: translate(-50%, -57%); }
          75% { transform: translate(-52%, -53%); }
        }
        @keyframes moonFloat2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes moonRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes moonGlow {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes shootingStar {
          0% { transform: translate(0, 0) rotate(20deg); opacity: 0; }
          5% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(800px, 200px) rotate(20deg); opacity: 0; }
        }
        @keyframes scrollDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(248, 228, 177, 0.2); border-color: rgba(248,228,177,0.4); }
          50% { box-shadow: 0 0 50px 20px rgba(248, 228, 177, 0.1); border-color: rgba(248,228,177,0.8); }
        }
        @keyframes lanternPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes lanternSway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(3px) rotate(2deg); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(248, 228, 177, 0.2); }
          50% { text-shadow: 0 0 25px rgba(248, 228, 177, 0.5), 0 0 40px rgba(248, 228, 177, 0.2); }
        }
        @keyframes fogDrift {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(0%); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          25% { transform: translate(30px, -20px); opacity: 0.7; }
          50% { transform: translate(60px, 0); opacity: 1; }
          75% { transform: translate(30px, 20px); opacity: 0.7; }
        }.scroll-fade {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .scroll-fade.scroll-visible {
          opacity: 1;
          transform: translateY(0);
        }

      `}</style>
    </main>
  );
}
