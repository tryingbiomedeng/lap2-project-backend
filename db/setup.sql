DROP TABLE IF EXISTS accounts, customers, fixers, items, jobs;

CREATE TABLE accounts (
  account_id INT GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(50) UNIQUE NOT NULL,
  user_name VARCHAR(50) NOT NULL, 
  user_password VARCHAR(50) NOT NULL,
  PRIMARY KEY (account_id)
);

CREATE TABLE customers (
  customer_id INT GENERATED ALWAYS AS IDENTITY,
  account_id INT,
  active_requests INT DEFAULT 0,
  items_for_sale INT DEFAULT 0,
  PRIMARY KEY (customer_id),
  CONSTRAINT fk_account
    FOREIGN KEY (account_id)
    REFERENCES accounts(account_id)
);

CREATE TABLE fixers (
  fixer_id INT GENERATED ALWAYS AS IDENTITY,
  account_id INT,
  bio VARCHAR(200),
  experience VARCHAR(200),
  jobs_done INT DEFAULT 0,
  rating INT DEFAULT 0,
  PRIMARY KEY (fixer_id),
  CONSTRAINT fk_account
    FOREIGN KEY (account_id)
    REFERENCES accounts(account_id)
);

CREATE TABLE items (
  item_id INT GENERATED ALWAYS AS IDENTITY,
  seller_id INT,
  item_name VARCHAR(50) NOT NULL,
  item_description VARCHAR(200) NOT NULL,
  price MONEY DEFAULT 0,
  available BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (item_id),
  CONSTRAINT fk_customer
    FOREIGN KEY (seller_id)
    REFERENCES customers(customer_id)
);

CREATE TABLE jobs (
  job_id INT GENERATED ALWAYS AS IDENTITY,
  customer_id INT,
  job_name VARCHAR(50) NOT NULL,
  job_description VARCHAR(200) NOT NULL,
  post_date DATE NOT NULL DEFAULT(CURRENT_DATE),
  available BOOLEAN DEFAULT TRUE,
  completed BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (job_id),
  CONSTRAINT fk_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
);

INSERT INTO accounts
  (email, user_name, user_password)
VALUES
  ('sam@example.com', 'Sam Mocock', 'jkljkl'),
  ('ravia@example.com', 'Ravia Saini', 'jkjk'),
  ('nathan@example.com', 'Nathan Smith', 'jkl');

INSERT INTO customers
  (account_id, active_requests)
VALUES
  (1, 2),
  (2, 1);

INSERT INTO fixers
  (account_id, bio, experience)
VALUES
  (3, 'Hello this is an example bio. My name is Nathan.', 'Hobbyist');

INSERT INTO items
  (seller_id, item_name, item_description, price)
VALUES
  (1, 'Toaster', 'A nice toaster, barely used', 10);

INSERT INTO jobs
  (customer_id, job_name, job_description)
VALUES
  (2, 'Microwave', 'My microwave no longer spins');