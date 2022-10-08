const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const contenedorLogin = require("../daos/login/LoginDaoMongoDB");
const users = new contenedorLogin();

// ---------------------- Utils -----------------------
const isValidPassword = (mail, password) => {
	return bcrypt.compareSync(password, mail.password);
};

const createHash = password => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// ----------------- Serializers ----------------------
passport.serializeUser(function (mail, done) {
	console.log("serialize");
	done(null, mail);
});

passport.deserializeUser(function (mail, done) {
	console.log("deserialize");
	done(null, mail);
});

// ------------- Passport Middlewares -----------------
passport.use(
	"login",
	new LocalStrategy(async (mail, password, done) => {
		let user = await users.getByMail(mail);

		if (!user) {
			console.log(`No existe el usuario ${mail}`);
			return done(null, false, { message: "User not found" });
		}

		if (!isValidPassword(mail, password)) {
			console.log("Password incorrecto");
			return done(null, false, { message: "Password incorrect" });
		}

		done(null, mail);
	})
);

passport.use(
	"signup",
	new LocalStrategy(
		{
			passReqToCallback: true
		},
		async (req, mail, password, done) => {
			let user = await users.getByMail(mail);

			if (user) {
				console.log(`El usuario ${mail} ya existe`);
				return done(null, false, { message: "User already exists" });
			}

			let newUser = {
				mail,
				// password: createHash(password)
				password
			};

			await users.save(newUser); // Grabar usuario en BD

			return done(null, req.body);
		}
	)
);

module.exports = passport;
