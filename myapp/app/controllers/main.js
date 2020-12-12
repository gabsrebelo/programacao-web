function index(req, res){
    res.render("main/index",{
        layout: false
    });
}

const sobre = (req,res) => {
    res.render('main/sobre');
};

module.exports = {index, sobre}