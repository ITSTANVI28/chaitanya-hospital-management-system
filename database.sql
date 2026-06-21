CREATE DATABASE IF NOT EXISTS chaitanya_hms DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE chaitanya_hms;

-- Table for patient data
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    ward VARCHAR(50) NOT NULL,
    bed VARCHAR(20) NOT NULL,
    admission_date DATE NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    status ENUM('Stable', 'Critical', 'Post-Op', 'Discharge') NOT NULL
) ENGINE=InnoDB;

-- Table for waste log entries
CREATE TABLE IF NOT EXISTS waste_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    type ENUM('Biomedical', 'Sharps', 'General') NOT NULL,
    department VARCHAR(50) NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    status ENUM('Disposed', 'Pending', 'Failed') NOT NULL
) ENGINE=InnoDB;

-- Table for stock / inventory items
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    batch_number VARCHAR(50),
    category VARCHAR(50) NOT NULL,
    qty INT NOT NULL,
    min_threshold INT NOT NULL,
    unit VARCHAR(20) NOT NULL,
    purchase_date DATE,
    expiry_date DATE,
    supplier_name VARCHAR(100)
) ENGINE=InnoDB;

-- Table for staff members
CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('Doctor', 'Nurse', 'Lab Technician', 'Support Staff') NOT NULL,
    department VARCHAR(50) NOT NULL,
    shift ENUM('Morning', 'Evening', 'Night') NOT NULL,
    contact VARCHAR(20) NOT NULL,
    status ENUM('On Duty', 'Off Duty', 'On Leave') NOT NULL
) ENGINE=InnoDB;

-- Table for booked appointments from the public site
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    doctor_name VARCHAR(100) DEFAULT NULL,
    booking_date DATE NOT NULL,
    status ENUM('Pending', 'Checked In', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table for stock / inventory orders
CREATE TABLE IF NOT EXISTS stock_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    qty INT NOT NULL,
    unit VARCHAR(20) NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    order_date DATE NOT NULL,
    status ENUM('Pending', 'Received') DEFAULT 'Pending'
) ENGINE=InnoDB;
