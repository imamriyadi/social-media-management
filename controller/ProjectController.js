const model = require('../models');
const slugify = require("../helpers/slug");
const media = model.media;
class ProjectController {
    static async create(req, res, next) {
       try{
           const {name,user_id,media_id} = req.body;
           const data = {
               name:name,
               user_id:user_id,
               media_id:media_id,
               slug:slugify(name)
           }
           const insert = await model.project.create(data);
           res.status(200).json(insert);
       }catch (e) {
           res.status(500).json(JSON.stringify(e));
       }
    }

    static async viewDetails(req, res, next) {
        try{
            const {id} = req.params;
            const medias = await model.media.findAll();
            const project = await model.project.findAll({
                include:[{
                    model:media
                }]
            });
            res.render('layout/backend/admin', {
                slug:id,
                title: 'Project',
                pages: "main/project/viewDetails",
                media:medias,
                project: project,
                project_detail:project.find(p=>p.slug === id),
                user:req.session.payload,
                token:req.session.token
            });
        }catch (e) {
            console.log(e);
        }
    }
}

module.exports = ProjectController;
