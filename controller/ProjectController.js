const model = require('../models');
const slugify = require("../helpers/slug");
const media = model.media;
class ProjectController {
    static async create(req, res, next) {
        try {
            const { name, user_id, media_id,phone } = req.body;
            const data = {
                name: name,
                user_id: user_id,
                media_id: media_id,
                slug: slugify(name),
                phone:phone
            }
            const insert = await model.project.create(data);
            res.status(200).json(insert);
        } catch (e) {
            res.status(500).json(JSON.stringify(e));
        }
    }

    static async viewDetails(req, res, next) {
        try {
            const { id } = req.params;
            const medias = await model.media.findAll();
            const project = await model.project.findAll({
                include: [{
                    model: media,
                    attributes:['icon']
                }]
            });
            res.render('layout/backend/admin', {
                slug: id,
                title: 'Project',
                pages: "main/project/viewDetails",
                media: medias,
                project: project,
                project_detail: project.find(p => p.slug === id),
                user: req.session.payload,
                token: req.session.token
            });
        } catch (e) {
            console.log(e);
        }
    }

    static async getAll(req, res, next) {
        try {
            const { user_id } = req.params;
            const project = await model.project.findAll({
                where: {
                    user_id: user_id
                },
                include: [{
                    model: media,
                    attributes:['icon']
                }]
            });
            res.status(200).json({project});
        } catch (e) {
            res.status(50).json(JSON.stringify(e));
        }
    }

    static async updateToken(token,slug) {
        const tokenJson = JSON.stringify(token);
        try {
            const update = await model.project.update({
                token: tokenJson
            },{
                where: {
                    slug: "project-circle"
                }
            });
            return update;
        } catch (e) {
            return e;
        }
    }

}

module.exports = ProjectController;
