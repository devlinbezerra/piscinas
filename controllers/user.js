const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const appError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    //Deve ser feito da maneira abaixo para que o requisitante não tenha permissão de criar um usuário administrador
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1 Ver se o email e senha foram informados
  if (!email || !password) next(new appError('Informme e-mail e senha!'));

  //2 Informar se o email e senha estão corretos
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new appError('Dados de usuário ou senha incorretos'), 401);
  }

  const token = signToken(user._id);

  //3 Se tudo estiver correto, então enviar token para o cliente
  res.status(200).json({
    status: 'success',
    token
  });
});
