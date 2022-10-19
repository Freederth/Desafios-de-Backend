const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserContainer = require("../daos/login/LoginDaoMongoDB.js");
const User = new UserContainer();

// ---------------------- Utils -----------------------
const isValidPassword = async (userPassword, password) => {
	return bcrypt.compare(password, userPassword);
};

const createHash = async password => {
	return bcrypt.hash(password, await bcrypt.genSalt(10), null);
};

// ----------------- Serializers ----------------------
passport.serializeUser(function (user, done) {
	console.log("serialize");
	done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
	console.log("deserialize");
	const user = await User.getById(id);
	done(null, user);
});

// ------------- Passport Middlewares -----------------
passport.use(
	"login",
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = User.getByUser(username);
			if (!user) return done(null, false, { message: "user not found" });
			if (!(await isValidPassword(user.password, password)))
				done(null, false, { message: "wrong password" });
			return done(null, user);
		} catch (err) {
			return done(err, { message: "internal error" });
		}
	})
);

passport.use(
	"register",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, username, password, done) => {
			try {
				let user = await User.getByUser(username);

				if (user) {
					console.log(`El usuario ${username} ya existe`);
					return done(null, user.username, { message: "user ya existe" });
				} else {
					const newUser = {
						username: username,
						password: createHash(password)
					};
					try {
						await User.save(newUser);
					} catch (error) {
						console.error(error);
					}

					return done(null, newUser);
				}
			} catch (error) {
				console.error(error);
			}
		}
	)
);

module.exports = passport;
