const tiles =
  '<div class="stage">\n  <div class="tile">01</div>\n  <div class="tile">02</div>\n  <div class="tile">03</div>\n  <div class="tile">04</div>\n  <div class="tile">05</div>\n  <div class="tile">06</div>\n</div>';
const range = (key, label, min, max, value) => ({
  key,
  label,
  min,
  max,
  value,
});
const select = (key, label, options, value) => ({ key, label, options, value });
export const chapters = [
  {
    id: "box-model",
    title: "盒模型",
    en: "Box Model",
    group: "布局基础",
    time: 20,
    color: "#da7852",
    intro: "理解每一个元素占据的空间，从一个盒子开始。",
    heading: "页面上的一切，都是盒子",
    tags: ["padding", "margin", "box-sizing"],
    concepts: [
      [
        "四层空间",
        "内容区 content 被 padding、border 和 margin 依次包围。背景延伸到边框，外边距始终透明。",
      ],
      [
        "尺寸如何计算",
        "content-box 总宽度 = width + 左右 padding + 左右 border；border-box 将内边距和边框纳入 width。margin 不包含在两者的 width 内。",
      ],
      [
        "外边距折叠",
        "普通块级元素上下外边距可能折叠，而不是相加。Flex 和 Grid 容器内的子项外边距不折叠。",
      ],
    ],
    tip: "宽度 200px、两侧 padding 20px、border 4px 时，content-box 实际宽度为 248px。",
    html: '<div class="stage"><div class="tile">CONTENT<br>内容区域</div></div>',
    controls: [
      range("padding", "内边距 padding", 0, 60, 24),
      range("border", "边框 border", 0, 16, 4),
      select(
        "sizing",
        "尺寸计算",
        ["content-box", "border-box"],
        "content-box",
      ),
    ],
    question: {
      text: "width: 200px; padding: 20px; border: 4px solid; 使用 content-box 时，边框盒宽度是多少？",
      options: ["200px", "240px", "248px", "288px"],
      answer: 2,
      explanation: "200 + 20 × 2 + 4 × 2 = 248px。margin 不计入边框盒宽度。",
    },
  },
  {
    id: "flow",
    title: "文档流与显示",
    en: "Normal Flow",
    group: "布局基础",
    time: 25,
    color: "#6195bb",
    intro: "认识元素默认的排列方式，掌握 display 的变化。",
    heading: "理解浏览器的默认排列",
    tags: ["display", "block", "inline"],
    concepts: [
      [
        "块级与行内",
        "块级盒在普通流中另起一行；行内盒随文本排布。行内非替换元素的 width 和 height 通常不生效。",
      ],
      [
        "行内块",
        "inline-block 保持行内排列，同时接受宽高。元素之间可能存在来自 HTML 空白字符的间距。",
      ],
      [
        "隐藏与占位",
        "display: none 不生成布局盒；visibility: hidden 隐藏内容但保留空间。两者不要混淆。",
      ],
    ],
    tip: "切换 display，观察每个编号是否另起一行，以及宽度是否生效。",
    html: tiles,
    controls: [
      select(
        "display",
        "显示方式",
        ["block", "inline-block", "inline", "none"],
        "inline-block",
      ),
      range("width", "元素宽度", 60, 200, 100),
    ],
    question: {
      text: "哪个属性让元素隐藏并且不再占据布局空间？",
      options: [
        "opacity: 0",
        "visibility: hidden",
        "display: none",
        "color: transparent",
      ],
      answer: 2,
      explanation: "display: none 不生成布局盒；其他选项仍保留布局空间。",
    },
  },
  {
    id: "position",
    title: "定位与层叠",
    en: "Position & Layers",
    group: "布局基础",
    time: 30,
    color: "#a18aca",
    intro: "脱离默认位置，让元素出现在你希望的位置。",
    heading: "定位，从参照系开始",
    tags: ["position", "offset", "z-index"],
    concepts: [
      [
        "相对定位",
        "relative 的偏移相对于元素本来的位置，原有占位保持不变。它也经常用于建立绝对定位后代的包含块。",
      ],
      [
        "绝对定位",
        "absolute 脱离普通流，通常相对于最近的非 static 定位祖先；没有这样的祖先时，使用初始包含块。",
      ],
      [
        "层叠上下文",
        "z-index 不是全局排名。transform、opacity 小于 1 等属性也可能建立层叠上下文，后代不能任意跨越父级的层叠顺序。",
      ],
    ],
    tip: "切换 relative 与 absolute，观察第二个元素是否补到第一个元素原来的位置。",
    html: tiles,
    controls: [
      select("position", "定位方式", ["relative", "absolute"], "absolute"),
      range("offset", "顶部偏移 top", 0, 140, 32),
      range("left", "左侧偏移 left", 0, 180, 48),
    ],
    question: {
      text: "absolute 元素通常以哪个祖先作为定位参照？",
      options: [
        "最近的非 static 定位祖先",
        "总是 body",
        "最近的兄弟元素",
        "总是浏览器窗口",
      ],
      answer: 0,
      explanation:
        "最近的非 static 定位祖先通常建立包含块；transform 等属性也可能建立包含块。",
    },
  },
  {
    id: "flex",
    title: "Flex 弹性布局",
    en: "Flexbox",
    group: "现代布局",
    time: 35,
    color: "#428e78",
    intro: "沿着一条轴线，自如地排列、对齐与分配空间。",
    heading: "一维布局的灵活秩序",
    tags: ["flex-direction", "justify-content", "gap"],
    concepts: [
      [
        "主轴与交叉轴",
        "flex-direction 定义主轴。row 的主轴为行方向，column 的主轴为列方向；交叉轴与主轴垂直。",
      ],
      [
        "分配剩余空间",
        "justify-content 沿主轴分配剩余空间，align-items 沿交叉轴对齐。gap 是项目之间的固定间距。",
      ],
      [
        "伸缩与换行",
        "flex-grow 分配正剩余空间，flex-shrink 决定收缩权重。flex-wrap: wrap 允许项目换行，每一行独立分配空间。",
      ],
    ],
    tip: "space-between 分配的是剩余空间；没有剩余空间时，看不出分布效果。",
    html: tiles,
    controls: [
      select("direction", "主轴方向", ["row", "column"], "row"),
      select(
        "justify",
        "主轴对齐",
        ["flex-start", "center", "space-between", "space-around"],
        "space-between",
      ),
      range("gap", "项目间距 gap", 0, 40, 16),
    ],
    question: {
      text: "flex-direction: column 时，justify-content 控制哪个方向？",
      options: ["水平方向", "垂直方向", "只控制文字", "控制层叠顺序"],
      answer: 1,
      explanation:
        "column 将主轴设为列方向，因此 justify-content 沿垂直主轴分配空间。",
    },
  },
  {
    id: "grid",
    title: "Grid 网格布局",
    en: "CSS Grid",
    group: "现代布局",
    time: 40,
    color: "#7884c8",
    intro: "同时掌控行与列，构建有秩序的二维布局。",
    heading: "二维布局的坐标系",
    tags: ["grid-template", "fr", "gap"],
    concepts: [
      [
        "轨道与网格线",
        "相邻网格线之间是轨道。grid-template-columns 定义列轨道；grid-template-rows 定义行轨道。",
      ],
      [
        "fr 分配空间",
        "fr 表示剩余可分配空间的一份。repeat(3, 1fr) 创建三列等分轨道，gap 先从可分配宽度中扣除。",
      ],
      [
        "跨行与跨列",
        "grid-column: span 2 使项目跨越两列。minmax(0, 1fr) 可以避免长内容的最小尺寸挤宽轨道。",
      ],
    ],
    tip: "Grid 适合同时约束行列；Flex 更适合一条轴线上的内容分布。",
    html: tiles,
    controls: [
      range("columns", "列数 columns", 1, 6, 3),
      range("gap", "网格间距 gap", 0, 48, 20),
    ],
    question: {
      text: "创建三列等宽网格的正确声明是什么？",
      options: [
        "columns: flex(3)",
        "grid-template-columns: repeat(3, 1fr)",
        "grid-column: 3px",
        "display: three-grid",
      ],
      answer: 1,
      explanation: "repeat(3, 1fr) 创建三个轨道，每个轨道分配一份剩余宽度。",
    },
  },
  {
    id: "responsive",
    title: "响应式布局",
    en: "Responsive Design",
    group: "现代布局",
    time: 35,
    color: "#bd7694",
    intro: "让同一份内容，适应手机、平板和桌面。",
    heading: "布局应当适应内容与屏幕",
    tags: ["@media", "minmax", "mobile-first"],
    concepts: [
      [
        "移动优先",
        "先定义适合小屏的基础样式，再通过 min-width 媒体查询逐步增强。断点应由内容是否拥挤决定。",
      ],
      [
        "流式尺寸",
        "百分比、max-width 与弹性轨道可以自然适应容器宽度。避免对正文容器设置超出屏幕的固定宽度。",
      ],
      [
        "断点与视口",
        "媒体查询依据视口而非元素宽度。这里的演示运行于 iframe，其预览宽度就是实验的视口宽度。",
      ],
    ],
    tip: "在 360px 与桌面预览之间切换，观察媒体查询改变列数。",
    html: tiles,
    controls: [
      range("breakpoint", "桌面断点", 400, 1000, 640),
      range("columns", "桌面列数", 2, 4, 3),
    ],
    question: {
      text: "移动优先通常使用哪种媒体查询逐步增强布局？",
      options: [
        "min-width",
        "max-height: 0",
        "orientation: hidden",
        "display: mobile",
      ],
      answer: 0,
      explanation: "小屏基础样式配合 min-width，在视口足够宽时增加列数。",
    },
  },
  {
    id: "patterns",
    title: "常见页面结构",
    en: "Layout Patterns",
    group: "综合应用",
    time: 40,
    color: "#bf9b42",
    intro: "把布局知识组合为导航、内容区与侧栏。",
    heading: "从单个组件走向页面骨架",
    tags: ["grid-area", "semantic HTML", "sidebar"],
    concepts: [
      [
        "语义化结构",
        "header、nav、main、aside、footer 表达内容角色。语义结构与视觉布局独立，不要为了位置牺牲阅读顺序。",
      ],
      [
        "命名网格区域",
        "grid-template-areas 用区域名称描述页面骨架。每个同名区域必须组成一个矩形。",
      ],
      [
        "小屏重排",
        "桌面侧栏在小屏中可转为纵向区域。保证主内容的 DOM 顺序合理，方便键盘和辅助技术访问。",
      ],
    ],
    tip: "在同一套 HTML 上，仅改变 CSS 就能调整侧栏的位置。",
    html: '<div class="stage"><header>HEADER · 页眉</header><main>MAIN · 主内容</main><aside>ASIDE · 侧栏</aside><footer>FOOTER · 页脚</footer></div>',
    controls: [
      select("side", "侧栏位置", ["left", "right"], "right"),
      range("sidebar", "侧栏宽度", 100, 260, 180),
    ],
    question: {
      text: "grid-template-areas 中的同名区域必须满足什么条件？",
      options: [
        "可以任意分散",
        "必须形成矩形",
        "只能占一个单元格",
        "必须命名为 main",
      ],
      answer: 1,
      explanation: "同名区域必须连续形成矩形，否则该声明无效。",
    },
  },
  {
    id: "project",
    title: "综合实战",
    en: "Build a Gallery",
    group: "综合应用",
    time: 50,
    color: "#549ca5",
    intro: "用响应式作品集，完成从知识到实践的最后一步。",
    heading: "构建一个自适应作品画廊",
    tags: ["auto-fit", "minmax", "composition"],
    concepts: [
      [
        "自动适配列数",
        "repeat(auto-fit, minmax(...)) 根据可用空间生成轨道，空轨道折叠后剩余项目分配空间。",
      ],
      [
        "控制最小宽度",
        "用 min(100%, 180px) 限制最小轨道宽度，保证窄于目标最小宽度的设备不会因此溢出。",
      ],
      [
        "统一视觉节奏",
        "固定媒体宽高比、统一间距和对齐，比为每个项目设置独立偏移更稳定。先验证结构，再修饰外观。",
      ],
    ],
    tip: "逐渐缩小预览：列数自动减少，无需为每个屏幕分别写一个断点。",
    html: tiles,
    controls: [
      range("minimum", "最小项目宽度", 100, 300, 180),
      range("gap", "画廊间距", 8, 40, 20),
    ],
    question: {
      text: "希望网格列数随容器宽度自动变化，应该使用哪个组合？",
      options: [
        "absolute + top",
        "auto-fit + minmax",
        "float + z-index",
        "visibility + opacity",
      ],
      answer: 1,
      explanation:
        "auto-fit 自动计算轨道数量，minmax 为轨道指定最小和最大尺寸。",
    },
  },
];
export const getChapter = (id) => chapters.find((c) => c.id === id);
export const defaults = (c) =>
  Object.fromEntries(c.controls.map((p) => [p.key, p.value]));
export function makeCss(c, input = {}) {
  const v = { ...defaults(c), ...input };
  switch (c.id) {
    case "box-model":
      return (
        ".stage { padding: 30px; background: #f8e9d9; }\n.tile { width: 200px; padding: " +
        v.padding +
        "px; border: " +
        v.border +
        "px solid #d4b178; box-sizing: " +
        v.sizing +
        "; margin: 20px auto; background: #94c9b7; }"
      );
    case "flow":
      return (
        ".tile { display: " +
        v.display +
        "; width: " +
        v.width +
        "px; margin: 8px; }"
      );
    case "position":
      return (
        ".stage { position: relative; min-height: 300px; }\n.tile { display: inline-block; width: 80px; margin: 8px; }\n.tile:first-child { position: " +
        v.position +
        "; top: " +
        v.offset +
        "px; left: " +
        v.left +
        "px; z-index: 1; background: #c3acdf; }"
      );
    case "flex":
      return (
        ".stage { display: flex; flex-direction: " +
        v.direction +
        "; justify-content: " +
        v.justify +
        "; align-items: center; gap: " +
        v.gap +
        "px; min-height: 300px; flex-wrap: wrap; }\n.tile { flex: 0 0 68px; }"
      );
    case "grid":
      return (
        ".stage { display: grid; grid-template-columns: repeat(" +
        v.columns +
        ", 1fr); gap: " +
        v.gap +
        "px; }\n.tile { min-width: 0; }"
      );
    case "responsive":
      return (
        ".stage { display: grid; grid-template-columns: 1fr; gap: 16px; }\n@media (min-width: " +
        v.breakpoint +
        "px) {\n  .stage { grid-template-columns: repeat(" +
        v.columns +
        ", minmax(0, 1fr)); }\n}"
      );
    case "patterns":
      return (
        ".stage { display: grid; grid-template-columns: " +
        (v.side === "left"
          ? v.sidebar + "px minmax(0, 1fr)"
          : "minmax(0, 1fr) " + v.sidebar + "px") +
        '; grid-template-areas: "header header" "' +
        (v.side === "left" ? "aside main" : "main aside") +
        '" "footer footer"; gap: 16px; }\nheader { grid-area: header; }\nmain { grid-area: main; min-height: 180px; }\naside { grid-area: aside; }\nfooter { grid-area: footer; }\n@media (max-width: 500px) { .stage { grid-template-columns: 1fr; grid-template-areas: "header" "main" "aside" "footer"; } }'
      );
    default:
      return (
        ".stage { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, " +
        v.minimum +
        "px), 1fr)); gap: " +
        v.gap +
        "px; }\n.tile { aspect-ratio: 4 / 3; display: grid; place-items: center; }"
      );
  }
}
export const baseCss =
  "* { box-sizing: border-box; } body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; color: #29483f; background: #fff; } .tile,header,main,aside,footer { padding: 24px 16px; border-radius: 5px; background: #d9eee6; text-align: center; font-weight: 600; } .tile:nth-child(3n+2),aside { background: #e6e6f6; color: #5b5685; } .tile:nth-child(3n),footer { background: #f5e6d5; color: #8e6c42; } header { background: #dcecf5; }";
export function documentFor(html, css) {
  return (
    '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; base-uri \'none\'; form-action \'none\'"><style>' +
    baseCss +
    "\n" +
    css +
    "</style></head><body>" +
    html +
    "</body></html>"
  );
}
export function readProgress(storage) {
  try {
    const values = JSON.parse(storage.getItem("layout-progress") || "[]");
    return Array.isArray(values)
      ? [...new Set(values.filter((id) => getChapter(id)))]
      : [];
  } catch {
    return [];
  }
}
