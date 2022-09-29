const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const db = mysql.createPool({
    host: "mbe-works.com",
    user: "mbeplusc_communi",
    password: "gxfv16be",
    database: "mbeplusc_communication"
})

var statusUpdateCity = 0
var statusUpdateStreet = 0
var statusUpdateZipcode = 0

app.use(cors())
app.use(express.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}))

// --------------------------------------------------------------------------------------
// address start

app.get('/api/get-cities', (req, res) => {
    const sqlCities = "SELECT * FROM `CITIES`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.get('/api/get-streets', (req, res) => {
    const sqlCities = "SELECT * FROM `STREETS`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.get('/api/get-postal', (req, res) => {
    const sqlCities = "SELECT * FROM `POSTAL`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.get('/api/get-streets-for-city', (req, res) => {
    const sqlCities = "SELECT * FROM `STREETS` WHERE STREETS.city_num = 1046;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.post('/api/insesrt-cities', (req, res) => {
    console.log('Limit file size: '+bodyParser.limit)
    const data = req.body.data

    if(data !== undefined && data.length > 0) {
        db.query(`TRUNCATE TABLE CITIES`, (err, res) => {
            if (err === null) {
                var percent = data.length / 100;
                var statusUpdate = percent
                var seized = 0;
                data.forEach((item,index) => {
                    let query = `
                    INSERT INTO CITIES(num_city, code_city, name, name2, type_city, postcode5, postcode7, distribution_code, distribution_rate, data_update, is_active) 
                                VALUES (?,?,?,?,?,?,?,?,?,?,?)`
                    db.query(query, 
                        [item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],item[8],item[9],true], 
                        (err, res) => {
                        if(index > percent) {
                            percent = (++seized * (data.length / 100))
                            statusUpdateCity = seized
                        }
                    })
                });
            }
        })
    }
 })
 app.post('/api/insesrt-streets', (req, res) => {
    console.log('Limit file size: '+bodyParser.limit)
    const data = req.body.data

    if(data !== undefined && data.length > 0) {
        db.query(`TRUNCATE TABLE STREETS`, (err, res) => {
            if (err === null) {
                var percent = data.length / 100;
                var seized = 0;
                data.forEach((item,index) => {
                    let query = `
                    INSERT INTO STREETS(num_city, symbol_city, code_street, name, name2, symbol_street, num_street, data_update, is_active) 
                                VALUES (?,?,?,?,?,?,?,?,?)`
                    db.query(query, 
                        [item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7],true], 
                        (err, res) => {
                        if(index > percent) {
                            percent = (++seized * (data.length / 100))
                            statusUpdateStreet = seized
                        }
                    })
                });
            }
        })
    }
 })
 app.post('/api/insesrt-postal', (req, res) => {
    console.log('Limit file size: '+bodyParser.limit)
    const data = req.body.data

    if(data !== undefined && data.length > 0) {
        db.query(`TRUNCATE TABLE POSTAL`, (err, response) => {
            if (err === null) {
                var percent = data.length / 100;
                var seized = 0;
                 data.forEach((item,index) => {
                        // if(index < 2000) {
                            let query = `
                            INSERT INTO POSTAL(num_city, symbol_city, code_street, num_home, entrance_house, postal_code_5,
                                postal_code_7, distribution_code, split_rate, num_street, symbol_street, note, data, is_active) 
                                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                            db.query(query, 
                                [item[0],item[1],item[2],item[3],item[4],item[5],item[6],item[7]
                                    ,item[8],item[9],item[10],item[11],item[12],item[13],true], 
                                (error, result) => {
                                    if(index > percent) {
                                        percent = percent + (data.length / 100)
                                        statusUpdateZipcode = ++seized
                                    }
                            })
                        // }
                });
            }
        })
    }

 })

// address end
// --------------------------------------------------------------------------------------
// supplier start

app.get('/api/get-suppliers', (req, res) => {
    const sqlCities = "SELECT * FROM `SUPPLIERS`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

 app.post('/api/insesrt-supplier', (req, res) => {
    const name = req.body.name
    const type = req.body.type
    console.log(req.body.type === true);

    const sqlInsert = "INSERT INTO `SUPPLIERS`(`name`, `type`, `display`, `is_active`) VALUES (?,?,?,?);"
    
    db.query(sqlInsert, [req.body.name, 0, true, true], (err, res) => {
        console.log(res);
    })
 })
 
 app.put('/api/update-supplier', (req, res) => {
    const sql = [
        req.body.name,
        req.body.type,
        1,
        req.body.id,
    ]
    const sqlInsert = 'UPDATE `SUPPLIERS` SET `name` = ?, `type` = ?, `display` = ? WHERE `SUPPLIERS`.`id` = ?;';
    db.query(sqlInsert, sql, (err, res) => {
        console.log(sqlInsert)
})
 })
// supplier end
// --------------------------------------------------------------------------------------
// rules start

app.get('/api/get-rules', (req, res) => {
    const sqlCities = "SELECT * FROM `RULES`;";
    db.query(sqlCities, (err, result) => {
        res.send(result)
    })
 })

app.post('/api/insesrt-rule', (req, res) => {
    const sql = [
        req.body.supplierId,
        req.body.infrastructure,
        req.body.supplierMainId,
        true
    ]
    
    const sqlInsert = 'INSERT INTO `RULES`( `supplierId`, `infrastructure`, `supplierMainId`, `is_active`)VALUES (?,?,?,?);';
    
    db.query(sqlInsert, sql, (err, res) => {
            console.log(err,res);
    })
 })

 app.put('/api/update-rule', (req, res) => {
    const sql = [
        req.body.supplierId,
        req.body.infrastructure,
        req.body.supplierMainId,
        req.body.id,
    ]
    const sqlInsert = 'UPDATE `RULES` SET `supplierId` = ?, `infrastructure` = ?, `supplierMainId` = ? WHERE `RULES`.`id` = ?;';
    db.query(sqlInsert, sql, (err, res) => {
        console.log(sqlInsert)
})
 })

// rules end
// --------------------------------------------------------------------------------------
// companies start

// app.get('/api/get-companies', (req, res) => {
//     const sqlCities = "SELECT * FROM `COMPANIES`;";
//     db.query(sqlCities, (err, result) => {
//         res.send(result)
//     })
//  })
//  app.post('/api/insesrt-suppliers', (req, res) => {
//     const name = req.body.name
//     const type = req.body.type

//     const sqlInsert = "INSERT INTO `SUPPLIERS`(`name`, `type`) VALUES (?,?);"
    
//     db.query(sqlInsert, [name, type], (err, res) => {
//         res.send(res)
//     })
//  })


// status update
app.get('/api/get-status', (req, res) => {
        res.status(200)
            .send((JSON.stringify(
                {
                    'city' : statusUpdateCity,
                    'street' : statusUpdateStreet,
                    'zip_code' : statusUpdateZipcode,
                }
            )).toString());
 })


app.listen(3002, () => {
    console.log('running 3002 ports');
})