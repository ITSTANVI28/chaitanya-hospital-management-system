USE chaitanya_hms;

-- Clear existing staff data to avoid duplicates
TRUNCATE TABLE staff;

-- Insert 18 DOCTORS
INSERT INTO staff (id, name, role, department, shift, contact, status) VALUES
(1, 'Dr. Sarah Johnson', 'Doctor', 'Cardiology', 'Morning', '+91 98765 43210', 'On Duty'),
(2, 'Dr. Michael Chen', 'Doctor', 'Neurology', 'Morning', '+91 98765 43211', 'On Duty'),
(3, 'Dr. Emily Davis', 'Doctor', 'Pediatrics', 'Morning', '+91 98765 43212', 'On Duty'),
(4, 'Dr. Robert Smith', 'Doctor', 'Cardiology', 'Evening', '+91 98765 43213', 'On Duty'),
(5, 'Dr. Lisa Wong', 'Doctor', 'Neurology', 'Evening', '+91 98765 43214', 'On Duty'),
(6, 'Dr. James Wilson', 'Doctor', 'Pediatrics', 'Evening', '+91 98765 43215', 'On Duty'),
(7, 'Dr. Pranav Sharma', 'Doctor', 'Orthopedics', 'Morning', '+91 98234 56701', 'On Duty'),
(8, 'Dr. Anjali Deshmukh', 'Doctor', 'Ophthalmology', 'Morning', '+91 98234 56702', 'On Duty'),
(9, 'Dr. Vikram Patil', 'Doctor', 'General Medicine', 'Morning', '+91 98234 56703', 'On Duty'),
(10, 'Dr. Neha Kulkarni', 'Doctor', 'Dermatology', 'Morning', '+91 98234 56704', 'On Duty'),
(11, 'Dr. Rajesh Joshi', 'Doctor', 'ENT', 'Evening', '+91 98234 56705', 'On Duty'),
(12, 'Dr. Sneha Bhosale', 'Doctor', 'Gynecology', 'Morning', '+91 98234 56706', 'On Leave'),
(13, 'Dr. Amol Jadhav', 'Doctor', 'Orthopedics', 'Night', '+91 98234 56707', 'On Duty'),
(14, 'Dr. Pooja Rane', 'Doctor', 'Pediatrics', 'Night', '+91 98234 56708', 'On Duty'),
(15, 'Dr. Suresh Mehta', 'Doctor', 'General Medicine', 'Evening', '+91 98234 56709', 'On Duty'),
(16, 'Dr. Kavita Nair', 'Doctor', 'Cardiology', 'Night', '+91 98234 56710', 'On Duty'),
(17, 'Dr. Arun Shinde', 'Doctor', 'Neurology', 'Night', '+91 98234 56711', 'Off Duty'),
(18, 'Dr. Manisha Gaikwad', 'Doctor', 'Dentistry', 'Morning', '+91 98234 56712', 'On Duty');

-- Insert 24 NURSES
INSERT INTO staff (id, name, role, department, shift, contact, status) VALUES
(19, 'Priya Pawar', 'Nurse', 'Cardiology', 'Morning', '+91 97654 32101', 'On Duty'),
(20, 'Snehal More', 'Nurse', 'Cardiology', 'Evening', '+91 97654 32102', 'On Duty'),
(21, 'Rupali Kale', 'Nurse', 'Neurology', 'Morning', '+91 97654 32103', 'On Duty'),
(22, 'Anita Chavan', 'Nurse', 'Neurology', 'Evening', '+91 97654 32104', 'On Duty'),
(23, 'Meera Deshpande', 'Nurse', 'Pediatrics', 'Morning', '+91 97654 32105', 'On Duty'),
(24, 'Sonal Shirke', 'Nurse', 'Pediatrics', 'Evening', '+91 97654 32106', 'On Duty'),
(25, 'Kavita Mane', 'Nurse', 'Orthopedics', 'Morning', '+91 97654 32107', 'On Duty'),
(26, 'Rekha Sawant', 'Nurse', 'Orthopedics', 'Night', '+91 97654 32108', 'On Duty'),
(27, 'Sunita Ghodke', 'Nurse', 'ICU', 'Morning', '+91 97654 32109', 'On Duty'),
(28, 'Lata Nikam', 'Nurse', 'ICU', 'Evening', '+91 97654 32110', 'On Duty'),
(29, 'Vaishali Thakur', 'Nurse', 'ICU', 'Night', '+91 97654 32111', 'On Duty'),
(30, 'Jyoti Wagh', 'Nurse', 'General Medicine', 'Morning', '+91 97654 32112', 'On Duty'),
(31, 'Asha Salunkhe', 'Nurse', 'General Medicine', 'Evening', '+91 97654 32113', 'On Duty'),
(32, 'Swati Kadam', 'Nurse', 'Gynecology', 'Morning', '+91 97654 32114', 'On Duty'),
(33, 'Pallavi Shete', 'Nurse', 'Gynecology', 'Night', '+91 97654 32115', 'On Duty'),
(34, 'Dipali Bhagat', 'Nurse', 'Ophthalmology', 'Morning', '+91 97654 32116', 'On Duty'),
(35, 'Rashmi Phadke', 'Nurse', 'Dermatology', 'Morning', '+91 97654 32117', 'On Duty'),
(36, 'Mansi Kulkarni', 'Nurse', 'ENT', 'Evening', '+91 97654 32118', 'On Duty'),
(37, 'Nilam Patole', 'Nurse', 'Dentistry', 'Morning', '+91 97654 32119', 'On Duty'),
(38, 'Pooja Gaikwad', 'Nurse', 'ICU', 'Morning', '+91 97654 32120', 'On Leave'),
(39, 'Shruti Avhad', 'Nurse', 'Cardiology', 'Night', '+91 97654 32121', 'On Duty'),
(40, 'Rani Dhage', 'Nurse', 'Neurology', 'Night', '+91 97654 32122', 'On Duty'),
(41, 'Bhagyashree Sable', 'Nurse', 'Pediatrics', 'Night', '+91 97654 32123', 'Off Duty'),
(42, 'Tejal Borse', 'Nurse', 'General Medicine', 'Night', '+91 97654 32124', 'On Duty');

-- Insert 6 LAB TECHNICIANS
INSERT INTO staff (id, name, role, department, shift, contact, status) VALUES
(43, 'Rahul Kamble', 'Lab Technician', 'Pathology', 'Morning', '+91 96543 21001', 'On Duty'),
(44, 'Sachin Gawade', 'Lab Technician', 'Pathology', 'Evening', '+91 96543 21002', 'On Duty'),
(45, 'Akash Pimpale', 'Lab Technician', 'Radiology', 'Morning', '+91 96543 21003', 'On Duty'),
(46, 'Nilesh Thorat', 'Lab Technician', 'Radiology', 'Evening', '+91 96543 21004', 'On Duty'),
(47, 'Yogesh Bhandari', 'Lab Technician', 'Biochemistry', 'Morning', '+91 96543 21005', 'On Leave'),
(48, 'Santosh Dolas', 'Lab Technician', 'Microbiology', 'Night', '+91 96543 21006', 'On Duty');

-- Insert 14 SUPPORT STAFF
INSERT INTO staff (id, name, role, department, shift, contact, status) VALUES
(49, 'Ramesh Shinde', 'Support Staff', 'Housekeeping', 'Morning', '+91 95432 10001', 'On Duty'),
(50, 'Sunil Waghmare', 'Support Staff', 'Housekeeping', 'Evening', '+91 95432 10002', 'On Duty'),
(51, 'Ganesh Pawar', 'Support Staff', 'Housekeeping', 'Night', '+91 95432 10003', 'On Duty'),
(52, 'Manoj Londhe', 'Support Staff', 'Security', 'Morning', '+91 95432 10004', 'On Duty'),
(53, 'Deepak Gade', 'Support Staff', 'Security', 'Evening', '+91 95432 10005', 'On Duty'),
(54, 'Vishal Jagtap', 'Support Staff', 'Security', 'Night', '+91 95432 10006', 'On Duty'),
(55, 'Prakash Thombare', 'Support Staff', 'Maintenance', 'Morning', '+91 95432 10007', 'On Duty'),
(56, 'Sandip Khedekar', 'Support Staff', 'Maintenance', 'Evening', '+91 95432 10008', 'On Duty'),
(57, 'Ajay Bhosale', 'Support Staff', 'Ambulance', 'Morning', '+91 95432 10009', 'On Duty'),
(58, 'Sagar Nimbalkar', 'Support Staff', 'Ambulance', 'Night', '+91 95432 10010', 'On Duty'),
(59, 'Ravi Ghorpade', 'Support Staff', 'Reception', 'Morning', '+91 95432 10011', 'On Duty'),
(60, 'Anil Mhaske', 'Support Staff', 'Reception', 'Evening', '+91 95432 10012', 'On Duty'),
(61, 'Kishor Devkar', 'Support Staff', 'Pharmacy', 'Morning', '+91 95432 10013', 'On Leave'),
(62, 'Balu Sonawane', 'Support Staff', 'Pharmacy', 'Evening', '+91 95432 10014', 'On Duty');
