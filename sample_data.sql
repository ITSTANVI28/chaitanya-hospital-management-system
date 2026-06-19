USE chaitanya_hms;

INSERT INTO staff (name, role, department, shift, contact, status) VALUES
('Dr. Sarah Johnson', 'Doctor', 'Cardiology', 'Morning', '+91 98765 43210', 'On Duty'),
('Dr. Michael Chen', 'Doctor', 'Neurology', 'Morning', '+91 98765 43211', 'On Duty'),
('Dr. Emily Davis', 'Doctor', 'Pediatrics', 'Morning', '+91 98765 43212', 'On Duty'),
('Priya Pawar', 'Nurse', 'Cardiology', 'Morning', '+91 97654 32101', 'On Duty'),
('Rahul Kamble', 'Lab Technician', 'Pathology', 'Morning', '+91 96543 21001', 'On Duty'),
('Ramesh Shinde', 'Support Staff', 'Housekeeping', 'Morning', '+91 95432 10001', 'On Duty');

INSERT INTO patients (name, age, ward, bed, admission_date, doctor, status) VALUES
('Rahul Patil', 29, 'General', 'GEN-01', '2026-06-15', 'Dr. Vikram Patil', 'Stable'),
('Sunita Deshmukh', 42, 'General', 'GEN-05', '2026-06-16', 'Dr. Suresh Mehta', 'Stable'),
('Amit Shinde', 35, 'General', 'GEN-09', '2026-06-17', 'Dr. Rajesh Joshi', 'Discharge'),
('Sanjay Kumar', 45, 'ICU', 'ICU-01', '2026-06-18', 'Dr. Sarah Johnson', 'Critical'),
('Vijay Chavan', 60, 'ICU', 'ICU-03', '2026-06-14', 'Dr. Michael Chen', 'Critical'),
('Kiran More', 55, 'ICU', 'ICU-05', '2026-06-19', 'Dr. Kavita Nair', 'Post-Op'),
('Aarav Pawar', 8, 'Pediatric', 'PED-02', '2026-06-18', 'Dr. Emily Davis', 'Stable'),
('Ananya Wong', 5, 'Pediatric', 'PED-04', '2026-06-19', 'Dr. James Wilson', 'Stable'),
('Sai Gaikwad', 11, 'Pediatric', 'PED-07', '2026-06-17', 'Dr. Pooja Rane', 'Post-Op'),
('Anita Sharma', 32, 'Maternity', 'MAT-02', '2026-06-19', 'Dr. Sneha Bhosale', 'Stable'),
('Pooja Patil', 28, 'Maternity', 'MAT-03', '2026-06-17', 'Dr. Sneha Bhosale', 'Stable'),
('Snehal Rane', 27, 'Maternity', 'MAT-06', '2026-06-18', 'Dr. Sneha Bhosale', 'Post-Op'),
('Ramesh More', 50, 'Orthopedic', 'ORT-01', '2026-06-12', 'Dr. Pranav Sharma', 'Stable'),
('Sandip Jadhav', 38, 'Orthopedic', 'ORT-04', '2026-06-16', 'Dr. Amol Jadhav', 'Post-Op'),
('Deepak Gaikwad', 62, 'Orthopedic', 'ORT-08', '2026-06-15', 'Dr. Pranav Sharma', 'Discharge');

INSERT INTO inventory (name, batch_number, category, qty, min_threshold, unit, purchase_date, expiry_date, supplier_name) VALUES
('Paracetamol 500mg', 'B12345', 'Medicines', 1500, 200, 'Tablets', '2026-01-10', '2028-01-10', 'PharmaCorp'),
('IV Drip Set', 'IV0012', 'Consumables', 300, 50, 'Pcs', '2026-03-05', '2029-03-05', 'MediSupply');
