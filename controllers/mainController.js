exports.getHome = (req, res, next) => {
    res.render('index');
};

exports.getAbout = (req, res, next) => {
    res.render('about_us');
};

exports.getTutoring = (req, res, next) => {
    res.render('tutor');
};

exports.getTestimonials = (req, res, next) => {
    res.render('testimonials');
};

exports.getBlog = (req, res, next) => {
    res.render('blog');
};

exports.getEvents = (req, res, next) => {
    res.render('events');
};

exports.getFaq = (req, res, next) => {
    res.render('faq');
};

exports.getContact = (req, res, next) => {
    res.render('contact');
};
