exports.get404 = (req, res) => {
    res.status(404).send();
}

exports.get500 = (req, res) => {
    res.status(500).send({ 
        error : 'Sorry somthing went wrong! please try again later.' 
    });
}