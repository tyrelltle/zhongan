import com.typesafe.sbt.packager.docker._
name := """play-hibernate"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava, JavaAppPackaging, DockerPlugin, PlayEbean)

javacOptions ++= Seq("-source", "1.8", "-target", "1.8")

scalaVersion := "2.11.7"

resolvers += Resolver.mavenLocal

libraryDependencies ++= Seq(
  // If you enable PlayEbean plugin you must remove these
  // JPA dependencies to avoid conflicts.
  "org.hibernate" % "hibernate-entitymanager" % "4.3.10.Final",
  "mysql" % "mysql-connector-java" % "5.1.36",
  cache,
  javaWs,
  "org.assertj" % "assertj-core" % "3.1.0" % "test",
  "org.apache.commons" % "commons-lang3" % "3.4",
  "org.webjars.npm" % "jquery" % "3.0.0-beta1",
  "org.webjars" % "angularjs" % "1.3.0-beta.2",
  "org.webjars" % "requirejs" % "2.1.11-1",
  "org.webjars" % "angular-ui-bootstrap" % "1.2.1",
  "org.webjars.bower" % "fontawesome" % "4.5.0",
  "org.webjars" % "chartjs" % "26962ce-1",
  "org.webjars.bower" % "angular-chart.js" % "0.8.8"
)

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

// --------------------
// ------ DOCKER ------
// --------------------
// build with activator docker:publishLocal

// change to smaller base image
dockerBaseImage := "frolvlad/alpine-oraclejdk8:latest"
dockerCommands := dockerCommands.value.flatMap {
  case cmd@Cmd("FROM", _) => List(cmd, Cmd("RUN", "apk update && apk add bash"))
  case other => List(other)
}

// setting a maintainer which is used for all packaging types</pre>
maintainer := "Me"

// exposing the play ports
dockerExposedPorts in Docker := Seq(9000, 9443)

// publish to repo
//dockerRepository := Some("quay.io/")
//dockerUpdateLatest := true

// run this with: docker run -p 9000:9000 <name>:<version>
includeFilter in (Assets, LessKeys.less) := "app.less"
