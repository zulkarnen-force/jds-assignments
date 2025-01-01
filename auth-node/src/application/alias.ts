// aliases.ts
import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@application/*": "application/*",
  "@utils": "./utils",
});

export default moduleAlias;
// import moduleAlias from "module-alias";

// moduleAlias.addAliases({
//     "@root"         : __dirname ,
//     "@application"  : `${__dirname}/src/application`,
//     "@utils"        : `${__dirname}/src/utils`,
//     "@domain"       : `${__dirname}/src/domain`,
//     "@lib"          : `${__dirname}/src/src`,
//     "@middleware"   : `${__dirname}/src/middlewares`,
//     "@routes"       : `${__dirname}/src/routes`,
//     "@config"       : `${__dirname}/src/config`,
//     "@validation"   : `${__dirname}/src/validation`,
//     "@type"         : `${__dirname}/src/type`,
//     "@request"      : `${__dirname}/src/type/request`,
// });
// moduleAlias()
// export default moduleAlias;

//  const paths = {
//     // "@components/*": ["components/*"],
//     // "@utils/*": ["utils/*"]
//     "@application"  : ["src/application"],
//     "@utils"        : ["src/utils"],
//     "@domain"       : ["src/domain"],
//     "@lib"          : ["src/src"],
//     "@middleware"   : ["src/middlewares"],
//     "@routes"       : ["src/routes"],
//     "@config"       : ["src/config"],
//     "@validation"   : ["src/validation"],
//     "@type"         : ["src/type"],
//     "@request"      : ["src/type/request"],
//   };
//   export default paths;
