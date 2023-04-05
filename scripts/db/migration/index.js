const {merchantInit} = require('./merchants');
const {usersInit} = require("./users")
const {sessionInit} = require("./session")
const {bookingInit} = require('./bookings')
const {authInit} = require('./auth')

merchantInit()
usersInit()
authInit()
sessionInit()
bookingInit()
