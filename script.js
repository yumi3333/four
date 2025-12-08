// 全局变量
let currentChart = null;
let currentDataset = 'books';
let currentChartType = 'bar';
let chartData = {};

// 主题配置 - 白天模式和黑夜模式
const themes = {
    'light': {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#f3f4f6',
        text: '#111827',
        background: '#ffffff',
        border: '#e5e7eb',
        cardBg: '#ffffff',
        hoverBg: '#f9fafb'
    },
    'dark': {
        primary: '#60a5fa',
        secondary: '#9ca3af',
        accent: '#374151',
        text: '#f9fafb',
        background: '#111827',
        border: '#374151',
        cardBg: '#1f2937',
        hoverBg: '#374151'
    }
};

// 配色方案 - 采用不同流行色系
const colorSchemes = {
    'default': [
        'rgba(24, 183, 246, 0.7)',      // 梦想蓝
        'rgba(102, 107, 206, 0.7)',     // 幻海紫
        'rgba(255, 214, 79, 0.7)',      // 明黄色
        'rgba(255, 105, 180, 0.7)',     // 玫瑰粉
        'rgba(74, 222, 128, 0.7)',      // 薄荷绿
        'rgba(248, 113, 113, 0.7)'      // 珊瑚红
    ],
    'morandi': [
        'rgba(188, 170, 146, 0.7)',     // 雾霾棕
        'rgba(162, 146, 126, 0.7)',     // 灰褐色
        'rgba(209, 190, 168, 0.7)',     // 米棕色
        'rgba(150, 162, 159, 0.7)',     // 灰绿色
        'rgba(183, 194, 191, 0.7)',     // 薰衣草灰
        'rgba(171, 179, 186, 0.7)'      // 蓝灰色
    ],
    'glacier': [
        'rgba(176, 224, 230, 0.7)',     // 粉蓝色
        'rgba(135, 206, 235, 0.7)',     // 天蓝色
        'rgba(173, 216, 230, 0.7)',     // 浅蓝色
        'rgba(224, 255, 255, 0.7)',     // 雪青色
        'rgba(175, 238, 238, 0.7)',     // 淡青色
        'rgba(240, 248, 255, 0.7)'      // 爱丽丝蓝
    ],
    'sunset': [
        'rgba(255, 94, 77, 0.7)',       // 珊瑚橙
        'rgba(255, 154, 0, 0.7)',       // 深橙色
        'rgba(255, 206, 84, 0.7)',      // 金黄色
        'rgba(255, 127, 80, 0.7)',      // 鲑鱼粉
        'rgba(255, 159, 64, 0.7)',      // 杏橙色
        'rgba(255, 195, 113, 0.7)'      // 浅鲑鱼色
    ],
    'forest': [
        'rgba(46, 125, 50, 0.7)',        // 森林绿
        'rgba(76, 175, 80, 0.7)',       // 翠绿色
        'rgba(129, 199, 132, 0.7)',     // 浅绿色
        'rgba(104, 159, 56, 0.7)',      // 橄榄绿
        'rgba(85, 139, 47, 0.7)',       // 暗橄榄绿
        'rgba(56, 142, 60, 0.7)'        // 青绿色
    ],
    'lavender': [
        'rgba(206, 162, 224, 0.7)',     // 薰衣草紫
        'rgba(186, 146, 162, 0.7)',     // 梅花紫
        'rgba(221, 160, 221, 0.7)',     // 梅红色
        'rgba(238, 130, 238, 0.7)',     // 紫罗兰
        'rgba(218, 112, 214, 0.7)',     // 兰花紫
        'rgba(221, 192, 242, 0.7)'      // 淡紫色
    ]
};

// 示例数据集
const datasets = {
    books: {
        title: '图书采购分析',
        description: '展示不同地区在各类图书采购中的对比情况，帮助分析采购偏好和市场趋势。',
        labels: ['家庭', '小说', '心理', '科技', '儿童', '教育'],
        datasets: [
            { label: '地区1', data: [1200, 2400, 1800, 2200, 1600, 2000] },
            { label: '地区2', data: [1050, 2100, 1300, 1600, 1340, 1800] }
        ]
    },
    exchange: {
        title: '汇率走势分析',
        description: '展示不同时间点的汇率变化情况，帮助分析汇率波动趋势和市场动态。',
        labels: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
        datasets: [
            { label: '2017年7月', data: [6.85, 6.82, 6.79, 6.81, 6.83, 6.80, 6.78] },
            { label: '2019年7月', data: [6.92, 6.89, 6.91, 6.93, 6.90, 6.88, 6.85] }
        ]
    },
    sales: {
        title: '销售数据分析',
        description: '展示月度销售额的变化趋势，帮助了解销售业绩和增长情况。',
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
            { label: '销售额(万元)', data: [85, 92, 78, 105, 120, 95] }
        ]
    },
    users: {
        title: '用户分布统计',
        description: '展示不同地区用户分布情况，帮助了解用户地理分布特征。',
        labels: ['华北', '华东', '华南', '西南', '西北', '东北'],
        datasets: [
            { label: '用户数', data: [25, 30, 20, 12, 8, 5] }
        ]
    }
};

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 初始化主题
    initializeTheme();
    
    // 初始化数据
    initializeData();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 加载初始数据
    loadDataset('books');
    
    // 初始化图表
    initializeChart();
}

// 初始化主题
function initializeTheme() {
    const savedTheme = localStorage.getItem('dataVizTheme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeButtons(savedTheme);
}

// 更新主题按钮状态
function updateThemeButtons(activeTheme) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === activeTheme);
    });
}

// 初始化数据
function initializeData() {
    // 深拷贝数据集以避免修改原始数据
    Object.keys(datasets).forEach(key => {
        chartData[key] = JSON.parse(JSON.stringify(datasets[key]));
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 主题切换
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTheme(this.dataset.theme);
        });
    });

    // 数据集切换
    document.querySelectorAll('.dataset-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchDataset(this.dataset.dataset);
        });
    });

    // 图表类型切换
    document.getElementById('chart-type').addEventListener('change', function() {
        switchChartType(this.value);
    });

    // 配色方案切换
    document.getElementById('color-scheme').addEventListener('change', function() {
        updateChart();
    });

    // 动画速度切换
    document.getElementById('animation-speed').addEventListener('change', function() {
        updateChart();
    });

    // 显示选项切换
    document.getElementById('show-legend').addEventListener('change', function() {
        updateChart();
    });

    document.getElementById('show-grid').addEventListener('change', function() {
        updateChart();
    });

    document.getElementById('show-datalabels').addEventListener('change', function() {
        updateChart();
    });

    // 操作按钮
    document.getElementById('edit-data-btn').addEventListener('click', showEditModal);
    document.getElementById('download-chart').addEventListener('click', downloadChart);
    document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);



    // 模态框控制
    document.getElementById('close-modal').addEventListener('click', hideEditModal);
    document.getElementById('cancel-edit').addEventListener('click', hideEditModal);
    document.getElementById('save-changes').addEventListener('click', saveDataChanges);

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideEditModal();
        }
    });
}

// 切换主题
function switchTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('dataVizTheme', theme);
    updateThemeButtons(theme);
    
    // 更新图表颜色
    updateChart();
    
    // 添加主题切换动画
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = 'themeChange 0.5s ease';
    }, 10);
}

// 切换数据集
function switchDataset(datasetName) {
    currentDataset = datasetName;
    
    // 更新标签状态
    document.querySelectorAll('.dataset-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.dataset === datasetName);
    });
    
    // 加载数据
    loadDataset(datasetName);
    
    // 更新图表
    updateChart();
}

// 加载数据集
function loadDataset(datasetName) {
    const data = chartData[datasetName];
    
    // 更新标题和描述
    document.getElementById('current-chart-title').textContent = data.title;
    document.getElementById('current-chart-description').textContent = data.description;
    
    // 更新数据表格
    updateDataTable(data);
    
    // 更新统计信息
    updateStatistics(data);
}

// 更新数据表格
function updateDataTable(data) {
    const tableContainer = document.getElementById('data-table');
    const labels = data.labels;
    const datasets = data.datasets;
    
    // 创建表格
    let tableHTML = '<table class="data-table"><thead><tr><th>类别</th>';
    datasets.forEach((dataset, index) => {
        tableHTML += `<th>${dataset.label}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    
    // 添加数据行
    labels.forEach((label, rowIndex) => {
        tableHTML += `<tr><td><strong>${label}</strong></td>`;
        datasets.forEach((dataset) => {
            tableHTML += `<td>${dataset.data[rowIndex]}</td>`;
        });
        tableHTML += '</tr>';
    });
    
    // 添加总计行
    tableHTML += '<tr class="total-row"><td><strong>总计</strong></td>';
    datasets.forEach((dataset) => {
        const total = dataset.data.reduce((sum, val) => sum + val, 0);
        tableHTML += `<td><strong>${total}</strong></td>`;
    });
    tableHTML += '</tr></tbody></table>';
    
    tableContainer.innerHTML = tableHTML;
}

// 更新统计信息
function updateStatistics(data) {
    let allData = [];
    data.datasets.forEach(dataset => {
        allData = allData.concat(dataset.data);
    });
    
    const total = allData.reduce((sum, val) => sum + val, 0);
    const average = (total / allData.length).toFixed(1);
    const max = Math.max(...allData);
    const min = Math.min(...allData);
    
    document.getElementById('total-stat').textContent = total.toLocaleString();
    document.getElementById('average-stat').textContent = average;
    document.getElementById('max-stat').textContent = max.toLocaleString();
    document.getElementById('min-stat').textContent = min.toLocaleString();
}

// 切换图表类型
function switchChartType(type) {
    currentChartType = type;
    
    // 更新图表
    updateChart();
}

// 初始化图表
function initializeChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    // 注册数据标签插件
    Chart.register(ChartDataLabels);
    
    currentChart = new Chart(ctx, {
        type: currentChartType,
        data: getChartData(),
        options: getChartOptions()
    });
}

// 获取数据标签配置
function getDataLabelsConfig(chartType) {
    const showLabels = document.getElementById('show-datalabels').checked;
    
    if (!showLabels) {
        return { display: false };
    }
    
    switch (chartType) {
        case 'bar':
            return {
                display: true,
                anchor: 'end',
                align: 'top',
                offset: 8,
                color: '#333',
                font: {
                    weight: 'bold',
                    size: 11
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1,
                borderRadius: 4,
                padding: 4,
                formatter: (value) => value.toLocaleString()
            };
            
        case 'line':
            return {
                display: true,
                anchor: 'center',
                align: 'top',
                offset: -8,
                color: '#333',
                font: {
                    weight: '600',
                    size: 10
                },
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
                borderRadius: 3,
                padding: 3,
                formatter: (value) => value.toLocaleString()
            };
            
        case 'pie':
        case 'doughnut':
            return {
                display: true,
                anchor: 'center',
                align: 'center',
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: (value, ctx) => {
                    const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / sum) * 100).toFixed(1);
                    return `${value}\n${percentage}%`;
                },
                textAlign: 'center'
            };
            
        case 'radar':
            return {
                display: true,
                anchor: 'end',
                align: 'center',
                offset: 4,
                color: '#333',
                font: {
                    weight: '600',
                    size: 10
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1,
                borderRadius: 3,
                padding: 3
            };
            
        default:
            return {
                display: true,
                color: '#333',
                font: {
                    weight: 'bold',
                    size: 11
                },
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 4,
                padding: 4
            };
    }
}

// 获取图表数据
function getChartData() {
    const data = chartData[currentDataset];
    const colorScheme = document.getElementById('color-scheme').value;
    const colors = colorSchemes[colorScheme];
    
    // 获取透明色对应的实色用于边框
    const solidColors = {
        'default': ['#18B7F6', '#666BCE', '#FFD64F', '#ff69b4', '#4ade80', '#f87171'],
        'morandi': ['#BCAA92', '#A2927E', '#D1BEA8', '#96A29F', '#B7C2BF', '#ABB3BA'],
        'glacier': ['#B0E0E6', '#87CEEB', '#ADD8E6', '#E0FFFF', '#AFEEEE', '#F0F8FF'],
        'sunset': ['#FF5E4D', '#FF9A00', '#FFCE54', '#FF7F50', '#FF9F40', '#FFC371'],
        'forest': ['#2E7D32', '#4CAF50', '#81C784', '#689F38', '#558B2F', '#388E3C'],
        'lavender': ['#CEA2E0', '#BA92A2', '#DDA0DD', '#EE82EE', '#DA70D6', '#DDC0F2']
    };
    
    const borderColors = solidColors[colorScheme];
    
    return {
        labels: data.labels,
        datasets: data.datasets.map((dataset, datasetIndex) => {
            // 对于饼图和环形图，为每个数据点分配不同颜色
            if (currentChartType === 'pie' || currentChartType === 'doughnut') {
                return {
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: dataset.data.map((_, index) => colors[index % colors.length]),
                    borderColor: dataset.data.map((_, index) => borderColors[index % borderColors.length]),
                    borderWidth: 2,
                    fill: false,
                    tension: 0,
                    datalabels: getDataLabelsConfig(currentChartType)
                };
            } else {
                // 其他图表类型使用原有逻辑
                return {
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: colors[datasetIndex % colors.length],
                    borderColor: borderColors[datasetIndex % borderColors.length],
                    borderWidth: 2,
                    fill: currentChartType === 'line' ? false : true,
                    tension: currentChartType === 'line' ? 0.4 : 0,
                    datalabels: getDataLabelsConfig(currentChartType)
                };
            }
        })
    };
}

// 获取图表选项
function getChartOptions() {
    const theme = getCurrentTheme();
    const animationSpeed = parseInt(document.getElementById('animation-speed').value);
    const showLegend = document.getElementById('show-legend').checked;
    const showGrid = document.getElementById('show-grid').checked;
    
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: animationSpeed,
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: {
                display: showLegend,
                labels: {
                    color: theme.text,
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: theme.primary,
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += context.parsed.y;
                        
                        // 添加百分比（适用于饼图和环形图）
                        if (currentChartType === 'pie' || currentChartType === 'doughnut') {
                            const dataset = context.dataset;
                            const total = dataset.data.reduce((sum, val) => sum + val, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            label += ` (${percentage}%)`;
                        }
                        
                        return label;
                    }
                }
            },
            datalabels: {
                display: document.getElementById('show-datalabels').checked
            }
        },
        scales: (currentChartType === 'pie' || currentChartType === 'doughnut' || currentChartType === 'radar') ? {} : {
            x: {
                grid: {
                    display: showGrid,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: theme.text,
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: showGrid,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: theme.text,
                    font: {
                        size: 11
                    }
                }
            }
        }
    };
}

// 更新图表
function updateChart() {
    if (!currentChart) {
        initializeChart();
        return;
    }
    
    // 更新数据
    currentChart.data = getChartData();
    currentChart.options = getChartOptions();
    
    // 销毁并重新创建图表（如果类型改变）
    if (currentChart.config.type !== currentChartType) {
        currentChart.destroy();
        initializeChart();
    } else {
        currentChart.update('active');
    }
}

// 获取当前主题
function getCurrentTheme() {
    const themeName = document.body.getAttribute('data-theme') || 'star-blue';
    return themes[themeName];
}

// 显示编辑模态框
function showEditModal() {
    const modal = document.getElementById('data-edit-modal');
    const data = chartData[currentDataset];
    
    // 生成编辑表单
    let formHTML = '<div class="edit-form">';
    
    data.datasets.forEach((dataset, datasetIndex) => {
        formHTML += `<h4>${dataset.label}</h4><div class="data-edit-grid">`;
        
        data.labels.forEach((label, index) => {
            formHTML += `
                <div class="edit-item">
                    <label>${label}:</label>
                    <input type="number" 
                           class="data-input" 
                           data-dataset="${datasetIndex}" 
                           data-index="${index}" 
                           value="${dataset.data[index]}"
                           step="0.01">
                </div>
            `;
        });
        
        formHTML += '</div>';
    });
    
    formHTML += '</div>';
    document.getElementById('data-edit-form').innerHTML = formHTML;
    
    modal.classList.add('active');
}

// 隐藏编辑模态框
function hideEditModal() {
    document.getElementById('data-edit-modal').classList.remove('active');
}

// 保存数据更改
function saveDataChanges() {
    const inputs = document.querySelectorAll('.data-input');
    
    inputs.forEach(input => {
        const datasetIndex = parseInt(input.dataset.dataset);
        const dataIndex = parseInt(input.dataset.index);
        const value = parseFloat(input.value) || 0;
        
        chartData[currentDataset].datasets[datasetIndex].data[dataIndex] = value;
    });
    
    // 更新显示
    loadDataset(currentDataset);
    updateChart();
    
    hideEditModal();
}





// 下载图表
function downloadChart() {
    const canvas = document.getElementById('mainChart');
    const url = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = `chart_${currentDataset}_${Date.now()}.png`;
    link.href = url;
    link.click();
}

// 全屏显示
function toggleFullscreen() {
    const chartContainer = document.querySelector('.chart-container');
    
    if (!document.fullscreenElement) {
        chartContainer.requestFullscreen().catch(err => {
            console.error('无法进入全屏模式:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// 添加主题切换动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes themeChange {
        0% { opacity: 0.8; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    .edit-form {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .data-edit-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .edit-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .edit-item label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #666;
    }
    
    .data-input {
        padding: 8px;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        font-size: 0.9rem;
        transition: border-color 0.3s ease;
    }
    
    .data-input:focus {
        outline: none;
        border-color: #18B7F6;
    }
    
    .total-row {
        background: #f8f9fa;
        font-weight: 600;
    }
    
    .chart-container.fullscreen {
        background: white;
        padding: 40px;
    }
`;
document.head.appendChild(style);

// 导出功能供其他模块使用
window.DataVizApp = {
    switchTheme,
    switchDataset,
    switchChartType,
    updateChart,
    chartData,
    themes,
    colorSchemes
};