const User = require('../../models/User')
const {
  hashPassword, comparePassword, createToken,
} = require('../../lib/auth')

const login = async (obj, { email, password }) => {
  const user = await User.query().findOne({
    email,
  })
  if (!user) {
    throw new Error('Invalid email or password')
  }
  const validPassword = await comparePassword(password, user.password)
  if (!validPassword) {
    throw new Error('Invalid email or password')
  }
  // If successful login, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)
  return { user, token }
}

const register = async (obj, {
  input: {
    firstName, lastName, email, password,
  },
}) => {
  const emailExists = await User.query().findOne({ email })
  if (emailExists) {
    throw new Error('Email is already in use')
  }

  const passwordHash = await hashPassword(password)
  const user = await User.query().insertAndFetch({
    firstName,
    lastName,
    email,
    password: passwordHash,
  })

  // If successful registration, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)

  return { user, token }
}

const resolver = {
  Mutation: { login, register },
}

module.exports = resolver
