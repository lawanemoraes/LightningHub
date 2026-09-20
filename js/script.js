// ========================================
// LIGHTNINGHUB
// JavaScript
// ========================================


// ========================================
// NAVEGAÇÃO
// ========================================

const navLinks = document.querySelectorAll(".nav-link");
const pageContent = document.querySelector("#page-content");
const breadcrumb = document.querySelector("#breadcrumb");
const pageTitle = document.querySelector("#page-title");


// Elementos que fazem parte do Dashboard
const dashboardElements = document.querySelectorAll(
    ".welcome, .stats-grid, .dashboard-grid, .activity-panel, .footer"
);


navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");


        const page = link.dataset.page;

        if (page === "dashboard") {
            breadcrumb.textContent = "Workspace / Dashboard";
            pageTitle.textContent = "Dashboard";
        }

        if (page === "vehicles") {
            breadcrumb.textContent = "Workspace / Veículos";
            pageTitle.textContent = "Veículos";
        }

        // ========================================
        // VEÍCULOS
        // ========================================

        if (page === "vehicles") {

            dashboardElements.forEach((element) => {
                element.style.display = "none";
            });

            const vehicles = [
                {
                    name: "Ford Ranger",
                    plate: "ABC-1234",
                    year: "2024",
                    type: "Picape",
                    status: "Operacional"
                },
                {
                    name: "Fiat Ducato",
                    plate: "DEF-5678",
                    year: "2023",
                    type: "Van",
                    status: "Em manutenção"
                },
                {
                    name: "Toyota Corolla",
                    plate: "GHI-9012",
                    year: "2022",
                    type: "Sedan",
                    status: "Operacional"
                },
                {
                    name: "Mercedes Sprinter",
                    plate: "JKL-3456",
                    year: "2021",
                    type: "Utilitário",
                    status: "Inativo"
                }
            ];

            pageContent.innerHTML = `
                <section class="panel vehicles-page">

                    <div class="panel-header">

                        <div>
                            <p class="eyebrow">
                                FROTA
                            </p>

                            <h3>
                                Veículos
                            </h3>
                        </div>

                        <button class="primary-button">
                            + Adicionar veículo
                        </button>

                    </div>


                    <!-- RESUMO -->

                    <div class="vehicles-summary">

                        <div class="vehicle-summary-card">

                            <span>Total de veículos</span>

                            <strong>12</strong>

                        </div>


                        <div class="vehicle-summary-card">

                            <span>Operacionais</span>

                            <strong>9</strong>

                        </div>


                        <div class="vehicle-summary-card">

                            <span>Em manutenção</span>

                            <strong>2</strong>

                        </div>


                        <div class="vehicle-summary-card">

                            <span>Inativos</span>

                            <strong>1</strong>

                        </div>

                    </div>


                    <!-- FERRAMENTAS -->

                    <div class="vehicles-toolbar">

                        <input
                            type="text"
                            class="vehicle-search"
                            placeholder="Buscar veículo..."
                        >


                        <select class="vehicle-filter">

                            <option value="all">
                                Todos os status
                            </option>

                            <option value="operational">
                                Operacional
                            </option>

                            <option value="maintenance">
                                Em manutenção
                            </option>

                            <option value="inactive">
                                Inativo
                            </option>

                        </select>

                    </div>


                    <!-- TABELA -->

                    <div class="vehicles-table">

                        <div class="vehicle-table-header">

                            <span>Veículo</span>
                            <span>Placa</span>
                            <span>Tipo</span>
                            <span>Status</span>
                            <span>Ações</span>

                        </div>


                        <div class="vehicle-table-row">

                            <div class="vehicle-table-name">

                                <div class="vehicle-icon">
                                    🚙
                                </div>

                                <div>
                                    <strong>Ford Ranger</strong>
                                    <span>2024</span>
                                </div>

                            </div>

                            <span>ABC-1234</span>

                            <span>Picape</span>

                            <span class="badge operational">
                                Operacional
                            </span>

                            <button class="table-action">
                                Ver
                            </button>

                        </div>


                        <div class="vehicle-table-row">

                            <div class="vehicle-table-name">

                                <div class="vehicle-icon">
                                    🚐
                                </div>

                                <div>
                                    <strong>Fiat Ducato</strong>
                                    <span>2023</span>
                                </div>

                            </div>

                            <span>DEF-5678</span>

                            <span>Van</span>

                            <span class="badge maintenance">
                                Em manutenção
                            </span>

                            <button class="table-action">
                                Ver
                            </button>

                        </div>


                        <div class="vehicle-table-row">

                            <div class="vehicle-table-name">

                                <div class="vehicle-icon">
                                    🚗
                                </div>

                                <div>
                                    <strong>Toyota Corolla</strong>
                                    <span>2022</span>
                                </div>

                            </div>

                            <span>GHI-9012</span>

                            <span>Sedan</span>

                            <span class="badge operational">
                                Operacional
                            </span>

                            <button class="table-action">
                                Ver
                            </button>

                        </div>


                        <div class="vehicle-table-row">

                            <div class="vehicle-table-name">

                                <div class="vehicle-icon">
                                    🚚
                                </div>

                                <div>
                                    <strong>Mercedes Sprinter</strong>
                                    <span>2021</span>
                                </div>

                            </div>

                            <span>JKL-3456</span>

                            <span>Utilitário</span>

                            <span class="badge inactive">
                                Inativo
                            </span>

                            <button class="table-action">
                                Ver
                            </button>

                        </div>

                    </div>

                    <!-- DETALHES DO VEÍCULO -->

                    <div class="vehicle-details" id="vehicle-details">

                        <div class="vehicle-details-header">

                            <div>
                                <p class="eyebrow">
                                    DETALHES
                                </p>

                                <h3 id="vehicle-details-title">
                                    Selecione um veículo
                                </h3>
                            </div>
                        
                            <button class="table-action" id="close-details">
                                Fechar
                            </button>
                        
                        </div>

                        <div class="vehicle-details-content">

                            <p>
                                Clique em "Ver" para visualizar as informações do veículo.
                            </p>
                        
                        </div>
                    
                    </div>

                </section>
            `;

            const vehicleSearch = document.querySelector(".vehicle-search");
            const vehicleFilter = document.querySelector(".vehicle-filter");
            const vehicleRows = document.querySelectorAll(".vehicle-table-row");
            
            function filterVehicles() {

                const searchTerm = vehicleSearch.value.toLowerCase();
                const selectedStatus = vehicleFilter.value;

                vehicleRows.forEach((row) => {

                    const vehicleName = row
                        .querySelector(".vehicle-table-name strong")
                        .textContent
                        .toLowerCase();

                    const plate = row
                        .querySelector(".vehicle-table-name + span")
                        .textContent
                        .toLowerCase();

                    const status = row
                        .querySelector(".badge")
                        .textContent
                        .toLowerCase();

                    const matchesSearch =
                        vehicleName.includes(searchTerm) ||
                        plate.includes(searchTerm);

                    const matchesStatus =
                        selectedStatus === "all" ||
                        (
                            selectedStatus === "operational" &&
                            status.includes("operacional")
                        ) ||
                        (
                            selectedStatus === "maintenance" &&
                            status.includes("manutenção")
                        ) ||
                        (
                            selectedStatus === "inactive" &&
                            status.includes("inativo")
                        );
                    if (matchesSearch && matchesStatus) {
                        row.style.display = "grid";
                    } else {
                        row.style.display = "none";
                    }
                });
            }

            vehicleSearch.addEventListener("input", filterVehicles);
            vehicleFilter.addEventListener("change", filterVehicles);

            const vehicleButtons = document.querySelectorAll(".vehicle-table-row .table-action");

            const vehicleDetails = document.querySelector("#vehicle-details");
            const vehicleDetailsTitle = document.querySelector("#vehicle-details-title");
            const vehicleDetailsContent = document.querySelector(".vehicle-details-content");
            const closeDetailsContent = document.querySelector("#close-details");

            vehicleButtons.forEach((button, index) => {

                button.addEventListener("click", () => {
                    
                    const vehicle = vehicles[index];

                    vehicleDetailsTitle.textContent = vehicle.name;

                    vehicleDetailsContent.innerHTML = `
                        <p><strong>Placa:</strong> ${vehicle.plate}</p>
                        <p><strong>Ano:</strong> ${vehicle.year}</p>
                        <p><strong>Tipo:</strong> ${vehicle.type}</p>
                        <p><strong>Status:</strong> ${vehicle.status}</p>    
                    `;

                });

            });

            closeDetailsContent.addEventListener("click", () => {

                vehicleDetailsTitle.textContent = "Selecione um veículo";
                
                vehicleDetailsContent.innerHTML = `
                    <p>
                        Clique em "Ver" para visualizar as informações do veículo.
                    </p>
                `;

            });

            return;
        }


        // ========================================
        // OUTRAS PÁGINAS
        // ========================================

        dashboardElements.forEach((element) => {
            element.style.display = "";
        });

        pageContent.innerHTML = "";

    });
});
