const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/contacts');

//Handle incoming GET request for the orders
router.get("/contacts", (req, res, next) => {

    Contact.find()
        .exec()
        .then(contacts => {
            res.status(201).json(contacts);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

//Handling Request for the particular Order ID

router.get("/:id",(req,res,next)=>{

    id=req.params.id;
    Contact.findById(id)
           .exec()
           .then(docs=>{

            if(!docs){
               return res.status(404).json({
                    message:"Order not found"
                });
            }
            
            res.status(200).json({
                docs:docs,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/orders"
                } 
            });
            }
           )
           .catch(err=>{
               res.status(500).json({
                   error:err
                });
           });


});

//Handle incoming POST request for the orders

router.post("/contact", (req, res, next) => {
  
        const contact = new Contact({
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         phone:req.body.phone
        });
        return contact.save()
        .then(result => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  //DELETE the request for the particular ID

  router.delete("/contact/:id",(req,res,next)=>{
      id=req.params.id;
      Contact.deleteMany({_id:req.params.id})
      .exec()
      .then(contact=>{
          res.status(201).json({
               contact:contact,
               request:{
                   type:"DELETE",
                   url:"http://local-host:3000/id"
               }

          })
      }

      ).catch(err=>{
          res.status(500).json({
              error:err
          });
      })


  });

module.exports = router;