import {React, useState, useEffect } from 'react'
import StarwarsService from '../../shared/api/service/StarwarsService'

export const Uppgift3 = () => {
	const [character, setCharacter] = useState([]);
	const [count, setCount] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCharacterNameFromStarwarsAPI();
	}, [count])

	const getCharacterNameFromStarwarsAPI = async () => {
		try {
			setIsLoading(true);

			const { data: characterData } = await StarwarsService.getStarwarsCharacter(count);
			setCharacter(characterData);
			setIsLoading(false);
		} catch (e){
			alert("Fel vid anrop");
		}
	}

	const buttons = () => {
		return <div>
			<button onClick={() => setCount(count+1)}>Increment</button> <br />
			<button onClick={() => setCount(Number(count > 0) && count - 1)}>Decrement</button> {/* olfdolf kod, bad practice */}
		</div>
	}

	const displayCharacterName = () => {
		if (character || undefined) {
			return <div>
				<h2>{(character || undefined)?.name}</h2>
			</div>
		}
	}

	return (
		<div>
			<h1>Uppgift 3</h1>
	
			{isLoading ? 'Laddar karaktär...': ''}
			{displayCharacterName()}
			{buttons()}
		</div>
	)
}

/*

INSTRUKTIONER FÖR UPPGIFT 3:
Denna vy skall använda sig av useEffect tillsammans med useState för att hämta information om Starwars karaktärer.

	1. Du hittar två variabler i denna vy, character & count, dessa variabler skall bytas ut mot varsitt state.
	(variabelnamnen skall fortsatt heta likadant och de tidigare variabeldeklarationerna kan tas bort)

	2. ditt count state skall ha initialvärdet 1 
	och ditt character initialvärde skall vara en tom array

	3. i funktionen getCharacterNameFromStarwarsAPI() skall du spara 
	värdet av data variabeln i ditt character state

	4. I funktionen buttons() hittar du två button taggar. Skriv funktionalitet för knapparna att 
	addera värdet av count med 1 respektive subtrahera värdet med 1

	6. Vid första renderingen av denna vy-komponent 
	skall funktionen getCharacterNameFromStarwarsAPI() att anropas

	7. När värdet av count uppdateras skall det ske en ny rendering

	Ifall du lyckats slutföra detta ordentligt skall du nu i applikationen kunna hämta ett nytt karaktärnamn 
	genom att använda dig av de knappar som finns innuti buttons() funktionen.

 */