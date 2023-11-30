import { validateParcialPerson, validatePerson } from '../schemas/personSchema.js'

export class PersonController {
  constructor ({ PersonModel }) {
    this.PersonModel = PersonModel
  }

  getAll = async (req, res) => {
    const persona = await this.PersonModel.getAll()
    res.json(persona)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const person = await this.PersonModel.getById({ id })
    if (person.err) {
      res.status(404).json(person)
    } else {
      res.json(person)
    }
  }

  create = async (req, res) => {
    const result = validatePerson(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      // console.log(result.data)
      const person = await this.PersonModel.create({ data: result.data })
      if (person.err) {
        res.status(400).json(person)
      } else {
        res.json(person)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const person = await this.PersonModel.delete({ id })
    if (person.err) {
      res.status(400).json(person)
    } else {
      res.json(person)
    }
  }

  update = async (req, res) => {
    const result = validateParcialPerson(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedperson = await this.PersonModel.update({ id, data: result.data })

      if (updatedperson.err) {
        res.status(400).json(updatedperson)
      } else {
        res.json(updatedperson)
      }
    }
  }

  login = async (req, res) => {
    const result = validateParcialPerson(req.body)
    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const loginUser = await this.PersonModel.login({ data: result.data })

      if (loginUser.err) {
        res.status(400).json(loginUser)
      } else {
        res.json(loginUser)
      }
    }
  }

  changePassword = async (req, res) => {
    const result = validateParcialPerson(req.body)
    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const loginUser = await this.PersonModel.changePassword({ data: result.data })

      if (loginUser.err) {
        res.status(400).json(loginUser)
      } else {
        res.json(loginUser)
      }
    }
  }
}
