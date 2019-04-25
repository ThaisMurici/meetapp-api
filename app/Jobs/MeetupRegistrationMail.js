'use strict'

const Mail = use('Mail')

class MeetupRegistrationMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'MeetupRegistrationMail-job'
  }

  // This is where the work is done.
  async handle ({ user, meetup }) {
    await Mail.send(
      ['emails.meetup-registration', 'emails.meetup-registration-text'],
      {
        user,
        meetup
      },
      message => {
        message
          .to(user.email)
          .from('hello@meetapp.com', 'Meetapp Team')
          .subject('Confirmação de inscrição')
      }
    )
  }
}

module.exports = MeetupRegistrationMail
