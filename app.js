// ========================================
// APLICAÇÃO EJ RHAI - Portal de Contratação com IA
// ========================================

// Estado da Aplicação
const appState = {
    currentPage: 'home',
    sidebarOpen: false,
    selectedEmployee: null,
    selectedTab: 'recruitment',
    calculatorInput: '0',
    calculatorHistory: [],
    employees: [
        {
            id: 1,
            name: 'João Silva',
            email: 'joao.silva@email.com',
            phone: '(11) 99999-0001',
            age: 28,
            area: 'Tecnologia',
            specializations: ['React', 'Node.js', 'TypeScript'],
            school: 'USP',
            city: 'São Paulo',
            bio: 'Desenvolvedor Full Stack com 5 anos de experiência',
            hardSkillsScore: 92,
            softSkillsScore: 85,
            performanceRating: 88,
        },
        {
            id: 2,
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            phone: '(11) 99999-0002',
            age: 32,
            area: 'Marketing',
            specializations: ['Digital Marketing', 'SEO', 'Content Strategy'],
            school: 'UFRJ',
            city: 'Rio de Janeiro',
            bio: 'Especialista em Marketing Digital com 7 anos de atuação',
            hardSkillsScore: 88,
            softSkillsScore: 92,
            performanceRating: 90,
        },
        {
            id: 3,
            name: 'Carlos Oliveira',
            email: 'carlos.oliveira@email.com',
            phone: '(11) 99999-0003',
            age: 35,
            area: 'RH',
            specializations: ['Recrutamento', 'Gestão de Pessoas', 'Treinamento'],
            school: 'PUC',
            city: 'São Paulo',
            bio: 'Gerente de RH com experiência em empresas multinacionais',
            hardSkillsScore: 85,
            softSkillsScore: 95,
            performanceRating: 92,
        },
        {
            id: 4,
            name: 'Ana Costa',
            email: 'ana.costa@email.com',
            phone: '(11) 99999-0004',
            age: 26,
            area: 'Tecnologia',
            specializations: ['Python', 'Data Science', 'Machine Learning'],
            school: 'UNICAMP',
            city: 'Campinas',
            bio: 'Cientista de Dados com foco em Machine Learning',
            hardSkillsScore: 95,
            softSkillsScore: 80,
            performanceRating: 87,
        },
        {
            id: 5,
            name: 'Pedro Alves',
            email: 'pedro.alves@email.com',
            phone: '(11) 99999-0005',
            age: 40,
            area: 'Gestão',
            specializations: ['Liderança', 'Estratégia', 'Gestão de Projetos'],
            school: 'FGV',
            city: 'Brasília',
            bio: 'Diretor com experiência em gestão estratégica',
            hardSkillsScore: 88,
            softSkillsScore: 93,
            performanceRating: 91,
        },
    ],
    filters: {
        search: '',
        minAge: '',
        maxAge: '',
        area: '',
        city: '',
        specialization: '',
    },
};

// ========================================
// SVG Icons
// ========================================
const icons = {
    menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    trending: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    briefcase: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path></svg>`,
    mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    graduation: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6m0 0v6m0-6H2m0 0v6m0-6V8m0 0L12 3l10 5"></path></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    loader: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    target: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="9"></circle></svg>`,
    barChart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
    calculator: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="16" y2="18"></line></svg>`,
};

// ========================================
// Funções Auxiliares
// ========================================

function renderPage() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    if (appState.currentPage === 'home') {
        renderHome();
    } else if (appState.currentPage === 'empresa') {
        renderCompany();
    }
}

function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="home-container">
            <div class="home-header">
                <h1>EJ RHAI</h1>
                <p>Portal de Contratação com Inteligência Artificial</p>
            </div>

            <div class="selection-grid">
                <div class="selection-card students" onclick="goToPage('students')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h2>Alunos & Adultos</h2>
                    <p>Encontre oportunidades de trabalho e desenvolvimento profissional</p>
                </div>

                <div class="selection-card companies" onclick="goToPage('empresa')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                    </svg>
                    <h2>Empresas</h2>
                    <p>Recrute talentos com o poder da inteligência artificial</p>
                </div>
            </div>

            <div class="home-footer">
                <p>© 2024 EJ RHAI - Portal de Contratação Inteligente</p>
            </div>
        </div>
    `;
}

function renderCompany() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="company-container">
            <button class="hamburger-btn" onclick="toggleSidebar()">
                ${appState.sidebarOpen ? icons.close : icons.menu}
            </button>

            <div class="sidebar ${appState.sidebarOpen ? '' : 'hidden'}">
                <div class="sidebar-header">
                    <h2>EJ RHAI</h2>
                    <p>Portal Empresarial</p>
                </div>

                <nav class="sidebar-nav">
                    <button class="nav-item ${appState.currentPage === 'empresa-home' ? 'active' : ''}" onclick="navigateCompany('home')">
                        ${icons.home}
                        <div class="nav-item-text">
                            <span class="nav-item-label">Início</span>
                            <span class="nav-item-desc">Página inicial</span>
                        </div>
                    </button>

                    <button class="nav-item ${appState.currentPage === 'empresa-search' ? 'active' : ''}" onclick="navigateCompany('search')">
                        ${icons.search}
                        <div class="nav-item-text">
                            <span class="nav-item-label">Busca e Contratação</span>
                            <span class="nav-item-desc">Encontre talentos</span>
                        </div>
                    </button>

                    <button class="nav-item ${appState.currentPage === 'empresa-ejrhai' ? 'active' : ''}" onclick="navigateCompany('ejrhai')">
                        ${icons.zap}
                        <div class="nav-item-text">
                            <span class="nav-item-label">EJ RHAI</span>
                            <span class="nav-item-desc">RH com IA</span>
                        </div>
                    </button>

                    <button class="nav-item ${appState.currentPage === 'empresa-analytics' ? 'active' : ''}" onclick="navigateCompany('analytics')">
                        ${icons.barChart}
                        <div class="nav-item-text">
                            <span class="nav-item-label">Analista de Dados</span>
                            <span class="nav-item-desc">Análise de dados</span>
                        </div>
                    </button>

                    <button class="nav-item ${appState.currentPage === 'empresa-calculator' ? 'active' : ''}" onclick="navigateCompany('calculator')">
                        ${icons.calculator}
                        <div class="nav-item-text">
                            <span class="nav-item-label">Calculadora</span>
                            <span class="nav-item-desc">Cálculos rápidos</span>
                        </div>
                    </button>
                </nav>

                <div class="sidebar-footer">
                    <button onclick="goToPage('home')">Voltar ao Início</button>
                </div>
            </div>

            ${appState.sidebarOpen ? '<div class="overlay visible" onclick="toggleSidebar()"></div>' : '<div class="overlay" onclick="toggleSidebar()"></div>'}

            <div class="main-content">
                ${renderCompanyContent()}
            </div>
        </div>
    `;

    attachEventListeners();
}

function renderCompanyContent() {
    if (appState.currentPage === 'empresa-home') {
        return renderCompanyHome();
    } else if (appState.currentPage === 'empresa-search') {
        return renderSearchAndHiring();
    } else if (appState.currentPage === 'empresa-ejrhai') {
        return renderEJRhaiDashboard();
    } else if (appState.currentPage === 'empresa-analytics') {
        return renderDataAnalytics();
    } else if (appState.currentPage === 'empresa-calculator') {
        return renderCalculator();
    }
    return renderCompanyHome();
}

function renderCompanyHome() {
    return `
        <div class="company-home-content">
            <section class="company-header">
                <h1>Bem-vindo ao EJ RHAI</h1>
                <p>A plataforma inteligente de recrutamento e gestão de recursos humanos powered by Artificial Intelligence</p>
            </section>

            <section class="section">
                <h2 style="text-align: center; margin-bottom: 2rem;">Funcionalidades Principais</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        ${icons.search}
                        <h3>Busca e Contratação</h3>
                        <p>Acesse um banco de dados completo de talentos qualificados. Filtre por idade, área, especializações, escola e cidade. Contrate os melhores profissionais em poucos cliques.</p>
                    </div>

                    <div class="feature-card">
                        ${icons.zap}
                        <h3>EJ RHAI - RH Inteligente</h3>
                        <p>Automatize o processo de recrutamento com IA. Descreva o perfil desejado e deixe nosso agente encontrar os 5 melhores candidatos. Análise automática de desempenho incluída.</p>
                    </div>

                    <div class="feature-card">
                        ${icons.trending}
                        <h3>Análise de Dados</h3>
                        <p>Obtenha insights profundos sobre o desempenho de seus funcionários. Análise de hard skills, soft skills e tendências da empresa.</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="mission-section">
                    <div class="mission-text">
                        <h2>Nossa Missão</h2>
                        <p>Revolucionar o processo de recrutamento e gestão de recursos humanos através da inteligência artificial, tornando mais rápido, eficiente e preciso encontrar e gerenciar talentos.</p>
                        <p>Acreditamos que a tecnologia deve servir para conectar as pessoas certas com as oportunidades certas, criando valor para empresas e profissionais.</p>
                    </div>
                    <div class="mission-card">
                        ${icons.target}
                        <h3>Objetivo</h3>
                        <p>Ser a plataforma mais confiável e inteligente para recrutamento e gestão de talentos no Brasil, utilizando IA para criar conexões significativas entre empresas e profissionais.</p>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2 style="text-align: center; margin-bottom: 2rem;">Nossos Valores</h2>
                <div class="values-grid">
                    <div class="value-item">
                        <div class="value-icon blue">
                            ${icons.heart}
                        </div>
                        <h3>Humanidade</h3>
                        <p>Colocamos as pessoas no centro de tudo que fazemos, respeitando suas aspirações e potencial.</p>
                    </div>

                    <div class="value-item">
                        <div class="value-icon green">
                            ${icons.shield}
                        </div>
                        <h3>Confiabilidade</h3>
                        <p>Garantimos transparência e segurança em todas as nossas operações e dados.</p>
                    </div>

                    <div class="value-item">
                        <div class="value-icon purple">
                            ${icons.zap}
                        </div>
                        <h3>Inovação</h3>
                        <p>Utilizamos tecnologia de ponta para oferecer soluções cada vez melhores.</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

function renderSearchAndHiring() {
    const filteredEmployees = filterEmployees();

    if (appState.selectedEmployee) {
        return renderEmployeeProfile(appState.selectedEmployee);
    }

    return `
        <div>
            <section class="company-header">
                <h1>Busca e Contratação</h1>
                <p>Encontre os melhores talentos para sua empresa</p>
            </section>

            <div class="search-container">
                <div class="filters-sidebar">
                    <h2>Filtros</h2>

                    <div class="filter-group">
                        <label>Buscar</label>
                        <div style="position: relative;">
                            ${icons.search}
                            <input type="text" placeholder="Nome ou email" onchange="updateFilter('search', this.value)" style="padding-left: 2.5rem;">
                        </div>
                    </div>

                    <div class="filter-group">
                        <label>Idade</label>
                        <div class="age-inputs">
                            <input type="number" placeholder="Min" onchange="updateFilter('minAge', this.value)">
                            <input type="number" placeholder="Max" onchange="updateFilter('maxAge', this.value)">
                        </div>
                    </div>

                    <div class="filter-group">
                        <label>Área</label>
                        <select onchange="updateFilter('area', this.value)">
                            <option value="">Todas as áreas</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Marketing">Marketing</option>
                            <option value="RH">RH</option>
                            <option value="Gestão">Gestão</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label>Cidade</label>
                        <select onchange="updateFilter('city', this.value)">
                            <option value="">Todas as cidades</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                            <option value="Campinas">Campinas</option>
                            <option value="Brasília">Brasília</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label>Especialização</label>
                        <input type="text" placeholder="Ex: React, Python" onchange="updateFilter('specialization', this.value)">
                    </div>

                    <button class="clear-filters-btn" onclick="clearFilters()">Limpar Filtros</button>
                </div>

                <div class="search-results">
                    <p style="color: var(--text-gray); font-weight: 600; margin-bottom: 1rem;">${filteredEmployees.length} candidato(s) encontrado(s)</p>
                    ${filteredEmployees.map(emp => `
                        <div class="employee-card">
                            <div class="employee-header">
                                <div class="employee-info">
                                    <h3>${emp.name}</h3>
                                    <p>${emp.bio}</p>
                                </div>
                                <div class="employee-rating">
                                    ${icons.star}
                                    <span>${emp.performanceRating}%</span>
                                </div>
                            </div>

                            <div class="employee-details">
                                <div class="detail-item">
                                    ${icons.briefcase}
                                    <span>${emp.area}</span>
                                </div>
                                <div class="detail-item">
                                    ${icons.mapPin}
                                    <span>${emp.city}</span>
                                </div>
                                <div class="detail-item">
                                    ${icons.graduation}
                                    <span>${emp.school}</span>
                                </div>
                                <div class="detail-item">
                                    ${icons.mail}
                                    <span style="font-size: 0.8rem;">${emp.email}</span>
                                </div>
                            </div>

                            <div class="specializations">
                                ${emp.specializations.slice(0, 3).map(spec => `<span class="spec-badge">${spec}</span>`).join('')}
                                ${emp.specializations.length > 3 ? `<span style="color: var(--text-gray); font-size: 0.8rem;">+${emp.specializations.length - 3} mais</span>` : ''}
                            </div>

                            <div class="employee-actions">
                                <button class="hire-btn" onclick="alert('Contratação iniciada para ${emp.name}')">Contratar</button>
                                <button class="profile-btn" onclick="selectEmployee(${emp.id})">Ver Perfil</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderEmployeeProfile(employee) {
    return `
        <div>
            <section class="company-header">
                <h1>Perfil do Candidato</h1>
            </section>

            <div class="search-container">
                <div style="grid-column: 1 / -1;">
                    <div class="employee-profile">
                        <div class="profile-header">
                            <button onclick="selectEmployee(null)">← Voltar para lista</button>
                            <h1>${employee.name}</h1>
                            <p>${employee.bio}</p>
                        </div>

                        <div class="profile-grid">
                            <div class="profile-info">
                                <div class="info-section">
                                    <h3>Informações Pessoais</h3>
                                    <div class="info-details">
                                        <div class="info-detail">
                                            ${icons.briefcase}
                                            <span>${employee.area}</span>
                                        </div>
                                        <div class="info-detail">
                                            ${icons.mapPin}
                                            <span>${employee.city}</span>
                                        </div>
                                        <div class="info-detail">
                                            ${icons.graduation}
                                            <span>${employee.school}</span>
                                        </div>
                                        <div class="info-detail">
                                            <span style="font-weight: 600;">${employee.age} anos</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="info-section">
                                    <h3>Especializações</h3>
                                    <div class="specializations-list">
                                        ${employee.specializations.map(spec => `<span class="spec-badge-large">${spec}</span>`).join('')}
                                    </div>
                                </div>

                                <div class="info-section">
                                    <h3>Avaliação de Desempenho</h3>
                                    <div class="skills-section">
                                        <div class="skill-bar">
                                            <div class="skill-header">
                                                <span>Hard Skills</span>
                                                <span style="color: #666;">${employee.hardSkillsScore}%</span>
                                            </div>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${employee.hardSkillsScore}%; background-color: #333;"></div>
                                            </div>
                                        </div>
                                        <div class="skill-bar">
                                            <div class="skill-header">
                                                <span>Soft Skills</span>
                                                <span style="color: #666;">${employee.softSkillsScore}%</span>
                                            </div>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${employee.softSkillsScore}%; background-color: #555;"></div>
                                            </div>
                                        </div>
                                        <div class="skill-bar">
                                            <div class="skill-header">
                                                <span>Desempenho Geral</span>
                                                <span style="color: #666;">${employee.performanceRating}%</span>
                                            </div>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${employee.performanceRating}%; background-color: #444;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="contact-card">
                                <h3>Informações de Contato</h3>
                                <div class="contact-item">
                                    ${icons.mail}
                                    <a href="mailto:${employee.email}">${employee.email}</a>
                                </div>
                                <div class="contact-item">
                                    ${icons.phone}
                                    <a href="tel:${employee.phone}">${employee.phone}</a>
                                </div>

                                <button class="hire-btn" onclick="alert('Contratação iniciada para ${employee.name}')">Contratar</button>
                                <button class="secondary-btn" onclick="alert('Entrando em contato com ${employee.name}')">Entrar em Contato</button>
                                <button class="support-btn" onclick="alert('Contacting support...')">Contatar Suporte</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderEJRhaiDashboard() {
    return `
        <div>
            <section class="company-header">
                <h1>EJ RHAI</h1>
                <p>RH Inteligente - Recrutamento e Análise com Inteligência Artificial</p>
            </section>

            <div class="ejrhai-container section">
                <div class="tabs">
                    <button class="tab-btn ${appState.selectedTab === 'recruitment' ? 'active' : ''}" onclick="switchTab('recruitment')">
                        ${icons.zap}
                        RH Semiautomático
                    </button>
                    <button class="tab-btn ${appState.selectedTab === 'performance' ? 'active' : ''}" onclick="switchTab('performance')">
                        ${icons.users}
                        Análise de Funcionários
                    </button>
                </div>

                ${appState.selectedTab === 'recruitment' ? renderRecruitmentTab() : renderPerformanceTab()}
            </div>
        </div>
    `;
}

function renderRecruitmentTab() {
    return `
        <div class="tab-content active">
            <div class="card">
                <h2>RH de Contratação Semiautomático</h2>
                <p style="margin-bottom: 1.5rem;">Descreva o tipo de funcionário que você procura e deixe nosso agente de IA encontrar os 5 melhores candidatos para você.</p>

                <div class="form-group">
                    <label>Descreva o perfil desejado</label>
                    <textarea id="jobDescription" placeholder="Ex: Procuro um desenvolvedor full-stack com experiência em React e Node.js, que tenha pelo menos 3 anos de experiência..." rows="6"></textarea>
                </div>

                <button class="submit-btn" onclick="searchWithAI()">
                    ${icons.send}
                    Buscar Candidatos com IA
                </button>

                <div id="recommendations" style="display: none; margin-top: 2rem;">
                    <h2 style="margin-bottom: 1.5rem;">Top 5 Candidatos Recomendados</h2>
                    <div class="recommendations" id="recommendationsList"></div>
                    <button class="submit-btn" style="margin-top: 1.5rem;" onclick="confirmHiring()">Confirmar Contratação</button>
                </div>
            </div>
        </div>
    `;
}

function renderPerformanceTab() {
    return `
        <div class="tab-content active">
            <div class="card">
                <h2>Análise de Funcionários</h2>
                <p style="margin-bottom: 1.5rem;">Analise o desempenho de seus funcionários baseado em hard skills, soft skills e relatórios do RH.</p>

                <div class="performance-grid">
                    <div class="performance-card">
                        <h3>João Silva - Desenvolvedor Full Stack</h3>
                        <div class="skill-grid">
                            <div class="skill-item">
                                <div class="skill-label">Hard Skills</div>
                                <div class="skill-score">92%</div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-label">Soft Skills</div>
                                <div class="skill-score green">85%</div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-label">Desempenho</div>
                                <div class="skill-score purple">88%</div>
                            </div>
                        </div>
                        <div class="recommendation-text">
                            <strong>Recomendação:</strong> Excelente desempenho. Considere promoção ou aumento de responsabilidades.
                        </div>
                    </div>

                    <div class="performance-card">
                        <h3>Maria Santos - Especialista em Marketing</h3>
                        <div class="skill-grid">
                            <div class="skill-item">
                                <div class="skill-label">Hard Skills</div>
                                <div class="skill-score">88%</div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-label">Soft Skills</div>
                                <div class="skill-score green">92%</div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-label">Desempenho</div>
                                <div class="skill-score purple">90%</div>
                            </div>
                        </div>
                        <div class="recommendation-text">
                            <strong>Recomendação:</strong> Desempenho excepcional. Líder de equipe em potencial.
                        </div>
                    </div>
                </div>

                <div class="company-overview">
                    <h3>Desempenho Geral da Empresa</h3>
                    <div class="overview-grid">
                        <div class="overview-item">
                            <div class="overview-label">Média de Hard Skills</div>
                            <div class="overview-value">89%</div>
                        </div>
                        <div class="overview-item">
                            <div class="overview-label">Média de Soft Skills</div>
                            <div class="overview-value">89%</div>
                        </div>
                        <div class="overview-item">
                            <div class="overview-label">Desempenho Médio</div>
                            <div class="overview-value">89%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDataAnalytics() {
    return `
        <div>
            <section class="company-header">
                <h1>Analista de Dados</h1>
                <p>Análise inteligente de dados da sua empresa</p>
            </section>

            <div class="ejrhai-container section">
                <div class="card">
                    <h2>Faça uma Pergunta</h2>
                    <p style="margin-bottom: 1.5rem;">Insira qualquer pergunta sobre seus dados e deixe nosso agente de IA gerar uma análise detalhada.</p>

                    <div class="form-group">
                        <label>Qual é sua pergunta?</label>
                        <textarea id="dataQuery" placeholder="Ex: Qual é a taxa de rotatividade? Quais são as áreas com melhor desempenho?" rows="6"></textarea>
                    </div>

                    <button class="submit-btn" onclick="analyzeData()">
                        ${icons.send}
                        Analisar com IA
                    </button>

                    <div id="analysisResult" style="display: none;">
                        <div class="analysis-result">
                            <h3>Resultado da Análise</h3>
                            <p id="analysisText"></p>
                        </div>
                    </div>
                </div>

                <div class="card" style="margin-top: 2rem;">
                    <h2>Análises Sugeridas</h2>
                    <div class="suggested-analyses">
                        <button class="analysis-suggestion" onclick="setDataQuery('Qual é a taxa de rotatividade de funcionários na empresa?')">
                            <h4>Taxa de Rotatividade</h4>
                            <p>Analise quantos funcionários saem da empresa</p>
                        </button>
                        <button class="analysis-suggestion" onclick="setDataQuery('Quais são as áreas com melhor desempenho?')">
                            <h4>Desempenho por Área</h4>
                            <p>Identifique quais departamentos estão performando melhor</p>
                        </button>
                        <button class="analysis-suggestion" onclick="setDataQuery('Qual é o custo médio de contratação?')">
                            <h4>Custo de Contratação</h4>
                            <p>Analise o investimento em recrutamento</p>
                        </button>
                        <button class="analysis-suggestion" onclick="setDataQuery('Qual é a distribuição de funcionários por experiência?')">
                            <h4>Distribuição de Experiência</h4>
                            <p>Veja o nível de experiência dos seus funcionários</p>
                        </button>
                        <button class="analysis-suggestion" onclick="setDataQuery('Qual é a taxa de promoção interna?')">
                            <h4>Taxa de Promoção</h4>
                            <p>Analise o crescimento interno de funcionários</p>
                        </button>
                        <button class="analysis-suggestion" onclick="setDataQuery('Qual é o salário médio por área?')">
                            <h4>Análise Salarial</h4>
                            <p>Compare salários entre áreas e níveis</p>
                        </button>
                    </div>
                </div>

                <div class="card" style="margin-top: 2rem;">
                    <h2>Insights Gerais</h2>
                    <div class="insights-grid">
                        <div class="insight-card">
                            ${icons.barChart}
                            <h4>Total de Funcionários</h4>
                            <div class="insight-value">127</div>
                            <div class="insight-desc">Crescimento de 12% no último ano</div>
                        </div>
                        <div class="insight-card">
                            ${icons.barChart}
                            <h4>Taxa de Retenção</h4>
                            <div class="insight-value">92%</div>
                            <div class="insight-desc">Acima da média do mercado (85%)</div>
                        </div>
                        <div class="insight-card">
                            ${icons.barChart}
                            <h4>Desempenho Médio</h4>
                            <div class="insight-value">89%</div>
                            <div class="insight-desc">Excelente desempenho geral</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCalculator() {
    return `
        <div>
            <section class="company-header">
                <h1>Calculadora</h1>
                <p>Realize cálculos rápidos e intuitivos</p>
            </section>

            <div class="calculator-container">
                <div class="calculator">
                    <div class="calculator-display">
                        <div class="calculator-input" id="calcInput">0</div>
                        <div class="calculator-result" id="calcResult"></div>
                    </div>
                    <div class="calculator-buttons">
                        <button class="calc-btn clear" onclick="clearCalculator()">C</button>
                        <button class="calc-btn operator" onclick="appendOperator('/')">/</button>
                        <button class="calc-btn operator" onclick="appendOperator('*')">×</button>
                        <button class="calc-btn" onclick="appendNumber('7')">7</button>
                        <button class="calc-btn" onclick="appendNumber('8')">8</button>
                        <button class="calc-btn" onclick="appendNumber('9')">9</button>
                        <button class="calc-btn operator" onclick="appendOperator('-')">−</button>
                        <button class="calc-btn" onclick="appendNumber('4')">4</button>
                        <button class="calc-btn" onclick="appendNumber('5')">5</button>
                        <button class="calc-btn" onclick="appendNumber('6')">6</button>
                        <button class="calc-btn operator" onclick="appendOperator('+')">+</button>
                        <button class="calc-btn" onclick="appendNumber('1')">1</button>
                        <button class="calc-btn" onclick="appendNumber('2')">2</button>
                        <button class="calc-btn" onclick="appendNumber('3')">3</button>
                        <button class="calc-btn" onclick="toggleSign()">±</button>
                        <button class="calc-btn" onclick="appendNumber('0')">0</button>
                        <button class="calc-btn decimal" onclick="appendDecimal()">.</button>
                        <button class="calc-btn equals" onclick="calculateResult()">=</button>
                    </div>
                    <div class="calculator-history">
                        <h3>Histórico</h3>
                        <div id="historyList"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// Funções de Controle
// ========================================

function goToPage(page) {
    appState.currentPage = page;
    if (page === 'empresa') {
        appState.currentPage = 'empresa-home';
    }
    renderPage();
}

function navigateCompany(page) {
    appState.currentPage = `empresa-${page}`;
    appState.selectedEmployee = null;
    appState.selectedTab = 'recruitment';
    renderPage();
}

function toggleSidebar() {
    appState.sidebarOpen = !appState.sidebarOpen;
    renderPage();
}

function switchTab(tab) {
    appState.selectedTab = tab;
    renderPage();
}

function selectEmployee(id) {
    if (id === null) {
        appState.selectedEmployee = null;
    } else {
        appState.selectedEmployee = appState.employees.find(emp => emp.id === id);
    }
    renderPage();
}

function updateFilter(key, value) {
    appState.filters[key] = value;
    renderPage();
}

function clearFilters() {
    appState.filters = {
        search: '',
        minAge: '',
        maxAge: '',
        area: '',
        city: '',
        specialization: '',
    };
    renderPage();
}

function filterEmployees() {
    return appState.employees.filter(emp => {
        const matchesSearch =
            emp.name.toLowerCase().includes(appState.filters.search.toLowerCase()) ||
            emp.email.toLowerCase().includes(appState.filters.search.toLowerCase());

        const matchesAge =
            (appState.filters.minAge === '' || emp.age >= parseInt(appState.filters.minAge)) &&
            (appState.filters.maxAge === '' || emp.age <= parseInt(appState.filters.maxAge));

        const matchesArea =
            appState.filters.area === '' || emp.area.toLowerCase() === appState.filters.area.toLowerCase();

        const matchesCity =
            appState.filters.city === '' || emp.city.toLowerCase() === appState.filters.city.toLowerCase();

        const matchesSpecialization =
            appState.filters.specialization === '' ||
            emp.specializations.some(spec =>
                spec.toLowerCase().includes(appState.filters.specialization.toLowerCase())
            );

        return matchesSearch && matchesAge && matchesArea && matchesCity && matchesSpecialization;
    });
}

function searchWithAI() {
    const jobDescription = document.getElementById('jobDescription').value;
    if (!jobDescription.trim()) {
        alert('Por favor, descreva o tipo de funcionário que você procura');
        return;
    }

    // Simular busca com IA
    const recommendations = [
        { id: 1, name: 'João Silva', matchScore: 95 },
        { id: 2, name: 'Ana Costa', matchScore: 92 },
        { id: 3, name: 'Carlos Oliveira', matchScore: 88 },
        { id: 4, name: 'Maria Santos', matchScore: 85 },
        { id: 5, name: 'Pedro Alves', matchScore: 82 },
    ];

    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = recommendations.map(rec => {
        const emp = appState.employees.find(e => e.id === rec.id);
        return `
            <div class="recommendation-card">
                <div class="rec-header">
                    <div class="rec-info">
                        <h3>${emp.name}</h3>
                        <p>${emp.area}</p>
                    </div>
                    <div class="match-badge">${rec.matchScore}% Match</div>
                </div>
                <p class="rec-reasoning">Excelente match com sua descrição. Experiência comprovada na área desejada.</p>
                <div class="rec-specs">
                    ${emp.specializations.map(spec => `<span class="rec-spec">${spec}</span>`).join('')}
                </div>
                <button class="rec-action" onclick="toggleSelection(${emp.id})">Selecionar</button>
            </div>
        `;
    }).join('');

    document.getElementById('recommendations').style.display = 'block';
}

function confirmHiring() {
    alert('Contratação confirmada! Você receberá um email com os próximos passos.');
    document.getElementById('jobDescription').value = '';
    document.getElementById('recommendations').style.display = 'none';
}

function toggleSelection(id) {
    // Implementar seleção múltipla se necessário
    alert(`Candidato ${id} selecionado!`);
}

function analyzeData() {
    const query = document.getElementById('dataQuery').value;
    if (!query.trim()) {
        alert('Por favor, insira uma pergunta');
        return;
    }

    const results = [
        'Com base na análise dos dados, identificamos que a área de Tecnologia tem um crescimento de 15% ao ano. Recomendamos aumentar o investimento em recrutamento nesta área.',
        'A análise de retenção mostra que 92% dos funcionários permanecem na empresa após o primeiro ano. Isso é 20% acima da média do mercado.',
        'O custo-benefício de cada contratação é de R$ 5.200, com um ROI estimado de 300% no primeiro ano.',
        'Os dados indicam que funcionários com mais de 5 anos de experiência têm 40% mais chances de promoção.',
    ];

    const randomResult = results[Math.floor(Math.random() * results.length)];
    document.getElementById('analysisText').textContent = randomResult;
    document.getElementById('analysisResult').style.display = 'block';
}

function setDataQuery(query) {
    document.getElementById('dataQuery').value = query;
}

// ========================================
// Funções da Calculadora
// ========================================

function appendNumber(num) {
    if (appState.calculatorInput === '0') {
        appState.calculatorInput = num;
    } else {
        appState.calculatorInput += num;
    }
    updateCalculatorDisplay();
}

function appendOperator(op) {
    if (appState.calculatorInput === '') return;
    if (['+', '-', '*', '/'].includes(appState.calculatorInput.slice(-1))) {
        appState.calculatorInput = appState.calculatorInput.slice(0, -1) + op;
    } else {
        appState.calculatorInput += op;
    }
    updateCalculatorDisplay();
}

function appendDecimal() {
    if (!appState.calculatorInput.includes('.')) {
        appState.calculatorInput += '.';
    }
    updateCalculatorDisplay();
}

function toggleSign() {
    if (appState.calculatorInput !== '0' && appState.calculatorInput !== '') {
        if (appState.calculatorInput.startsWith('-')) {
            appState.calculatorInput = appState.calculatorInput.slice(1);
        } else {
            appState.calculatorInput = '-' + appState.calculatorInput;
        }
    }
    updateCalculatorDisplay();
}

function clearCalculator() {
    appState.calculatorInput = '0';
    updateCalculatorDisplay();
}

function calculateResult() {
    try {
        const result = eval(appState.calculatorInput);
        const calculation = `${appState.calculatorInput} = ${result}`;
        appState.calculatorHistory.unshift(calculation);
        appState.calculatorInput = result.toString();
        updateCalculatorDisplay();
        updateHistory();
    } catch (e) {
        alert('Erro no cálculo');
        clearCalculator();
    }
}

function updateCalculatorDisplay() {
    const input = document.getElementById('calcInput');
    if (input) {
        input.textContent = appState.calculatorInput || '0';
    }
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    if (historyList) {
        historyList.innerHTML = appState.calculatorHistory.map((item, index) => `
            <div class="history-item" onclick="appState.calculatorInput = '${item.split(' = ')[1]}'; updateCalculatorDisplay();">
                <div class="history-item-text">${item.split(' = ')[0]}</div>
                <div class="history-item-result">${item.split(' = ')[1]}</div>
            </div>
        `).join('');
    }
}

function attachEventListeners() {
    // Event listeners já estão inline nos elementos
}

// ========================================
// Inicialização
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    renderPage();
});
