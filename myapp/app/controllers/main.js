function index(req, res){
    res.render("main/index",{
        layout: false
    });
}

const sobre = (req,res) => {
    res.render('main/sobre',{
        layout:false
    });
};

module.exports = {index, sobre}