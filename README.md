# Lanka Fresh Mart - Web Sales Dashboard

**Module:** ITM 12022 - Business Applications  
 
**Student Name:** Pasindu Madushan
**Index Number:** MGT/8698

---

## 1. Project Overview
This project is a responsive front-end prototype created for **Lanka Fresh Mart**, a retail store chain operating in Colombo, Kandy, and Galle [cite: 1]. The dashboard provides executive management with key performance indicators (KPIs) and visual data trends regarding monthly revenue and quarterly branch revenue [cite: 1, 2].

---

## 2. Layout & Styling Technical Details

### Use of CSS Grid
- **KPI Summary Cards (`.kpi-grid`):** Configured using CSS Grid with `grid-template-columns: repeat(4, 1fr)` on desktop screens to display four KPI metrics evenly [cite: 3].
- **Charts Section (`.charts-grid`):** Configured with CSS Grid (`grid-template-columns: repeat(2, 1fr)`) to place the line chart and column chart side by side on desktop layouts [cite: 3].
- **Responsive Grid Breakpoints:** 
  - **Desktop (>1024px):** 4 columns for KPIs, 2 columns for charts [cite: 3].
  - **Tablet (769px - 1024px):** 2 columns for KPIs (`repeat(2, 1fr)`), 1 column for stacked charts [cite: 3].
  - **Mobile (<=768px):** 1 column for KPIs (`1fr`), 1 column for stacked charts [cite: 3].

### Use of Flexbox
- **Navigation Bar (`.navbar`):** Arranged using `display: flex`, `justify-content: space-between`, and `align-items: center` to position the brand logo, navigation links, and user avatar [cite: 3].
- **KPI Cards (`.kpi-card`):** Structured internally with Flexbox (`display: flex`, `align-items: center`) to align the circular icon alongside the metric titles and calculated figures [cite: 3].
- **Dashboard Header & Theme Button:** Aligned using Flexbox for spacing and responsive wrapping [cite: 3].

---

## 3. JavaScript Functionality & Data Calculation
- **Data Integration:** Raw sales figures (Monthly Revenue, Units Sold, and Branch Q2 Revenue) are stored as array objects in `script.js` [cite: 1, 2, 4].
- **Dynamic KPI Calculation:** Card metrics (`Total Revenue`, `Total Units Sold`, `Best Month`, `Best Branch`) are dynamically computed using JavaScript array methods (`reduce`) and injected into the DOM via `innerText` [cite: 4].
- **Interactive Navigation:** JavaScript controls the mobile hamburger button by toggling the `.active` class on `.nav-links` [cite: 3].
- **Chart Visualizations:** Built using Chart.js via CDN. Both line and column charts feature fully configured axes, legend titles, custom hover tooltips, and responsive resizing [cite: 2, 4].

---

## 4. Optional Extensions Implemented
- **Dark / Light Mode Toggle:** Smooth background and text color transitions using CSS custom variables (`:root` / `[data-theme="dark"]`) and automated Chart.js axis/grid color updates [cite: 5].
- **Smooth Navigation Menu Animation:** CSS `@keyframes` slide-in effect for the mobile dropdown navigation [cite: 5].

---

## 5. References & Documentation
- MDN Web Docs (CSS Grid & Flexbox Guide): https://developer.mozilla.org/ [cite: 6]
- Chart.js Documentation: https://www.chartjs.org/docs/latest/ [cite: 4]
- Font Awesome Icons: https://fontawesome.com/ [cite: 5]
