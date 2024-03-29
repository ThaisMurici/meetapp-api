'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

/**
 * User routes
 */
Route.post('users', 'UserController.store')

/**
 * Auth routes
 */
Route.post('sessions', 'SessionController.store')

/**
 * Password routes
 */
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords/reset', 'ForgotPasswordController.update')

/**
 * Resources routes
 */
Route.group(() => {
  Route.resource('preferences', 'PreferenceController').apiOnly()

  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['store'])

  Route.resource('meetups', 'MeetupController').apiOnly()
  Route.post('meetups/:id/register', 'MeetupRegistrationController.store')

  Route.get('users/:id/meetups/next', 'UserMeetupController.showNext')
  Route.get(
    'users/:id/meetups/registrations',
    'UserMeetupController.showRegistrations'
  )
  Route.get(
    'users/:id/meetups/recomended',
    'UserMeetupController.showRecomended'
  )

  Route.post('files', 'FileController.store')
  Route.get('files/:id', 'FileController.show')
  Route.delete('files/:id', 'FileController.destroy')
}).middleware(['auth'])
