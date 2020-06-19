const {Router} = require("express")
const Links = require("../models/links")
const links = require("../models/links")
const auth = require("../middlware/auth.middlware")
const config = require("config")
const shortId = require("shortid")

const router = Router()

router.post('/generate',auth, async(req,res)=> {
    try {
      const baseUrl = config.get("baseUrl")
      const {from} = req.body

      const code = shortId.generate()
      const existing = await Links.findOne({from})
      if (existing) {
          return res.json({link: existing})
        }
        
        const to = baseUrl + '/t/' + code
        
        const link = new Links({
            code,to,from,owner: req.user.userId
        })
      const result = await link.save()

      res.status(201).json({link})

    } catch (error) {
        res.status(400).json({message: "something wrong"})
    }
})

router.get('/',auth, async(req, res) => {
    try {
        const links = await Links.find({owner: req.user.userId})
        res.json(links)
    } catch (error) {
        res.status(400).json({message: "something wrong"})
    }
})

router.get('/:id', auth, async(req,res)=> {
    try {
        const links = await Links.findById(req.params.id)
        res.json(links)
    } catch (error) {
        res.status(400).json({message: "something wrong"})
    }
})



module.exports = router