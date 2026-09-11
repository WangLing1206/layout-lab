const bi = (zh, en) => ({ zh, en });
const range = (key, zh, en, min, max, value) => ({
  key,
  label: bi(zh, en),
  min,
  max,
  value,
});
const select = (key, zh, en, options, value) => ({
  key,
  label: bi(zh, en),
  options,
  value,
});
const concept = (zt, et, zd, ed) => ({ title: bi(zt, et), text: bi(zd, ed) });
const question = (zt, et, zo, eo, answer, ze, ee) => ({
  text: bi(zt, et),
  options: zo.map((v, i) => bi(v, eo[i])),
  answer,
  explanation: bi(ze, ee),
});
const tiles =
  '<div class="stage">\n  <div class="tile">01</div>\n  <div class="tile">02</div>\n  <div class="tile">03</div>\n  <div class="tile">04</div>\n  <div class="tile">05</div>\n  <div class="tile">06</div>\n</div>';
const page =
  '<div class="stage"><header>HEADER</header><main>MAIN</main><aside>ASIDE</aside><footer>FOOTER</footer></div>';
export const chapters = [
  {
    id: "box-model",
    time: 20,
    color: "#da7852",
    html: '<div class="stage"><div class="tile">CONTENT</div></div>',
    tags: ["padding", "margin", "box-sizing"],
    title: bi("盒模型", "Box Model"),
    group: bi("布局基础", "Foundations"),
    intro: bi(
      "理解每一个元素占据的空间，从一个盒子开始。",
      "Understand the space every element occupies, starting from one box.",
    ),
    heading: bi("页面上的一切，都是盒子", "Everything on a page is a box"),
    concepts: [
      concept(
        "四层空间",
        "Four layers",
        "内容区 content 被 padding、border 和 margin 依次包围。背景延伸到边框，外边距始终透明。",
        "The content box is wrapped by padding, border, and margin. Background reaches the border; margin is always transparent.",
      ),
      concept(
        "尺寸如何计算",
        "How size is calculated",
        "content-box 总宽度 = width + 左右 padding + 左右 border；border-box 将内边距和边框纳入 width。margin 不包含在两者的 width 内。",
        "For content-box, total width = width + left/right padding + left/right border. border-box includes padding and border in width. Margin is not included in either width.",
      ),
      concept(
        "外边距折叠",
        "Margin collapsing",
        "普通块级元素上下外边距可能折叠，而不是相加。Flex 和 Grid 容器内的子项外边距不折叠。",
        "Vertical margins between block-level elements may collapse rather than add. Flex and Grid items do not collapse margins.",
      ),
    ],
    tip: bi(
      "宽度 200px、两侧 padding 20px、border 4px 时，content-box 实际宽度为 248px。",
      "With width 200px, 20px padding on both sides, and a 4px border, the actual content-box width is 248px.",
    ),
    controls: [
      range("padding", "内边距 padding", "Padding", 0, 60, 24),
      range("border", "边框 border", "Border", 0, 16, 4),
      select(
        "sizing",
        "尺寸计算",
        "Box sizing",
        ["content-box", "border-box"],
        "content-box",
      ),
    ],
    question: question(
      "width: 200px; padding: 20px; border: 4px solid; 使用 content-box 时，边框盒宽度是多少？",
      "With width: 200px, padding: 20px, and border: 4px solid, what is the border-box width under content-box?",
      ["200px", "240px", "248px", "288px"],
      ["200px", "240px", "248px", "288px"],
      2,
      "200 + 20 × 2 + 4 × 2 = 248px。margin 不计入边框盒宽度。",
      "200 + 20 × 2 + 4 × 2 = 248px. Margin is not part of the border-box width.",
    ),
  },
  {
    id: "flow",
    time: 25,
    color: "#6195bb",
    html: tiles,
    tags: ["display", "block", "inline"],
    title: bi("文档流与显示", "Normal Flow"),
    group: bi("布局基础", "Foundations"),
    intro: bi(
      "认识元素默认的排列方式，掌握 display 的变化。",
      "See how elements flow by default and how display changes them.",
    ),
    heading: bi(
      "理解浏览器的默认排列",
      "Understand the browser’s default arrangement",
    ),
    concepts: [
      concept(
        "块级与行内",
        "Block and inline",
        "块级盒在普通流中另起一行；行内盒随文本排布。行内非替换元素的 width 和 height 通常不生效。",
        "Block boxes start a new line; inline boxes flow with text. Width and height usually do not apply to non-replaced inline elements.",
      ),
      concept(
        "行内块",
        "Inline block",
        "inline-block 保持行内排列，同时接受宽高。元素之间可能存在来自 HTML 空白字符的间距。",
        "inline-block stays inline but accepts width and height. Whitespace in HTML can create gaps between elements.",
      ),
      concept(
        "隐藏与占位",
        "Hidden but present",
        "display: none 不生成布局盒；visibility: hidden 隐藏内容但保留空间。两者不要混淆。",
        "display: none removes the layout box; visibility: hidden keeps the space. Do not confuse them.",
      ),
    ],
    tip: bi(
      "切换 display，观察每个编号是否另起一行，以及宽度是否生效。",
      "Switch display and watch whether each number starts a new line and whether width takes effect.",
    ),
    controls: [
      select(
        "display",
        "显示方式",
        "Display",
        ["block", "inline-block", "inline", "none"],
        "inline-block",
      ),
      range("width", "元素宽度", "Element width", 60, 200, 100),
    ],
    question: question(
      "哪个属性让元素隐藏并且不再占据布局空间？",
      "Which property hides an element and removes it from layout?",
      [
        "opacity: 0",
        "visibility: hidden",
        "display: none",
        "color: transparent",
      ],
      [
        "opacity: 0",
        "visibility: hidden",
        "display: none",
        "color: transparent",
      ],
      2,
      "display: none 不生成布局盒；其他选项仍保留布局空间。",
      "display: none does not generate a layout box; the other values still reserve space.",
    ),
  },
  {
    id: "position",
    time: 30,
    color: "#a18aca",
    html: tiles,
    tags: ["position", "offset", "z-index"],
    title: bi("定位与层叠", "Positioning"),
    group: bi("布局基础", "Foundations"),
    intro: bi(
      "脱离默认位置，让元素出现在你希望的位置。",
      "Move elements away from their default position and control stacking.",
    ),
    heading: bi("定位，从参照系开始", "Positioning starts with a reference"),
    concepts: [
      concept(
        "相对定位",
        "Relative positioning",
        "relative 的偏移相对于元素本来的位置，原有占位保持不变。它也经常用于建立绝对定位后代的包含块。",
        "relative offsets from the element’s original position and keeps its space. It often establishes the containing block for absolute descendants.",
      ),
      concept(
        "绝对定位",
        "Absolute positioning",
        "absolute 脱离普通流，通常相对于最近的非 static 定位祖先；没有这样的祖先时，使用初始包含块。",
        "absolute leaves normal flow and usually positions against the nearest non-static ancestor; otherwise it uses the initial containing block.",
      ),
      concept(
        "层叠上下文",
        "Stacking context",
        "z-index 不是全局排名。transform、opacity 小于 1 等属性也可能建立层叠上下文，后代不能任意跨越父级的层叠顺序。",
        "z-index is not a global ranking. transform and opacity below 1 can also create stacking contexts; descendants cannot freely cross their parent’s stacking order.",
      ),
    ],
    tip: bi(
      "切换 relative 与 absolute，观察第二个元素是否补到第一个元素原来的位置。",
      "Switch relative and absolute to see whether the second element moves into the first element’s original space.",
    ),
    controls: [
      select(
        "position",
        "定位方式",
        "Position",
        ["relative", "absolute"],
        "absolute",
      ),
      range("offset", "顶部偏移 top", "Top offset", 0, 140, 32),
      range("left", "左侧偏移 left", "Left offset", 0, 180, 48),
    ],
    question: question(
      "absolute 元素通常以哪个祖先作为定位参照？",
      "Which ancestor usually becomes the reference for an absolutely positioned element?",
      [
        "最近的非 static 定位祖先",
        "总是 body",
        "最近的兄弟元素",
        "总是浏览器窗口",
      ],
      [
        "The nearest non-static positioned ancestor",
        "Always body",
        "The nearest sibling",
        "Always the browser window",
      ],
      0,
      "最近的非 static 定位祖先通常建立包含块；transform 等属性也可能建立包含块。",
      "The nearest non-static ancestor usually establishes the containing block; transform can also establish one.",
    ),
  },
  {
    id: "flex",
    time: 35,
    color: "#428e78",
    html: tiles,
    tags: ["flex-direction", "justify-content", "gap"],
    title: bi("Flex 弹性布局", "Flexbox"),
    group: bi("现代布局", "Modern Layout"),
    intro: bi(
      "沿着一条轴线，自如地排列、对齐与分配空间。",
      "Arrange, align, and distribute space along one axis.",
    ),
    heading: bi("一维布局的灵活秩序", "Flexible order in one dimension"),
    concepts: [
      concept(
        "主轴与交叉轴",
        "Main and cross axes",
        "flex-direction 定义主轴。row 的主轴为行方向，column 的主轴为列方向；交叉轴与主轴垂直。",
        "flex-direction defines the main axis. row is horizontal, column is vertical; the cross axis is perpendicular.",
      ),
      concept(
        "分配剩余空间",
        "Distribute remaining space",
        "justify-content 沿主轴分配剩余空间，align-items 沿交叉轴对齐。gap 是项目之间的固定间距。",
        "justify-content distributes space on the main axis, align-items aligns on the cross axis, and gap sets fixed spacing.",
      ),
      concept(
        "伸缩与换行",
        "Grow and wrap",
        "flex-grow 分配正剩余空间，flex-shrink 决定收缩权重。flex-wrap: wrap 允许项目换行，每一行独立分配空间。",
        "flex-grow distributes positive free space, flex-shrink controls shrinking, and flex-wrap: wrap lets items wrap independently.",
      ),
    ],
    tip: bi(
      "space-between 分配的是剩余空间；没有剩余空间时，看不出分布效果。",
      "space-between distributes leftover space; without leftover space, the effect is not visible.",
    ),
    controls: [
      select("direction", "主轴方向", "Direction", ["row", "column"], "row"),
      select(
        "justify",
        "主轴对齐",
        "Justify content",
        ["flex-start", "center", "space-between", "space-around"],
        "space-between",
      ),
      range("gap", "项目间距 gap", "Gap", 0, 40, 16),
    ],
    question: question(
      "flex-direction: column 时，justify-content 控制哪个方向？",
      "With flex-direction: column, which direction does justify-content control?",
      ["水平方向", "垂直方向", "只控制文字", "控制层叠顺序"],
      ["Horizontal", "Vertical", "Only text", "Stacking order"],
      1,
      "column 将主轴设为列方向，因此 justify-content 沿垂直主轴分配空间。",
      "column makes the main axis vertical, so justify-content distributes space vertically.",
    ),
  },
  {
    id: "grid",
    time: 40,
    color: "#7884c8",
    html: tiles,
    tags: ["grid-template", "fr", "gap"],
    title: bi("Grid 网格布局", "CSS Grid"),
    group: bi("现代布局", "Modern Layout"),
    intro: bi(
      "同时掌控行与列，构建有秩序的二维布局。",
      "Control rows and columns together in an orderly two-dimensional layout.",
    ),
    heading: bi("二维布局的坐标系", "A coordinate system for layout"),
    concepts: [
      concept(
        "轨道与网格线",
        "Tracks and lines",
        "相邻网格线之间是轨道。grid-template-columns 定义列轨道；grid-template-rows 定义行轨道。",
        "A track is the space between grid lines. grid-template-columns defines column tracks; grid-template-rows defines row tracks.",
      ),
      concept(
        "fr 分配空间",
        "The fr unit",
        "fr 表示剩余可分配空间的一份。repeat(3, 1fr) 创建三列等分轨道，gap 先从可分配宽度中扣除。",
        "fr represents one share of available space. repeat(3, 1fr) creates three equal tracks; gap is deducted first.",
      ),
      concept(
        "跨行与跨列",
        "Spanning cells",
        "grid-column: span 2 使项目跨越两列。minmax(0, 1fr) 可以避免长内容的最小尺寸挤宽轨道。",
        "grid-column: span 2 makes an item cross two columns. minmax(0, 1fr) prevents long content from forcing tracks wider.",
      ),
    ],
    tip: bi(
      "Grid 适合同时约束行列；Flex 更适合一条轴线上的内容分布。",
      "Grid suits row-and-column constraints; Flex suits distribution along one axis.",
    ),
    controls: [
      range("columns", "列数 columns", "Columns", 1, 6, 3),
      range("gap", "网格间距 gap", "Gap", 0, 48, 20),
    ],
    question: question(
      "创建三列等宽网格的正确声明是什么？",
      "Which declaration creates three equal-width grid columns?",
      [
        "columns: flex(3)",
        "grid-template-columns: repeat(3, 1fr)",
        "grid-column: 3px",
        "display: three-grid",
      ],
      [
        "columns: flex(3)",
        "grid-template-columns: repeat(3, 1fr)",
        "grid-column: 3px",
        "display: three-grid",
      ],
      1,
      "repeat(3, 1fr) 创建三个轨道，每个轨道分配一份剩余宽度。",
      "repeat(3, 1fr) creates three tracks, each receiving one share of the remaining width.",
    ),
  },
  {
    id: "responsive",
    time: 35,
    color: "#bd7694",
    html: tiles,
    tags: ["@media", "minmax", "mobile-first"],
    title: bi("响应式布局", "Responsive Design"),
    group: bi("现代布局", "Modern Layout"),
    intro: bi(
      "让同一份内容，适应手机、平板和桌面。",
      "Make one set of content adapt to phones, tablets, and desktops.",
    ),
    heading: bi(
      "布局应当适应内容与屏幕",
      "Layout should fit content and screen",
    ),
    concepts: [
      concept(
        "移动优先",
        "Mobile first",
        "先定义适合小屏的基础样式，再通过 min-width 媒体查询逐步增强。断点应由内容是否拥挤决定。",
        "Start with a small-screen base, then enhance with min-width media queries. Choose breakpoints from content, not devices.",
      ),
      concept(
        "流式尺寸",
        "Fluid sizing",
        "百分比、max-width 与弹性轨道可以自然适应容器宽度。避免对正文容器设置超出屏幕的固定宽度。",
        "Percentages, max-width, and flexible tracks adapt naturally. Avoid fixed widths larger than the viewport for main content.",
      ),
      concept(
        "断点与视口",
        "Breakpoints and viewport",
        "媒体查询依据视口而非元素宽度。这里的演示运行于 iframe，其预览宽度就是实验的视口宽度。",
        "Media queries use the viewport, not element width. In this course, the preview width is the iframe viewport.",
      ),
    ],
    tip: bi(
      "在 360px 与桌面预览之间切换，观察媒体查询改变列数。",
      "Switch between 360px and desktop preview to see columns change at the breakpoint.",
    ),
    controls: [
      range("breakpoint", "桌面断点", "Breakpoint", 400, 1000, 640),
      range("columns", "桌面列数", "Desktop columns", 2, 4, 3),
    ],
    question: question(
      "移动优先通常使用哪种媒体查询逐步增强布局？",
      "Which media query pattern usually enhances a mobile-first layout?",
      ["min-width", "max-height: 0", "orientation: hidden", "display: mobile"],
      ["min-width", "max-height: 0", "orientation: hidden", "display: mobile"],
      0,
      "小屏基础样式配合 min-width，在视口足够宽时增加列数。",
      "A small-screen base plus min-width adds columns when the viewport is wide enough.",
    ),
  },
  {
    id: "patterns",
    time: 40,
    color: "#bf9b42",
    html: page,
    tags: ["grid-area", "semantic HTML", "sidebar"],
    title: bi("常见页面结构", "Layout Patterns"),
    group: bi("综合应用", "Applied Practice"),
    intro: bi(
      "把布局知识组合为导航、内容区与侧栏。",
      "Combine layout skills into navigation, content, and sidebar structures.",
    ),
    heading: bi("从单个组件走向页面骨架", "From components to page skeletons"),
    concepts: [
      concept(
        "语义化结构",
        "Semantic structure",
        "header、nav、main、aside、footer 表达内容角色。语义结构与视觉布局独立，不要为了位置牺牲阅读顺序。",
        "header, nav, main, aside, and footer describe roles. Keep meaning independent from visual position.",
      ),
      concept(
        "命名网格区域",
        "Named grid areas",
        "grid-template-areas 用区域名称描述页面骨架。每个同名区域必须组成一个矩形。",
        "grid-template-areas describes the skeleton with named areas. Each named area must form a rectangle.",
      ),
      concept(
        "小屏重排",
        "Small-screen rearrangement",
        "桌面侧栏在小屏中可转为纵向区域。保证主内容的 DOM 顺序合理，方便键盘和辅助技术访问。",
        "A desktop sidebar can stack on small screens. Keep main content early in DOM order for keyboard and assistive technology.",
      ),
    ],
    tip: bi(
      "在同一套 HTML 上，仅改变 CSS 就能调整侧栏的位置。",
      "The same HTML can move the sidebar by changing only CSS.",
    ),
    controls: [
      select(
        "side",
        "侧栏位置",
        "Sidebar position",
        ["left", "right"],
        "right",
      ),
      range("sidebar", "侧栏宽度", "Sidebar width", 100, 260, 180),
    ],
    question: question(
      "grid-template-areas 中的同名区域必须满足什么条件？",
      "What must same-named grid areas satisfy?",
      ["可以任意分散", "必须形成矩形", "只能占一个单元格", "必须命名为 main"],
      [
        "They can be scattered",
        "They must form a rectangle",
        "They can occupy only one cell",
        "They must be named main",
      ],
      1,
      "同名区域必须连续形成矩形，否则该声明无效。",
      "Same-named areas must form a rectangle; otherwise the declaration is invalid.",
    ),
  },
  {
    id: "project",
    time: 50,
    color: "#549ca5",
    html: tiles,
    tags: ["auto-fit", "minmax", "composition"],
    title: bi("综合实战", "Applied Project"),
    group: bi("综合应用", "Applied Practice"),
    intro: bi(
      "用响应式作品集，完成从知识到实践的最后一步。",
      "Build a responsive gallery and finish with applied practice.",
    ),
    heading: bi("构建一个自适应作品画廊", "Build an adaptive gallery"),
    concepts: [
      concept(
        "自动适配列数",
        "Auto-fit columns",
        "repeat(auto-fit, minmax(...)) 根据可用空间生成轨道，空轨道折叠后剩余项目分配空间。",
        "repeat(auto-fit, minmax(...)) creates tracks from available space; empty tracks collapse.",
      ),
      concept(
        "控制最小宽度",
        "Control minimum width",
        "用 min(100%, 180px) 限制最小轨道宽度，保证窄于目标最小宽度的设备不会因此溢出。",
        "Use min(100%, 180px) to cap the minimum track width and prevent overflow on very narrow screens.",
      ),
      concept(
        "统一视觉节奏",
        "Consistent rhythm",
        "固定媒体宽高比、统一间距和对齐，比为每个项目设置独立偏移更稳定。先验证结构，再修饰外观。",
        "Consistent ratios, spacing, and alignment are more stable than item-specific offsets. Validate structure before styling.",
      ),
    ],
    tip: bi(
      "逐渐缩小预览：列数自动减少，无需为每个屏幕分别写一个断点。",
      "Shrink the preview: columns reduce automatically without a separate breakpoint for every screen.",
    ),
    controls: [
      range("minimum", "最小项目宽度", "Minimum item width", 100, 300, 180),
      range("gap", "画廊间距", "Gallery gap", 8, 40, 20),
    ],
    question: question(
      "希望网格列数随容器宽度自动变化，应该使用哪个组合？",
      "Which combination lets grid columns adapt to container width?",
      [
        "absolute + top",
        "auto-fit + minmax",
        "float + z-index",
        "visibility + opacity",
      ],
      [
        "absolute + top",
        "auto-fit + minmax",
        "float + z-index",
        "visibility + opacity",
      ],
      1,
      "auto-fit 自动计算轨道数量，minmax 为轨道指定最小和最大尺寸。",
      "auto-fit calculates track count, and minmax sets each track’s minimum and maximum size.",
    ),
  },
];
export const getChapter = (id) => chapters.find((c) => c.id === id);
export const defaults = (c) =>
  Object.fromEntries(c.controls.map((p) => [p.key, p.value]));
export function makeCss(c, input = {}) {
  const v = { ...defaults(c), ...input };
  switch (c.id) {
    case "box-model":
      return `.stage { padding: 30px; background: #f8e9d9; }
.tile { width: 200px; padding: ${v.padding}px; border: ${v.border}px solid #d4b178; box-sizing: ${v.sizing}; margin: 20px auto; background: #94c9b7; }`;
    case "flow":
      return `.tile { display: ${v.display}; width: ${v.width}px; margin: 8px; }`;
    case "position":
      return `.stage { position: relative; min-height: 300px; }
.tile { display: inline-block; width: 80px; margin: 8px; }
.tile:first-child { position: ${v.position}; top: ${v.offset}px; left: ${v.left}px; z-index: 1; background: #c3acdf; }`;
    case "flex":
      return `.stage { display: flex; flex-direction: ${v.direction}; justify-content: ${v.justify}; align-items: center; gap: ${v.gap}px; min-height: 300px; flex-wrap: wrap; }
.tile { flex: 0 0 68px; }`;
    case "grid":
      return `.stage { display: grid; grid-template-columns: repeat(${v.columns}, 1fr); gap: ${v.gap}px; }
.tile { min-width: 0; }`;
    case "responsive":
      return `.stage { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: ${v.breakpoint}px) {
  .stage { grid-template-columns: repeat(${v.columns}, minmax(0, 1fr)); }
}`;
    case "patterns":
      return `.stage { display: grid; grid-template-columns: ${v.side === "left" ? v.sidebar + "px minmax(0, 1fr)" : "minmax(0, 1fr) " + v.sidebar + "px"}; grid-template-areas: "header header" "${v.side === "left" ? "aside main" : "main aside"}" "footer footer"; gap: 16px; }
header { grid-area: header; }
main { grid-area: main; min-height: 180px; }
aside { grid-area: aside; }
footer { grid-area: footer; }
@media (max-width: 500px) { .stage { grid-template-columns: 1fr; grid-template-areas: "header" "main" "aside" "footer"; } }`;
    default:
      return `.stage { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, ${v.minimum}px), 1fr)); gap: ${v.gap}px; }
.tile { aspect-ratio: 4 / 3; display: grid; place-items: center; }`;
  }
}
export const baseCss = `* { box-sizing: border-box; } body { margin: 0; padding: 24px; font-family: system-ui, sans-serif; color: #29483f; background: #fff; } .tile,header,main,aside,footer { padding: 24px 16px; border-radius: 5px; background: #d9eee6; text-align: center; font-weight: 600; } .tile:nth-child(3n+2),aside { background: #e6e6f6; color: #5b5685; } .tile:nth-child(3n),footer { background: #f5e6d5; color: #8e6c42; } header { background: #dcecf5; }`;
export function documentFor(html, css, lang = "zh") {
  return `<!doctype html><html lang="${lang === "en" ? "en" : "zh-CN"}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'"><style>${baseCss}
${css}</style></head><body>${html}</body></html>`;
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
