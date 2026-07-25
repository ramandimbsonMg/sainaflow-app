DROP DATABASE IF EXISTS sainaflowdb;
CREATE DATABASE sainaflowdb;
USE sainaflowdb;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  account_name VARCHAR(255),
  avatar VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  emailVerified BOOLEAN DEFAULT FALSE,
  image VARCHAR(255),
  is_account_admin BOOLEAN DEFAULT FALSE,
  role VARCHAR(100) DEFAULT 'member',
  is_admin BOOLEAN DEFAULT FALSE,
  created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  lastLoginAt DATETIME,
  name VARCHAR(255),
  password VARCHAR(255),
  username VARCHAR(255),
  userStatus VARCHAR(50) DEFAULT 'PENDING',
  userLanguage VARCHAR(20) DEFAULT 'en',
  banned BOOLEAN DEFAULT FALSE,
  banReason TEXT,
  banExpires DATETIME,
  INDEX idx_email (email),
  INDEX idx_user_status (userStatus),
  INDEX idx_user_language (userLanguage),
  INDEX idx_is_admin (is_admin),
  INDEX idx_created_on (created_on)
);

-- Create crm_Accounts table
CREATE TABLE IF NOT EXISTS crm_Accounts (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdBy VARCHAR(255),
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  updatedBy VARCHAR(255),
  annual_revenue VARCHAR(255),
  assigned_to VARCHAR(255),
  billing_city VARCHAR(255),
  billing_country VARCHAR(255),
  billing_postal_code VARCHAR(255),
  billing_state VARCHAR(255),
  billing_street VARCHAR(255),
  company_id VARCHAR(255),
  description TEXT,
  email VARCHAR(255),
  employees VARCHAR(255),
  fax VARCHAR(255),
  industry VARCHAR(255),
  member_of VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  office_phone VARCHAR(255),
  shipping_city VARCHAR(255),
  shipping_country VARCHAR(255),
  shipping_postal_code VARCHAR(255),
  shipping_state VARCHAR(255),
  shipping_street VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Inactive',
  type VARCHAR(50) DEFAULT 'Customer',
  vat VARCHAR(255),
  website VARCHAR(255),
  deletedAt DATETIME,
  deletedBy VARCHAR(255),
  INDEX idx_assigned_to (assigned_to),
  INDEX idx_industry (industry),
  INDEX idx_createdBy (createdBy),
  INDEX idx_updatedBy (updatedBy),
  INDEX idx_status (status),
  INDEX idx_type (type),
  INDEX idx_createdAt (createdAt),
  INDEX idx_deletedAt (deletedAt)
);

-- Create crm_Leads table
CREATE TABLE IF NOT EXISTS crm_Leads (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdBy VARCHAR(255),
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  updatedBy VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  jobTitle VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  description TEXT,
  lead_source_id VARCHAR(255),
  lead_status_id VARCHAR(255),
  lead_type_id VARCHAR(255),
  refered_by VARCHAR(255),
  campaign VARCHAR(255),
  assigned_to VARCHAR(255),
  accountsIDs VARCHAR(255),
  INDEX idx_assigned_to (assigned_to),
  INDEX idx_accountsIDs (accountsIDs),
  INDEX idx_createdBy (createdBy),
  INDEX idx_updatedBy (updatedBy),
  INDEX idx_lead_source_id (lead_source_id),
  INDEX idx_lead_status_id (lead_status_id),
  INDEX idx_lead_type_id (lead_type_id)
);

-- Create and insert enum values for MySQL
CREATE TABLE IF NOT EXISTS mysql_enum_rfc9285064c57f545e74a4bd56eac89 {
  id VARCHAR(255) PRIMARY KEY,
  rfc9285064c57f545e74a4bd56eac89 VARCHAR(50) NOT NULL,
  INDEX idx_rfc9285064c57f545e74a4bd56eac89 (rfc9285064c57f545e74a4bd56eac89)
);

INSERT IGNORE INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('47499ec3852b48249f090b02563f977f660af0a4', 'new');
INSERT IGNORE INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('47c6a2f1bd4f3500650000bd4535b7ff005860b2', 'contacted');
INSERT IGNORE INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('4b1cb89b7f2b412988ef82e3419e4d19c97f2e18', 'qualified');
INSERT IGNORE INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('711284580b8ae336765bf189e1793f7137f98c00', 'lost');

CREATE TABLE IF NOT EXISTS crm_Lead_Sources (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  INDEX idx_name (name)
);

CREATE TABLE IF NOT EXISTS crm_Lead_Statuses (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  INDEX idx_name (name)
);

CREATE TABLE IF NOT EXISTS crm_Lead_Types (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  INDEX idx_name (name)
);

CREATE TABLE IF NOT EXISTS Sections (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  board VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  position BIGINT,
  INDEX idx_board (board)
);

CREATE TABLE IF NOT EXISTS Boards (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  description TEXT NOT NULL,
  favourite BOOLEAN,
  favouritePosition BIGINT,
  icon VARCHAR(255),
  position BIGINT,
  title VARCHAR(255) NOT NULL,
  user VARCHAR(255) NOT NULL,
  visibility VARCHAR(255),
  sharedWith JSON,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdBy VARCHAR(255),
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  updatedBy VARCHAR(255),
  deletedAt DATETIME,
  deletedBy VARCHAR(255),
  INDEX idx_user (user),
  INDEX idx_createdBy (createdBy),
  INDEX idx_updatedBy (updatedBy),
  INDEX idx_favourite (favourite),
  INDEX idx_visibility (visibility),
  INDEX idx_createdAt (createdAt)
);

CREATE TABLE IF NOT EXISTS Tasks (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  content TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdBy VARCHAR(255),
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  updatedBy VARCHAR(255),
  dueDateAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  lastEditedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  position BIGINT NOT NULL,
  priority VARCHAR(50) NOT NULL,
  section VARCHAR(255),
  tags JSON,
  title VARCHAR(255) NOT NULL,
  likes BIGINT DEFAULT 0,
  user VARCHAR(255),
  taskStatus VARCHAR(50) DEFAULT 'ACTIVE',
  INDEX idx_user (user),
  INDEX idx_section (section),
  INDEX idx_createdBy (createdBy),
  INDEX idx_updatedBy (updatedBy),
  INDEX idx_priority (priority),
  INDEX idx_taskStatus (taskStatus),
  INDEX idx_dueDateAt (dueDateAt),
  INDEX idx_createdAt (createdAt)
);

-- Foreign key constraints
ALTER TABLE Sections ADD CONSTRAINT fk_Sections_board FOREIGN KEY (board) REFERENCES Boards(id);
ALTER TABLE Tasks ADD CONSTRAINT fk_Tasks_user FOREIGN KEY (user) REFERENCES users(id);
ALTER TABLE Tasks ADD CONSTRAINT fk_Tasks_section FOREIGN KEY (section) REFERENCES Sections(id);
ALTER TABLE Boards ADD CONSTRAINT fk_Boards_user FOREIGN KEY (user) REFERENCES users(id);
ALTER TABLE Boards ADD CONSTRAINT fk_Boards_createdBy FOREIGN KEY (createdBy) REFERENCES users(id);
ALTER TABLE Boards ADD CONSTRAINT fk_Boards_updatedBy FOREIGN KEY (updatedBy) REFERENCES users(id);
ALTER TABLE Users ADD CONSTRAINT fk_Users_assigned_contacts FOREIGN KEY (accountsIDs) REFERENCES crm_Accounts(id);

-- Create tables for other entities (minimal setup)
CREATE TABLE IF NOT EXISTS crm_Opportunities_Sales_Stages (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  probability INT,
  `order` INT
);

CREATE TABLE IF NOT EXISTS crm_Opportunities_Type (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  name VARCHAR(255) NOT NULL,
  `order` INT
);

-- Insert MySQL enums
INSERT INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('1784e695e4cbb07acf4fe8e8d72a8af087468f26', 'ACTIVE');
INSERT INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('2b45d774cb5f3641e3b6a6f1bc11dd9e1968e71b', 'INACTIVE');
INSERT INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('4f1329000ec7b394bd5032c11b92e88e2032f8c9', 'PENDING');
INSERT INTO mysql_enum_rfc9285064c57f545e74a4bd56eac89 (id, rfc9285064c57f545e74a4bd56eac89) VALUES ('5a9c7f4f7a4b3a80f8f8a592219c6c7d0496e3e2', 'CLOSED');

-- Create additional tables for completeness
CREATE TABLE IF NOT EXISTS Documents (
  id VARCHAR(255) PRIMARY KEY,
  v INT DEFAULT 0,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_updated DATETIME ON UPDATE CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  document_name VARCHAR(255) NOT NULL,
  created_by_user VARCHAR(255),
  createdBy VARCHAR(255),
  description TEXT,
  document_type VARCHAR(255),
  favourite BOOLEAN,
  document_file_mimeType VARCHAR(255),
  document_file_url VARCHAR(255) NOT NULL,
  status VARCHAR(50),
  visibility VARCHAR(50),
  tags JSON,
  `key` VARCHAR(255),
  size INT,
  assigned_user VARCHAR(255),
  connected_documents JSON,
  content_text TEXT,
  summary TEXT,
  content_hash VARCHAR(255),
  thumbnail_url VARCHAR(255),
  processing_status VARCHAR(50) DEFAULT 'PENDING',
  processing_error TEXT,
  version INT DEFAULT 1,
  parent_document_id VARCHAR(255),
  deletedAt DATETIME,
  deletedBy VARCHAR(255)
);

SHOW TABLES;
