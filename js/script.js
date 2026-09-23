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

let vehicles = [];

async function loadVehicles() {

    try {

        const response = await fetch("http://localhost:3000/api/veiculos");

        if (!response.ok) {
            throw new Error("Erro ao buscar veículos.");
        }

        const data = await response.json();

        vehicles = data.map((vehicle) => ({
            id: vehicle.id,
            marca: vehicle.marca,
            modelo: vehicle.modelo,
            name: `${vehicle.marca} ${vehicle.modelo}`,
            plate: vehicle.placa,
            year: vehicle.ano,
            type: vehicle.tipo,
            status: vehicle.status
        }));

    } catch (error) {

        console.error("Erro ao carregar veículos:", error);

    }

}

// ========================================
// RENDERIZAR VEÍCULOS
// ========================================

function renderVehicles() {

    const vehicleTable = document.querySelector(".vehicles-table");

    if (!vehicleTable) {
        return;
    }

    const sortedVehicles = [...vehicles].sort((a, b) =>
        a.name.localeCompare(b.name, "pt-BR")
    );

    vehicleTable.innerHTML = `
        <div class="vehicle-table-header">

            <span>Veículo</span>
            <span>Placa</span>
            <span>Tipo</span>
            <span>Status</span>
            <span>Ações</span>

        </div>

       ${sortedVehicles.map((vehicle, index) => `

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

                <div class="vehicle-actions">

                    <button
                        class="table-action"
                        data-id="${vehicle.id}"
                        type="button"
                    >
                        Ver
                    </button>

                    <button
                        class="table-action edit-vehicle-button"
                        data-id="${vehicle.id}"
                        type="button"
                    >
                        Editar
                    </button>

                </div>

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

            const id = Number(button.dataset.id);
            const vehicle = vehicles.find((item) => item.id === id);

            vehicleDetailsTitle.textContent = vehicle.name;

            vehicleDetailsContent.innerHTML = `
                <p><strong>Placa:</strong> ${vehicle.plate}</p>
                <p><strong>Ano:</strong> ${vehicle.year}</p>
                <p><strong>Tipo:</strong> ${vehicle.type}</p>
                <p><strong>Status:</strong> ${vehicle.status}</p>
            `;

        });

    });

    const editVehicleButtons = vehicleTable.querySelectorAll(".edit-vehicle-button");

    editVehicleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const vehicle = vehicles.find((item) => item.id === id);

            openEditVehicleForm(vehicle);
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
// ABRIR FORMULÁRIO DE VEÍCULO - EDIÇÃO
// ========================================

function openEditVehicleForm(vehicle) {

    const modal = document.createElement("div");

    modal.classList.add("vehicle-modal");

    modal.innerHTML = `

        <div class="vehicle-modal-content">

            <div class="vehicle-modal-header">

                <div>

                    <h3>
                        Editar veículo
                    </h3>

                </div>

                <button
                    type="button"
                    class="table-action"
                    id="close-edit-vehicle-modal"
                >
                    Fechar
                </button>

            </div>

            <form id="edit-vehicle-form">

                <div class="vehicle-form-group">

                    <label for="edit-vehicle-brand">
                        Marca
                    </label>

                    <input
                        type="text"
                        id="edit-vehicle-brand"
                        value="${vehicle.marca}"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="edit-vehicle-model">
                        Modelo
                    </label>

                    <input
                        type="text"
                        id="edit-vehicle-model"
                        value="${vehicle.modelo}"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="edit-vehicle-plate">
                        Placa
                    </label>

                    <input
                        type="text"
                        id="edit-vehicle-plate"
                        value="${vehicle.plate}"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="edit-vehicle-year">
                        Ano
                    </label>

                    <input
                        type="number"
                        id="edit-vehicle-year"
                        value="${vehicle.year}"
                        min="1900"
                        max="2100"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="edit-vehicle-type">
                        Tipo
                    </label>

                    <input
                        type="text"
                        id="edit-vehicle-type"
                        value="${vehicle.type}"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="edit-vehicle-status">
                        Status
                    </label>

                    <select
                        id="edit-vehicle-status"
                        required
                    >

                        <option value="Operacional" ${vehicle.status === "Operacional" ? "selected" : ""}>
                            Operacional
                        </option>

                        <option value="Em manutenção" ${vehicle.status === "Em manutenção" ? "selected" : ""}>
                            Em manutenção
                        </option>

                        <option value="Inativo" ${vehicle.status === "Inativo" ? "selected" : ""}>
                            Inativo
                        </option>

                    </select>

                </div>

                <div class="vehicle-form-actions">

                    <button
                        type="button"
                        class="table-action"
                        id="cancel-edit-vehicle-modal"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Salvar alterações
                    </button>

                </div>

            </form>

        </div>
    `;

    document.body.appendChild(modal);

    const closeButton = modal.querySelector("#close-edit-vehicle-modal");
    const cancelButton = modal.querySelector("#cancel-edit-vehicle-modal");

    closeButton.addEventListener("click", () => {
        modal.remove();
    });

    cancelButton.addEventListener("click", () => {
        modal.remove();
    });

    const editVehicleForm = modal.querySelector("#edit-vehicle-form");

    editVehicleForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const marca = modal.querySelector("#edit-vehicle-brand").value;
        const modelo = modal.querySelector("#edit-vehicle-model").value;
        const placa = modal.querySelector("#edit-vehicle-plate").value;
        const ano = modal.querySelector("#edit-vehicle-year").value;
        const tipo = modal.querySelector("#edit-vehicle-type").value;
        const status = modal.querySelector("#edit-vehicle-status").value;

        try {

            const response = await fetch(`http://localhost:3000/api/veiculos/${vehicle.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    marca: marca,
                    modelo: modelo,
                    placa: placa,
                    ano: Number(ano),
                    tipo: tipo,
                    status: status
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar veículo.");
            }

            const updatedVehicle = await response.json();

            const vehicleIndex = vehicles.findIndex(
                (item) => item.id === vehicle.id
            );

            vehicles[vehicleIndex] = {
                id: updatedVehicle.id,
                marca: updatedVehicle.marca,
                modelo: updatedVehicle.modelo,
                name: `${updatedVehicle.marca} ${updatedVehicle.modelo}`,
                plate: updatedVehicle.placa,
                year: updatedVehicle.ano,
                type: updatedVehicle.tipo,
                status: updatedVehicle.status
            };

            renderVehicles();
            updateVehiclesSummary();
            updateDashboardStats();

            modal.remove();

        } catch (error) {

            console.error("Erro ao atualizar veículo:", error);
            alert("Não foi possível atualizar o veículo.");

        }
    
    });

}


// ========================================
// ABRIR FORMULÁRIO DE VEÍCULO - CADASTRO
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

                    <label for="vehicle-brand">
                        Marca
                    </label>

                    <input
                        type="text"
                        id="vehicle-brand"
                        placeholder="Ex.: Ford"
                        required
                    >

                </div>

                <div class="vehicle-form-group">

                    <label for="vehicle-model">
                        Modelo
                    </label>

                    <input
                        type="text"
                        id="vehicle-model"
                        placeholder="Ex.: Ranger"
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

    vehicleForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const marca = document.querySelector("#vehicle-brand").value;
        const modelo = document.querySelector("#vehicle-model").value;
        const placa = document.querySelector("#vehicle-plate").value;
        const ano = document.querySelector("#vehicle-year").value;
        const tipo = document.querySelector("#vehicle-type").value;
        const status = document.querySelector("#vehicle-status").value;

        try {

            const response = await fetch("http://localhost:3000/api/veiculos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({
                marca: marca,
                modelo: modelo,
                placa: placa,
                ano: Number(ano),
                tipo: tipo,
                status: status
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar veículo.");
        }

        const newVehicle = await response.json();

        vehicles.push({
            id: newVehicle.id,
            marca: newVehicle.marca,
            modelo: newVehicle.modelo,
            name: `${newVehicle.marca} ${newVehicle.modelo}`,
            plate: newVehicle.placa,
            year: newVehicle.ano,
            type: newVehicle.tipo,
            status: newVehicle.status
        });

        renderVehicles();
        updateVehiclesSummary();
        updateDashboardStats();

        modal.remove();

    } catch (error) {

        console.error("Erro ao cadastrar veículo:", error);
        alert("Não foi possível cadastrar o veículo.");

    }

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

                let visibleVehicles = 0;

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
                        visibleVehicles++;
                    } else {
                        row.style.display = "none";
                    }

                });

                const vehicleTable = document.querySelector(".vehicles-table");

                let emptyMessage = document.querySelector(".vehicle-empty");

                if (visibleVehicles === 0) {
                    if (!emptyMessage) {
                        emptyMessage = document.createElement("div");
                        emptyMessage.classList.add("vehicle-empty");
                        emptyMessage.innerHTML = `
                            <p>
                                Nenhum veículo encontrado.
                            </p>
                        `;
                        vehicleTable.appendChild(emptyMessage);
                    }
                } else {
                    if (emptyMessage) {
                        emptyMessage.remove();
                    }

}

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

loadVehicles().then(() => {
    updateDashboardStats();
});
