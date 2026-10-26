/**
 * ITM 12022 - Individual Practical Assignment
 * Lanka Fresh Mart - Web Dashboard Prototype
 * JavaScript Source Code
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Part C - 1: Data Storage (Scenario Data)
    // ----------------------------------------------------------------------
    const monthlySalesData = [
        { month: 'Jan', revenue: 1250, units: 3400 },
        { month: 'Feb', revenue: 1180, units: 3150 },
        { month: 'Mar', revenue: 1420, units: 3900 },
        { month: 'Apr', revenue: 1610, units: 4300 },
        { month: 'May', revenue: 1550, units: 4050 },
        { month: 'Jun', revenue: 1780, units: 4700 }
    ];

    const branchQ2Data = [
        { branch: 'Colombo', revenue: 2450 },
        { branch: 'Kandy', revenue: 1320 },
        { branch: 'Galle', revenue: 1170 }
    ];

    // Chart instances references
    let lineChartInstance = null;
    let barChartInstance = null;

    // ----------------------------------------------------------------------
    // Part A - 4: Hamburger Menu Toggle Functionality
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburgerBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile navigation when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ----------------------------------------------------------------------
    // Part C - 5: Calculate & Update KPI Values Dynamically
    // ----------------------------------------------------------------------
    function calculateAndRenderKPIs() {
        // 1. Total Revenue (Jan - Jun)
        const totalRevenue = monthlySalesData.reduce((acc, curr) => acc + curr.revenue, 0);

        // 2. Total Units Sold (Jan - Jun)
        const totalUnits = monthlySalesData.reduce((acc, curr) => acc + curr.units, 0);

        // 3. Best Month (Highest Revenue)
        const bestMonthObj = monthlySalesData.reduce((max, curr) => curr.revenue > max.revenue ? curr : max, monthlySalesData[0]);

        // 4. Best Branch (Highest Q2 Revenue)
        const bestBranchObj = branchQ2Data.reduce((max, curr) => curr.revenue > max.revenue ? curr : max, branchQ2Data[0]);

        // Update DOM elements dynamically
        document.getElementById('kpi-total-revenue').innerText = `LKR ${totalRevenue.toLocaleString()}`;
        document.getElementById('kpi-total-units').innerText = totalUnits.toLocaleString();

        document.getElementById('kpi-best-month').innerText = bestMonthObj.month;
        document.getElementById('kpi-best-month-rev').innerText = `LKR ${bestMonthObj.revenue.toLocaleString()} ('000)`;

        document.getElementById('kpi-best-branch').innerText = bestBranchObj.branch;
        document.getElementById('kpi-best-branch-rev').innerText = `LKR ${bestBranchObj.revenue.toLocaleString()} ('000)`;
    }

    // ----------------------------------------------------------------------
    // Part C - 2, 3, 4: Render Charts with Chart.js CDN
    // ----------------------------------------------------------------------
    function getChartColors() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        return {
            textColor: isDark ? '#94a3b8' : '#64748b',
            gridColor: isDark ? '#334155' : '#e2e8f0',
            primaryColor: '#0d9488',
            primaryBg: isDark ? 'rgba(13, 148, 136, 0.25)' : 'rgba(13, 148, 136, 0.15)',
            secondaryColor: '#3b82f6'
        };
    }

    function initCharts() {
        const colors = getChartColors();

        // Line Chart: Monthly Revenue
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        lineChartInstance = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: monthlySalesData.map(item => item.month),
                datasets: [{
                    label: "Monthly Revenue (LKR '000)",
                    data: monthlySalesData.map(item => item.revenue),
                    borderColor: colors.primaryColor,
                    backgroundColor: colors.primaryBg,
                    fill: true,
                    tension: 0.35,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: colors.primaryColor
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Lanka Fresh Mart - Monthly Revenue Trend (Jan - Jun 2026)',
                        color: colors.textColor,
                        font: { size: 14, weight: '600' }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` Revenue: LKR ${context.parsed.y.toLocaleString()} ('000)`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Month', color: colors.textColor },
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.textColor }
                    },
                    y: {
                        title: { display: true, text: "Revenue (LKR '000)", color: colors.textColor },
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.textColor },
                        beginAtZero: false
                    }
                }
            }
        });

        // Bar/Column Chart: Q2 Revenue by Branch
        const barCtx = document.getElementById('barChart').getContext('2d');
        barChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: branchQ2Data.map(item => item.branch),
                datasets: [{
                    label: "Q2 Revenue (LKR '000)",
                    data: branchQ2Data.map(item => item.revenue),
                    backgroundColor: [
                        'rgba(13, 148, 136, 0.85)',
                        'rgba(59, 130, 246, 0.85)',
                        'rgba(245, 158, 11, 0.85)'
                    ],
                    borderColor: [
                        '#0d9488',
                        '#3b82f6',
                        '#f59e0b'
                    ],
                    borderWidth: 1.5,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Q2 Regional Revenue Comparison by Branch',
                        color: colors.textColor,
                        font: { size: 14, weight: '600' }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` Q2 Revenue: LKR ${context.parsed.y.toLocaleString()} ('000)`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Branch Location', color: colors.textColor },
                        grid: { display: false },
                        ticks: { color: colors.textColor }
                    },
                    y: {
                        title: { display: true, text: "Q2 Revenue (LKR '000)", color: colors.textColor },
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.textColor },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // ----------------------------------------------------------------------
    // Optional Extension: Dark/Light Mode Toggle
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeText = document.getElementById('theme-text');
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeText.innerText = 'Dark Mode';
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeText.innerText = 'Light Mode';
            themeIcon.className = 'fa-solid fa-sun';
        }

        // Re-render chart styling for theme transition
        if (lineChartInstance && barChartInstance) {
            const colors = getChartColors();
            [lineChartInstance, barChartInstance].forEach(chart => {
                chart.options.plugins.title.color = colors.textColor;
                chart.options.scales.x.ticks.color = colors.textColor;
                chart.options.scales.x.title.color = colors.textColor;
                chart.options.scales.y.ticks.color = colors.textColor;
                chart.options.scales.y.title.color = colors.textColor;
                if (chart.options.scales.x.grid) chart.options.scales.x.grid.color = colors.gridColor;
                if (chart.options.scales.y.grid) chart.options.scales.y.grid.color = colors.gridColor;
                chart.update();
            });
        }
    });

    // Initialize logic
    calculateAndRenderKPIs();
    initCharts();
});
