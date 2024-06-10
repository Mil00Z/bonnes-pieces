
const jsonReader = '../../package.json';

const getD = await fetch(jsonReader);
const displayD = await getD.json();


console.log(displayD);
