const index = (req, res) => {
    res.render("main/index");
}

const sobre = (req,res) => {
    res.render('main/sobre');
};

const ui = (req,res) => {
    res.render('main/ui');
};

module.exports = {index, sobre, ui}