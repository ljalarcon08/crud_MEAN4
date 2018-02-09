var router=require('express').Router();

router.get('/',(req, res, next)=>{
    console.log('HEDAASMDAL');
    res.render('index.html');
});

module.exports=router;
