import express from "express"
import pool from "../db.js"
import e from "express"

const router = express.Router()

router.get("/", async (req, res) => {
  // const [birds] = await pool.promise().query('SELECT * FROM birds')
  const [birds] = await pool.promise().query(
    `SELECT birds.*, species.name AS species 
      FROM birds 
      JOIN species ON birds.species_id = species.id;`,
  )
  
  res.render("birds.njk", { title: "Alla fågglar", message: "Lista på alla fåglar", birds })
})

router.get("/:id", async (req, res) => {
  const [bird] = await pool.promise().query(
    `SELECT birds.*, species.name AS species 
      FROM birds 
      JOIN species ON birds.species_id = species.id WHERE birds.id = ?;`,
    [req.params.id],
  )
  res.render("bird.njk", { title: "Specifik fågel", message: "Denna sida visar en specifik fågel, du är på:", bird: bird[0] })
})

export default router
