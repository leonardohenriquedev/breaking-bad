let input = document.getElementsByTagName('input')[0];
let body = document.getElementsByTagName('body')[0];
let div = document.createElement('div');
div.classList = 'character-container';
let character = document.createElement('div');
body.appendChild(div);
let characContainer = document.getElementsByClassName('character-container')[0];
characContainer.appendChild(character);

input.addEventListener('keypress', async(event) => {
  if (event.key == 'Enter') {
    let characterObj = await searchCharacter(input.value);
    character.innerHTML = `
    <div class='c-name'> Name: ${characterObj.name}</div>
    <div class='c-nick'>Nickname: ${characterObj.nickname}</div>
    <div class='c-birth'>Birthday: ${characterObj.birthday}</div>
    <div class='c-occ'>Occupation: ${characterObj.occupation.join(', ')}</div>
    <img class='c-img' src="${characterObj.img}" alt="Pic of ${characterObj.name}">    `
    character.classList = 'character';
  }
})

const searchCharacter = async(input) => {
  let obj = await fetch(`https://www.breakingbadapi.com/api/characters`);

  obj = await obj.json();

  let result = obj.find((character) => {
    return character.name.toLowerCase().includes(input.toLowerCase()) || character.nickname.toLowerCase().includes(input.toLowerCase());
  });

  if (result === undefined) {
    alert('Personagem não encontrado')
  } else
    return result;
}
