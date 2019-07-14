const router = require('express').Router();
const query = require ('../../queries');

const { selectAllEmpleados ,getHomePetByCedulaOwner } = require('../../queries/homepets')

const tables = require('../../queries/tables');

const returningUsuario = ['cedula_id', 'nombre', 'direccion', 'telefono', 'fecha_reg', 'id_acceso'];

// Obtiene todos los homepets
router.get('/', async (req, res)=> {
  const homepets = await query.select(tables.homepets, "*");
  !homepets.error ? res.json(homepets) : res.status(404).json(homepets);
})

// Obtiene un homepet con un rif dado
router.get('/:rif', async (req, res)=>{
  const homepet = await query.select(tables.homepets, "*" , req.params);
  !homepet.error ? res.json(homepet) : res.status(400).json(homepet);
})

// Obtiene un homepet con una cedula del gerente
router.get('/owner/:cedula_id', async (req, res)=>{
  const homepet = await getHomePetByCedulaOwner(req.params.cedula_id);
  homepet.erro ? res.status(404).json(homepet) : res.json(homepet);
})


// Crea un homepet con la cedula de un usuario, convierte a ese usuario en gerente de ese homepet
router.post('/new/:cedula_id', async (req, res)=>{

  let usuario = await query.select(tables.usuarios, "*" , req.params);
  if (!usuario.error){
    const homepet = await query.insert(tables.homepets, req.body.payload, "*");   
    if(!homepet.error){
      const gerente = await query.insert(tables.gerentes, {
         cedula:usuario.cedula_id,
         sueldo:0,
         rif_homepet:homepet.rif 
      }, "*");
      if (!gerente.error){
        usuario = await query.update(tables.usuarios, req.params, { id_acceso:4 }, returningUsuario);
        if (!usuario.error){
          res.json({homepet, usuario});
        }else{
          await query.deleteT(tables.homepets,{rif: homepet.rif});
          await query.deleteT(tables.gerentes,{cedula: gerente.cedula});
          res.status(500).json({msg:"Error al actualizar usuario"})
        }
      }else{
        await query.deleteT(tables.homepets,{rif: homepet.rif})
        res.status(400).json(gerente);
      }
    }else{
      res.status(400).json(homepet);
    }
  }else{
    res.status(404).json({mgs:"Usuario no fue encontrado"})
  }

});

// @route 
// @desc
// @acces
router.patch('/:rif' , async(req,res)=>{
  const homepet = await query.select(tables.homepets, "*" , req.params);
  if ( homepet ){
    const updatedHomepet = await query.update(tables.homepets, req.params, req.body.payload , "*");
    console.log(updatedHomepet);
    
    !updatedHomepet.error ? res.json(updatedHomepet) : res.status(400).json(updatedHomepet);
  }else{
    res.status(404).json({msg:"HomePet no existe"})
  }
});

router.delete('/:rif' , async(req,res)=>{

  // Actualizando el acceso del gerente asociado al homepet
  const {cedula} = await query.select(tables.gerentes, ['cedula'], {rif_homepet: req.params.rif});

  if (cedula){
    if (await query.deleteT(tables.homepets, req.params)){

      await query.update(tables.usuarios, {cedula_id:cedula}, {id_acceso:1}, "*");
      res.json(1);
    }else{
      res.json({msg:"No se pudo eliminar el hompet"})
    }
  }else{ res.json({msg:"No existe el homepet"})}
    
  // Borro el homepet
})


// Obtiene todos los empleados de un homepet
router.get('/empleados/:rif', async(req, res)=>{
  const empleados = await selectAllEmpleados(req.params.rif);
  if (empleados.error){
    res.status(400).json(empleados)
  }else{
    res.json(empleados)
  }
});

router.get("/clientes/:rif", async(req,res)=>{
  const clientes = await selectAllEmpleados

})


module.exports = router;
