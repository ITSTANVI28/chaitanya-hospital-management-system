// =============================================
//  Chaitanya Hospital — Dashboard JavaScript
// =============================================

// ---- DATABASE DATA ----
let patientsData = [];
let wasteData = [];
let stockData = [];
let staffData = [];
let appointmentsData = [];

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
        console.warn('Backend not found or JSON parse failed, loading mock stock data for demo.'); 
        stockData = [
            { id: 1, name: 'Paracetamol 500mg', batch_number: 'B12345', category: 'Medicines', qty: 1500, min: 200, unit: 'Tablets', purchase_date: '2026-01-10', expiry_date: '2028-01-10', supplier_name: 'PharmaCorp' },
            { id: 2, name: 'Amoxicillin 250mg', batch_number: 'A98765', category: 'Medicines', qty: 50, min: 100, unit: 'Capsules', purchase_date: '2025-11-20', expiry_date: '2027-11-20', supplier_name: 'HealthMed Ltd' },
            { id: 3, name: 'IV Drip Set', batch_number: 'IV0012', category: 'Consumables', qty: 300, min: 50, unit: 'Pcs', purchase_date: '2026-03-05', expiry_date: '2029-03-05', supplier_name: 'MediSupply' },
            { id: 4, name: 'Surgical Gloves (M)', batch_number: 'SG8822', category: 'Consumables', qty: 20, min: 50, unit: 'Pairs', purchase_date: '2026-05-12', expiry_date: '2030-05-12', supplier_name: 'CareGlove Inc' },
            { id: 5, name: 'Azithromycin 500mg', batch_number: 'AZ7741', category: 'Medicines', qty: 450, min: 150, unit: 'Tablets', purchase_date: '2026-02-15', expiry_date: '2028-02-15', supplier_name: 'PharmaCorp' },
            { id: 6, name: 'Remdesivir 100mg Injection', batch_number: 'RD9922', category: 'Medicines', qty: 15, min: 50, unit: 'Vials', purchase_date: '2026-04-10', expiry_date: '2027-04-10', supplier_name: 'Cipla Ltd' },
            { id: 7, name: 'Propofol 1% 50ml', batch_number: 'PRP001', category: 'Medicines', qty: 40, min: 30, unit: 'Vials', purchase_date: '2026-05-01', expiry_date: '2027-05-01', supplier_name: 'Abbott Healthcare' },
            { id: 8, name: 'Adrenaline 1mg/ml', batch_number: 'ADR445', category: 'Medicines', qty: 120, min: 50, unit: 'Ampoules', purchase_date: '2026-01-20', expiry_date: '2028-01-20', supplier_name: 'Sun Pharma' },
            { id: 9, name: 'Ceftriaxone 1g Injection', batch_number: 'CEF332', category: 'Medicines', qty: 200, min: 100, unit: 'Vials', purchase_date: '2026-02-28', expiry_date: '2028-02-28', supplier_name: 'Alkem Labs' },
            { id: 10, name: 'N95 Respirator Masks', batch_number: 'N95X1', category: 'Consumables', qty: 850, min: 200, unit: 'Pcs', purchase_date: '2026-06-01', expiry_date: '2031-06-01', supplier_name: '3M India' },
            { id: 11, name: 'Atorvastatin 20mg', batch_number: 'ATR098', category: 'Medicines', qty: 600, min: 150, unit: 'Tablets', purchase_date: '2026-03-10', expiry_date: '2028-03-10', supplier_name: 'Lupin Ltd' },
            { id: 12, name: 'Medical Oxygen Cylinder (Type B)', batch_number: 'O2-B-112', category: 'Equipment', qty: 8, min: 15, unit: 'Cylinders', purchase_date: '2026-06-15', expiry_date: '2036-06-15', supplier_name: 'Linde Gas' }
        ];
        renderStock(stockData);
        renderOverviewAlerts();
    }

    try {
        const staffRes = await fetch('api/get_staff.php');
        staffData = await staffRes.json();
        renderStaff(staffData);
        updateStaffStats();
    } catch (e) { 
        console.warn('Backend not found, loading mock staff data for demo.');
        staffData = [
            // ===== 18 DOCTORS =====
            { id: 1,  name: 'Dr. Sarah Johnson',       role: 'Doctor', dept: 'Cardiology',     shift: 'Morning', contact: '+91 98765 43210', status: 'On Duty' },
            { id: 2,  name: 'Dr. Michael Chen',         role: 'Doctor', dept: 'Neurology',      shift: 'Morning', contact: '+91 98765 43211', status: 'On Duty' },
            { id: 3,  name: 'Dr. Emily Davis',          role: 'Doctor', dept: 'Pediatrics',     shift: 'Morning', contact: '+91 98765 43212', status: 'On Duty' },
            { id: 4,  name: 'Dr. Robert Smith',         role: 'Doctor', dept: 'Cardiology',     shift: 'Evening', contact: '+91 98765 43213', status: 'On Duty' },
            { id: 5,  name: 'Dr. Lisa Wong',            role: 'Doctor', dept: 'Neurology',      shift: 'Evening', contact: '+91 98765 43214', status: 'On Duty' },
            { id: 6,  name: 'Dr. James Wilson',         role: 'Doctor', dept: 'Pediatrics',     shift: 'Evening', contact: '+91 98765 43215', status: 'On Duty' },
            { id: 7,  name: 'Dr. Pranav Sharma',        role: 'Doctor', dept: 'Orthopedics',    shift: 'Morning', contact: '+91 98234 56701', status: 'On Duty' },
            { id: 8,  name: 'Dr. Anjali Deshmukh',      role: 'Doctor', dept: 'Ophthalmology',  shift: 'Morning', contact: '+91 98234 56702', status: 'On Duty' },
            { id: 9,  name: 'Dr. Vikram Patil',         role: 'Doctor', dept: 'General Medicine',shift: 'Morning', contact: '+91 98234 56703', status: 'On Duty' },
            { id: 10, name: 'Dr. Neha Kulkarni',        role: 'Doctor', dept: 'Dermatology',    shift: 'Morning', contact: '+91 98234 56704', status: 'On Duty' },
            { id: 11, name: 'Dr. Rajesh Joshi',         role: 'Doctor', dept: 'ENT',            shift: 'Evening', contact: '+91 98234 56705', status: 'On Duty' },
            { id: 12, name: 'Dr. Sneha Bhosale',        role: 'Doctor', dept: 'Gynecology',     shift: 'Morning', contact: '+91 98234 56706', status: 'On Leave' },
            { id: 13, name: 'Dr. Amol Jadhav',          role: 'Doctor', dept: 'Orthopedics',    shift: 'Night',   contact: '+91 98234 56707', status: 'On Duty' },
            { id: 14, name: 'Dr. Pooja Rane',           role: 'Doctor', dept: 'Pediatrics',     shift: 'Night',   contact: '+91 98234 56708', status: 'On Duty' },
            { id: 15, name: 'Dr. Suresh Mehta',         role: 'Doctor', dept: 'General Medicine',shift: 'Evening', contact: '+91 98234 56709', status: 'On Duty' },
            { id: 16, name: 'Dr. Kavita Nair',          role: 'Doctor', dept: 'Cardiology',     shift: 'Night',   contact: '+91 98234 56710', status: 'On Duty' },
            { id: 17, name: 'Dr. Arun Shinde',          role: 'Doctor', dept: 'Neurology',      shift: 'Night',   contact: '+91 98234 56711', status: 'Off Duty' },
            { id: 18, name: 'Dr. Manisha Gaikwad',      role: 'Doctor', dept: 'Dentistry',      shift: 'Morning', contact: '+91 98234 56712', status: 'On Duty' },

            // ===== 24 NURSES =====
            { id: 19, name: 'Priya Pawar',              role: 'Nurse', dept: 'Cardiology',      shift: 'Morning', contact: '+91 97654 32101', status: 'On Duty' },
            { id: 20, name: 'Snehal More',              role: 'Nurse', dept: 'Cardiology',      shift: 'Evening', contact: '+91 97654 32102', status: 'On Duty' },
            { id: 21, name: 'Rupali Kale',              role: 'Nurse', dept: 'Neurology',       shift: 'Morning', contact: '+91 97654 32103', status: 'On Duty' },
            { id: 22, name: 'Anita Chavan',             role: 'Nurse', dept: 'Neurology',       shift: 'Evening', contact: '+91 97654 32104', status: 'On Duty' },
            { id: 23, name: 'Meera Deshpande',          role: 'Nurse', dept: 'Pediatrics',      shift: 'Morning', contact: '+91 97654 32105', status: 'On Duty' },
            { id: 24, name: 'Sonal Shirke',             role: 'Nurse', dept: 'Pediatrics',      shift: 'Evening', contact: '+91 97654 32106', status: 'On Duty' },
            { id: 25, name: 'Kavita Mane',              role: 'Nurse', dept: 'Orthopedics',     shift: 'Morning', contact: '+91 97654 32107', status: 'On Duty' },
            { id: 26, name: 'Rekha Sawant',             role: 'Nurse', dept: 'Orthopedics',     shift: 'Night',   contact: '+91 97654 32108', status: 'On Duty' },
            { id: 27, name: 'Sunita Ghodke',            role: 'Nurse', dept: 'ICU',             shift: 'Morning', contact: '+91 97654 32109', status: 'On Duty' },
            { id: 28, name: 'Lata Nikam',               role: 'Nurse', dept: 'ICU',             shift: 'Evening', contact: '+91 97654 32110', status: 'On Duty' },
            { id: 29, name: 'Vaishali Thakur',          role: 'Nurse', dept: 'ICU',             shift: 'Night',   contact: '+91 97654 32111', status: 'On Duty' },
            { id: 30, name: 'Jyoti Wagh',               role: 'Nurse', dept: 'General Medicine',shift: 'Morning', contact: '+91 97654 32112', status: 'On Duty' },
            { id: 31, name: 'Asha Salunkhe',            role: 'Nurse', dept: 'General Medicine',shift: 'Evening', contact: '+91 97654 32113', status: 'On Duty' },
            { id: 32, name: 'Swati Kadam',              role: 'Nurse', dept: 'Gynecology',      shift: 'Morning', contact: '+91 97654 32114', status: 'On Duty' },
            { id: 33, name: 'Pallavi Shete',            role: 'Nurse', dept: 'Gynecology',      shift: 'Night',   contact: '+91 97654 32115', status: 'On Duty' },
            { id: 34, name: 'Dipali Bhagat',            role: 'Nurse', dept: 'Ophthalmology',   shift: 'Morning', contact: '+91 97654 32116', status: 'On Duty' },
            { id: 35, name: 'Rashmi Phadke',            role: 'Nurse', dept: 'Dermatology',     shift: 'Morning', contact: '+91 97654 32117', status: 'On Duty' },
            { id: 36, name: 'Mansi Kulkarni',           role: 'Nurse', dept: 'ENT',             shift: 'Evening', contact: '+91 97654 32118', status: 'On Duty' },
            { id: 37, name: 'Nilam Patole',             role: 'Nurse', dept: 'Dentistry',       shift: 'Morning', contact: '+91 97654 32119', status: 'On Duty' },
            { id: 38, name: 'Pooja Gaikwad',            role: 'Nurse', dept: 'ICU',             shift: 'Morning', contact: '+91 97654 32120', status: 'On Leave' },
            { id: 39, name: 'Shruti Avhad',             role: 'Nurse', dept: 'Cardiology',      shift: 'Night',   contact: '+91 97654 32121', status: 'On Duty' },
            { id: 40, name: 'Rani Dhage',               role: 'Nurse', dept: 'Neurology',       shift: 'Night',   contact: '+91 97654 32122', status: 'On Duty' },
            { id: 41, name: 'Bhagyashree Sable',        role: 'Nurse', dept: 'Pediatrics',      shift: 'Night',   contact: '+91 97654 32123', status: 'Off Duty' },
            { id: 42, name: 'Tejal Borse',              role: 'Nurse', dept: 'General Medicine',shift: 'Night',   contact: '+91 97654 32124', status: 'On Duty' },

            // ===== 6 LAB TECHNICIANS =====
            { id: 43, name: 'Rahul Kamble',             role: 'Lab Technician', dept: 'Pathology',   shift: 'Morning', contact: '+91 96543 21001', status: 'On Duty' },
            { id: 44, name: 'Sachin Gawade',            role: 'Lab Technician', dept: 'Pathology',   shift: 'Evening', contact: '+91 96543 21002', status: 'On Duty' },
            { id: 45, name: 'Akash Pimpale',            role: 'Lab Technician', dept: 'Radiology',   shift: 'Morning', contact: '+91 96543 21003', status: 'On Duty' },
            { id: 46, name: 'Nilesh Thorat',            role: 'Lab Technician', dept: 'Radiology',   shift: 'Evening', contact: '+91 96543 21004', status: 'On Duty' },
            { id: 47, name: 'Yogesh Bhandari',          role: 'Lab Technician', dept: 'Biochemistry',shift: 'Morning', contact: '+91 96543 21005', status: 'On Leave' },
            { id: 48, name: 'Santosh Dolas',            role: 'Lab Technician', dept: 'Microbiology',shift: 'Night',   contact: '+91 96543 21006', status: 'On Duty' },

            // ===== 14 SUPPORT STAFF =====
            { id: 49, name: 'Ramesh Shinde',            role: 'Support Staff', dept: 'Housekeeping',  shift: 'Morning', contact: '+91 95432 10001', status: 'On Duty' },
            { id: 50, name: 'Sunil Waghmare',           role: 'Support Staff', dept: 'Housekeeping',  shift: 'Evening', contact: '+91 95432 10002', status: 'On Duty' },
            { id: 51, name: 'Ganesh Pawar',             role: 'Support Staff', dept: 'Housekeeping',  shift: 'Night',   contact: '+91 95432 10003', status: 'On Duty' },
            { id: 52, name: 'Manoj Londhe',             role: 'Support Staff', dept: 'Security',      shift: 'Morning', contact: '+91 95432 10004', status: 'On Duty' },
            { id: 53, name: 'Deepak Gade',              role: 'Support Staff', dept: 'Security',      shift: 'Evening', contact: '+91 95432 10005', status: 'On Duty' },
            { id: 54, name: 'Vishal Jagtap',            role: 'Support Staff', dept: 'Security',      shift: 'Night',   contact: '+91 95432 10006', status: 'On Duty' },
            { id: 55, name: 'Prakash Thombare',         role: 'Support Staff', dept: 'Maintenance',   shift: 'Morning', contact: '+91 95432 10007', status: 'On Duty' },
            { id: 56, name: 'Sandip Khedekar',          role: 'Support Staff', dept: 'Maintenance',   shift: 'Evening', contact: '+91 95432 10008', status: 'On Duty' },
            { id: 57, name: 'Ajay Bhosale',             role: 'Support Staff', dept: 'Ambulance',     shift: 'Morning', contact: '+91 95432 10009', status: 'On Duty' },
            { id: 58, name: 'Sagar Nimbalkar',          role: 'Support Staff', dept: 'Ambulance',     shift: 'Night',   contact: '+91 95432 10010', status: 'On Duty' },
            { id: 59, name: 'Ravi Ghorpade',            role: 'Support Staff', dept: 'Reception',     shift: 'Morning', contact: '+91 95432 10011', status: 'On Duty' },
            { id: 60, name: 'Anil Mhaske',              role: 'Support Staff', dept: 'Reception',     shift: 'Evening', contact: '+91 95432 10012', status: 'On Duty' },
            { id: 61, name: 'Kishor Devkar',            role: 'Support Staff', dept: 'Pharmacy',      shift: 'Morning', contact: '+91 95432 10013', status: 'On Leave' },
            { id: 62, name: 'Balu Sonawane',            role: 'Support Staff', dept: 'Pharmacy',      shift: 'Evening', contact: '+91 95432 10014', status: 'On Duty' },
        ];
        renderStaff(staffData);
        updateStaffStats();
    }

    // Fetch Appointments
    try {
        const aptRes = await fetch('api/get_appointments.php');
        appointmentsData = await aptRes.json();
        
        // Populate doctor filter based on appointments and staff
        populateDoctorFilter();
        
        renderAppointments(appointmentsData);
        updateAppointmentStats();
    } catch (e) {
        console.error('Error fetching appointments:', e);
        renderAppointments([]);
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

function appointmentStatusBadge(status) {
    const map = { "Pending": "badge-orange", "Checked In": "badge-blue", "Completed": "badge-green", "Cancelled": "badge-red" };
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
            <td>${p.admission_date}</td>
            <td>${p.doctor}</td>
            <td>${patientStatusBadge(p.status)}</td>
        </tr>
    `).join('');
}

function renderAppointments(data) {
    const tbody = document.getElementById('appointments-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: 2rem;">No appointments found.</td></tr>';
        return;
    }

    data.forEach(a => {
        const row = `
            <tr>
                <td><strong>${a.name}</strong></td>
                <td>${a.email}</td>
                <td>${a.department}</td>
                <td>${a.doctor_name || '<em style="color:#888;">Any</em>'}</td>
                <td>${a.booking_date}</td>
                <td>${appointmentStatusBadge(a.status || 'Pending')}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
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
                <td>${s.batch_number || '-'}</td>
                <td>${s.category}</td>
                <td><strong style="color:${isLow ? 'var(--red)' : 'var(--text)'}">${s.qty}</strong></td>
                <td>${s.unit}</td>
                <td>${s.expiry_date || '-'}</td>
                <td>${s.supplier_name || '-'}</td>
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

// Appointments
document.getElementById('apt-date-filter')?.addEventListener('change', applyAptFilter);
document.getElementById('apt-doctor-filter')?.addEventListener('change', applyAptFilter);
document.getElementById('apt-status-filter')?.addEventListener('change', applyAptFilter);

function applyAptFilter() {
    const date = document.getElementById('apt-date-filter').value;
    const doctor = document.getElementById('apt-doctor-filter').value;
    const status = document.getElementById('apt-status-filter').value;
    
    const filtered = appointmentsData.filter(a => {
        const matchDate = !date || a.booking_date === date;
        const matchDoc = doctor === 'all' || a.doctor_name === doctor;
        const matchStatus = status === 'all' || a.status === status;
        return matchDate && matchDoc && matchStatus;
    });
    renderAppointments(filtered);
}

function populateDoctorFilter() {
    const select = document.getElementById('apt-doctor-filter');
    if (!select) return;
    
    // Extract unique doctors from staffData (mock or real) and appointments
    let doctorNames = staffData.filter(s => s.role === 'Doctor').map(s => s.name);
    appointmentsData.forEach(a => {
        if (a.doctor_name && !doctorNames.includes(a.doctor_name)) {
            doctorNames.push(a.doctor_name);
        }
    });
    
    // Sort alphabetically
    doctorNames.sort();
    
    select.innerHTML = '<option value="all">All Doctors</option>';
    doctorNames.forEach(doc => {
        select.innerHTML += `<option value="${doc}">${doc}</option>`;
    });
}

function updateAppointmentStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayCount = appointmentsData.filter(a => a.booking_date === today).length;
    const pendingCount = appointmentsData.filter(a => a.status === 'Pending').length;
    
    const todayEl = document.getElementById('apt-total-today');
    const pendingEl = document.getElementById('apt-total-pending');
    
    if (todayEl) todayEl.textContent = todayCount;
    if (pendingEl) pendingEl.textContent = pendingCount;
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
    "8901030827737": { name: "Paracetamol 500mg", batch_number: "B12345", category: "Medicines", unit: "Tablets", purchase_date: "2026-01-10", expiry_date: "2028-01-10", supplier_name: "PharmaCorp" },
    "8906017060018": { name: "Remdesivir 100mg Injection", batch_number: "RD9922", category: "Medicines", unit: "Vials", purchase_date: "2026-04-10", expiry_date: "2027-04-10", supplier_name: "Cipla Ltd" },
    "8904112800126": { name: "Azithromycin 500mg", batch_number: "AZ7741", category: "Medicines", unit: "Tablets", purchase_date: "2026-02-15", expiry_date: "2028-02-15", supplier_name: "PharmaCorp" },
    "8901234567890": { name: "Amoxicillin 250mg", batch_number: "A98765", category: "Medicines", unit: "Capsules", purchase_date: "2025-11-20", expiry_date: "2027-11-20", supplier_name: "HealthMed Ltd" },
    "8906001234567": { name: "Propofol 1% 50ml", batch_number: "PRP001", category: "Medicines", unit: "Vials", purchase_date: "2026-05-01", expiry_date: "2027-05-01", supplier_name: "Abbott Healthcare" },
    "8901030856737": { name: "Ceftriaxone 1g Injection", batch_number: "CEF332", category: "Medicines", unit: "Vials", purchase_date: "2026-02-28", expiry_date: "2028-02-28", supplier_name: "Alkem Labs" },
    "8906022001122": { name: "Surgical Gloves (M)", batch_number: "SG8822", category: "Consumables", unit: "Pairs", purchase_date: "2026-05-12", expiry_date: "2030-05-12", supplier_name: "CareGlove Inc" },
    "4006381333931": { name: "IV Drip Set", batch_number: "IV0012", category: "Consumables", unit: "Pcs", purchase_date: "2026-03-05", expiry_date: "2029-03-05", supplier_name: "MediSupply" },
    "8901764000127": { name: "Adrenaline 1mg/ml", batch_number: "ADR445", category: "Medicines", unit: "Ampoules", purchase_date: "2026-01-20", expiry_date: "2028-01-20", supplier_name: "Sun Pharma" },
    "8901030867891": { name: "Medical Oxygen Cylinder (Type B)", batch_number: "O2-B-112", category: "Equipment", unit: "Cylinders", purchase_date: "2026-06-15", expiry_date: "2036-06-15", supplier_name: "Linde Gas" },
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
    
    document.getElementById('result-category').textContent = lastScannedData.category || '—';
    document.getElementById('result-unit').textContent = lastScannedData.unit || '—';
    document.getElementById('result-batch').textContent = lastScannedData.batch_number || '—';
    document.getElementById('result-expiry').textContent = lastScannedData.expiry_date || '—';
    document.getElementById('result-supplier').textContent = lastScannedData.supplier_name || '—';

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
    
    if (lastScannedData.batch_number) document.getElementById('s-batch').value = lastScannedData.batch_number;
    if (lastScannedData.purchase_date) document.getElementById('s-purchase-date').value = lastScannedData.purchase_date;
    if (lastScannedData.expiry_date) document.getElementById('s-expiry-date').value = lastScannedData.expiry_date;
    if (lastScannedData.supplier_name) document.getElementById('s-supplier').value = lastScannedData.supplier_name;
    
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
        batch_number: document.getElementById('s-batch').value,
        category: document.getElementById('s-category').value,
        qty:      parseInt(document.getElementById('s-qty').value),
        min:      parseInt(document.getElementById('s-min').value),
        unit:     document.getElementById('s-unit').value,
        purchase_date: document.getElementById('s-purchase-date').value,
        expiry_date: document.getElementById('s-expiry-date').value,
        supplier_name: document.getElementById('s-supplier').value,
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
