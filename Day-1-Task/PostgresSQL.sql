-- Step 1: Create the Student Table
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_date TIMESTAMPTZ,
    active BOOLEAN DEFAULT true
);

-- Step 2: Select All Students
SELECT * FROM student;


-- Step 3: Drop the Student Table If Exists
DROP TABLE IF EXISTS student;

-- Step 4: Add a New Column to Student
ALTER TABLE student ADD COLUMN gender VARCHAR(10);

-- Step 5: Drop the Newly Added Column
ALTER TABLE student DROP COLUMN gender;

-- Step 6: Rename Columns
ALTER TABLE student RENAME COLUMN email TO email_address;
ALTER TABLE student RENAME COLUMN email_address TO email;

-- Step 7: Rename Table
ALTER TABLE student RENAME TO users;
ALTER TABLE users RENAME TO student;

-- Step 8: Create Enrollments Table
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student(student_id),
    enroll_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    course_name VARCHAR(100) NOT NULL,
    course_fee DECIMAL(10,2) NOT NULL
);

-- show enrollments record
SELECT * FROM enrollments;

--drop enrollments table
DROP TABLE IF EXISTS enrollments;

-- Step 9 & 10: Insert 10 Student Records (Sneha first)
INSERT INTO student (first_name, last_name, email, created_date, updated_date, active) VALUES
('Sneha', 'Savaliya', 'sneha.savaliya@example.com', NOW(), NULL, true),
('Krishna', 'Verma', 'krishna.verma@example.com', NOW(), NULL, true),
('Himadri', 'Singh', 'himadri.singh@example.com', NOW(), NULL, true),
('Priya', 'Mishra', 'priya.mishra@example.com', NOW(), NULL, true),
('Riya', 'Khan', 'riya.khan@example.com', NOW(), NULL, true),
('Ankit', 'Patel', 'ankit.patel@example.com', NOW(), NULL, false),
('Neha', 'Yadav', 'neha.yadav@example.com', NOW(), NULL, true),
('Ravi', 'Shah', 'ravi.shah@example.com', NOW(), NULL, true);

-- Step 11: Insert Enrollments
INSERT INTO enrollments (student_id, enroll_date, course_name, course_fee) VALUES
(1, '2024-01-01', 'Python Basics', 1200.00),
(2, '2024-01-01', 'Data Structures', 1500.00),
(3, '2024-01-02', 'Web Development', 1700.00),
(4, '2024-01-02', 'Java Programming', 1800.00),
(5, '2024-01-03', 'DBMS', 1400.00),
(6, '2024-01-03', 'AI Foundations', 2500.00),
(7, '2024-01-04', 'Cybersecurity', 1900.00),
(8, '2024-01-04', 'Machine Learning', 2300.00);

-- Step 12: Basic Select Queries
SELECT first_name FROM student;
SELECT first_name, last_name, email FROM student;
SELECT * FROM student;

-- Step 13: Order By Queries
SELECT first_name, last_name FROM student ORDER BY first_name ASC;
SELECT first_name, last_name FROM student ORDER BY last_name DESC;
SELECT student_id, first_name, last_name FROM student ORDER BY first_name ASC, last_name DESC;

-- Step 14: WHERE Clause Examples
SELECT last_name, first_name FROM student WHERE first_name = 'Himadri';
SELECT student_id, first_name, last_name FROM student WHERE first_name = 'Sneha' AND last_name = 'Savaliya';
SELECT student_id, first_name, last_name FROM student WHERE first_name IN ('Krishna', 'Ravi', 'Ankit');
SELECT first_name, last_name FROM student WHERE first_name LIKE '%ha%';
SELECT first_name, last_name FROM student WHERE first_name ILIKE '%HA%';

-- Step 15: Join Examples
SELECT * FROM enrollments AS e INNER JOIN student AS s ON e.student_id = s.student_id;
SELECT * FROM student AS s LEFT JOIN enrollments AS e ON s.student_id = e.student_id;

-- Step 16: Aggregation with GROUP BY
SELECT s.student_id,s.first_name,s.last_name,COUNT(e.enrollment_id) AS total_enrollments
FROM student s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id;

-- Step 17: GROUP BY with HAVING
SELECT s.first_name,s.last_name,SUM(e.course_fee) AS total_fee
FROM student s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.first_name, s.last_name
HAVING SUM(e.course_fee) > 2000;

-- Step 18: Subqueries
-- IN
SELECT * FROM enrollments WHERE student_id IN (
    SELECT student_id FROM student WHERE active = true
);

-- EXISTS
SELECT student_id, first_name, last_name, email FROM student WHERE EXISTS (
    SELECT 1 FROM enrollments WHERE enrollments.student_id = student.student_id
);

-- Step 19: Update Statement
UPDATE student SET first_name = 'Sneha', last_name = 'Savaliya', email = 'sneha.savaliya@example.com'
WHERE student_id = 1;

-- Step 20: Delete Statement
DELETE FROM student WHERE student_id = 10;
