// Dashboard Amazônia Legal - Script Principal
// Dados e visualizações do desmatamento na Amazônia Legal

let deforestationData = [];
let charts = {};
let isDarkMode = false;
let currentPeriod = 'all';

// Estados da Amazônia Legal
const states = {
    'acre': 'Acre',
    'amazonas': 'Amazonas', 
    'amapa': 'Amapá',
    'maranhao': 'Maranhão',
    'mato_grosso': 'Mato Grosso',
    'para': 'Pará',
    'rondonia': 'Rondônia',
    'roraima': 'Roraima',
    'tocantins': 'Tocantins'
};

// Cores para os estados
const stateColors = {
    'acre': '#ef4444',
    'amazonas': '#3b82f6',
    'amapa': '#8b5cf6',
    'maranhao': '#f59e0b',
    'mato_grosso': '#10b981',
    'para': '#ec4899',
    'rondonia': '#f97316',
    'roraima': '#06b6d4',
    'tocantins': '#84cc16'
};

// Configuração dos gráficos
Chart.defaults.font.family = 'Inter';
Chart.defaults.font.size = 12;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    updateCurrentYear();
});

// Carregamento dos dados
async function loadData() {
    try {
        // Dados incorporados diretamente para evitar problemas de CORS
        const csvData = `referencia,acre,amazonas,amapa,maranhao,mato_grosso,para,rondonia,roraima,tocantins,area_total_desmatamento
1988,620,1510,60,2450,5140,6990,2340,290,1650,21050
1989,540,1180,130,1420,5960,5750,1430,630,730,17770
1990,550,520,250,1100,4020,4890,1670,150,580,13730
1991,380,980,410,670,2840,3780,1110,420,440,11030
1992,400,799,36,1135,4674,3787,2265,281,409,13786
1993,482,370,0,372,6220,4284,2595,240,333,14896
1994,482,370,0,372,6220,4284,2595,240,333,14896
1995,1208,2114,9,1745,10391,7845,4730,220,797,29059
1996,433,1023,0,1061,6543,6135,2432,214,320,18161
1997,358,589,18,409,5271,4139,1986,184,273,13227
1998,536,670,30,1012,6466,5829,2041,223,576,17383
1999,441,720,0,1230,6963,5111,2358,220,216,17259
2000,547,612,0,1065,6369,6671,2465,253,244,18226
2001,419,634,7,958,7703,5237,2673,345,189,18165
2002,883,885,0,1085,7892,7510,3099,84,212,21650
2003,1078,1558,25,993,10405,7145,3597,439,156,25396
2004,728,1232,46,755,11814,8870,3858,311,158,27772
2005,592,775,33,922,7145,5899,3244,133,271,19014
2006,398,788,30,674,4333,5659,2049,231,124,14286
2007,184,610,39,631,2678,5526,1611,309,63,11651
2008,254,604,100,1271,3258,5607,1136,574,107,12911
2009,167,405,70,828,1049,4281,482,121,61,7464
2010,259,595,53,712,871,3770,435,256,49,7000
2011,280,502,66,396,1120,3008,865,141,40,6418
2012,305,523,27,269,757,1741,773,124,52,4571
2013,221,583,23,403,1139,2346,932,170,74,5891
2014,309,500,31,257,1075,1887,684,219,50,5012
2015,264,712,25,209,1601,2153,1030,156,57,6207
2016,372,1129,17,258,1489,2992,1376,202,58,7893
2017,257,1001,24,265,1561,2433,1243,132,31,6947
2018,444,1045,24,253,1490,2744,1316,195,25,7536
2019,682,1434,32,237,1702,4172,1257,590,23,10129
2020,706,1512,24,336,1779,4899,1273,297,25,10851
2021,889,2306,17,350,2213,5238,1673,315,37,13038
2022,847,2607,6,282,1906,4141,1512,240,27,11568`;
        
        parseCSVData(csvData);
        updateStatistics();
        createCharts();
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showErrorMessage('Erro ao carregar os dados. Verifique se o arquivo CSV está disponível.');
    }
}

// Parse dos dados CSV
function parseCSVData(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    deforestationData = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const year = parseInt(values[0]);
        
        const yearData = {
            year: year,
            states: {},
            total: 0
        };
        
        // Processar dados de cada estado
        for (let j = 1; j < headers.length - 1; j++) {
            const stateName = headers[j];
            const value = parseInt(values[j]) || 0;
            yearData.states[stateName] = value;
            yearData.total += value;
        }
        
        deforestationData.push(yearData);
    }
    
    // Ordenar por ano
    deforestationData.sort((a, b) => a.year - b.year);
}

// Atualização das estatísticas
function updateStatistics() {
    if (deforestationData.length === 0) return;
    
    const totalYears = deforestationData.length;
    const maxDeforestation = Math.max(...deforestationData.map(d => d.total));
    const minDeforestation = Math.min(...deforestationData.map(d => d.total));
    
    const maxYear = deforestationData.find(d => d.total === maxDeforestation)?.year;
    const minYear = deforestationData.find(d => d.total === minDeforestation)?.year;
    
    // Calcular ranking acumulado
    const accumulatedByState = {};
    Object.keys(states).forEach(state => {
        accumulatedByState[state] = deforestationData.reduce((sum, year) => sum + (year.states[state] || 0), 0);
    });
    
    const sortedStates = Object.entries(accumulatedByState).sort((a, b) => b[1] - a[1]);
    const topState = states[sortedStates[0][0]];
    const bottomState = states[sortedStates[sortedStates.length - 1][0]];
    const totalAccumulated = Object.values(accumulatedByState).reduce((sum, val) => sum + val, 0);
    
    // Atualizar elementos da interface
    document.getElementById('totalYears').textContent = totalYears;
    document.getElementById('maxDeforestation').textContent = maxDeforestation.toLocaleString('pt-BR');
    document.getElementById('minDeforestation').textContent = minDeforestation.toLocaleString('pt-BR');
    
    document.getElementById('peakYear').textContent = maxYear;
    document.getElementById('peakValue').textContent = maxDeforestation.toLocaleString('pt-BR');
    document.getElementById('minYear').textContent = minYear;
    document.getElementById('minValue').textContent = minDeforestation.toLocaleString('pt-BR');
    
    document.getElementById('topState').textContent = topState;
    document.getElementById('bottomState').textContent = bottomState;
    document.getElementById('totalAccumulated').textContent = totalAccumulated.toLocaleString('pt-BR');
}

// Criação dos gráficos
function createCharts() {
    createEvolutionChart();
    createRankingChart();
}

// Gráfico de evolução anual
function createEvolutionChart() {
    const ctx = document.getElementById('evolutionChart').getContext('2d');
    
    const filteredData = getFilteredData();
    const years = filteredData.map(d => d.year);
    
    const datasets = Object.keys(states).map(stateKey => ({
        label: states[stateKey],
        data: filteredData.map(d => d.states[stateKey] || 0),
        borderColor: stateColors[stateKey],
        backgroundColor: stateColors[stateKey] + '20',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6
    }));
    
    // Adicionar linha do total
    datasets.push({
        label: 'Total Amazônia Legal',
        data: filteredData.map(d => d.total),
        borderColor: '#1f2937',
        backgroundColor: '#1f293720',
        borderWidth: 3,
        fill: false,
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 8,
        borderDash: [5, 5]
    });
    
    if (charts.evolution) {
        charts.evolution.destroy();
    }
    
    charts.evolution = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução do Desmatamento na Amazônia Legal (km²)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: isDarkMode ? '#ffffff' : '#374151'
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        color: isDarkMode ? '#ffffff' : '#374151'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    titleColor: isDarkMode ? '#ffffff' : '#1f2937',
                    bodyColor: isDarkMode ? '#ffffff' : '#1f2937',
                    borderColor: '#22c55e',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toLocaleString('pt-BR')} km²`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Ano',
                        color: isDarkMode ? '#ffffff' : '#374151'
                    },
                    grid: {
                        color: isDarkMode ? '#374151' : '#e5e7eb'
                    },
                    ticks: {
                        color: isDarkMode ? '#ffffff' : '#374151'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Área Desmatada (km²)',
                        color: isDarkMode ? '#ffffff' : '#374151'
                    },
                    grid: {
                        color: isDarkMode ? '#374151' : '#e5e7eb'
                    },
                    ticks: {
                        color: isDarkMode ? '#ffffff' : '#374151',
                        callback: function(value) {
                            return value.toLocaleString('pt-BR');
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Gráfico de ranking acumulado
function createRankingChart() {
    const ctx = document.getElementById('rankingChart').getContext('2d');
    
    // Calcular dados acumulados por estado
    const accumulatedByState = {};
    Object.keys(states).forEach(state => {
        accumulatedByState[state] = deforestationData.reduce((sum, year) => sum + (year.states[state] || 0), 0);
    });
    
    // Ordenar estados por desmatamento acumulado
    const sortedStates = Object.entries(accumulatedByState).sort((a, b) => b[1] - a[1]);
    
    const labels = sortedStates.map(([stateKey]) => states[stateKey]);
    const data = sortedStates.map(([, value]) => value);
    const colors = sortedStates.map(([stateKey]) => stateColors[stateKey]);
    
    if (charts.ranking) {
        charts.ranking.destroy();
    }
    
    charts.ranking = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Desmatamento Acumulado (km²)',
                data: data,
                backgroundColor: colors.map(color => color + '80'),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Ranking de Desmatamento Acumulado por Estado (1988-2024)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: isDarkMode ? '#ffffff' : '#374151'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    titleColor: isDarkMode ? '#ffffff' : '#1f2937',
                    bodyColor: isDarkMode ? '#ffffff' : '#1f2937',
                    borderColor: '#22c55e',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const percentage = ((context.parsed.y / data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                            return `${context.parsed.y.toLocaleString('pt-BR')} km² (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Estados da Amazônia Legal',
                        color: isDarkMode ? '#ffffff' : '#374151'
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: isDarkMode ? '#ffffff' : '#374151',
                        maxRotation: 45
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Área Desmatada Acumulada (km²)',
                        color: isDarkMode ? '#ffffff' : '#374151'
                    },
                    grid: {
                        color: isDarkMode ? '#374151' : '#e5e7eb'
                    },
                    ticks: {
                        color: isDarkMode ? '#ffffff' : '#374151',
                        callback: function(value) {
                            return value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });
}

// Filtrar dados por período
function getFilteredData() {
    switch (currentPeriod) {
        case 'recent':
            return deforestationData.slice(-10); // Últimos 10 anos
        case 'decade':
            // Agrupar por década
            const decades = {};
            deforestationData.forEach(d => {
                const decade = Math.floor(d.year / 10) * 10;
                if (!decades[decade]) {
                    decades[decade] = { year: decade, states: {}, total: 0 };
                    Object.keys(states).forEach(state => {
                        decades[decade].states[state] = 0;
                    });
                }
                Object.keys(states).forEach(state => {
                    decades[decade].states[state] += d.states[state] || 0;
                });
                decades[decade].total += d.total;
            });
            return Object.values(decades).sort((a, b) => a.year - b.year);
        default:
            return deforestationData;
    }
}

// Atualizar período dos gráficos
function updateChartPeriod(period) {
    currentPeriod = period;
    
    // Atualizar botões ativos
    document.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Recriar gráfico de evolução
    createEvolutionChart();
}

// Configurar event listeners
function setupEventListeners() {
    // Toggle modo escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', toggleDarkMode);
    
    // Animações de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    document.querySelectorAll('.section-card').forEach(el => {
        observer.observe(el);
    });
}

// Toggle modo escuro
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.style.background = 'linear-gradient(135deg, #1f2937 0%, #111827 100%)';
        document.body.style.color = '#ffffff';
        
        // Atualizar cards
        document.querySelectorAll('.section-card, .stat-card').forEach(card => {
            card.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
            card.style.color = '#ffffff';
        });
    } else {
        document.body.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
        document.body.style.color = '#1f2937';
        
        // Restaurar cards
        document.querySelectorAll('.section-card, .stat-card').forEach(card => {
            card.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
            card.style.color = '#1f2937';
        });
    }
    
    // Recriar gráficos com nova paleta
    createCharts();
}

// Atualizar ano atual
function updateCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Mostrar mensagem de erro
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Função para exportar dados (funcionalidade adicional)
function exportData() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Ano,Estado,Desmatamento(km²)\n"
        + deforestationData.flatMap(yearData => 
            Object.entries(yearData.states).map(([state, value]) => 
                `${yearData.year},${states[state]},${value}`
            )
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "desmatamento_amazonia_legal.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Adicionar funcionalidade de exportação ao footer
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer .container');
    const exportButton = document.createElement('button');
    exportButton.textContent = '📥 Exportar Dados';
    exportButton.className = 'filter-button mt-4';
    exportButton.onclick = exportData;
    footer.appendChild(exportButton);
});

