let userArray = process.argv.slice(2);

let { username: user, email: em } = { username: userArray[1], email: userArray[2] };
console.log({ username: user, email: em });