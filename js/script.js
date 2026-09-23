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
// DADOS DOS MOTORISTAS
// ========================================

let drivers = [];

async function loadDrivers() {

    try {

        const response = await fetch("http://localhost:3000/api/motoristas");

        if (!response.ok) {
            throw new Error("Erro ao buscar motoristas.");
        }

        const data = await response.json();

        drivers = data.map((driver) => ({
            id: driver.id,
            name: driver.nome,
            cpf: driver.cpf,
            cnh: driver.cnh,
            category: driver.categoria_cnh,
            licenseExpiration: driver.validade_cnh,
            phone: driver.telefone,
            status: driver.status
        }));

    } catch (error) {

        console.error("Erro ao carregar motoristas:", error);

    }

}


// ========================================
// FILTRAR MOTORISTAS
// ========================================

function filterDrivers(searchTerm) {

    const term = searchTerm
        .toLowerCase()
        .trim();

    if (!term) {
        return [...drivers];
    }

    return drivers.filter((driver) =>
        driver.name.toLowerCase().includes(term) ||
        driver.cpf.includes(term) ||
        driver.cnh.includes(term)
    );
}


// ========================================
// RENDERIZAR MOTORISTAS
// ========================================

function renderDrivers() {

    const driverTable = document.querySelector(".drivers-table");

    if (!driverTable) {
        return;
    }

    const searchInput = document.querySelector("#driver-search-input");

    const searchTerm = searchInput
        ? searchInput.value
        : "";

    const sortedDrivers = filterDrivers(searchTerm).sort((a, b) =>
        a.name.localeCompare(b.name, "pt-BR")
    );

    driverTable.innerHTML = `
        <div class="driver-table-header">

            <span>Motorista</span>
            <span>CNH</span>
            <span>Categoria</span>
            <span>Telefone</span>
            <span>Status</span>
            <span>Ações</span>

        </div>

        ${sortedDrivers.map((driver) => `

            <div class="driver-table-row">

                <div class="driver-table-name">

                    <div class="driver-icon">
                        👤
                    </div>

                    <div>
                        <strong>${driver.name}</strong>
                        <span>CPF: ${driver.cpf}</span>
                    </div>

                </div>

                <span>${driver.cnh}</span>

                <span>${driver.category}</span>

                <span>${driver.phone}</span>

                <span class="badge ${
                    driver.status === "Ativo"
                        ? "operational"
                        : "inactive"
                }">
                    ${driver.status}
                </span>

                <div class="driver-actions">

                    <button
                        class="table-action"
                        data-id="${driver.id}"
                        type="button"
                    >
                        Ver
                    </button>

                </div>

            </div>

        `).join("")}

    `;

    const driverButtons = driverTable.querySelectorAll(".table-action");

    driverButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const driverId = Number(button.dataset.id);

            showDriverDetails(driverId);

        });

    });

}

function showDriverDetails(driverId) {

    const driver = drivers.find((item) => item.id === driverId);

    if (!driver) {
        return;
    }

    const driverTable = document.querySelector(".drivers-table");

    if (!driverTable) {
        return;
    }

    const existingDetails = document.querySelector(".driver-details");

    if (existingDetails) {
        existingDetails.remove();
    }

    const details = document.createElement("div");

    details.className = "driver-details";

    details.innerHTML = `
        <div class="driver-details-header">

            <div>
                <p class="eyebrow">
                    MOTORISTA
                </p>

                <h3>
                    ${driver.name}
                </h3>
            </div>

            <button
                class="table-action"
                id="close-driver-details"
                type="button"
            >
                Fechar
            </button>

        </div>

        <div class="driver-details-content">

            <p><strong>CPF:</strong> ${driver.cpf}</p>

            <p><strong>CNH:</strong> ${driver.cnh}</p>

            <p><strong>Categoria:</strong> ${driver.category}</p>

            <p><strong>Validade da CNH:</strong> ${driver.licenseExpiration}</p>

            <p><strong>Telefone:</strong> ${driver.phone}</p>

            <p><strong>Status:</strong> ${driver.status}</p>

        </div>
    `;

    driverTable.parentElement.appendChild(details);

    const closeButton = document.querySelector("#close-driver-details");

    closeButton.addEventListener("click", () => {
        details.remove();
    });
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

    const vehicleButtons = vehicleTable.querySelectorAll(".table-action:not(.edit-vehicle-button)");

    vehicleButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const vehicleId = Number(button.dataset.id);

            showVehicleDetails(vehicleId);

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
// DETALHES DO VEÍCULO
// ========================================

function showVehicleDetails(vehicleId) {

    const vehicle = vehicles.find((item) => item.id === vehicleId);

    if (!vehicle) {
        return;
    }

    const vehicleTable = document.querySelector(".vehicles-table");

    if (!vehicleTable) {
        return;
    }

    const existingDetails = document.querySelector(".vehicle-details");

    if (existingDetails) {
        existingDetails.remove();
    }

    const details = document.createElement("div");

    details.className = "vehicle-details";

    details.innerHTML = `
        <div class="vehicle-details-header">

            <div>
                <p class="eyebrow">
                    VEÍCULO
                </p>

                <h3>
                    ${vehicle.name}
                </h3>
            </div>

            <button
                class="table-action"
                id="close-vehicle-details"
                type="button"
            >
                Fechar
            </button>

        </div>

        <div class="vehicle-details-content">

            <p><strong>Placa:</strong> ${vehicle.plate}</p>

            <p><strong>Ano:</strong> ${vehicle.year}</p>

            <p><strong>Tipo:</strong> ${vehicle.type}</p>

            <p><strong>Status:</strong> ${vehicle.status}</p>

        </div>
    `;

    vehicleTable.parentElement.appendChild(details);

    const closeButton = document.querySelector("#close-vehicle-details");

    closeButton.addEventListener("click", () => {
        details.remove();
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
// ATUALIZAR ESTATÍSTICAS DOS MOTORISTAS
// ========================================

function updateDriversStats() {

    const dashboardTotalDrivers = document.querySelector("#dashboard-total-drivers");

    if (!dashboardTotalDrivers) {
        return;
    }

    dashboardTotalDrivers.textContent = drivers.length;
}


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
// ABRIR FORMULÁRIO DE MOTORISTA - CADASTRO
// ========================================

function openAddDriverForm() {

    const existingModal = document.querySelector(".driver-modal");

    if (existingModal) {
        return;
    }

    const modal = document.createElement("div");

    modal.classList.add("driver-modal");

    modal.innerHTML = `

        <div class="driver-modal-content">

            <div class="driver-modal-header">

                <div>

                    <h3>
                        Novo motorista
                    </h3>

                </div>

                <button
                    type="button"
                    class="table-action"
                    id="close-driver-modal"
                >
                    Fechar
                </button>

            </div>

            <form id="add-driver-form">

                <div class="driver-form-group">

                    <label for="driver-name">
                        Nome
                    </label>

                    <input
                        type="text"
                        id="driver-name"
                        placeholder="Ex.: João da Silva"
                        required
                    >

                </div>

                <div class="driver-form-group">

                    <label for="driver-cpf">
                        CPF
                    </label>

                    <input
                        type="text"
                        id="driver-cpf"
                        placeholder="Ex.: 12345678901"
                        maxlength="11"
                        required
                    >

                </div>

                <div class="driver-form-group">

                    <label for="driver-cnh">
                        CNH
                    </label>

                    <input
                        type="text"
                        id="driver-cnh"
                        placeholder="Ex.: 98765432100"
                        maxlength="11"
                        required
                    >

                </div>

                <div class="driver-form-group">

                    <label for="driver-category">
                        Categoria CNH
                    </label>

                    <select
                        id="driver-category"
                        required
                    >

                        <option value="" disabled selected>
                            Selecione a categoria
                        </option>

                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="AB">AB</option>
                        <option value="AC">AC</option>
                        <option value="AD">AD</option>
                        <option value="AE">AE</option>

                    </select>

                </div>

                <div class="driver-form-group">

                    <label for="driver-license-expiration">
                        Validade da CNH
                    </label>

                    <input
                        type="date"
                        id="driver-license-expiration"
                        required
                    >

                </div>

                <div class="driver-form-group">

                    <label for="driver-phone">
                        Telefone
                    </label>

                    <input
                        type="text"
                        id="driver-phone"
                        placeholder="Ex.: 15999999999"
                        maxlength="15"
                        required
                    >

                </div>

                <div class="driver-form-group">

                    <label for="driver-status">
                        Status
                    </label>

                    <select
                        id="driver-status"
                        required
                    >

                        <option value="Ativo">
                            Ativo
                        </option>

                        <option value="Inativo">
                            Inativo
                        </option>

                    </select>

                </div>

                <div class="driver-form-actions">

                    <button
                        type="button"
                        class="table-action"
                        id="cancel-driver-modal"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Adicionar motorista
                    </button>

                </div>

            </form>

        </div>

    `;

    document.body.appendChild(modal);

    const closeModal = document.querySelector("#close-driver-modal");
    const cancelModal = document.querySelector("#cancel-driver-modal");
    const driverForm = modal.querySelector("#add-driver-form");

    closeModal.addEventListener("click", () => modal.remove());
    cancelModal.addEventListener("click", () => modal.remove());

    driverForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome = modal.querySelector("#driver-name").value;
        const cpf = modal.querySelector("#driver-cpf").value;
        const cnh = modal.querySelector("#driver-cnh").value;
        const categoria_cnh = modal.querySelector("#driver-category").value;
        const validade_cnh = modal.querySelector("#driver-license-expiration").value;
        const telefone = modal.querySelector("#driver-phone").value;
        const status = modal.querySelector("#driver-status").value;

        try {

            const response = await fetch("http://localhost:3000/api/motoristas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    cpf: cpf,
                    cnh: cnh,
                    categoria_cnh: categoria_cnh,
                    validade_cnh: validade_cnh,
                    telefone: telefone,
                    status: status
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar motorista.");
            }

            const newDriver = await response.json();

            drivers.push({
                id: newDriver.id,
                name: newDriver.nome,
                cpf: newDriver.cpf,
                cnh: newDriver.cnh,
                category: newDriver.categoria_cnh,
                licenseExpiration: newDriver.validade_cnh,
                phone: newDriver.telefone,
                status: newDriver.status
            });

            renderDrivers();
            updateDriversStats();
            modal.remove();

        } catch (error) {

            console.error("Erro ao cadastrar motorista:", error);

            alert("Não foi possível cadastrar o motorista.");

        }

    });

}


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

            return;
        }

        if (page === "drivers") {

            breadcrumb.textContent = "Workspace / Motoristas";
            pageTitle.textContent = "Motoristas";

            dashboardElements.forEach((element) => {
                element.style.display = "none";
            });

            pageContent.innerHTML = `

                <section class="panel drivers-page">

                    <div class="panel-header">

                        <div>

                            <p class="eyebrow">
                                EQUIPE
                            </p>

                            <h3>
                                Motoristas
                            </h3>

                        </div>

                        <button class="primary-button" id="add-driver-button">
                            + Adicionar motorista
                        </button>

                    </div>

                    <div class="driver-search">

                        <input
                            type="text"
                            id="driver-search-input"
                            placeholder="Buscar motorista..."
                        >

                    </div>

                    <div class="drivers-table"></div>

                </section>

            `;

        const addDriverButton = document.querySelector("#add-driver-button");

        addDriverButton.addEventListener("click", openAddDriverForm);

        const driverSearchInput = document.querySelector("#driver-search-input");

        driverSearchInput.addEventListener("input", () => {
            renderDrivers();
        });

        loadDrivers().then(() => {
            renderDrivers();
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

loadDrivers().then(() => {
    updateDriversStats();
});
