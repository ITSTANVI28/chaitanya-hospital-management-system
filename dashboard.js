// =============================================
//  Chaitanya Hospital — Dashboard JavaScript
// =============================================

// ---- DATABASE DATA ----
let patientsData = [];
let wasteData = [];
let stockData = [];
let staffData = [];

async function fetchAllData() {
    try {
        const patientsRes = await fetch('api/get_patients.php');
        patientsData = await patientsRes.json();
        renderPatients(patientsData);
        updatePatientStats();
    } catch (e) { 
        console.error('Error fetching patients:', e); 
        renderPatients([]);
    }

    try {
        const wasteRes = await fetch('api/get_waste.php');
        wasteData = await wasteRes.json();
        wasteData.forEach(w => w.weight = parseFloat(w.weight));
        renderWaste(wasteData);
        updateWasteStats();
    } catch (e) { 
        console.error('Error fetching waste logs:', e); 
        renderWaste([]);
    }

    try {
        const stockRes = await fetch('api/get_stock.php');
        stockData = await stockRes.json();
        stockData.forEach(s => {
            s.qty = parseInt(s.qty);
            s.min = parseInt(s.min_threshold);
        });
        renderStock(stockData);
        renderOverviewAlerts();
    } catch (e) { 
        console.error('Error fetching stock:', e); 
        renderStock([]);
    }

    try {
        const staffRes = await fetch('api/get_staff.php');
        staffData = await staffRes.json();
        renderStaff(staffData);
        updateStaffStats();
    } catch (e) { 
        console.error('Error fetching staff:', e); 
        renderStaff([]);
    }
}

// ---- BADGE HELPERS ----

function patientStatusBadge(status) {
    const map = {
        "Critical":  "badge-red",
        "Stable":    "badge-green",
        "Post-Op":   "badge-orange",
        "Discharge": "badge-blue",
    };
    return `<span class="status-badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

function wasteTypeBadge(type) {
    const map = { "Biomedical": "waste-bio", "Sharps": "waste-sharps", "General": "waste-general" };
    return `<span class="status-badge ${map[type] || 'badge-gray'}">${type}</span>`;
}

function disposalBadge(status) {
    return status === "Disposed"
        ? `<span class="status-badge badge-green">Disposed</span>`
        : `<span class="status-badge badge-orange">Pending</span>`;
}

function stockStatusBadge(qty, min) {
    if (qty < min) return `<span class="status-badge badge-red">⚠ Restock Urgent</span>`;
    if (qty < min * 1.3) return `<span class="status-badge badge-orange">Low</span>`;
    return `<span class="status-badge badge-green">OK</span>`;
}

function shiftBadge(shift) {
    const map = { "Morning": "badge-blue", "Evening": "badge-orange", "Night": "badge-gray" };
    return `<span class="status-badge ${map[shift] || 'badge-gray'}">${shift}</span>`;
}

function staffStatusBadge(status) {
    const map = { "On Duty": "badge-green", "Off Duty": "badge-gray", "On Leave": "badge-orange" };
    return `<span class="status-badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

// ---- RENDER FUNCTIONS ----

function renderPatients(data) {
    const tbody = document.getElementById('patients-tbody');
    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted);">No records found.</td></tr>`;
        return;
    }
    tbody.innerHTML = data.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td>${p.age}</td>
            <td>${p.ward}</td>
            <td><code style="background:#f1f5f9;padding:2px 8px;border-radius:6px;font-size:12px;">${p.bed}</code></td>
            <td>${p.date}</td>
            <td>${p.doctor}</td>
            <td>${patientStatusBadge(p.status)}</td>
        </tr>
    `).join('');
}

function renderWaste(data) {
    const tbody = document.getElementById('waste-tbody');
    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text-muted);">No records found.</td></tr>`;
        return;
    }
    tbody.innerHTML = data.map(w => `
        <tr>
            <td>${w.date}</td>
            <td>${wasteTypeBadge(w.type)}</td>
            <td>${w.dept}</td>
            <td><strong>${w.weight} kg</strong></td>
            <td>${disposalBadge(w.status)}</td>
        </tr>
    `).join('');
}

function renderStock(data) {
    const tbody = document.getElementById('stock-tbody');
    const lowCount = data.filter(s => s.qty < s.min).length;
    const okCount  = data.filter(s => s.qty >= s.min).length;

    document.getElementById('total-items-count').textContent = stockData.length;
    document.getElementById('low-stock-count').textContent   = lowCount;
    document.getElementById('ok-stock-count').textContent    = okCount;
    document.getElementById('alertBadge').textContent        = lowCount;
    document.getElementById('overview-stock-alerts').textContent = lowCount;

    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted);">No records found.</td></tr>`;
        return;
    }
    tbody.innerHTML = data.map(s => {
        const isLow = s.qty < s.min;
        return `
            <tr class="${isLow ? 'row-danger' : ''}">
                <td><strong>${s.name}</strong></td>
                <td>${s.category}</td>
                <td><strong style="color:${isLow ? 'var(--red)' : 'var(--text)'}">${s.qty}</strong></td>
                <td>${s.min}</td>
                <td>${s.unit}</td>
                <td>${stockStatusBadge(s.qty, s.min)}</td>
            </tr>
        `;
    }).join('');
}

function renderStaff(data) {
    const tbody = document.getElementById('staff-tbody');
    if (!data.length) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--text-muted);">No records found.</td></tr>`;
        return;
    }
    tbody.innerHTML = data.map(s => `
        <tr>
            <td><strong>${s.name}</strong></td>
            <td>${s.role}</td>
            <td>${s.dept}</td>
            <td>${shiftBadge(s.shift)}</td>
            <td>${s.contact}</td>
            <td>${staffStatusBadge(s.status)}</td>
        </tr>
    `).join('');
}

function renderOverviewAlerts() {
    const alerts = stockData.filter(s => s.qty < s.min);
    const list = document.getElementById('overview-alerts-list');
    if (!alerts.length) {
        list.innerHTML = `<p style="padding:20px;color:var(--text-muted);text-align:center;">All stock levels are OK!</p>`;
        return;
    }
    list.innerHTML = alerts.map(a => `
        <div class="alert-item">
            <i class="fa-solid fa-circle-exclamation"></i>
            <div class="alert-item-info">
                <p>${a.name}</p>
                <span>${a.qty} ${a.unit} remaining (Min: ${a.min} ${a.unit})</span>
            </div>
            <span class="status-badge badge-red" style="margin-left:auto;">Urgent</span>
        </div>
    `).join('');
}

// ---- TAB NAVIGATION ----

const navItems = document.querySelectorAll('.nav-item[data-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');
const pageTitle = document.getElementById('pageTitle');

const tabTitles = {
    overview: 'Overview',
    patients: 'Patient & Bed Management',
    waste:    'Waste Management',
    stock:    'Stock Management',
    staff:    'Staff Information',
};

navItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const tab = item.dataset.tab;

        navItems.forEach(n => n.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        item.classList.add('active');
        document.getElementById(`tab-${tab}`).classList.add('active');
        pageTitle.textContent = tabTitles[tab] || 'Dashboard';

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
    });
});

// ---- MOBILE SIDEBAR TOGGLE ----

document.getElementById('menuToggleBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

// ---- FILTER LOGIC ----

// Patients
document.getElementById('patient-search').addEventListener('input', applyPatientFilter);
document.getElementById('ward-filter').addEventListener('change', applyPatientFilter);

function applyPatientFilter() {
    const search = document.getElementById('patient-search').value.toLowerCase();
    const ward   = document.getElementById('ward-filter').value;
    const filtered = patientsData.filter(p =>
        (ward === 'all' || p.ward === ward) &&
        (p.name.toLowerCase().includes(search) || p.bed.toLowerCase().includes(search))
    );
    renderPatients(filtered);
}

// Waste
document.getElementById('waste-filter').addEventListener('change', () => {
    const type = document.getElementById('waste-filter').value;
    const filtered = type === 'all' ? wasteData : wasteData.filter(w => w.type === type);
    renderWaste(filtered);
});

// Stock
document.getElementById('stock-search').addEventListener('input', applyStockFilter);
document.getElementById('stock-filter').addEventListener('change', applyStockFilter);

function applyStockFilter() {
    const search = document.getElementById('stock-search').value.toLowerCase();
    const cat    = document.getElementById('stock-filter').value;
    const filtered = stockData.filter(s =>
        (cat === 'all' || s.category === cat) &&
        s.name.toLowerCase().includes(search)
    );
    renderStock(filtered);
}

// Staff
document.getElementById('staff-search').addEventListener('input', applyStaffFilter);
document.getElementById('staff-filter').addEventListener('change', applyStaffFilter);

function applyStaffFilter() {
    const search = document.getElementById('staff-search').value.toLowerCase();
    const role   = document.getElementById('staff-filter').value;
    const filtered = staffData.filter(s =>
        (role === 'all' || s.role === role) &&
        s.name.toLowerCase().includes(search)
    );
    renderStaff(filtered);
}

const TOTAL_BEDS = 48;

function updatePatientStats() {
    const occupied = patientsData.filter(p => p.status !== 'Discharge').length;
    const available = TOTAL_BEDS - occupied;
    const discharges = patientsData.filter(p => p.status === 'Discharge').length;

    // Overview
    const oTotalBeds = document.getElementById('overview-total-beds');
    const oAvailableBeds = document.getElementById('overview-available-beds');
    if (oTotalBeds) oTotalBeds.textContent = TOTAL_BEDS;
    if (oAvailableBeds) oAvailableBeds.textContent = available;

    // Patient Tab
    const pTotalBeds = document.getElementById('patient-total-beds');
    const pOccupiedBeds = document.getElementById('patient-occupied-beds');
    const pAvailableBeds = document.getElementById('patient-available-beds');
    const pDischargesToday = document.getElementById('patient-discharges-today');
    if (pTotalBeds) pTotalBeds.textContent = TOTAL_BEDS;
    if (pOccupiedBeds) pOccupiedBeds.textContent = occupied;
    if (pAvailableBeds) pAvailableBeds.textContent = available;
    if (pDischargesToday) pDischargesToday.textContent = discharges;
}

function updateStaffStats() {
    const doctors = staffData.filter(s => s.role === 'Doctor').length;
    const nurses = staffData.filter(s => s.role === 'Nurse').length;
    const techs = staffData.filter(s => s.role === 'Lab Technician').length;
    const support = staffData.filter(s => s.role === 'Support Staff').length;
    const total = staffData.length;

    // Overview
    const oTotalStaff = document.getElementById('overview-total-staff');
    if (oTotalStaff) oTotalStaff.textContent = total;

    // Staff Tab
    const sDoctors = document.getElementById('staff-doctors-count');
    const sNurses = document.getElementById('staff-nurses-count');
    const sTechs = document.getElementById('staff-techs-count');
    const sSupport = document.getElementById('staff-support-count');
    if (sDoctors) sDoctors.textContent = doctors;
    if (sNurses) sNurses.textContent = nurses;
    if (sTechs) sTechs.textContent = techs;
    if (sSupport) sSupport.textContent = support;
}

function updateWasteStats() {
    if (wasteData.length === 0) return;
    const latestDate = wasteData[0].date;
    const todayWaste = wasteData.filter(w => w.date === latestDate);

    const biomedical = todayWaste.filter(w => w.type === 'Biomedical').reduce((sum, w) => sum + w.weight, 0);
    const sharps = todayWaste.filter(w => w.type === 'Sharps').reduce((sum, w) => sum + w.weight, 0);
    const general = todayWaste.filter(w => w.type === 'General').reduce((sum, w) => sum + w.weight, 0);
    const total = biomedical + sharps + general;

    // Update Waste Tab summary cards
    const wBio = document.getElementById('waste-biomedical-today');
    const wSharps = document.getElementById('waste-sharps-today');
    const wGeneral = document.getElementById('waste-general-today');
    const wTotal = document.getElementById('waste-total-today');
    if (wBio) wBio.textContent = `${biomedical.toFixed(1)} kg`;
    if (wSharps) wSharps.textContent = `${sharps.toFixed(1)} kg`;
    if (wGeneral) wGeneral.textContent = `${general.toFixed(1)} kg`;
    if (wTotal) wTotal.textContent = `${total.toFixed(1)} kg`;

    // Overview Waste Summary bars
    const maxVal = Math.max(biomedical, sharps, general, 1);
    const biomedicalPct = (biomedical / maxVal) * 100;
    const sharpsPct = (sharps / maxVal) * 100;
    const generalPct = (general / maxVal) * 100;

    const bioBar = document.getElementById('overview-waste-bar-biomedical');
    const sharpsBar = document.getElementById('overview-waste-bar-sharps');
    const generalBar = document.getElementById('overview-waste-bar-general');
    if (bioBar) bioBar.style.width = `${biomedicalPct}%`;
    if (sharpsBar) sharpsBar.style.width = `${sharpsPct}%`;
    if (generalBar) generalBar.style.width = `${generalPct}%`;

    const bioText = document.getElementById('overview-waste-text-biomedical');
    const sharpsText = document.getElementById('overview-waste-text-sharps');
    const generalText = document.getElementById('overview-waste-text-general');
    if (bioText) bioText.textContent = `${biomedical.toFixed(1)} kg`;
    if (sharpsText) sharpsText.textContent = `${sharps.toFixed(1)} kg`;
    if (generalText) generalText.textContent = `${general.toFixed(1)} kg`;

    const wasteTitle = document.querySelector('#tab-overview .overview-grid .card:last-child h2');
    if (wasteTitle) {
        wasteTitle.innerHTML = `<i class="fa-solid fa-trash-can"></i> Today's Waste Summary (${latestDate})`;
    }
}

// ---- INITIAL RENDER ----
fetchAllData();

// ---- BARCODE SCANNER ----

// Demo medicine barcode database (Indian medicine barcodes)
const medicineBarcodeDB = {
    "8901030827737": { name: "Crocin 500mg",          category: "Medicines",   unit: "Tablets" },
    "8906017060018": { name: "Dolo 650mg",             category: "Medicines",   unit: "Tablets" },
    "8904112800126": { name: "Azithromycin 500mg",     category: "Medicines",   unit: "Tablets" },
    "8901234567890": { name: "Amoxicillin 250mg",      category: "Medicines",   unit: "Capsules" },
    "8906001234567": { name: "Pantoprazole 40mg",      category: "Medicines",   unit: "Tablets" },
    "8901030856737": { name: "Disprin 350mg",          category: "Medicines",   unit: "Tablets" },
    "8906022001122": { name: "Surgical Gloves (M)",    category: "Consumables", unit: "Pairs" },
    "4006381333931": { name: "IV Drip Set",            category: "Consumables", unit: "Pcs" },
    "8901764000127": { name: "Syringes 5ml",           category: "Consumables", unit: "Pcs" },
    "8901030867891": { name: "Saline Solution 500ml",  category: "Medicines",   unit: "Bottles" },
};

let html5QrCode = null;
let html5QrCodeLive = null;
let lastScannedData = null;

function openScannerModal() {
    openModal('modal-scanner');
    document.getElementById('scanner-result').style.display  = 'none';
    document.getElementById('scanner-processing').style.display = 'none';
    document.getElementById('manual-barcode').value = '';
    document.getElementById('scanner-preview').innerHTML = '';
    document.getElementById('btn-start-cam').style.display = 'flex';
    document.getElementById('btn-stop-cam').style.display  = 'none';
    if (!html5QrCode) html5QrCode = new Html5Qrcode("qr-hidden-canvas");
}

function startLiveCamera() {
    document.getElementById('btn-start-cam').style.display = 'none';
    document.getElementById('btn-stop-cam').style.display  = 'block';
    document.getElementById('scanner-preview').innerHTML   = '';

    html5QrCodeLive = new Html5Qrcode("scanner-preview");
    html5QrCodeLive.start(
        { facingMode: "environment" },
        {
            fps: 15,
            qrbox: { width: 280, height: 100 },
            formatsToSupport: [
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.EAN_8,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.CODE_39,
                Html5QrcodeSupportedFormats.UPC_A,
                Html5QrcodeSupportedFormats.UPC_E,
                Html5QrcodeSupportedFormats.QR_CODE,
            ],
            experimentalFeatures: { useBarCodeDetectorIfSupported: true },
        },
        (decodedText) => {
            stopLiveCamera();
            lookupBarcode(decodedText);
        },
        () => {}
    ).catch(() => {
        document.getElementById('scanner-preview').innerHTML =
            `<div style="text-align:center;padding:24px;color:#94a3b8;">
                <i class="fa-solid fa-lock" style="font-size:32px;margin-bottom:8px;display:block;color:#ef4444;"></i>
                <p style="font-weight:700;color:#475569;font-size:14px;">Live camera साठी localhost लागतो</p>
                <p style="font-size:12px;margin-top:6px;">📁 HMS folder मधील <strong>start-server.bat</strong> double-click करा<br>
                मग browser मध्ये <strong>http://localhost:8000/dashboard.html</strong> उघडा</p>
            </div>`;
        document.getElementById('btn-start-cam').style.display = 'flex';
        document.getElementById('btn-stop-cam').style.display  = 'none';
    });
}

function stopLiveCamera() {
    if (html5QrCodeLive && html5QrCodeLive.isScanning) {
        html5QrCodeLive.stop().catch(() => {});
    }
    html5QrCodeLive = null;
    document.getElementById('btn-start-cam').style.display = 'flex';
    document.getElementById('btn-stop-cam').style.display  = 'none';
}


// Handle camera capture input
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('camera-input').addEventListener('change', handleImageFile);
    document.getElementById('image-upload-input').addEventListener('change', handleImageFile);
});

function handleImageFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById('scanner-result').style.display  = 'none';
    document.getElementById('scanner-processing').style.display = 'flex';

    if (!html5QrCode) html5QrCode = new Html5Qrcode("qr-hidden-canvas");

    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            document.getElementById('scanner-processing').style.display = 'none';
            lookupBarcode(decodedText);
        })
        .catch(() => {
            document.getElementById('scanner-processing').style.display = 'none';
            showToastError('Barcode detect झाला नाही! चांगल्या light मध्ये clear photo काढा.');
        });

    // Reset input so same file can be selected again
    event.target.value = '';
}

function lookupBarcode(barcode) {
    if (!barcode || barcode.trim() === '') {
        showToastError('Barcode empty आहे!');
        return;
    }
    barcode = barcode.trim();
    const found = medicineBarcodeDB[barcode];
    lastScannedData = found
        ? { ...found, barcode }
        : { name: `Item (${barcode})`, category: "Medicines", unit: "Pcs", barcode };

    document.getElementById('result-name').textContent    = lastScannedData.name;
    document.getElementById('result-barcode').textContent = `Barcode: ${barcode}`;
    document.getElementById('scanner-result').style.display = 'flex';

    document.getElementById('result-icon').innerHTML = found
        ? '<i class="fa-solid fa-circle-check"></i>'
        : '<i class="fa-solid fa-circle-question" style="color:#ea580c"></i>';
}

function useScannedResult() {
    if (!lastScannedData) return;
    document.getElementById('s-name').value     = lastScannedData.name;
    document.getElementById('s-category').value = lastScannedData.category;
    document.getElementById('s-unit').value      = lastScannedData.unit;
    closeModal('modal-scanner');
    openModal('modal-stock');
    showToast(`"${lastScannedData.name}" form मध्ये भरले!`);
}


function showToastError(msg) {
    const toast = document.getElementById('toast');
    toast.style.background = 'linear-gradient(135deg,#dc2626,#b91c1c)';
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        toast.style.background = '';
    }, 3000);
}

// Override openModal to handle scanner
const _origOpen = openModal;


// ---- MODAL HELPERS ----

function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
    if (id === 'modal-scanner') {
        stopLiveCamera();
    }
}

function closeOnOverlay(event, id) {
    if (event.target === event.currentTarget) closeModal(id);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- FORM SUBMISSIONS ----

// Add Patient
document.getElementById('form-patient').addEventListener('submit', function(e) {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const payload = {
        name:   document.getElementById('p-name').value,
        age:    parseInt(document.getElementById('p-age').value),
        ward:   document.getElementById('p-ward').value,
        bed:    document.getElementById('p-bed').value,
        date:   document.getElementById('p-date').value || today,
        doctor: document.getElementById('p-doctor').value,
        status: document.getElementById('p-status').value,
    };
    fetch('api/add_patient.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast('Patient added successfully!');
            fetch('api/get_patients.php')
                .then(r => r.json())
                .then(pList => {
                    patientsData = pList;
                    renderPatients(patientsData);
                    updatePatientStats();
                });
            closeModal('modal-patient');
            this.reset();
        } else {
            showToastError(data.error || 'Failed to add patient');
        }
    })
    .catch(() => showToastError('Network error, failed to save patient'));
});

// Add Waste Entry
document.getElementById('form-waste').addEventListener('submit', function(e) {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const payload = {
        date:   document.getElementById('w-date').value || today,
        type:   document.getElementById('w-type').value,
        dept:   document.getElementById('w-dept').value,
        weight: parseFloat(document.getElementById('w-weight').value),
        status: document.getElementById('w-status').value,
    };
    fetch('api/add_waste.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast('Waste entry added!');
            fetch('api/get_waste.php')
                .then(r => r.json())
                .then(wList => {
                    wasteData = wList;
                    wasteData.forEach(w => w.weight = parseFloat(w.weight));
                    renderWaste(wasteData);
                    updateWasteStats();
                });
            closeModal('modal-waste');
            this.reset();
        } else {
            showToastError(data.error || 'Failed to add waste log');
        }
    })
    .catch(() => showToastError('Network error'));
});

// Add Stock Item
document.getElementById('form-stock').addEventListener('submit', function(e) {
    e.preventDefault();
    const payload = {
        name:     document.getElementById('s-name').value,
        category: document.getElementById('s-category').value,
        qty:      parseInt(document.getElementById('s-qty').value),
        min:      parseInt(document.getElementById('s-min').value),
        unit:     document.getElementById('s-unit').value,
    };
    fetch('api/add_stock.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast('Stock item added!');
            fetch('api/get_stock.php')
                .then(r => r.json())
                .then(sList => {
                    stockData = sList;
                    stockData.forEach(s => {
                        s.qty = parseInt(s.qty);
                        s.min = parseInt(s.min_threshold);
                    });
                    renderStock(stockData);
                    renderOverviewAlerts();
                });
            closeModal('modal-stock');
            this.reset();
        } else {
            showToastError(data.error || 'Failed to add stock item');
        }
    })
    .catch(() => showToastError('Network error'));
});

// Add Staff Member
document.getElementById('form-staff').addEventListener('submit', function(e) {
    e.preventDefault();
    const payload = {
        name:    document.getElementById('st-name').value,
        role:    document.getElementById('st-role').value,
        dept:    document.getElementById('st-dept').value,
        shift:   document.getElementById('st-shift').value,
        contact: document.getElementById('st-contact').value,
        status:  document.getElementById('st-status').value,
    };
    fetch('api/add_staff.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showToast('Staff member added!');
            fetch('api/get_staff.php')
                .then(r => r.json())
                .then(stList => {
                    staffData = stList;
                    renderStaff(staffData);
                    updateStaffStats();
                });
            closeModal('modal-staff');
            this.reset();
        } else {
            showToastError(data.error || 'Failed to add staff member');
        }
    })
    .catch(() => showToastError('Network error'));
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        ['modal-patient', 'modal-waste', 'modal-stock', 'modal-staff', 'modal-scanner'].forEach(closeModal);
        document.body.style.overflow = '';
    }
});
