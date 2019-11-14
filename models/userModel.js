const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Informe um e-mail válido'],
    validate: {
      validator: validator.isEmail,
      message: 'O e-mail informado não é válido.'
    },
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Informe sua senha'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirme sua senha'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'As senhas informadas não são iguais.'
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
