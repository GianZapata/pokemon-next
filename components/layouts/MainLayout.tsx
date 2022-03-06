import { FC, CSSProperties, SetStateAction, Dispatch } from 'react'

import Head from 'next/head'
import { Navbar } from '../ui'
import { SmallPokemon } from '../../interfaces/pokemon-list';

interface MainLayoutProps { 
   title?: string
	pokemons?: SmallPokemon[]
	setSearchPokemons?: Dispatch<SetStateAction<SmallPokemon[]>>
}

const mainStyles : CSSProperties = {
	padding: '0 20px',
}

export const MainLayout : FC<MainLayoutProps> = ({ children, title, pokemons, setSearchPokemons }) => {
	return (
		<>
			<Head>
				<title>{ title || 'Pokemon App' }</title>
				<meta  name="author" content="``Gian Carlo Zapata"/>
				<meta  name="description" content={`Información sobre el pokemon ${ title } `}/> 
				<meta  name="keywords" content={`${ title }, pokemon, pokemón, pokedex`} />
			</Head>

			<Navbar/>

			<main style={ mainStyles }>
				{ children }
			</main>
		</>
	)
}
