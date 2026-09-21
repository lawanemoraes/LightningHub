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

// ========================================
// DADOS DOS VEÍCULOS
// ========================================

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

// ========================================
// RENDERIZAR VEÍCULOS
// ========================================

function renderVehicles() {

    const vehicleTable = document.querySelector(".vehicles-table");

    if (!vehicleTable) {
        return;
    }

    vehicleTable.innerHTML = `
        <div class="vehicle-table-header">

            <span>Veículo</span>
            <span>Placa</span>
            <span>Tipo</span>
            <span>Status</span>
            <span>Ações</span>

        </div>

        ${vehicles.map((vehicle, index) => `

            <div class="vehicle-table-row">

                <div class="vehicle-table-name">

                    <div class="vehicle-icon">
                        🚗
                    </div>

                    <div>
                        <strong>${vehicle.name}</strong>
                        <span>${vehicle.year}</span>
                    </div>

                </div>

                <span>${vehicle.plate}</span>

                <span>${vehicle.type}</span>

                <span class="badge ${getStatusClass(vehicle.status)}">
                    ${vehicle.status}
                </span>

                <button
                    class="table-action"
                    data-index="${index}"
                    type="button"
                >
                    Ver
                </button>

            </div>

        `).join("")}
    `;


    // ========================================
    // BOTÕES "VER"
    // ========================================

    const vehicleButtons = vehicleTable.querySelectorAll(".table-action");

    const vehicleDetailsTitle = document.querySelector("#vehicle-details-title");
    const vehicleDetailsContent = document.querySelector(".vehicle-details-content");

    vehicleButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);
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

}


// ========================================
// CLASSE DO STATUS
// ========================================

function getStatusClass(status) {

    if (status === "Operacional") {
        return "operational";
    }

    if (status === "Em manutenção") {
        return "maintenance";
    }

    if (status === "Inativo") {
        return "inactive";
    }

    return "";
}


// ========================================
// ATUALIZAR RESUMO DOS VEÍCULOS
// ========================================

function updateVehiclesSummary() {

    const totalVehicles = document.querySelector("#total-vehicles");
    const operationalVehicles = document.querySelector("#operational-vehicles");
    const maintenanceVehicles = document.querySelector("#maintenance-vehicles");
    const inactiveVehicles = document.querySelector("#inactive-vehicles");

    if (!totalVehicles) {
        return;
    }

    totalVehicles.textContent = vehicles.length;
    operationalVehicles.textContent = vehicles.filter((vehicle) => vehicle.status === "Operacional").length;
    maintenanceVehicles.textContent = vehicles.filter((vehicle) => vehicle.status === "Em manutenção").length;
    inactiveVehicles.textContent = vehicles.filter((vehicle) => vehicle.status === "Inativo").length;

}


// ========================================
// ATUALIZAR ESTATÍSTICAS DO DASHBOARD
// ========================================

function updateDashboardStats() {

    const dashboardTotalVehicles = document.querySelector("#dashboard-total-vehicles");
    const dashboardActiveVehicles = document.querySelector("#dashboard-active-vehicles");
    const dashboardMaintenanceVehicles = document.querySelector("#dashboard-maintenance-vehicles");

    if (!dashboardTotalVehicles) {
        return;
    }

    dashboardTotalVehicles.textContent = vehicles.length;
    dashboardActiveVehicles.textContent = vehicles.filter((vehicle) => vehicle.status === "Operacional").length;
    dashboardMaintenanceVehicles.textContent = vehicles.filter((vehicle) => vehicle.status === "Em manutenção").length;

}

updateDashboardStats();


// ========================================
// ABRIR FORMULÁRIO DE VEÍCULO
// ========================================

function openAddVehicleForm() {

    const existingModal = document.querySelector(".vehicle-modal");

    if (existingModal) {
        return;
    }

    const modal = document.createElement("div");

    modal.classList.add("vehicle-modal");

    modal.innerHTML = `

        <div class ="vehicle-modal-content">

            <div class="vehicle-modal-header">

                <div>

                    <h3>
                        Novo veículo
                    </h3>

                </div>

                <button
                    type="button"
                    class="table-action"
                    id="close-vehicle-modal"
                >
                    Fechar
                </button>

            </div>

            <form id="add-vehicle-form">

                <div class="vehicle-form-group">

                    <label for="vehicle-name">
                        Veículo
                    </label>

                    <input
                        type="text"
                        id="vehicle-name"
                        placeholder="Ex.: Ford Ranger"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="vehicle-plate">
                        Placa
                    </label>

                    <input
                        type="text"
                        id="vehicle-plate"
                        placeholder="Ex.: ABC-1234"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="vehicle-year">
                        Ano
                    </label>

                    <input
                        type="number"
                        id="vehicle-year"
                        placeholder="Ex.: 2024"
                        min="1900"
                        max="2100"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="vehicle-type">
                        Tipo
                    </label>

                    <input
                        type="text"
                        id="vehicle-type"
                        placeholder="Ex.: Picape"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="vehicle-status">
                        Status
                    </label>

                    <select
                        id="vehicle-status"
                        required
                    >

                        <option value="Operacional">
                            Operacional
                        </option>

                        <option value="Em manutenção">
                            Em manutenção
                        </option>

                        <option value="Inativo">
                            Inativo
                        </option>

                    </select>

                </div>

                <div class="vehicle-form-actions">

                    <button
                        type="button"
                        class="table-action"
                        id="cancel-vehicle-modal"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Adicionar veículo
                    </button>

                </div>

            </form>

        </div>


     `;

    document.body.appendChild(modal);

    const closeModal = document.querySelector("#close-vehicle-modal");
    const cancelModal = document.querySelector("#cancel-vehicle-modal");

    const vehicleForm = document.querySelector("#add-vehicle-form");

    vehicleForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.querySelector("#vehicle-name").value;
        const plate = document.querySelector("#vehicle-plate").value;
        const year = document.querySelector("#vehicle-year").value;
        const type = document.querySelector("#vehicle-type").value;
        const status = document.querySelector("#vehicle-status").value;

        vehicles.push({
            name: name,
            plate: plate,
            year: year,
            type: type,
            status: status
        });

        renderVehicles();
        updateVehiclesSummary();
        updateDashboardStats();
        
        modal.remove();

    });

    closeModal.addEventListener("click", () => modal.remove());
    cancelModal.addEventListener("click", () => modal.remove());

}

const dashboardAddVehicleButton = document.querySelector("#dashboard-add-vehicle-button");
dashboardAddVehicleButton.addEventListener("click", openAddVehicleForm);


// ========================================
// NAVEGAÇÃO ENTRE PÁGINAS
// ========================================

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");


        const page = link.dataset.page;

        // ========================================
        // DASHBOARD
        // ========================================

        if (page === "dashboard") {
            breadcrumb.textContent = "Workspace / Dashboard";
            pageTitle.textContent = "Dashboard";
        }

        // ========================================
        // VEÍCULOS
        // ========================================

        if (page === "vehicles") {
            breadcrumb.textContent = "Workspace / Veículos";
            pageTitle.textContent = "Veículos";

            dashboardElements.forEach((element) => {
                element.style.display = "none";
            });

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


                        <button class="primary-button" id="add-vehicle-button">
                            + Adicionar veículo
                        </button>

                    </div>


                    <!-- RESUMO -->

                    <div class="vehicles-summary">

                        <div class="vehicle-summary-card">

                            <span>
                                Total de veículos
                            </span>

                            <strong id="total-vehicles">
                                0
                            </strong>

                        </div>


                        <div class="vehicle-summary-card">

                            <span>
                                Operacionais
                            </span>

                            <strong id="operational-vehicles">
                                0
                            </strong>

                        </div>


                        <div class="vehicle-summary-card">

                            <span>
                                Em manutenção
                            </span>

                            <strong id="maintenance-vehicles">
                                0
                            </strong>

                        </div>


                        <div class="vehicle-summary-card">

                            <span>
                                Inativos
                            </span>

                            <strong id="inactive-vehicles">
                                0
                            </strong>

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

                    <div class="vehicles-table"></div>


                    <!-- DETALHES DO VEÍCULO -->

                    <div
                        class="vehicle-details"
                        id="vehicle-details"
                    >

                        <div class="vehicle-details-header">

                            <div>

                                <p class="eyebrow">
                                    DETALHES
                                </p>

                                <h3 id="vehicle-details-title">
                                    Selecione um veículo
                                </h3>

                            </div>


                            <button
                                class="table-action"
                                id="close-details"
                            >
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


            // ========================================
            // RENDERIZAR TABELA
            // ========================================

            renderVehicles();
            updateVehiclesSummary();

            const addVehicleButton = document.querySelector("#add-vehicle-button");

            addVehicleButton.addEventListener("click", openAddVehicleForm);

                        const vehicleSearch = document.querySelector(".vehicle-search");
            const vehicleFilter = document.querySelector(".vehicle-filter");


            // ========================================
            // FILTRAR VEÍCULOS
            // ========================================

            function filterVehicles() {

                const searchTerm = vehicleSearch.value.toLowerCase();
                const selectedStatus = vehicleFilter.value;

                const vehicleRows = document.querySelectorAll(".vehicle-table-row");

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

            const closeDetailsContent = document.querySelector("#close-details");

            closeDetailsContent.addEventListener("click", () => {

                const vehicleDetailsTitle = document.querySelector("#vehicle-details-title");
                const vehicleDetailsContent = document.querySelector(".vehicle-details-content");

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
