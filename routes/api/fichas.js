const router = require('express').Router();
const query = require("../../queries");
const tables = require("../../queries/tables");
const uuid = require("uuid/v4");

router.post ("/:rif", async (req, res) => {

  const id_ficha = uuid().slice(0,8)
  const rif_homepet = req.params.rif;
  const { cedula_cliente, id_mascota  } = req.body.payload.ficha;
  const newFicha = {
    rif_homepet, id_ficha, ...req.body.payload.ficha
  }


  const ficha = await query.insert(tables.fichas_servicio, newFicha);
  ficha.error ? res.status(400).json(ficha) : "";
  
  const historia = await query.insert(tables.historia,{rif_homepet, cedula_cliente, id_mascota})
  historia.error ? res.status(400).json(historia) : "";

  const result = await query.insert(tables.ficha_x_serv,{
    id_ficha, rif_homepet, nombre_serv: req.body.payload.servicio
  });
  result.error ? res.status(400).json(result) : res.json({ficha, historia, result});


});

router.get("/:rif", (req, res)=>{



})



module.exports = router;