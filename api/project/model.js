// build your `Project` model here
const db = require('../../data/dbConfig')

const getAll = async () => {
    const projects = await db('projects')
    
    return projects.map(project => {
        if(project.project_completed === 1) {
            return {
                ...project,
                project_completed: true
            }
        } else {
            return {
                ...project,
                project_completed: false
            } 
        }
    })
}

const getById = async project_id => {
    const project = await db('projects').where('project_id', project_id).first()

    if(project.project_completed === 1) {
        return {
            ...project,
            project_completed: true
        }
    } else {
        return {
            ...project,
            project_completed: false
        } 
    }
}

const create = async (project) => {
    const [ project_id ] = await db('projects').insert(project)
    return getById(project_id)
}

module.exports = { getAll, create }