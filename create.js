// CREATE TABLE RULES (
//     id int NOT NULL AUTO_INCREMENT,
//     supplierId int(11),
//     name varchar(255),
//     infrastructure varchar(255),
//     city_code int,
//     streets_code int,
//     num_address varchar(255),
//     PRIMARY KEY (id)
// );

// CREATE TABLE RULES (
//     id int NOT NULL AUTO_INCREMENT,
//     supplierId int(11),
//     infrastructure varchar(255),
//     supplierMainId int(11),
//     is_active BOOLEAN,
//     PRIMARY KEY (id)
// );



// CREATE TABLE SUPPLIERS (
//     id int NOT NULL AUTO_INCREMENT,   
//     name varchar(255),
//     type BOOLEAN,
//     display BOOLEAN,
//     is_active BOOLEAN,
//     PRIMARY KEY (id)
// );

// CREATE TABLE CITIES (
//     id int NOT NULL AUTO_INCREMENT, 
//     num_city int(11),
//     code_city int(11),
//     name varchar(255),   
//     name2 varchar(255),
//     type_city int,
//     postcode5 int(11),
//     postcode7 int(11),
//     distribution_code int(11),
//     distribution_rate int(11),
//     data_update int(11),
//     is_active BOOLEAN,
//     PRIMARY KEY (id)
// );


// CREATE TABLE STREETS (
//     id int NOT NULL AUTO_INCREMENT,
//     num_city int(11),
//     symbol_city int(11), 
//     code_street int(11),
//     name varchar(255),   
//     name2 varchar(255),
//     symbol_street int(11),
//     num_street int(11),
//     data_update int(11),
//     is_active BOOLEAN,
//     PRIMARY KEY (id)
// );



// CREATE TABLE POSTAL (
//     id int NOT NULL AUTO_INCREMENT, 
//     num_city int(11), 
//     symbol_city int(11), 
//     code_street varchar(255), 
//     num_home int(11), 
//     entrance_house varchar(255), 
//     postal_code_5 int(20), 
//     postal_code_7 int(20), 
//     distribution_code int(11), 
//     split_rate int(11), 
//     num_street int(11), 
//     symbol_street int(11), 
//     note varchar(255), 
//     data int(11),
//     is_active BOOLEAN,
//     PRIMARY KEY (id)
// )   


