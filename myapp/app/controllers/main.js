function index(req, res){
    res.render("main/index");
}

const sobre = (req,res) => {
    res.render('main/sobre');
};

module.exports = {index, sobre}