USE chaitanya_hms;

INSERT INTO staff (name, role, department, shift, contact, status) VALUES
('Dr. Sarah Johnson', 'Doctor', 'Cardiology', 'Morning', '+91 98765 43210', 'On Duty'),
('Dr. Michael Chen', 'Doctor', 'Neurology', 'Morning', '+91 98765 43211', 'On Duty'),
('Dr. Emily Davis', 'Doctor', 'Pediatrics', 'Morning', '+91 98765 43212', 'On Duty'),
('Priya Pawar', 'Nurse', 'Cardiology', 'Morning', '+91 97654 32101', 'On Duty'),
('Rahul Kamble', 'Lab Technician', 'Pathology', 'Morning', '+91 96543 21001', 'On Duty'),
('Ramesh Shinde', 'Support Staff', 'Housekeeping', 'Morning', '+91 95432 10001', 'On Duty');

INSERT INTO patients (name, age, ward, bed, admission_date, doctor, status) VALUES
('Sanjay Kumar', 45, 'ICU', 'ICU-01', '2026-06-18', 'Dr. Sarah Johnson', 'Critical'),
('Anita Sharma', 32, 'Maternity', 'MAT-12', '2026-06-19', 'Dr. Sneha Bhosale', 'Stable');

INSERT INTO inventory (name, batch_number, category, qty, min_threshold, unit, purchase_date, expiry_date, supplier_name) VALUES
('Paracetamol 500mg', 'B12345', 'Medicines', 1500, 200, 'Tablets', '2026-01-10', '2028-01-10', 'PharmaCorp'),
('IV Drip Set', 'IV0012', 'Consumables', 300, 50, 'Pcs', '2026-03-05', '2029-03-05', 'MediSupply');
