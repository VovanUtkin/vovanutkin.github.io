const textInput = document.querySelector('.label')
const btn = document.querySelector('.btn')
const textTitle = document.querySelector('.title')
const life = document.querySelector('.life')

const words = [
	'собака',
	'кошка',
	'дом',
	'вилка',
	'ручка',
	'мышка',
	'монитор',
	'крукжа',
	'стакан',
	'куб',
	'телефон',
	'ковёр',
	'111',
	'222',
	'333',
]

let word = []
const randomNumber = Math.floor(Math.random(0, 9) * words.length) // случайное число с 0 до 13
let randomWord = words[randomNumber]
const arrayWord = randomWord.split('') // массив из случайного слова

let counter = 0 // перемена счета сколько раз была нажата кнопка

alert("Слова на русском языке. Если в слове одна и тоже буква повторяется ее нужно вести столько раз сколько есть в слове.")

//Создаем спанны на каждую букву
for (let i = 0; i < randomWord.length; i++) {
	generateSpan(i)
}

//Делаем массив word равным по длине - длине слова которое выпало
for (let i = 0; i < randomWord.length; i++) {
	word[i] = ''
}

console.log(randomWord)

//Фунция создания span для каждой буквы в слове
function generateSpan(id) {
	const span = document.createElement('span')
	span.id = id
	span.innerText = '_ '
	textTitle.append(span)
}

//Функция проверки случайного слова из массива на буквук
function check(tl) {
	let checkWord = false

	arrayWord.forEach(value => {
		if (value == tl) {
			checkWord = true
		}
	})
	return checkWord
}

//Обработчик клика на кнопку
btn.addEventListener('click', () => {
	//Проверка на пустой input
	if (textInput.value !== '') {
		// Получаем букву пользователя в нижнем регисте
		const textInputOne = textInput.value
		const textLower = textInputOne.toLowerCase()
		console.log(textLower)
		textInput.value = ''
		//textLower - переменная с буквой которую ввел пользователь в нижем регистре

		//Узнаем индекс буквы в слове
		console.log(`INDEX - ${randomWord.indexOf(textLower)}`)

		//Добавляем букву которая есть в слове
		if (check(textLower)) {
			word[randomWord.indexOf(textLower)] = textLower
			console.log(word)
			let o = document.getElementById(randomWord.indexOf(textLower))
			o.innerHTML = textLower
			counter++
			console.log(`Counter -${counter}`)
		}

		//Удаляем букву которую добавили в массив чтобы можно было писать 2 разные буквы
		randomWord = randomWord.replace(textLower, '.')
		console.log(randomWord)

		if (!check(textLower)) {
			life.innerText = Number(life.innerText) - 1
			if (Number(life.innerText) == 0) {
				setTimeout(() => {
					alert('Вы проиграли :(')
					location.reload()
				}, 1)
			}
		}
	} else {
		alert('Введите букву')
	}

	//Когда слова угада завершаем игру и перезагружает страницу
	if (counter == randomWord.length) {
		setTimeout(() => {
			alert('Вы победили!')
			location.reload()
		}, 300)
	}
})
