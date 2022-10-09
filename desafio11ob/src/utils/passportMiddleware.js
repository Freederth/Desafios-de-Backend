const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const ContenedorLogin = require("../daos/login/LoginDaoMongoDB");
const User = new ContenedorLogin();

User.getAll().then(asdas => {
	console.log(asdas);
});

// ---------------------- Utils -----------------------
const isValidPassword = (mail, password) => {
	return bcrypt.compareSync(password, mail.password);
};

const createHash = password => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// ----------------- Serializers ----------------------
passport.serializeUser(function (user, done) {
	console.log("serialize");
	done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
	console.log("deserialize");
	await User.getById(id, done);
});

// ------------- Passport Middlewares -----------------
passport.use(
	"login",
	new LocalStrategy(async (username, password, done) => {
		let user = await User.getByUser(username);

		if (!user) {
			console.log(`No existe el usuario ${username}`);
			return done(null, false, { message: "User not found" });
		}
		if (!isValidPassword(user, password)) {
			console.log("Password incorrecto");
			return done(null, false, { message: "Password incorrect" });
		}

		done(null, user);
	})
);

passport.use(
	"signup",
	new LocalStrategy(
		{
			passReqToCallback: true
		},
		async (req, username, password, done) => {
			let user = await User.getByUser(username);

			const { name, email } = req.body;

			if (user) {
				console.log(`El usuario ${username} ya existe`);
				return done(null, false, { message: "User already exists" });
			}

			let newUser = {
				username,
				password: createHash(password)
			};

			await User.save(newUser);

			return done(null, newUser.id);
		}
	)
);

module.exports = passport;
