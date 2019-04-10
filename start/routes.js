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
Route.resource('preferences', 'PreferenceController').apiOnly()
Route.resource('users', 'UserController').apiOnly()
