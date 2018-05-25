var express = require('express');
var bd = require('../bd')

var router = express.Router();

var id = ++bd.length;

router.get('/', function(req, res) {
    if (!bd[bd.length-1]){
        bd.splice(bd.length-1, 1)
    }

    res.send(bd)
});

router.get('/:id', function(req, res, next) {

    let item = findEl(req.params.id)
    if(item){
        res.render('single-cat', { output: bd[item] });
    }
    else{
        let err = new Error("NOT FOUND")
        err.status = 404;
        next(err);
    }

});
const findEl = (id) => {

    let item = bd.find(el => el.id == id)
    if(item){
        return bd.indexOf(item).toString()
    }

}

router.post('/',  function(req, res) {

    const newCat = {...req.body, id: id};
    bd.push(newCat)
    res.redirect(`/cats/${id}`)
    id++;
});

router.delete('/:id',  function(req, res, next) {

    let item = findEl(req.params.id)
    if(item){
        bd.splice(item, 1)
        res.redirect('/cats')
    }else{
        let err = new Error("NOT FOUND")
        err.status = 404;
        next(err);
    }
})
router.put('/:id',  function(req, res, next) {

    let item = findEl(req.params.id)
    if(item){
        const changedData = {...req.body, id: req.params.id};
        bd.splice(item, 1, changedData)
        res.redirect(`/cats/${item}`)
    }else{
        let err = new Error("NOT FOUND")
        err.status = 404;
        next(err);
    }
})

module.exports = router;
