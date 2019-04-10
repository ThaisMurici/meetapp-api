'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   */
  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })
      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Error uploading file' } })
    }
  }

  /**
   * Display a single file.
   * GET files/:id
   */
  async show ({ params, request, response, view }) {}

  /**
   * Update file details.
   * PUT or PATCH files/:id
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a file with id.
   * DELETE files/:id
   */
  async destroy ({ params, request, response }) {}
}

module.exports = FileController
