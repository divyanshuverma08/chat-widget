const router = require("express").Router();

router.use("/auth",require("./authRoute"));
router.use('/chat',require("./chatsRoute"));

router.get('/', (req,res)=>{
    res.send("Chat Bot");
});

module.exports = router;