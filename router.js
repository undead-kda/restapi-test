const path = require('path');
const express = require('express');

module.exports = (app, conn) => {
   
   // GET
   app.get('/api/content', (req, res) => {
      const pr = new Promise((resolve, reject) => {
         conn.query("SELECT * FROM articles", (err, result) => {
            if (err) throw err;
            resolve(result);
         });
      });
      pr.then((value) => {
         res.status(200).json(value);
      });
   });

   // POST
   app.post('/api/content', (req, res) => {
      let data = req.body;
      const pr = new Promise((resolve, reject) => {
         conn.query('INSERT INTO articles SET ?', data, (err, result) => {
            if (err) throw err;
            resolve(data);
         });
      });
      pr.then((value) => {
         res.status(201).json(value);
      });
   });

   // DELETE
   app.delete('/api/content/:id', (req, res) => {
      let id = req.params.id;
      const pr = new Promise((resolve, reject) => {
         conn.query('DELETE FROM articles WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            resolve('1 record deleted');
         });
      });
      pr.then((value) => {
         console.log(value);
         //res.status(202).json([]);
         res.status(204).json([]);
      }); 
   });

   app.use(express.static(path.resolve(__dirname, 'client')));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
   });
}