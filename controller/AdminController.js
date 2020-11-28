const model = require("../models");
const media = model.media;
class AdminController {
    static async dashboard(req, res, next) {
      try{
          const medias = await model.media.findAll();
          const project = await model.project.findAll({
              include:[{
                  model:media
              }]
          });
          res.render('layout/backend/admin', {
              slug:"",
              title: 'Dashboard',
              pages: "main/dashboard/index",
              media:medias,
              project: project,
              project_detail:[],
              user:req.session.payload,
              token:req.session.token
          });
      }catch (e) {
        console.log(e);
      }

    }
}

module.exports = AdminController;
