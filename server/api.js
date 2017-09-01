'use strict'
const api = require('express').Router()
const db = require('../db')
const models = require('../db/models/index.js');
const Campuses = models.Campuses;
const Students = models.Users;

api.get('/campuses', (req, res, next) => {
	Campuses.findAll()
	.then(campuses => res.send(campuses));
});

api.get('/campuses/:campusId', (req, res, next) => {
	let campusId = req.params.campusId;
	Campuses.findAll({
		where: {id: campusId},
		include: [
			{model: Students}]
	})
	.then(campus => res.send(campus))
});

api.get('/students', (req, res, next) => {
	Students.findAll({
		include: [{model : Campuses}]
	})
	.then(students => res.send(students));
});

api.get('/students/:studentId', (req, res, next) => {
	const studentId = req.params.studentId;
	Students.findAll({
		where: {id: studentId},
		include: [{model: Campuses}]
	})
	.then(student => res.send(student));
});


api.post('/students', (req, res, next) => {
	Students.create(req.body)
	.then(student => {
		return Students.findAll({
			where : {id : student.id},
			include: [{model: Campuses}]
	})})
	.then(updatedStudent => res.status(201).json(updatedStudent))
	.catch(next);
});

api.post('/campuses', (req, res, next) => {
	Campuses.create(req.body)
	.then(campus => res.status(201).json(campus))
	.catch(next);
});

api.put('/students/:studentId', (req, res, next) => {
	const studentId = req.params.studentId;
	Students.findAll({
		where: {id: studentId}
	}).then(student => student[0].update(req.body))
	.then(updatedStudent => {
		return Students.findAll({
			where: {id: updatedStudent.id},
			include: [{model: Campuses}]
		})})
	.then(newStudent => res.status(200).json(newStudent))
	.catch(next);
});

api.put('/campuses/:campusId', (req, res, next) => {
	const campusId = req.params.campusId;
	Campuses.findAll({
		where: {id : campusId}
	})
	.then(campus => campus[0].update(req.body))
	.then(updatedCampus => {
		return Campuses.findAll({
			where : {id: updatedCampus.id},
			include:[{
				model: Students}
				// where: {campusId: updatedCampus.id}
			]
		})
	})
	.then(newCampus => res.status(200).json(newCampus))
	.catch(next);
})

api.delete('/students/:studentId', (req, res, next) => {
	const studentId = req.params.studentId;
	Students.findAll({
		where: {id: studentId}
	})
	.then(student => student[0].destroy())
	.then(() => {
		return Students.findAll({
			include: [{model: Campuses}]
		})
	})
	.then(remainingStudents => res.json(remainingStudents))
	.catch(next);
})

api.delete('/campuses/:campusId', (req, res, next) => {
	const campusId = req.params.campusId;
	Campuses.findAll({
		where: {id: campusId}
	})
	.then(campus => campus[0].destroy())
	.then(() => {
		return Campuses.findAll()
	})
	.then(remainingCampuses => res.json(remainingCampuses))
	.catch(next);
})

module.exports = api