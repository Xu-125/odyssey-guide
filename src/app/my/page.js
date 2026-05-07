"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyGuides() {
  const [savedMentors, setSavedMentors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("odyssey_saved") || "[]");
      // 按收藏时间倒序
      saved.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
      setSavedMentors(saved);
    } catch (e) {
      setSavedMentors([]);
    }
    setIsLoaded(true);
  }, []);

  const removeMentor = (id) => {
    try {
      const saved = JSON.parse(localStorage.getItem("odyssey_saved") || "[]");
      const filtered = saved.filter((s) => s.id !== id);
      localStorage.setItem("odyssey_saved", JSON.stringify(filtered));
      setSavedMentors(filtered);
    } catch (e) {
      console.error("删除失败", e);
    }
  };

  return (
    <main
      className="min-h-screen px-4 py-12 relative"
      style={{ backgroundColor: "#1a2332" }}
    >
      {/* 顶部导航 */}
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-12">
        <Link
          href="/"
          className="text-[10px] tracking-[0.3em] opacity-50 hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}
        >
          <span>←</span>
          <span>回 到 林 中</span>
        </Link>
        <Link
          href="/explore"
          className="text-[10px] tracking-[0.3em] opacity-50 hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}
        >
          <span>再 拾 一 个</span>
          <span>↻</span>
        </Link>
      </div>

      {/* 页面标题 */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p
          className="text-[10px] tracking-[0.5em] opacity-50 italic mb-4"
          style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}
        >
          — my woods —
        </p>
        <h1
          className="text-3xl md:text-4xl tracking-[0.4em] mb-4"
          style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}
        >
          我 的 林 中
        </h1>
        <p
          className="text-sm opacity-60"
          style={{ fontFamily: "var(--font-noto-serif)", color: "#f0e4c8", letterSpacing: "0.1em" }}
        >
          你 收 进 林 中 的 同 路 人
        </p>
        <div className="flex items-center justify-center gap-3 mt-6 opacity-40">
          <div className="w-12 h-px" style={{ backgroundColor: "#e8b870" }}></div>
          <span style={{ color: "#e8b870", fontFamily: "var(--font-fell)" }}>◆</span>
          <div className="w-12 h-px" style={{ backgroundColor: "#e8b870" }}></div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="max-w-2xl mx-auto">
        {!isLoaded ? null : savedMentors.length === 0 ? (
          // 空状态
          <div className="text-center py-20" style={{ animation: "fadeIn 0.8s ease-out" }}>
            <div className="text-6xl opacity-30 mb-6" style={{ color: "#e8b870" }}>✦</div>
            <p
              className="text-base mb-3 opacity-70"
              style={{ fontFamily: "var(--font-noto-serif)", color: "#f0e4c8", letterSpacing: "0.1em" }}
            >
              你的林中还没有同路人
            </p>
            <p
              className="text-xs opacity-50 mb-10"
              style={{ fontFamily: "var(--font-noto-serif)", color: "#f0e4c8", letterSpacing: "0.05em", lineHeight: "2" }}
            >
              去拾取一个属于你的领路人，<br />
              ta 会被收进这片林子里。
            </p>
            <Link
              href="/explore"
              className="inline-block px-8 py-3 transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "var(--font-zcool)",
                color: "#1f2a3f",
                backgroundColor: "#e8b870",
                fontSize: "12px",
                letterSpacing: "0.4em",
              }}
            >
              去 拾 取
            </Link>
          </div>
        ) : (
          // 收藏列表
          <div className="space-y-6" style={{ animation: "fadeIn 0.8s ease-out" }}>
            <p
              className="text-[10px] tracking-[0.3em] opacity-50 text-center mb-6"
              style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}
            >
              共 {savedMentors.length} 位 同 路 人
            </p>

            {savedMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="relative px-6 py-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 30%, ${mentor.sigilColor}15 0%, transparent 60%),
                    linear-gradient(135deg, #2a3550 0%, #1f2a3f 100%)
                  `,
                  borderRadius: "8px 24px 12px 28px / 24px 8px 32px 12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex justify-between items-start gap-4">
                  {/* 左侧：信息 */}
                  <Link
                    href={`/result?id=${mentor.id}&stage=${mentor.stage || ""}&state=${mentor.state || ""}&need=${mentor.need || ""}`}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3
                        className="text-xl tracking-[0.2em]"
                        style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}
                      >
                        {mentor.name}
                      </h3>
                      <span
                        className="text-[10px] italic opacity-60"
                        style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}
                      >
                        {mentor.origin}
                      </span>
                    </div>
                    <p
                      className="text-sm italic opacity-85 leading-relaxed"
                      style={{ fontFamily: "var(--font-noto-serif)", color: "#f0e4c8", letterSpacing: "0.03em" }}
                    >
                      &ldquo;{mentor.quote}&rdquo;
                    </p>
                    <p
                      className="text-[9px] tracking-[0.3em] opacity-40 mt-3"
                      style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}
                    >
                      收 入 于 {new Date(mentor.savedAt).toLocaleDateString("zh-CN")}
                    </p>
                  </Link>

                  {/* 右侧：删除按钮 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeMentor(mentor.id);
                    }}
                    className="text-lg opacity-30 hover:opacity-100 transition-opacity flex-shrink-0"
                    style={{ color: "#e8b870" }}
                    title="移出林中"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部 */}
      <p
        className="mt-16 text-xs tracking-[0.4em] opacity-40 text-center"
        style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}
      >
        林 中 的 灯，可 以 一 直 亮 着
      </p>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
