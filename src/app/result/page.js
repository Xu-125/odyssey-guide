"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const stageLabels = {
  study: "还在读书，开始怀疑方向",
  graduate: "毕业前后，第一次面对属于自己的选择",
  work: "工作了几年，开始问这是我要的吗",
  after: "经历了一次结束，还没找到新的落点",
};
const stateLabels = {
  blur: "说不清哪里不对",
  lost: "越来越不认识自己",
  stuck: "想停又不敢停",
  float: "持续的悬空感",
};

const Sigils = {
  tree: ({ color = "#a87852" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="treeGlow" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="60" rx="42" ry="38" fill="url(#treeGlow)" />
      <path d="M50 88 L50 50 M50 65 Q40 55 35 45 M50 60 Q60 50 65 40 M50 50 Q42 42 38 35 M50 55 Q58 47 63 42" stroke={color} strokeWidth="1.8" fill="none" opacity="0.9" strokeLinecap="round" />
      <circle cx="50" cy="35" r="20" fill={color} opacity="0.45" />
      <circle cx="42" cy="32" r="13" fill={color} opacity="0.55" />
      <circle cx="58" cy="38" r="15" fill={color} opacity="0.5" />
      <circle cx="50" cy="28" r="10" fill={color} opacity="0.4" />
    </svg>
  ),
  flame: ({ color = "#e85a5a" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="flameGlow" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="55" rx="38" ry="42" fill="url(#flameGlow)" />
      <path d="M50 85 Q33 68 36 50 Q40 36 50 28 Q60 36 64 50 Q67 68 50 85 Z" fill={color} opacity="0.65" />
      <path d="M50 78 Q40 68 42 56 Q46 44 50 36 Q54 44 58 56 Q60 68 50 78 Z" fill={color} opacity="0.8" />
      <circle cx="50" cy="55" r="8" fill="#fff5e0" opacity="0.85" />
    </svg>
  ),
  music: ({ color = "#e8b870" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="musicGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#musicGlow)" />
      <ellipse cx="36" cy="64" rx="11" ry="7" fill={color} opacity="0.95" transform="rotate(-20 36 64)" />
      <line x1="46" y1="60" x2="46" y2="28" stroke={color} strokeWidth="2.5" opacity="0.95" strokeLinecap="round" />
      <ellipse cx="64" cy="56" rx="11" ry="7" fill={color} opacity="0.95" transform="rotate(-20 64 56)" />
      <line x1="74" y1="52" x2="74" y2="22" stroke={color} strokeWidth="2.5" opacity="0.95" strokeLinecap="round" />
      <path d="M46 28 Q60 22 74 22" stroke={color} strokeWidth="2.5" fill="none" opacity="0.95" />
    </svg>
  ),
  leaf: ({ color = "#90b878" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="leafGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#leafGlow)" />
      <path d="M50 85 Q26 68 26 42 Q26 18 50 12 Q74 18 74 42 Q74 68 50 85 Z" fill={color} opacity="0.6" />
      <path d="M50 85 L50 14" stroke={color} strokeWidth="1.5" opacity="0.85" />
      <path d="M50 30 L38 24 M50 42 L34 36 M50 54 L34 50 M50 66 L38 65 M50 30 L62 24 M50 42 L66 36 M50 54 L66 50 M50 66 L62 65" stroke={color} strokeWidth="1" opacity="0.65" />
    </svg>
  ),
  star: ({ color = "#8a9eda" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#starGlow)" />
      <circle cx="50" cy="50" r="26" fill={color} opacity="0.55" />
      <circle cx="50" cy="50" r="16" fill="#fff5e0" opacity="0.7" />
      <path d="M50 50 Q62 38 68 26 M50 50 Q60 62 68 70 M50 50 Q38 60 28 66 M50 50 Q38 40 32 28" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
    </svg>
  ),
  greenLight: ({ color = "#7ab68a" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="greenGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="50%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#greenGlow)" />
      <circle cx="50" cy="50" r="14" fill={color} opacity="0.85" />
      <circle cx="50" cy="50" r="7" fill="#fff5e0" opacity="0.95" />
    </svg>
  ),
  mirror: ({ color = "#b8b0a0" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="mirrorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.75" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="50" rx="32" ry="42" fill="url(#mirrorGrad)" />
      <ellipse cx="50" cy="50" rx="28" ry="38" fill="#fff5e0" opacity="0.55" />
    </svg>
  ),
  feather: ({ color = "#e85a5a" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="featherGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#featherGlow)" />
      <path d="M50 86 L50 18 Q38 25 32 38 Q40 44 50 44 Q38 50 28 56 Q40 62 50 62 Q38 68 32 74 Q42 76 50 76" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.5" opacity="0.95" strokeLinecap="round" />
      <path d="M50 18 L50 86" stroke={color} strokeWidth="1.8" opacity="0.95" />
    </svg>
  ),
  door: ({ color = "#c89880" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="doorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="25" y="15" width="48" height="70" fill="url(#doorGrad)" opacity="0.65" />
      <rect x="25" y="15" width="22" height="70" fill={color} opacity="0.75" transform="skewY(-3) translate(5 0)" />
      <circle cx="42" cy="50" r="2" fill={color} opacity="0.95" />
      <rect x="49" y="18" width="22" height="64" fill="#fff5e0" opacity="0.6" />
    </svg>
  ),
  redBlack: ({ color = "#e85a5a" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="rbGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#rbGlow)" />
      <path d="M50 50 Q72 28 78 50 Q72 72 50 50 Z" fill={color} opacity="0.8" />
      <path d="M50 50 Q28 28 22 50 Q28 72 50 50 Z" fill="#1a1a2a" opacity="0.85" />
    </svg>
  ),
  lotus: ({ color = "#d4b070" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="lotusGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#lotusGlow)" />
      <ellipse cx="50" cy="55" rx="8" ry="18" fill={color} opacity="0.85" />
      <ellipse cx="50" cy="55" rx="8" ry="18" fill={color} opacity="0.65" transform="rotate(45 50 55)" />
      <ellipse cx="50" cy="55" rx="8" ry="18" fill={color} opacity="0.65" transform="rotate(-45 50 55)" />
      <ellipse cx="50" cy="55" rx="8" ry="18" fill={color} opacity="0.55" transform="rotate(90 50 55)" />
      <ellipse cx="50" cy="55" rx="8" ry="18" fill={color} opacity="0.55" transform="rotate(-90 50 55)" />
      <circle cx="50" cy="55" r="5" fill="#fff5e0" opacity="0.95" />
    </svg>
  ),
  moon: ({ color = "#e0d0a0" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#moonGlow)" />
      <circle cx="55" cy="48" r="26" fill={color} opacity="0.65" />
      <circle cx="62" cy="42" r="26" fill="#1a2332" opacity="0.95" />
    </svg>
  ),
  window: ({ color = "#a8b8d8" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="winGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.75" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="22" y="20" width="56" height="60" fill="url(#winGrad)" />
      <line x1="50" y1="20" x2="50" y2="80" stroke={color} strokeWidth="1.2" opacity="0.85" />
      <line x1="22" y1="50" x2="78" y2="50" stroke={color} strokeWidth="1.2" opacity="0.85" />
      <rect x="22" y="20" width="56" height="60" fill="none" stroke={color} strokeWidth="1.8" opacity="0.95" />
    </svg>
  ),
  spark: ({ color = "#7aa8d8" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="sparkGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.75" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#sparkGlow)" />
      <path d="M50 18 L52 44 L78 46 L52 50 L74 70 L52 54 L56 82 L50 56 L44 82 L48 54 L26 70 L48 50 L22 46 L48 44 Z" fill={color} opacity="0.8" />
      <circle cx="50" cy="50" r="6" fill="#fff5e0" opacity="0.95" />
    </svg>
  ),
  desert: ({ color = "#e8b870" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="desertGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill={color} opacity="0.25" />
      <path d="M10 75 Q35 55 50 68 Q72 55 90 75 L90 90 L10 90 Z" fill="url(#desertGrad)" />
      <circle cx="68" cy="32" r="10" fill={color} opacity="0.7" />
    </svg>
  ),
  bloom: ({ color = "#e85a5a" }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="bloomGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.65" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#bloomGlow)" />
      <circle cx="50" cy="38" r="11" fill={color} opacity="0.75" />
      <circle cx="38" cy="50" r="11" fill={color} opacity="0.75" />
      <circle cx="62" cy="50" r="11" fill={color} opacity="0.75" />
      <circle cx="42" cy="62" r="11" fill={color} opacity="0.75" />
      <circle cx="58" cy="62" r="11" fill={color} opacity="0.75" />
      <circle cx="50" cy="50" r="7" fill="#fff5e0" opacity="0.95" />
    </svg>
  ),
};

const mentors = [
  { id: "luxun", name: "鲁 迅", origin: "1881-1936", sigil: "tree", sigilColor: "#a87852", quote: "你怀疑的不是方向，是连接。", intro: "中国现代文学的奠基人。但在成为作家之前，他花了将近十年，不断换方向，不断怀疑自己。", struggle: "他先去南京学矿路，觉得不对，又转去日本学医，以为救国要先救人。直到课堂上一张幻灯片让他意识到——他学的东西解决不了他真正在意的问题。他退学了，没有新计划，靠翻译和教书为生，在沉默和怀疑里熬了将近十年。", breakthrough: "他停下来，开始读书、翻译、抄古碑。他没有立刻找到方向，但他保持着对那些麻木和愚昧的愤怒。直到 1918 年，《狂人日记》发表——他终于找到了自己的武器：不是医刀，而是笔。", advice: "你怀疑的不一定是方向选错了，而是你还没找到这件事和你真正在意的问题之间的连接。先问自己：我在意的最深的事是什么？", tonight: "拿一张纸，写下最近三件让你愤怒或不安的事。不分析，只记录。那里面藏着你真正在意的问题。", match: { stage: "study", state: "blur", need: "direction" } },
  { id: "nezha", name: "哪 吒", origin: "动画 · 东方", sigil: "flame", sigilColor: "#e85a5a", quote: "你是谁，只有你自己说了才算。", intro: "一个生来被定义为魔童的少年，没有选择自己的出身，却最终选择了自己的结局。", struggle: "他用愤怒包裹自己，因为那是他唯一能掌控的事。所有人都说他是魔，他几乎相信了那个故事——你生来就是错的。他越反抗，就越像那个被定义的样子。", breakthrough: "他在最后选择承担那场天劫，不是为了证明给别人看，而是为了说出那句「我命由我不由天」。他没有改变出身，但他改写了那个故事的结局。", advice: "你不认识自己，是因为你对自己的认识，大部分是别人告诉你的。把「别人说我」和「我觉得我」分两列写下来，那个差距就是你要去探索的地方。", tonight: "找一张纸，分两列：左边写三个「别人贴在你身上的标签」，右边写三个「你自己觉得你是谁」。看看那个差距。", match: { stage: "study", state: "lost", need: "direction" } },
  { id: "miguel", name: "Miguel", origin: "《寻梦环游记》", sigil: "music", sigilColor: "#e8b870", quote: "撑着的，是事，还是习惯？", intro: "一个热爱音乐的男孩，却生在一个世代禁止音乐的家族里。", struggle: "家族的期待和他对音乐的渴望，两件真实的事撞在一起把他逼进了死角。他想停下来顺从，又每次停下来就感到窒息。", breakthrough: "他真正理解的那一刻，不是他赢得了比赛，而是他在亡灵之地见到曾曾祖父——他发现祖辈禁止音乐是因为受过伤。他终于能既爱家人，也爱音乐。", advice: "那件你没放弃的事，你是为了证明给谁看，还是你自己离不开它？答案不同，下一步就不同。", tonight: "想一件你一直在撑的事。问自己：如果没有人会知道我做了这件事，我还会做吗？记下答案。", match: { stage: "study", state: "stuck", need: "direction" } },
  { id: "chihiro", name: "千 寻", origin: "《千与千寻》", sigil: "leaf", sigilColor: "#90b878", quote: "先做眼前最小的事。", intro: "一个普通的、甚至有点胆小的十岁女孩，被推进了一个完全陌生的世界。", struggle: "父母变成了猪，她一个人站在汤屋门口，没有地图。她哭过、害怕过，差点被这个世界吞没。", breakthrough: "她没有等人来救，去找了工作，记住每个人的名字，认真做好每件被分配的小事。她没有变得更强大，只是没有放弃「下一步我能做什么」这个问题。最后她带着父母走了出来。", advice: "不要急着找大方向，先找一个今天能做的最小的事：联系一个你信任的人，告诉他你现在的状态。", tonight: "给一个你信任的人发条消息。不用解释，只说一句「我最近不太好」。让一个人知道，就是第一步。", match: { stage: "graduate", state: "blur", need: "company" } },
  { id: "vangogh", name: "梵 高", origin: "1853-1890", sigil: "star", sigilColor: "#8a9eda", quote: "为热爱的事，点亮一颗星。", intro: "荷兰画家。三十岁才开始画画，生前只卖出过一幅画。", struggle: "他做过画商、教师、传教士，每一条路都走不下去。三十岁开始画画后也没有迎来转机——没有买家，没有认可，连弟弟的接济都让他感到窒息。他一直处于悬空的状态。", breakthrough: "他没有等到外界的认可，但他每天都在画。即使住进精神病院，他依然画——在最黑暗的时期，他画出了《星夜》。他从未「被看见」，但他从未停过笔。", advice: "悬空感是因为你还没找到一件让你每天愿意坐下来的事。回想：你上一次完全忘记时间在做什么？", tonight: "回想最近三个月，你哪一刻完全忘记了时间？把那件事写下来。明天给它三十分钟，不为结果，只为做。", match: { stage: "graduate", state: "float", need: "direction" } },
  { id: "gatsby", name: "盖 茨 比", origin: "《了不起的盖茨比》", sigil: "greenLight", sigilColor: "#7ab68a", quote: "你追的，是它，还是追到它后的自己？", intro: "一个白手起家的男人，用整个人生追一个方向，最后发现那个方向本身是个幻觉。", struggle: "他建起豪宅，办起派对，站在海湾对岸望着那盏绿灯。他追的从不是黛西本身，而是「拥有黛西后的那个自己」——那个能够被旧贵族阶层接纳的自己。", breakthrough: "他的故事是悲剧，但他的故事让一代代读者明白了：当目标承载了太多关于「自己」的投射，目标本身就会变形。看清这点，就是开始。", advice: "你追的这件事，你追的是它本身，还是追到它之后你会成为的那种人？先把那个「想成为的人」描述清楚。", tonight: "写下你现在最想要的那个东西。然后写：得到它之后，我会成为什么样的人？想成为那个人，是不是有别的路？", match: { stage: "graduate", state: "stuck", need: "direction" } },
  { id: "andy", name: "Andy", origin: "《穿 Prada 的女王》", sigil: "mirror", sigilColor: "#b8b0a0", quote: "搁置的事，是最重要的线索。", intro: "一个名校毕业的年轻女性，进入了所有人都羡慕的公司。", struggle: "她接受这份工作，因为「放简历上很好看」。她越来越能干，也越来越沉默。她说不清哪里不对，毕竟一切都在变好——直到有一天她站在镜子前，认不出自己是谁了。", breakthrough: "她在巴黎街头扔掉了那部一直响个不停的手机。她离开了那个所有人都想进入的世界，回到她原本想做的事——写作。她没有立刻成功，但她终于面对镜子时，认得出自己了。", advice: "在你现在的生活里，有没有一件事是你真正想做、但一直没时间做的？那件被搁置的事，就是你最需要认真对待的线索。", tonight: "想一件你「一直说要做但没做」的事。今晚就给它十分钟。不是开始，只是触碰它一下。", match: { stage: "work", state: "blur", need: "mirror" } },
  { id: "janeeyre", name: "简 · 爱", origin: "《简·爱》", sigil: "feather", sigilColor: "#e85a5a", quote: "永远不要在别人的期待里走失。", intro: "一个没有家世、没有美貌的女人，却始终没有交出对自己的判断权。", struggle: "她爱上了罗切斯特，却在婚礼上发现他隐瞒了一切。留下来意味着放弃她唯一确定的东西——她对自己的判断。", breakthrough: "她选择了离开，一个人走进旷野，几乎死在雨里。她没有立刻得到回报，但她保住了那条线——「我想要的」和「我能接受的自己」之间的那条线。多年后她回到罗切斯特身边，是作为一个完整的人。", advice: "今天有没有什么事是你真正想做或不想做的，但你选择了顺从？把它记下来。那是你重新认识自己的起点。", tonight: "回想今天，有没有一件事你心里说「不想」，但还是做了？写下那件事和那一刻你心里的声音。", match: { stage: "work", state: "lost", need: "mirror" } },
  { id: "nora", name: "娜 拉", origin: "《玩偶之家》", sigil: "door", sigilColor: "#c89880", quote: "先看清楚，你在扮演谁。", intro: "一个所有人都说「你过得真好」的女人，却有一天推开了那扇门。", struggle: "她曾经相信那个生活是真实的。直到她发现，丈夫爱的不是她，而是她扮演的那个角色——那个甜美的、依附的、不需要思考的妻子。", breakthrough: "她推开了那扇门。她没有计划，没有退路，但她做了一件更重要的事：她拒绝继续扮演。一个世纪后，她依然是无数女性走出「玩偶之家」的开端。", advice: "你走的那条路需要你扮演一个角色。是「听话的孩子」，是「稳定的人」，还是「成功的样子」？先看清楚你在扮演谁。", tonight: "用一个词描述你现在扮演的角色。然后写：这个角色是什么时候开始的？是谁希望你这样的？", match: { stage: "work", state: "stuck", need: "direction" } },
  { id: "julien", name: "于 连", origin: "《红与黑》", sigil: "redBlack", sigilColor: "#e85a5a", quote: "你的目标，是想要的，还是想被看见的？", intro: "一个出身底层、头脑聪颖的年轻人，一心想突破自己所在的阶层。", struggle: "他越往上，就越分不清——哪些是他真正想要的，哪些只是他用来证明自己的。他用尽全力爬上了他想去的地方，却在那里发现自己更加陌生。", breakthrough: "他最后在监狱里才真正认识自己。他拒绝上诉，不是因为绝望，而是因为他终于不再为别人的眼光活——那是他第一次，也是最后一次成为自己。", advice: "把你现在的目标写下来，每一条后面写：这是我自己想要的，还是我想让别人看见的？", tonight: "列出你最近一年最重要的三个目标。在每个后面写一个字：「己」（自己想要的）或「人」（想被人看见的）。", match: { stage: "work", state: "lost", need: "direction" } },
  { id: "hongyi", name: "弘一法师", origin: "1880-1942", sigil: "lotus", sigilColor: "#d4b070", quote: "如果不为别人看，你还会做哪几件？", intro: "原名李叔同。三十九岁放下一切，出家了。", struggle: "他在世俗意义上已经成功了——诗词、书法、音乐、戏剧样样精通，名满天下。但他感到一种巨大的空洞，像是站在山顶上发现风景并不属于自己。", breakthrough: "他放下了一切，从李叔同变成弘一法师。他的「放下」不是逃避，而是选择——选择把生命交给一件他真正认为重要的事。他后半生写经、讲学，活得比「成功」时更踏实。", advice: "把你现在做的所有事列出来，问自己：如果不是为了别人的眼光，我还会做哪几件？留下来的那些，才是你真正的答案。", tonight: "列出你这周做的所有事。在每件后面问：如果没人知道我做了，我还会做吗？圈出回答「会」的那几件。", match: { stage: "work", state: "stuck", need: "mirror" } },
  { id: "murakami", name: "村上春树", origin: "1949-", sigil: "moon", sigilColor: "#e0d0a0", quote: "在最不确定的时候，动一下。", intro: "二十九岁之前，他在东京开着一家小酒吧，从未想过写作和自己有关。", struggle: "酒吧经营陷入困境，债务压着，他每天重复同样的事，开始觉得自己正在被什么东西慢慢消耗，但说不清是什么。", breakthrough: "1978 年某一天，他坐在球场看棒球，什么都没发生，突然冒出一个念头：我可以写小说。那天回家他就开始写了。两年后，他卖掉酒吧，彻底转向。他没等到确定的时机，他在最不确定的时候动了。", advice: "找到那件你一直说「等有时间再做」的事，这周给它一个小时。不是为了看它有没有前途，只是为了让那种说不清的感觉松动一点。", tonight: "想一件你「等有时间再做」的事。打开日历，给它选一个时间，就这周。哪怕只有 30 分钟。", match: { stage: "work", state: "blur", need: "direction" } },
  { id: "charlotte", name: "Charlotte", origin: "《迷失东京》", sigil: "window", sigilColor: "#a8b8d8", quote: "你需要的不是答案，是真正在听的人。", intro: "一个名校毕业的年轻女性，跟着丈夫来到东京，生活里什么都有，就是不知道自己是谁。", struggle: "她试过写作，试过摄影，什么都只是试过。她坐在酒店窗台上，看着夜晚的东京。那种悬空的感觉不是因为缺少什么，而是因为她有太多东西，却没有一样是真正属于她的。", breakthrough: "她遇到了一个同样迷失的人，他们没有解决彼此的问题，但他们真正听见了对方。电影最后的那个耳语，没有人知道说了什么——但她带着那个被听见的瞬间，走回了自己的生活。", advice: "找一个不会急着给你建议的朋友，把你的状态说出来。说清楚这件事本身，就已经是一步了。", tonight: "想一个你信任的、不会急着给你建议的人。给 ta 发条消息：「我最近想找个人聊聊，不需要你解决，只想说说。」", match: { stage: "work", state: "float", need: "company" } },
  { id: "joe", name: "Joe Gardner", origin: "《心灵奇旅》", sigil: "spark", sigilColor: "#7aa8d8", quote: "把你满足的一天，写下来。", intro: "一个追了半生音乐梦的老师，终于站上了那个舞台，却感到更深的茫然。", struggle: "他以为人生的意义就是那个目标。他为此等了很多年。终于等到了，演出结束，他站在空荡荡的舞台上，感到的不是满足，而是更深的茫然——「就这样？」", breakthrough: "他重新回到日常，发现意义不在那个「巨大的火花」里，而在一片落叶、一块披萨、一段地铁上的音乐里。他没有放弃音乐，但他不再把它当作人生的「答案」——它只是生活里很多值得活的事之一。", advice: "把你理想中一天的生活，从早到晚写出来——不是「应该」的那种，而是真正觉得满足的那种。", tonight: "拿出十分钟，写一段「我理想中的某一天」。从早晨醒来开始，到晚上入睡，写得越具体越好。", match: { stage: "work", state: "float", need: "mirror" } },
  { id: "sanmao", name: "三 毛", origin: "1943-1991", sigil: "desert", sigilColor: "#e8b870", quote: "失去的事里，藏着下一步的入口。", intro: "台湾作家。在写下撒哈拉之前，她是一个在世界上找不到自己位置的人。", struggle: "她从小无法融入同龄人，把自己关在房间里。她去了西班牙、德国、美国，以为换一个地方就能找到答案，但那种说不清的不对劲一直跟着她。", breakthrough: "直到她在一本地理杂志上看到撒哈拉的照片，她说她感到「前世的乡愁」。她没有理由，就是去了。在沙漠里她找到了荷西，找到了写作，找到了那个一直没有位置的自己。", advice: "在所有失去的东西里，有没有什么是你一直想做、但没有做的事？那件事，可能是你下一步的入口。", tonight: "回想你最近失去的一段关系/工作/阶段。问自己：在那段时间里，有没有什么我一直想做但没做的事？写下来。", match: { stage: "after", state: "blur", need: "direction" } },
  { id: "frida", name: "Frida", origin: "1907-1954", sigil: "bloom", sigilColor: "#e85a5a", quote: "先让经历有形状，再看清自己。", intro: "墨西哥画家。「我画自画像，因为我是我最了解的主题。」", struggle: "十八岁时她遭遇车祸，在床上躺了一年。脊椎、骨盆多处骨折。感情上她和迭戈的关系几度破裂，她流产，把所有的痛压在身体里撑着。", breakthrough: "她开始画自己——伤口、流产、迭戈、那张破碎的脸。她不是在控诉，也不是在治愈，她只是让那些痛有了形状。当事情有了形状，它就不再吞噬你，它变成了你看得见、可以面对的东西。", advice: "找到一个方式把经历的事说出来或写出来。有了形状之后，你才能重新看清楚自己是谁。", tonight: "拿一张纸，用十分钟写下你最近最重的那件事。不要分析，不要解决，只是把它「画出来」——让它有一个形状。", match: { stage: "after", state: "lost", need: "mirror" } },
];

function findMentor(stage, state, need) {
  if (!stage || !state || !need) return mentors[Math.floor(Math.random() * mentors.length)];
  const scored = mentors.map((m) => {
    let score = 0;
    if (m.match.stage === stage) score += 3;
    if (m.match.state === state) score += 2;
    if (m.match.need === need) score += 2;
    return { mentor: m, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].mentor;
}

function findCompanions(currentMentor, count = 2) {
  if (!currentMentor) return [];
  const others = mentors.filter((m) => m.id !== currentMentor.id);
  const scored = others.map((m) => {
    let score = 0;
    if (m.match.state === currentMentor.match.state) score += 3;
    if (m.match.need === currentMentor.match.need) score += 2;
    if (m.match.stage === currentMentor.match.stage) score += 1;
    return { mentor: m, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.mentor);
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-px" style={{ backgroundColor: "#c54545", opacity: 0.4 }}></div>
      <p className="text-[11px] tracking-[0.5em] whitespace-nowrap px-3 py-1" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870", backgroundColor: "rgba(232, 184, 112, 0.1)", fontWeight: 500, letterSpacing: "0.4em" }}>
        {children}
      </p>
      <div className="flex-1 h-px" style={{ backgroundColor: "#c54545", opacity: 0.4 }}></div>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const stage = searchParams.get("stage");
  const state = searchParams.get("state");
  const need = searchParams.get("need");

  const [phase, setPhase] = useState("loading");
  const [matchedMentor, setMatchedMentor] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // 生成星星
  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: Math.random() * 90 + 2,
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


  useEffect(() => {
    let mentor;
    if (id) mentor = mentors.find((m) => m.id === id);
    if (!mentor) mentor = findMentor(stage, state, need);
    setMatchedMentor(mentor);
    const t = setTimeout(() => setPhase("card"), 1800);
    return () => clearTimeout(t);
  }, [id, stage, state, need]);

  useEffect(() => {
    if (!matchedMentor) return;
    try {
      const saved = JSON.parse(localStorage.getItem("odyssey_saved") || "[]");
      setIsSaved(saved.some((s) => s.id === matchedMentor.id));
    } catch {
      setIsSaved(false);
    }
  }, [matchedMentor]);

  const toggleSave = () => {
    if (!matchedMentor) return;
    try {
      const saved = JSON.parse(localStorage.getItem("odyssey_saved") || "[]");
      const exists = saved.some((s) => s.id === matchedMentor.id);
      let newSaved;
      if (exists) {
        newSaved = saved.filter((s) => s.id !== matchedMentor.id);
        setIsSaved(false);
      } else {
        newSaved = [...saved, { id: matchedMentor.id, name: matchedMentor.name, origin: matchedMentor.origin, sigil: matchedMentor.sigil, sigilColor: matchedMentor.sigilColor, quote: matchedMentor.quote, savedAt: new Date().toISOString(), stage, state, need }];
        setIsSaved(true);
      }
      localStorage.setItem("odyssey_saved", JSON.stringify(newSaved));
    } catch (e) {
      console.error("保存失败", e);
    }
  };

  if (!matchedMentor) return null;
  const SigilComponent = Sigils[matchedMentor.sigil];

if (phase === "loading") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#0a0e1a" }}>
        {/* 星空 */}
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
              willChange: "opacity",
            }}
          />
        ))}

        {/* 中央水彩晕染 */}
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${matchedMentor.sigilColor} 0%, transparent 70%)`, animation: "watercolorBloom 1.6s ease-out forwards" }}></div>
        </div>

        {/* 文字提示 */}
        <p className="absolute bottom-32 text-xs tracking-[0.5em] italic" style={{ fontFamily: "var(--font-fell)", color: "#e8b870", opacity: 0.6, animation: "fadeIn 1s ease-out 0.5s both" }}>
          finding a guide for you...
        </p>
        <p className="absolute bottom-24 text-[10px] tracking-[0.4em]" style={{ fontFamily: "var(--font-zcool)", color: "#c5a878", opacity: 0.5, animation: "fadeIn 1s ease-out 1s both" }}>
          正 在 林 中 寻 一 位 同 路 人
        </p>

        <style jsx>{`
          @keyframes watercolorBloom {
            0% { opacity: 0; transform: scale(0.2); filter: blur(20px); }
            50% { opacity: 0.7; }
            100% { opacity: 0.4; transform: scale(2); filter: blur(40px); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 0.6; }
          }
        `}</style>
      </main>
    );
  }


  const bodyTextStyle = {
    fontFamily: "var(--font-noto-serif)",
    letterSpacing: "0.04em",
    lineHeight: "2.1",
    color: "#f0e4c8",
  };

return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8 relative overflow-hidden" style={{ backgroundColor: "#0a0e1a" }}>
      {/* 鼠标跟随光晕 */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, ${matchedMentor.sigilColor}15 0%, transparent 70%)`,
        }}
      />

      {/* 星空背景 */}
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
            boxShadow: `0 0 ${star.size * 2}px rgba(245, 230, 200, 0.5)`,
            willChange: "opacity",
            zIndex: 0,
          }}
        />
      ))}

      {/* 雾气层 */}
      <div
        className="absolute pointer-events-none w-[200%] h-[40%]"
        style={{
          top: "30%",
          left: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${matchedMentor.sigilColor}15 0%, transparent 40%), radial-gradient(ellipse at 70% 50%, rgba(168, 156, 200, 0.05) 0%, transparent 40%)`,
          animation: "fogDrift 80s linear infinite",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* 顶部导航 */}

      <div className="w-full max-w-md flex justify-between items-center mb-8 gap-2">
        <Link href="/" className="flex items-center gap-1.5 px-3 py-2 rounded-sm transition-all hover:scale-105" style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8", backgroundColor: "rgba(232, 184, 112, 0.1)", border: "1px solid rgba(232, 184, 112, 0.3)", fontSize: "11px", letterSpacing: "0.15em" }}>
          <span>←</span>
          <span>首 页</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/my" className="flex items-center gap-1.5 px-3 py-2 rounded-sm transition-all hover:scale-105" style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8", backgroundColor: "rgba(232, 184, 112, 0.1)", border: "1px solid rgba(232, 184, 112, 0.3)", fontSize: "11px", letterSpacing: "0.15em" }}>
            <span>✦</span>
            <span>我 的 林 中</span>
          </Link>
          <Link href="/explore" className="flex items-center gap-1.5 px-3 py-2 rounded-sm transition-all hover:scale-105" style={{ fontFamily: "var(--font-zcool)", color: "#1f2a3f", backgroundColor: "#e8b870", fontSize: "11px", letterSpacing: "0.15em", fontWeight: 500 }}>
            <span>↻</span>
            <span>再 拾 一 次</span>
          </Link>
        </div>
      </div>

      {/* 卡片 */}
      <div className="relative w-full max-w-md z-10" style={{ animation: "fadeInUp 1.2s ease-out forwards" }}>
        <div className="absolute inset-0 -m-20 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 30%, ${matchedMentor.sigilColor} 0%, transparent 60%)` }}></div>

        <div
          className="relative px-7 py-7 md:px-9 md:py-8"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(${parseInt(matchedMentor.sigilColor.slice(1,3), 16)}, ${parseInt(matchedMentor.sigilColor.slice(3,5), 16)}, ${parseInt(matchedMentor.sigilColor.slice(5,7), 16)}, 0.08) 0%, transparent 60%), linear-gradient(135deg, #2a3550 0%, #1f2a3f 100%)`,
            color: "#f0e4c8",
            borderRadius: "8px 24px 12px 28px / 24px 8px 32px 12px",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 240, 200, 0.08)",
          }}
        >
          <p className="text-[9px] tracking-[0.5em] opacity-60 italic text-center mb-3" style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}>
            NO.{String(mentors.indexOf(matchedMentor) + 1).padStart(3, "0")}
          </p>

          {stage && state && (
            <div className="text-center mb-6 px-2" style={{ fontFamily: "var(--font-noto-serif)", color: "#f0e4c8" }}>
              <p className="text-[11px] md:text-[12px] leading-relaxed opacity-75" style={{ letterSpacing: "0.05em", lineHeight: "2" }}>
                你说，你正在
                <span className="mx-1 px-1" style={{ color: "#e8b870", fontWeight: 600, borderBottom: "1px dotted #e8b870" }}>
                  {stageLabels[stage]?.split("，")[0] || ""}
                </span>
              </p>
              <p className="text-[11px] md:text-[12px] leading-relaxed opacity-75 mt-1" style={{ letterSpacing: "0.05em", lineHeight: "2" }}>
                感到
                <span className="mx-1 px-1" style={{ color: "#e8b870", fontWeight: 600, borderBottom: "1px dotted #e8b870" }}>
                  {stateLabels[state] || ""}
                </span>
              </p>
              <p className="text-[12px] md:text-[13px] mt-3 italic opacity-90" style={{ color: "#f0e4c8", letterSpacing: "0.08em" }}>
                ta 也曾走过这段路。
              </p>
            </div>
          )}

          <div className="flex justify-center my-3">
            <div className="relative" style={{ animation: "sigilFloat 5s ease-in-out infinite" }}>
              <svg viewBox="0 0 200 240" className="w-32 h-40 md:w-36 md:h-44" style={{ overflow: "visible" }}>
                <ellipse cx="100" cy="120" rx="92" ry="112" fill="none" stroke="#e8b870" strokeWidth="1" opacity="0.4" />
                <ellipse cx="100" cy="120" rx="86" ry="106" fill="none" stroke="#e8b870" strokeWidth="0.7" strokeDasharray="2 4" opacity="0.3" />
                <text x="100" y="14" textAnchor="middle" fontSize="12" fill="#e8b870" opacity="0.6">❦</text>
                <text x="100" y="234" textAnchor="middle" fontSize="12" fill="#e8b870" opacity="0.6">❦</text>
                <foreignObject x="40" y="60" width="120" height="120">
                  <div className="w-full h-full">
                    <SigilComponent color={matchedMentor.sigilColor} />
                  </div>
                </foreignObject>
              </svg>
            </div>
          </div>

          <div className="text-center mb-2">
            <h2 className="text-3xl md:text-4xl tracking-[0.3em] mb-3" style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}>
              {matchedMentor.name}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span style={{ color: "#e8b870", opacity: 0.7 }}>—</span>
              <p className="text-xs md:text-sm tracking-[0.3em] italic" style={{ fontFamily: "var(--font-noto-serif)", color: "#e8b870", fontWeight: 400 }}>
                {matchedMentor.origin}
              </p>
              <span style={{ color: "#e8b870", opacity: 0.7 }}>—</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 my-3 opacity-50">
            <div className="w-8 h-px" style={{ backgroundColor: "#e8b870" }}></div>
            <span className="text-xs" style={{ color: "#e8b870", fontFamily: "var(--font-fell)" }}>◆</span>
            <div className="w-8 h-px" style={{ backgroundColor: "#e8b870" }}></div>
          </div>

          <div className="text-center my-4 px-2">
            <p className="text-base md:text-lg leading-relaxed italic" style={{ fontFamily: "var(--font-noto-serif)", letterSpacing: "0.05em", color: "#fff5e0", fontWeight: 400 }}>
              <span style={{ fontFamily: "var(--font-fell)", color: "#e8b870", fontSize: "1.3em", marginRight: "0.1em" }}>&ldquo;</span>
              {matchedMentor.quote}
              <span style={{ fontFamily: "var(--font-fell)", color: "#e8b870", fontSize: "1.3em", marginLeft: "0.1em" }}>&rdquo;</span>
            </p>
          </div>

          <div className="flex justify-center mt-8 relative z-10">
            <button type="button" onClick={() => setExpanded(!expanded)} className="px-6 py-2 cursor-pointer transition-all duration-300 hover:opacity-100" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870", opacity: 0.85, borderBottom: "1px solid #e8b870", background: "transparent" }}>
              <span className="text-[11px] tracking-[0.4em]">
                {expanded ? "收 起" : "想 知 道 更 多"}
              </span>
            </button>
          </div>

          {expanded && (
            <div className="mt-10 space-y-8" style={{ animation: "fadeIn 0.5s ease-out" }}>
              <div>
                <SectionTitle>ta 是 谁</SectionTitle>
                <p className="text-[14px] md:text-[15px] text-justify italic px-2" style={{ ...bodyTextStyle, opacity: 0.9 }}>
                  {matchedMentor.intro}
                </p>
              </div>

              <div>
                <SectionTitle>ta 也 曾 迷 路</SectionTitle>
                <p className="text-[14px] md:text-[15px] text-justify px-2" style={{ ...bodyTextStyle, opacity: 0.95 }}>
                  {matchedMentor.struggle}
                </p>
              </div>

              <div>
                <SectionTitle>ta 怎 么 走 出 来 的</SectionTitle>
                <p className="text-[14px] md:text-[15px] text-justify px-2" style={{ ...bodyTextStyle, opacity: 0.95 }}>
                  {matchedMentor.breakthrough}
                </p>
              </div>

              <div>
                <SectionTitle>ta 想 对 你 说</SectionTitle>
                <div className="px-5 py-5" style={{ backgroundColor: "rgba(232, 184, 112, 0.08)", borderLeft: "3px solid #e8b870" }}>
                  <p className="text-[14px] md:text-[15px] text-justify" style={{ ...bodyTextStyle, color: "#fff5e0", fontWeight: 400 }}>
                    {matchedMentor.advice}
                  </p>
                </div>
              </div>

              <div>
                <SectionTitle>🕯  今 晚 的 一 件 小 事</SectionTitle>
                <div className="px-5 py-5 relative" style={{ backgroundColor: "rgba(248, 228, 177, 0.06)", border: "1px dashed rgba(232, 184, 112, 0.4)" }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 text-xs" style={{ backgroundColor: "#1f2a3f", color: "#e8b870", fontFamily: "var(--font-fell)", letterSpacing: "0.3em", fontStyle: "italic" }}>
                    a small step
                  </div>
                  <p className="text-[14px] md:text-[15px] text-justify mt-2" style={{ ...bodyTextStyle, color: "#f0e4c8", fontWeight: 400, fontStyle: "italic" }}>
                    {matchedMentor.tonight}
                  </p>
                  <p className="text-[10px] tracking-[0.3em] opacity-60 mt-3 text-right" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870" }}>
                    — 不 必 完 美，只 要 开 始
                  </p>
                </div>
              </div>
            </div>
          )}

          {expanded && (
            <div className="mt-10 pt-6 border-t" style={{ borderColor: "rgba(232, 184, 112, 0.2)" }}>
              <p className="text-[10px] tracking-[0.4em] opacity-60 text-center mb-5" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870" }}>
                ◆  ta 的 同 路 人  ◆
              </p>
              <div className="grid grid-cols-2 gap-3">
                {findCompanions(matchedMentor).map((companion) => {
                  const CompanionSigil = Sigils[companion.sigil];
                  return (
                    <Link key={companion.id} href={`/result?id=${companion.id}`} className="block p-4 transition-all duration-300 hover:scale-105 group" style={{ backgroundColor: "rgba(232, 184, 112, 0.04)", border: "1px solid rgba(232, 184, 112, 0.2)", borderRadius: "4px" }}>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <CompanionSigil color={companion.sigilColor} />
                        </div>
                        <p className="text-sm tracking-[0.2em] mb-1" style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}>
                          {companion.name}
                        </p>
                        <p className="text-[9px] italic opacity-50" style={{ fontFamily: "var(--font-fell)", color: "#e8b870" }}>
                          {companion.origin}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <p className="text-[10px] tracking-[0.3em] opacity-40 text-center mt-4 italic" style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}>
                走 过 相 似 夜 路 的 人
              </p>
            </div>
          )}

          <div className="flex justify-center mt-10 pt-6 border-t" style={{ borderColor: "rgba(232, 184, 112, 0.2)" }}>
            <button type="button" onClick={toggleSave} className="flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-300 hover:scale-105" style={{ fontFamily: "var(--font-zcool)", color: isSaved ? "#1f2a3f" : "#e8b870", backgroundColor: isSaved ? "#e8b870" : "transparent", border: "1px solid #e8b870", borderRadius: "2px" }}>
              <span style={{ fontSize: "14px" }}>{isSaved ? "✓" : "✦"}</span>
              <span className="text-[12px] tracking-[0.3em]">
                {isSaved ? "已 收 入 林 中" : "收 入 我 的 林 中"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isSaved && (
        <p className="mt-4 text-[10px] tracking-[0.3em] opacity-60 text-center" style={{ fontFamily: "var(--font-zcool)", color: "#e8b870", animation: "fadeIn 0.5s ease-out" }}>
          → 在「我 的 林 中」可 以 再 见
        </p>
      )}

      <p className="mt-12 text-xs tracking-[0.4em] opacity-50 text-center" style={{ fontFamily: "var(--font-zcool)", color: "#f0e4c8" }}>
        林 中 的 灯，可 以 一 直 亮 着
      </p>

     <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sigilFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes fogDrift {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(0%); }
        }
      `}</style>

    </main>
  );
}

export default function Result() {
  return (
    <Suspense fallback={<main className="min-h-screen" style={{ backgroundColor: "#1a2332" }} />}>
      <ResultContent />
    </Suspense>
  );
}
