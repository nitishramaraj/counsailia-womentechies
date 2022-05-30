
// exports.master = (req, res, next) => {
//     res.send("Hi admin!");
// }

exports.master = (req, res, next) => {
    res.render('public/homePage', {
      pageTitle: 'Welcome',
    });
  };