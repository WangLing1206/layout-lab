const bi = (zh, en) => ({ zh, en });
export const knowledgeDetails = {
  "box-model": [
    {
      observe: bi(
        "调整 padding 和 border，观察盒子边框盒尺寸与内容区大小的变化。",
        "Adjust padding and border to compare the border-box size with the content area.",
      ),
      caution: bi(
        "margin 不参与背景区域，也不计入 width；块级元素之间还可能发生外边距折叠。",
        "Margin is outside the background and width. Vertical margins between block-level elements can also collapse.",
      ),
    },
    {
      observe: bi(
        "切换 content-box 与 border-box，输入宽度不变时内容区会自动缩小。",
        "Switch between content-box and border-box: the content area shrinks while the declared width stays the same.",
      ),
      caution: bi(
        "width 从不包含 margin。border-box 只是把 padding 和 border 纳入已声明的 width。",
        "Width never includes margin. border-box only absorbs padding and border into the declared width.",
      ),
    },
    {
      observe: bi(
        "保持 width 与 padding 不变，只改变 box-sizing，比较最终边框盒宽度。",
        "Keep width and padding fixed, then change only box-sizing to compare the final border-box width.",
      ),
      caution: bi(
        "不同盒模型会影响百分比宽度、flex-basis 和布局计算，项目中应统一策略。",
        "Different box-sizing models affect percentage widths, flex-basis, and layout calculations. Keep one project-wide policy.",
      ),
    },
  ],
  flow: [
    {
      observe: bi(
        "切换 block、inline 和 inline-block，观察元素是否换行以及 width 是否生效。",
        "Switch block, inline, and inline-block to see line breaks and whether width takes effect.",
      ),
      caution: bi(
        "非替换行内元素的 width、height 通常不生效；垂直 padding 也可能与相邻行重叠。",
        "Width and height usually do not apply to non-replaced inline elements, and vertical padding may overlap adjacent lines.",
      ),
    },
    {
      observe: bi(
        "使用 inline-block 并改变 width，元素会保持在行内并接受尺寸。",
        "With inline-block and a changed width, elements stay inline while accepting dimensions.",
      ),
      caution: bi(
        "HTML 源码中的空白字符可能在行内块之间产生额外间隙。",
        "Whitespace in the HTML source can create extra gaps between inline-block elements.",
      ),
    },
    {
      observe: bi(
        "选择 display: none，元素会从预览中消失，后续元素立即补位。",
        "Select display: none and the element disappears while following elements move into place.",
      ),
      caution: bi(
        "display: none 会移除布局盒和无障碍树；visibility: hidden 仍保留空间。",
        "display: none removes the layout box and accessibility tree, while visibility: hidden keeps the space.",
      ),
    },
  ],
  position: [
    {
      observe: bi(
        "切换 relative，元素偏移，但原来的占位仍然存在。",
        "Switch to relative: the element shifts while its original space remains reserved.",
      ),
      caution: bi(
        "relative 的定位属性相对元素自身位置计算，不会让元素脱离普通流。",
        "Relative offsets are computed from the element’s own position and do not remove it from normal flow.",
      ),
    },
    {
      observe: bi(
        "切换 absolute，元素脱离普通流，后续元素补到原来的位置。",
        "Switch to absolute: the element leaves normal flow and following elements fill its old space.",
      ),
      caution: bi(
        "absolute 通常相对最近的非 static 定位祖先；找不到时才回到初始包含块。",
        "absolute uses the nearest non-static positioned ancestor, or the initial containing block when none exists.",
      ),
    },
    {
      observe: bi(
        "调整 top 和 left，观察元素相对 .stage 移动，而不是相对自身移动。",
        "Adjust top and left to see the element move relative to .stage rather than itself.",
      ),
      caution: bi(
        "top、left、right、bottom 只对定位元素生效，百分比值相对包含块解析。",
        "Top, left, right, and bottom apply only to positioned elements; percentages resolve against the containing block.",
      ),
    },
  ],
  flex: [
    {
      observe: bi(
        "切换 row 与 column，主轴从水平变为垂直。",
        "Switch row and column to move the main axis from horizontal to vertical.",
      ),
      caution: bi(
        "主轴改变后，justify-content 和 align-items 的作用方向也会随之交换。",
        "When the main axis changes, the directions controlled by justify-content and align-items swap as well.",
      ),
    },
    {
      observe: bi(
        "切换 justify-content 的四个值，空间分布只在存在剩余空间时明显变化。",
        "Switch the four justify-content values; distribution becomes visible only when free space exists.",
      ),
      caution: bi(
        "容器已经被项目占满时，space-between 和 space-around 几乎看不出差别。",
        "When the container is already full, space-between and space-around look nearly identical.",
      ),
    },
    {
      observe: bi(
        "改变 gap 并观察项目之间的固定间距，换行后每一行独立排列。",
        "Change gap to see fixed spacing between items; each wrapped line then distributes space independently.",
      ),
      caution: bi(
        "Flex 项目的 min-width: auto 可能阻止收缩，必要时使用 min-width: 0。",
        "A Flex item’s min-width: auto can prevent shrinking; use min-width: 0 when needed.",
      ),
    },
  ],
  grid: [
    {
      observe: bi(
        "调整 columns 和 gap，网格线和轨道数量实时改变。",
        "Adjust columns and gap to change grid lines and tracks in real time.",
      ),
      caution: bi(
        "gap 是轨道之间的间距，不是一条轨道，也不会被 fr 分配。",
        "Gap is space between tracks, not a track itself, and it is not distributed by fr.",
      ),
    },
    {
      observe: bi(
        "改变列数，观察 repeat() 与 1fr 如何创建等宽轨道。",
        "Change the column count to see how repeat() and 1fr create equal tracks.",
      ),
      caution: bi(
        "1fr 的最小值默认受内容影响；minmax(0, 1fr) 可以避免长内容撑宽轨道。",
        "The minimum size of 1fr is affected by content; minmax(0, 1fr) prevents long content from expanding tracks.",
      ),
    },
    {
      observe: bi(
        "在代码中尝试 grid-column: span 2，对比跨列与普通网格项。",
        "Try grid-column: span 2 in the editor and compare a spanning item with a normal grid item.",
      ),
      caution: bi(
        "跨列只影响网格项，不会自动让轨道等宽，也不会取代 gap。",
        "Spanning changes only the item, not track sizing, and does not replace gap.",
      ),
    },
  ],
  responsive: [
    {
      observe: bi(
        "使用 360px、768px 和完整宽度预览，观察断点前后列数变化。",
        "Preview at 360px, 768px, and full width to see columns change around the breakpoint.",
      ),
      caution: bi(
        "断点不应照搬设备尺寸，应以内容何时开始拥挤为依据。",
        "Do not copy device widths as breakpoints; choose them when the content starts to feel crowded.",
      ),
    },
    {
      observe: bi(
        "切换预览宽度，百分比和弹性轨道会随可用空间变化。",
        "Switch preview widths to watch percentages and flexible tracks respond to available space.",
      ),
      caution: bi(
        "固定宽度和 100vw 容易在小屏或出现滚动条时造成横向溢出。",
        "Fixed widths and 100vw can overflow on small screens or when scrollbars appear.",
      ),
    },
    {
      observe: bi(
        "改变桌面断点，媒体查询会在 iframe 视口达到阈值时生效。",
        "Change the desktop breakpoint and the media query activates when the iframe viewport reaches it.",
      ),
      caution: bi(
        "媒体查询判断的是视口，不是元素自身宽度；组件级适配应考虑容器查询。",
        "Media queries measure the viewport, not an element. Use container queries for component-level adaptation.",
      ),
    },
  ],
  patterns: [
    {
      observe: bi(
        "观察 header、main、aside、footer 的职责和它们形成的页面骨架。",
        "Observe the roles of header, main, aside, and footer and the page skeleton they form.",
      ),
      caution: bi(
        "视觉顺序与 DOM 顺序不必相同，但阅读和键盘顺序不应被破坏。",
        "Visual order may differ from DOM order, but reading and keyboard order should remain logical.",
      ),
    },
    {
      observe: bi(
        "切换侧栏位置，同一套 HTML 只通过 CSS 改变网页骨架。",
        "Switch the sidebar position: the same HTML changes its skeleton through CSS alone.",
      ),
      caution: bi(
        "grid-template-areas 中同名区域必须形成矩形，否则整条声明会失效。",
        "Same-named grid-template-areas must form a rectangle, or the declaration becomes invalid.",
      ),
    },
    {
      observe: bi(
        "缩小预览宽度，侧栏会移动到主内容下方。",
        "Shrink the preview and the sidebar moves below the main content.",
      ),
      caution: bi(
        "小屏重排时不要把关键内容埋在 DOM 末尾，否则键盘用户会经过很多无关内容。",
        "Do not place critical content at the end of the DOM during a small-screen reorder; keyboard users would have to pass unrelated content.",
      ),
    },
  ],
  project: [
    {
      observe: bi(
        "改变最小项目宽度，列数会随可用空间自动变化。",
        "Change the minimum item width and the column count adapts to available space.",
      ),
      caution: bi(
        "auto-fit 会折叠空轨道，auto-fill 会保留空轨道，两者在项目较少时表现不同。",
        "auto-fit collapses empty tracks, while auto-fill keeps them; they differ when there are few items.",
      ),
    },
    {
      observe: bi(
        "调整 min(100%, 180px)，观察极窄视口下轨道如何避免溢出。",
        "Adjust min(100%, 180px) to see how tracks avoid overflow in very narrow viewports.",
      ),
      caution: bi(
        "minmax(100%, 180px) 的最小值大于最大值无效；应使用 min(100%, 180px)。",
        "minmax(100%, 180px) is invalid because the minimum exceeds the maximum; use min(100%, 180px).",
      ),
    },
    {
      observe: bi(
        "改变 gap 和卡片比例，画廊会在不同列数下保持统一节奏。",
        "Change gap and card proportions to keep the gallery rhythm consistent across column counts.",
      ),
      caution: bi(
        "只追求列数变化还不够，卡片比例、对齐和间距共同决定视觉秩序。",
        "Changing column counts alone is not enough; ratios, alignment, and spacing together create visual order.",
      ),
    },
  ],
};
export function getKnowledgeDetail(chapterId, index) {
  return knowledgeDetails[chapterId]?.[index];
}
