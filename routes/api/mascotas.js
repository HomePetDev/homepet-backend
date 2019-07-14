const router = require('express').Router();
const query = require('../../queries');
const tables = require('../../queries/tables');
const uuid = require('uuid');

// Añade una nueva mascota con la cedula de un cliente
router.post ('/:cedula_owner', async (req, res)=>{

  const id_mascota = uuid.v4().slice(0,8) 
  const newMascota = {
    id_mascota , ...req.params, ...req.body.payload
  } 

  const mascota = await query.insert(tables.mascotas, newMascota, "*");
  mascota.error ? res.status(400).json(mascota) : res.json(mascota);  
});

// Añade alguna enfermedad a la mascota
router.post('/enfermedad/:id_mascota' , async (req,res)=>{
  const enfermedad = await query.insert(tables.enfermedades_mascota, {...req.params, ...req.body.payload});
  enfermedad.error ? res.status(400).json(enfermedad) : res.json(enfermedad); 
});


// Añade alguna vacuna que se la haya aplicado a la mascota
router.post('/vacuna/:id_mascota' , async (req,res)=>{
  const vacuna = await query.insert(tables.vacunas_mascota, {...req.params, ...req.body.payload});
  vacuna.error ? res.status(400).json(vacuna) : res.json(vacuna); 
});


// Obtener todas las mascotas 
router.get ('/', async (req,res) => {
  const mascotas = await query.select(tables.mascotas, "*");
  mascotas.error ? res.status(404).json(mascotas) : res.json(mascotas);
});

// Obtener toda la informacion de una mascota en especifica
router.get('/all/:id_mascota', async (req, res)=>{

  const mascota = await query.select(tables.mascotas, "*", req.params );
  if (mascota.error)
    res.status(404).json(mascota)
  else{
    const enfermedades = await query.select(tables.enfermedades_mascota, "nombre_enfermedad", req.params);
    const vacunas = await query.select(tables.vacunas_mascota, ["nombre_vacuna", "fecha"], req.params);
    const {cedula_vet} = await query.select(tables.veterinario_x_mascota, "cedula_vet", req.params );    
    const veterinario = await query.select (tables.veterinarios,"*", {cedula: cedula_vet});
    res.json({mascota, enfermedades, vacunas, veterinario});
  }
});

// Obtener el veterinario de una mascota
router.get ('/veterinario/:id_mascota', async(req,res)=>{
  const {cedula_vet} = await query.select(tables.veterinario_x_mascota, "cedula_vet", req.params );
  if (!cedula_vet) 
    res.status(404).json({error:"No tiene veterinarios asociados"})
  const veterinario = await query.select (tables.veterinarios,"*", {cedula: cedula_vet});
  veterinario.error ? res.status(404).json(veterinario) : res.json(veterinario) 
});

// Obtener informacion de la raza de una mascota
router.get ('/raza/:id_mascota', async (req,res)=>{
  
  const keys = await query.select(
    tables.mascotas, 
    ["nombre_especie", "nombre_raza"],
     req.params
  );

  const raza = await query.select(tables.razas, "*" , keys);
  raza.error ? res.status(404).json(raza) : res.json(raza);
});


// Obtener todas las enfermedades de una mascota
router.get ('/enfermedades/:id_mascota', async (req,res)=>{
  const enfermedades = await query.select(tables.enfermedades_mascota, "nombre_enfermedad", req.params);
  enfermedades.error ? res.status(404).json(enfermedades) : res.json(enfermedades); 
});

// Obtener todas las vacunas aplicadas a una mascota
router.get('/vacunas/:id_mascota', async (req,res)=>{
  const vacunas = await query.select(tables.vacunas_mascota, ["nombre_vacuna", "fecha"], req.params);
  vacunas.error ? res.status(404).json(vacunas) : res.json(vacunas);
});


// Actualizar la informacion de una mascota
router.patch('/:id_mascota' , async(req,res)=>{
  const mascota = await query.select(tables.mascotas, "*" , req.params);
  if (!mascota.error){
    const updatedMascota = await query.update(tables.mascotas, req.params, req.body.payload, "*");
    !updatedMascota.error ? res.json(updatedMascota) : res.status(400).json(updatedMascota);
  }else{
    res.status(404).json({msg:"mascota no existe"})
  }
});

// Eliminar una mascota
router.delete('/:id_mascota' , async (req, res)=>{
  res.json(  await query.deleteT(tables.mascotas, req.params));
})



module.exports = router;