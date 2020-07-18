exports.get404 = (req, res) => {
    res.status(404).json();
}

exports.get500 = (req, res) => {
    res.status(500).json({ 
        error : 'Sorry somthing went wrong! please try again later.' 
    });
}