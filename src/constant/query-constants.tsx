export const CREATE_CURRENCY_QUERY ='CREATE TABLE IF NOT EXISTS Currency(serialNo INTEGER ,name VARCHAR(50) , currency VARCHAR(50))';

export const INSERT_CURRENCY_QUERY="INSERT INTO Currency (serialNo,name, currency) VALUES(?,?,?)";

export const SELECT_CURRENCY_QUERY="SELECT * FROM Currency";

export const SEARCH_CURRENCY_QUERY="SELECT name FROM sqlite_master WHERE type='table' AND name='Currency'";
