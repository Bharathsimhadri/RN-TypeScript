//Currency
export const CREATE_CURRENCY_QUERY =
  'CREATE TABLE IF NOT EXISTS Currency(serialNo INTEGER ,name VARCHAR(50) , currency VARCHAR(50))';
export const INSERT_CURRENCY_QUERY =
  'INSERT INTO Currency (serialNo,name, currency) VALUES(?,?,?)';
export const SELECT_CURRENCY_QUERY = 'SELECT * FROM Currency';
export const SEARCH_CURRENCY_QUERY =
  "SELECT name FROM sqlite_master WHERE type='table' AND name='Currency'";

//Employee
export const CREATE_EMPLOYEE_QUERY =
  'CREATE TABLE IF NOT EXISTS Employee(id VARCHAR(50) ,name VARCHAR(50))';
export const INSERT_EMPLOYEE_QUERY =
  'INSERT INTO Employee (id,name) VALUES(?,?)';
export const SELECT_EMPLOYEE_QUERY = 'SELECT * FROM Employee';
export const SEARCH_EMPLOYEE_QUERY =
  "SELECT name FROM sqlite_master WHERE type='table' AND name='Employee'";
export const UPDATE_EMPLOYEE_QUERY='UPDATE Employee set name=? where id=?';  
export const DELETE_EMPLOYEE_QUERY='DELETE FROM Employee where id=?';  
